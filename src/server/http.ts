import "server-only";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { fieldErrors } from "@/shared/schemas";
import { SESSION_COOKIE, verifySessionToken } from "./auth";
import { HttpError } from "./db";

type Handler<Ctx> = (request: NextRequest, context: Ctx) => Promise<Response>;

/** Wraps a route handler with consistent JSON error responses. */
export function route<Ctx>(handler: Handler<Ctx>): Handler<Ctx> {
  return async (request, context) => {
    try {
      return await handler(request, context);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return Response.json({ error: "Some fields need a second look.", fields: fieldErrors(err) }, { status: 422 });
      }
      if (err instanceof HttpError) {
        return Response.json({ error: err.message, fields: err.details }, { status: err.status });
      }
      console.error(err);
      return Response.json({ error: "Something broke on our side. Try again in a minute." }, { status: 500 });
    }
  };
}

/** Same as route() but rejects requests without a valid admin session. */
export function adminRoute<Ctx>(handler: Handler<Ctx>): Handler<Ctx> {
  return route(async (request, context) => {
    if (!(await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value))) {
      throw new HttpError(401, "Please log in again.");
    }
    return handler(request, context);
  });
}
