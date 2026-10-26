import type { Metadata } from "next";
import Link from "next/link";
import { MotionLayer } from "@/components/motion/MotionLayer";
import { PageHero } from "@/components/ui/PageHero";
import { ScrapbookPhoto } from "@/components/ui/ScrapbookPhoto";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Sticker } from "@/components/ui/Sticker";
import { TicketStub } from "@/components/ui/TicketStub";
import { formatDate, splitPair } from "@/lib/utils";
import { getEventsByStatus } from "@/server/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Hackathons, bootcamps, pitch days and workshops at IISF KNIT Sultanpur. Register for what's next.",
};

const TONES = ["pink", "lime", "blue", "sun", "lilac"] as const;

export default async function EventsPage() {
  const { upcoming, past } = await getEventsByStatus();
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Show up. Build stuff."
        intro="Hackathons, bootcamps and pitch days. Grab a ticket for what's next, or scroll the scrapbook for what you missed."
        color="blue"
        sticker={<Sticker shape="circle" color="lime" rotate={-8}>Pitch Ready</Sticker>}
      />
      <section className="section-pad container-zine">
        <SectionHeader title="Coming up" aside="tickets are free, seats are not unlimited" />
        <div className="grid gap-8 lg:grid-cols-2">
          {upcoming.map((e) => <TicketStub key={e.id} event={e} />)}
        </div>
        {upcoming.length === 0 && <p className="hand text-3xl">Nothing scheduled yet. Follow us on Instagram so you don&apos;t miss the drop.</p>}
      </section>

      <section className="section-pad border-t-3 border-ink">
        <div className="container-zine">
          <SectionHeader title="The scrapbook" aside="proof that we actually do things" />
          <div className="flex flex-col gap-20">
            {past.map((e) => (
              <article key={e.id} className="ruled brutal p-6 md:p-10">
                <header className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
                  <h3 className="display text-3xl md:text-4xl">
                    <Link href={`/events/${e.slug}`} className="hover:underline decoration-4">{e.title}</Link>
                  </h3>
                  <p className="hand text-2xl">{formatDate(e.starts_at)} · {e.venue}</p>
                </header>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                  {e.gallery.map((g, i) => {
                    const [src, caption] = splitPair(g);
                    return (
                      <div key={g + i} data-reveal>
                        <ScrapbookPhoto src={src || null} caption={caption} rotate={[-3, 2, -1, 3][i % 4]} tone={TONES[i % TONES.length]} />
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <MotionLayer />
    </>
  );
}
