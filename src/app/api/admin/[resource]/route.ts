import { createRow, listRows } from "@/server/admin";
import { HttpError } from "@/server/db";
import { adminRoute } from "@/server/http";
import { isResourceName } from "@/shared/resources";

type Ctx = RouteContext<"/api/admin/[resource]">;

async function resourceFrom({ params }: Ctx) {
  const { resource } = await params;
  if (!isResourceName(resource)) throw new HttpError(404, "Unknown resource.");
  return resource;
}

export const GET = adminRoute(async (_request, ctx: Ctx) => Response.json(await listRows(await resourceFrom(ctx))));

export const POST = adminRoute(async (request, ctx: Ctx) =>
  Response.json(await createRow(await resourceFrom(ctx), await request.json()), { status: 201 }),
);
