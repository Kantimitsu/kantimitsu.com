import { bytesToBase64 } from "@/lib/base64";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "edge";
const MAX_FILE_BYTES = 1024 * 1024;
const MAX_REQUEST_BYTES = 1150 * 1024;

function isDiagnosticReport(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const report = value as Record<string, unknown>;
  const allowed = new Set(["schemaVersion", "collectorVersion", "generatedAtUtc", "consent", "system", "streamingSoftware", "benchmark", "networkTest", "warnings"]);
  if (Object.keys(report).some((key) => !allowed.has(key))) return false;
  if (report.schemaVersion !== "1.0.0" || typeof report.collectorVersion !== "string" || typeof report.generatedAtUtc !== "string") return false;
  if (!report.consent || typeof report.consent !== "object" || Array.isArray(report.consent)) return false;
  if (!report.system || typeof report.system !== "object" || Array.isArray(report.system)) return false;
  const system = report.system as Record<string, unknown>;
  if (typeof system.os !== "string" || typeof system.architecture !== "string") return false;
  return Array.isArray(report.warnings) && report.warnings.every((item) => typeof item === "string");
}

function textField(form: FormData, name: string, maximum: number) {
  const value = form.get(name);
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maximum);
}

async function verifyTurnstile(request: Request, token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;
  const data = new FormData();
  data.set("secret", secret);
  data.set("response", token);
  const remoteIp = request.headers.get("cf-connecting-ip");
  if (remoteIp) data.set("remoteip", remoteIp);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: data });
  const result = await response.json() as { success?: boolean };
  return result.success === true;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_BYTES) return Response.json({ error: "Attachment or message is too large." }, { status: 413 });
  const limited = await rateLimit(request, "enquiry", 5, 15 * 60_000);
  if (!limited.allowed) return Response.json({ error: "Too many attempts. Try again shortly." }, { status: 429, headers: { "retry-after": String(limited.retryAfter) } });

  let form: FormData;
  try { form = await request.formData(); } catch { return Response.json({ error: "That form payload could not be read." }, { status: 400 }); }
  if (textField(form, "website", 200)) return Response.json({ ok: true });

  const name = textField(form, "nameOrHandle", 120);
  const contactMethod = textField(form, "contactMethod", 20);
  const contactValue = textField(form, "contactValue", 320);
  const platforms = textField(form, "platforms", 200);
  const budgetRange = textField(form, "budgetRange", 100);
  const targetDate = textField(form, "targetDate", 20);
  const message = textField(form, "projectDescription", 5000);
  const consent = textField(form, "consent", 10) === "true";
  const token = textField(form, "cf-turnstile-response", 2048);
  const contactIsValid = contactMethod === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue) : ["discord", "other"].includes(contactMethod) && contactValue.length >= 2;
  if (!name || !message || !consent || !contactIsValid) {
    return Response.json({ error: "Please complete the required fields and consent checkbox." }, { status: 400 });
  }
  if (!(await verifyTurnstile(request, token))) return Response.json({ error: "Anti-spam check failed. Please try again." }, { status: 400 });

  const attachment = form.get("report");
  let resendAttachment: { filename: string; content: string } | undefined;
  if (attachment instanceof File && attachment.size > 0) {
    const lowerName = attachment.name.toLowerCase();
    if (attachment.size > MAX_FILE_BYTES || (!lowerName.endsWith(".json") && !lowerName.endsWith(".txt"))) {
      return Response.json({ error: "Reports must be .json or .txt and no larger than 1 MiB." }, { status: 400 });
    }
    const bytes = new Uint8Array(await attachment.arrayBuffer());
    const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    if (lowerName.endsWith(".json")) {
      let report: unknown;
      try { report = JSON.parse(decoded); } catch { return Response.json({ error: "The attached JSON is not valid." }, { status: 400 }); }
      if (!isDiagnosticReport(report)) return Response.json({ error: "The report does not match the published collector format." }, { status: 400 });
    }
    resendAttachment = { filename: lowerName.endsWith(".json") ? "diagnostic-report.json" : "diagnostic-report.txt", content: bytesToBase64(bytes) };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const destination = process.env.ENQUIRY_DESTINATION;
  if (!apiKey || !destination) return Response.json({ error: "Email delivery is not configured yet. Please email hello@kantimitsu.com directly." }, { status: 503 });

  const lines = [
    `Name / handle: ${name}`,
    `Contact: ${contactMethod} — ${contactValue}`,
    `Platforms: ${platforms || "Not supplied"}`,
    `Budget: ${budgetRange || "Not supplied"}`,
    `Target date: ${targetDate || "Not supplied"}`,
    "",
    message
  ];
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM ?? "Kantimitsu Website <website@mail.kantimitsu.com>",
      to: [destination],
      reply_to: contactMethod === "email" ? contactValue : undefined,
      subject: `[kantimitsu.com] Enquiry from ${name}`,
      text: lines.join("\n"),
      attachments: resendAttachment ? [resendAttachment] : undefined
    })
  });
  if (!response.ok) return Response.json({ error: "The message relay coughed. Please email hello@kantimitsu.com directly." }, { status: 502 });
  return Response.json({ ok: true });
}
