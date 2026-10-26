import { SESSION_COOKIE } from "@/server/auth";

export async function POST() {
  const response = Response.json({ ok: true });
  response.headers.set("Set-Cookie", `${SESSION_COOKIE}=; Path=/; HttpOnly; Max-Age=0`);
  return response;
}
