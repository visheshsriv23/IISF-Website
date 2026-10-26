import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { formatDate } from "@/lib/utils";
import { getResources } from "@/server/content";

export const metadata: Metadata = {
  title: "Official Documents",
  description: "IISF KNIT policies, annual reports, notices, circulars and forms.",
};

/** Deliberately calm: same fonts and colours, minimal decoration (brief §7). */
export default async function ResourcesPage() {
  const docs = await getResources();
  const categories = [...new Set(docs.map((d) => d.category))];

  return (
    <>
      <PageHero eyebrow="Resources" title="Official documents" intro="Policies, reports, notices and forms. The formal stuff lives here so the rest of the site can stay fun." color="lilac" />
      <section className="section-pad container-zine max-w-4xl">
        {categories.map((category) => (
          <div key={category} className="mb-14">
            <h2 className="mb-4 border-b-3 border-ink pb-2 text-2xl font-bold">{category === "Policy" ? "Policies" : `${category}s`}</h2>
            <ul className="divide-y-2 divide-ink/15">
              {docs.filter((d) => d.category === category).map((d) => (
                <li key={d.id}>
                  <a href={d.file_url} target="_blank" rel="noreferrer" className="group flex items-center gap-4 py-4">
                    <FileText aria-hidden className="size-6 shrink-0" strokeWidth={2.5} />
                    <span className="flex-1 text-lg font-medium group-hover:underline">{d.title}</span>
                    <time dateTime={d.published_on} className="text-sm tabular-nums opacity-70">{formatDate(d.published_on)}</time>
                    <span className="sr-only">(PDF, opens in new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {docs.length === 0 && <p>No documents published yet.</p>}
      </section>
    </>
  );
}
