import "server-only";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { RESOURCES, type FieldDef, type ResourceName } from "@/shared/resources";
import { HttpError, requireDb } from "./db";

/** Builds a zod validator for one admin field from the shared resource config. */
function fieldSchema(field: FieldDef): z.ZodType {
  const optionalText = z.string().trim().transform((v) => v || null);
  switch (field.type) {
    case "number":
      return z.coerce.number().int();
    case "boolean":
      return z.coerce.boolean();
    case "list":
      return z.array(z.string().trim()).transform((rows) => rows.filter(Boolean));
    case "select":
      return z.enum(field.options as [string, ...string[]]);
    case "url":
      return field.required ? z.url() : z.union([z.url(), z.literal("").transform(() => null), z.null()]);
    default:
      return field.required ? z.string().trim().min(1, `${field.label} is required`) : optionalText;
  }
}

function resourceSchema(name: ResourceName) {
  const shape = Object.fromEntries(RESOURCES[name].fields.map((f) => [f.name, fieldSchema(f)]));
  return z.object(shape);
}

function writable(name: ResourceName) {
  if ("readOnly" in RESOURCES[name]) throw new HttpError(405, `${RESOURCES[name].label} are read-only.`);
}

export async function listRows(name: ResourceName) {
  const { column, ascending } = RESOURCES[name].orderBy;
  const { data, error } = await requireDb().from(name).select("*").order(column, { ascending });
  if (error) throw new HttpError(500, error.message);
  return name === "applications" ? Promise.all(data.map(signDeckUrl)) : data;
}

export async function createRow(name: ResourceName, input: unknown) {
  writable(name);
  const values = resourceSchema(name).parse(input);
  const { data, error } = await requireDb().from(name).insert(values).select().single();
  if (error) throw new HttpError(400, error.message);
  revalidateTag(name, "max");
  return data;
}

export async function updateRow(name: ResourceName, id: string, input: unknown) {
  writable(name);
  const values = resourceSchema(name).partial().parse(input);
  const { data, error } = await requireDb().from(name).update(values).eq("id", id).select().single();
  if (error) throw new HttpError(400, error.message);
  revalidateTag(name, "max");
  return data;
}

export async function deleteRow(name: ResourceName, id: string) {
  const { error } = await requireDb().from(name).delete().eq("id", id);
  if (error) throw new HttpError(400, error.message);
  revalidateTag(name, "max");
}

/** Uploaded decks live in a private bucket; admins get a short-lived link. */
async function signDeckUrl<T extends { deck_url: string }>(row: T): Promise<T> {
  const path = row.deck_url.startsWith("storage:") ? row.deck_url.slice("storage:".length) : null;
  if (!path) return row;
  const { data } = await requireDb().storage.from("pitch-decks").createSignedUrl(path, 60 * 60);
  return { ...row, deck_url: data?.signedUrl ?? "" };
}
