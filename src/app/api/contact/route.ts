import { route } from "@/server/http";
import { submitContact } from "@/server/submissions";

export const POST = route(async (request) => {
  await submitContact(await request.json());
  return Response.json({ ok: true }, { status: 201 });
});
