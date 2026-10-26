import { checkPassword, createSessionToken, SESSION_COOKIE, SESSION_TTL_SECONDS } from "@/server/auth";
import { HttpError } from "@/server/db";
import { route } from "@/server/http";

export const POST = route(async (request) => {
  const { password } = await request.json();
  if (typeof password !== "string" || !(await checkPassword(password))) {
    throw new HttpError(401, "Wrong password.");
  }
  const response = Response.json({ ok: true });
  const cookie = [
    `${SESSION_COOKIE}=${await createSessionToken()}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${SESSION_TTL_SECONDS}`,
    process.env.NODE_ENV === "production" ? "Secure" : "",
  ].filter(Boolean);
  response.headers.set("Set-Cookie", cookie.join("; "));
  return response;
});
