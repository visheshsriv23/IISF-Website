import { deleteRow, updateRow } from "@/server/admin";
import { HttpError } from "@/server/db";
import { adminRoute } from "@/server/http";
import { isResourceName } from "@/shared/resources";

type Ctx = RouteContext<"/api/admin/[resource]/[id]">;

async function target({ params }: Ctx) {
  const { resource, id } = await params;
  if (!isResourceName(resource)) throw new HttpError(404, "Unknown resource.");
  return [resource, id] as const;
}

export const PATCH = adminRoute(async (request, ctx: Ctx) => {
  const [resource, id] = await target(ctx);
  return Response.json(await updateRow(resource, id, await request.json()));
});

export const DELETE = adminRoute(async (_request, ctx: Ctx) => {
  const [resource, id] = await target(ctx);
  await deleteRow(resource, id);
  return new Response(null, { status: 204 });
});
