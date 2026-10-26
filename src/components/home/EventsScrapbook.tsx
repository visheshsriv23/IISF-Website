import type { IISFEvent } from "@/shared/types";
import { Button } from "@/components/ui/Button";
import { ScrapbookPhoto } from "@/components/ui/ScrapbookPhoto";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TicketStub } from "@/components/ui/TicketStub";
import { splitPair } from "@/lib/utils";

const TONES = ["pink", "lime", "blue"] as const;

/** Notebook page: tickets for what's next, taped photos of what happened. */
export function EventsScrapbook({ upcoming, past }: { upcoming: IISFEvent[]; past: IISFEvent[] }) {
  const photos = past.flatMap((e) => e.gallery.map((g) => splitPair(g))).slice(0, 3);

  return (
    <section className="section-pad">
      <div className="container-zine">
        <div className="ruled relative brutal px-5 py-12 md:px-14 md:pl-24">
          <div aria-hidden className="absolute inset-y-0 left-10 hidden w-0.5 bg-pink md:block" />
          <SectionHeader eyebrow="Events" title="What's happening" aside="bring chai, leave with a co-founder" />
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <h3 className="hand text-3xl">coming up →</h3>
              {upcoming.slice(0, 2).map((e) => <TicketStub key={e.id} event={e} />)}
              {upcoming.length === 0 && <p className="hand text-2xl">Nothing scheduled yet. Something&apos;s cooking though.</p>}
            </div>
            <div>
              <h3 className="hand mb-6 text-3xl">last time on IISF…</h3>
              <div className="grid grid-cols-2 gap-6">
                {photos.map(([src, caption], i) => (
                  <div key={i} data-reveal className={i === 2 ? "col-span-2 mx-auto w-2/3" : ""}>
                    <ScrapbookPhoto src={src || null} caption={caption} rotate={i % 2 ? 3 : -3} tone={TONES[i]} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12">
            <Button href="/events" variant="secondary" arrow>All events</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
