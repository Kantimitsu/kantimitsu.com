export const runtime = "edge";

export async function HEAD() {
  return new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
}

export async function GET() {
  return Response.json({ ok: true }, { headers: { "cache-control": "no-store" } });
}
