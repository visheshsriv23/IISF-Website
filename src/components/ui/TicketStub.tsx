import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { trackClass } from "@/lib/analytics";
import { cn, formatDate } from "@/lib/utils";
import type { IISFEvent } from "@/shared/types";
import { buttonClass } from "./Button";
import { Tag } from "./Tag";

const STATUS = {
  upcoming: { label: "Upcoming", color: "lime" },
  closed: { label: "Registrations closed", color: "pink" },
  done: { label: "Done", color: "lilac" },
} as const;

/** Event ticket with perforated stub. */
export function TicketStub({ event, className }: { event: IISFEvent; className?: string }) {
  const status = STATUS[event.status];
  const canRegister = event.status === "upcoming" && event.register_url;

  return (
    <article data-reveal data-tilt className={cn("relative flex overflow-hidden brutal bg-paper", className)}>
      <div className="flex w-24 shrink-0 flex-col items-center justify-center bg-pink p-3 text-center md:w-28">
        <span className="font-bold uppercase text-sm">{formatDate(event.starts_at, { month: "short" })}</span>
        <span className="display text-5xl">{formatDate(event.starts_at, { day: "numeric" })}</span>
        <span className="text-xs font-bold">{formatDate(event.starts_at, { weekday: "short" })}</span>
      </div>
      <div aria-hidden className="relative border-l-3 border-dashed border-ink">
        <span className="absolute -top-4 -left-3.5 size-6 rounded-full border-3 border-ink bg-cream" />
        <span className="absolute -bottom-4 -left-3.5 size-6 rounded-full border-3 border-ink bg-cream" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Tag color={status.color}>{status.label}</Tag>
          <Tag>{event.kind}</Tag>
        </div>
        <h3 className="display text-2xl md:text-3xl">
          <Link href={`/events/${event.slug}`} className="hover:underline decoration-4 underline-offset-4">{event.title}</Link>
        </h3>
        <p>{event.summary}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium">
          <li className="flex items-center gap-1.5"><MapPin aria-hidden className="size-4" strokeWidth={2.5} />{event.venue}</li>
          <li className="flex items-center gap-1.5"><Clock aria-hidden className="size-4" strokeWidth={2.5} />{formatDate(event.starts_at, { hour: "numeric", minute: "2-digit" })}</li>
        </ul>
        {canRegister && (
          <a href={event.register_url!} target="_blank" rel="noreferrer" className={cn(buttonClass("primary"), "mt-1 self-start px-5 py-2.5 text-sm", trackClass("Event Register Click"))}>
            Register →
          </a>
        )}
      </div>
    </article>
  );
}
