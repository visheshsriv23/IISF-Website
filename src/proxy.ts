import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/server/auth";

/** Keeps /admin behind a login. API routes re-check the session themselves. */
export async function proxy(request: NextRequest) {
  const authed = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (!authed) return NextResponse.redirect(new URL("/admin/login", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};
