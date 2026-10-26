import { route } from "@/server/http";
import { submitCommittee } from "@/server/submissions";

export const POST = route(async (request) => {
  await submitCommittee(await request.json());
  return Response.json({ ok: true }, { status: 201 });
});
