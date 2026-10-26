import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { RESOURCES } from "@/shared/resources";
import type { ContentKey, ContentMap } from "@/shared/types";
import { getDb } from "./db";
import { seed } from "./data/seed";

/**
 * Read side of the content backend. Results are cached and tagged by table name;
 * admin mutations call revalidateTag(table) so edits show up without a redeploy.
 */
export async function listContent<K extends ContentKey>(table: K): Promise<ContentMap[K][]> {
  "use cache";
  cacheLife("hours");
  cacheTag(table);

  const db = getDb();
  if (!db) return seed[table];

  const { column, ascending } = RESOURCES[table].orderBy;
  const { data, error } = await db.from(table).select("*").order(column, { ascending });
  if (error) throw new Error(`Failed to load ${table}: ${error.message}`);
  return data as ContentMap[K][];
}

/* Small, intention-revealing helpers the pages use. */

export const getStats = () => listContent("stats");
export const getMarquee = () => listContent("marquee_items").then((rows) => rows.map((r) => r.text));
export const getPrograms = () => listContent("programs");
export const getFaqs = () => listContent("faqs");
export const getTestimonials = () => listContent("testimonials");
export const getResources = () => listContent("resources");
export const getTeam = () => listContent("team_members");
export const getStartups = () => listContent("startups");
export const getEvents = () => listContent("events");

export const getFeaturedStartups = async () => (await getStartups()).filter((s) => s.featured);

export const getStartup = async (slug: string) => (await getStartups()).find((s) => s.slug === slug) ?? null;

export const getEvent = async (slug: string) => (await getEvents()).find((e) => e.slug === slug) ?? null;

export async function getEventsByStatus() {
  const events = (await getEvents()).toSorted((a, b) => a.starts_at.localeCompare(b.starts_at));
  return {
    upcoming: events.filter((e) => e.status !== "done"),
    past: events.filter((e) => e.status === "done").reverse(),
  };
}
