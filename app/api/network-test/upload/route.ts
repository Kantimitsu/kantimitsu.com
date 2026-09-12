import { rateLimit } from "@/lib/rate-limit";

export const runtime = "edge";
const MAX_BYTES = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const limited = await rateLimit(request, "network-upload", 8, 15 * 60_000);
  if (!limited.allowed) return Response.json({ error: "Too many tests. Let the wires cool down." }, { status: 429, headers: { "retry-after": String(limited.retryAfter) } });
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BYTES) return Response.json({ error: "Test payload exceeds 5 MiB." }, { status: 413 });
  const body = new Uint8Array(await request.arrayBuffer());
  if (body.byteLength > MAX_BYTES) return Response.json({ error: "Test payload exceeds 5 MiB." }, { status: 413 });
  return Response.json({ acceptedBytes: body.byteLength }, { headers: { "cache-control": "no-store" } });
}
