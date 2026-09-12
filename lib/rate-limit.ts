type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export async function rateLimit(request: Request, scope: string, maximum = 5, windowMs = 15 * 60_000) {
  const rawIp = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  const input = new TextEncoder().encode(`${scope}:${rawIp}:${process.env.RATE_LIMIT_SALT ?? "development-only"}`);
  const digest = await crypto.subtle.digest("SHA-256", input);
  const key = Array.from(new Uint8Array(digest).slice(0, 12), (byte) => byte.toString(16).padStart(2, "0")).join("");
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }
  if (bucket.count >= maximum) return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  bucket.count += 1;
  return { allowed: true, retryAfter: 0 };
}
