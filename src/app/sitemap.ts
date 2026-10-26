import type { MetadataRoute } from "next";
import { FOOTER_NAV, SITE } from "@/lib/site";
import { getEvents, getStartups } from "@/server/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [startups, events] = await Promise.all([getStartups(), getEvents()]);
  const paths = ["", ...FOOTER_NAV.map((n) => n.href), ...startups.map((s) => `/startups/${s.slug}`), ...events.map((e) => `/events/${e.slug}`)];
  return paths.map((path) => ({ url: `${SITE.url}${path}` }));
}
