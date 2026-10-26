/**
 * Minimal admin session: an HMAC-signed, expiring cookie.
 * Shared by the proxy and route handlers (both run on Node).
 */

export const SESSION_COOKIE = "iisf_admin";
export const SESSION_TTL_SECONDS = 60 * 60 * 12;

const encoder = new TextEncoder();

async function sign(payload: string) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Buffer.from(sig).toString("base64url");
}

export async function createSessionToken() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  return `${expires}.${await sign(String(expires))}`;
}

export async function verifySessionToken(token: string | undefined) {
  if (!token || !process.env.SESSION_SECRET) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig || Number(expires) < Date.now() / 1000) return false;
  return sig === (await sign(expires));
}

/** Constant-time-ish comparison so the password check doesn't leak timing. */
export async function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const [a, b] = await Promise.all([sign(input), sign(expected)]);
  return a === b;
}
