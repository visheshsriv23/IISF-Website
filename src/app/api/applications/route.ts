import { route } from "@/server/http";
import { submitApplication } from "@/server/submissions";

export const POST = route(async (request) => {
  await submitApplication(await request.formData());
  return Response.json({ ok: true }, { status: 201 });
});
