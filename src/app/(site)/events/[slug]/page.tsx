import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { MotionLayer } from "@/components/motion/MotionLayer";
import { Button, TextLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { ScrapbookPhoto } from "@/components/ui/ScrapbookPhoto";
import { Tag } from "@/components/ui/Tag";
import { formatDate, splitPair } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { getEvent, getEvents } from "@/server/content";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.length ? events.map((e) => ({ slug: e.slug })) : [{ slug: "__none__" }];
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const event = await getEvent((await params).slug);
  return event ? { title: event.title, description: event.summary } : {};
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const event = await getEvent((await params).slug);
  if (!event) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.starts_at,
    description: event.summary,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: event.venue, address: SITE.address },
    organizer: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="container-zine grid items-center gap-12 pt-32 pb-16 md:pt-40 lg:grid-cols-2">
        <div>
          <TextLink href="/events"><ArrowLeft aria-hidden className="size-4" /> All events</TextLink>
          <div className="mt-6 flex gap-2">
            <Tag color="pink">{event.kind}</Tag>
            <Tag color={event.status === "upcoming" ? "lime" : "lilac"}>{event.status === "done" ? "Done" : event.status === "closed" ? "Registrations closed" : "Upcoming"}</Tag>
          </div>
          <h1 className="display mt-5 text-[44px] sm:text-7xl">{event.title}</h1>
          <p className="mt-5 text-xl">{event.summary}</p>
          <ul className="mt-6 space-y-2 font-bold">
            <li className="flex items-center gap-2"><Calendar aria-hidden className="size-5" />{formatDate(event.starts_at, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</li>
            <li className="flex items-center gap-2"><Clock aria-hidden className="size-5" />{formatDate(event.starts_at, { hour: "numeric", minute: "2-digit" })}</li>
            <li className="flex items-center gap-2"><MapPin aria-hidden className="size-5" />{event.venue}</li>
          </ul>
          {event.status === "upcoming" && event.register_url && (
            <Button href={event.register_url} target="_blank" rel="noreferrer" arrow className="mt-8">Register now</Button>
          )}
        </div>
        <div className="brutal -rotate-2 bg-paper p-3">
          <Photo src={event.cover_url} alt={event.title} label={event.title} tone="pink" priority className="aspect-[4/3] rounded-md border-3 border-ink" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </section>

      {event.description && (
        <section className="section-pad border-y-3 border-ink bg-sun">
          <div className="container-zine max-w-3xl text-xl leading-relaxed">{event.description}</div>
        </section>
      )}

      {event.gallery.length > 0 && (
        <section className="section-pad container-zine">
          <h2 className="display mb-10 text-4xl">Gallery</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {event.gallery.map((g, i) => {
              const [src, caption] = splitPair(g);
              return <div key={g + i} data-reveal><ScrapbookPhoto src={src || null} caption={caption} rotate={i % 2 ? 2 : -2} /></div>;
            })}
          </div>
        </section>
      )}
      <MotionLayer />
    </>
  );
}
