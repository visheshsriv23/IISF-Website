import Link from "next/link";
import type { CSSProperties } from "react";
import { ACCENT_FILL, cn, RARITY, sectorAccent } from "@/lib/utils";
import type { Startup } from "@/shared/types";
import { Photo } from "./Photo";

/** Startup trading card (DOM version). The 3D spinning version lives in components/three. */
export function TradingCard({ startup, rotate = 0, className }: { startup: Startup; rotate?: number; className?: string }) {
  const accent = sectorAccent(startup.sector);
  const stats = [
    ["Stage", startup.stage],
    ["Team", `${startup.team_size} ppl`],
    ["Funding", startup.funding || "—"],
    ["Founded", startup.founded],
  ];

  return (
    <article
      data-tilt
      data-rotate
      style={{ "--r": rotate } as CSSProperties}
      className={cn("group relative flex flex-col overflow-hidden brutal bg-paper", className)}
    >
      <header className={cn("flex items-center justify-between border-b-3 border-ink px-4 py-2", ACCENT_FILL[accent])}>
        <span className="font-bold uppercase tracking-wider text-sm">{startup.sector}</span>
        <span className="text-xs font-bold">#{String(startup.sort).padStart(3, "0")}</span>
      </header>
      <div className="p-3">
        <Photo src={startup.logo_url ?? startup.cover_url} alt={`${startup.name} logo`} label={startup.name} tone={accent} className="aspect-[4/3] rounded-md border-3 border-ink" sizes="(min-width: 1024px) 25vw, 80vw" />
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4">
        <h3 className="display text-3xl">
          <Link href={`/startups/${startup.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {startup.name}
          </Link>
        </h3>
        <p className="mt-1 mb-4 text-[15px] leading-snug">{startup.tagline}</p>
        <dl className="mt-auto grid grid-cols-2 overflow-hidden rounded-lg border-3 border-ink text-sm">
          {stats.map(([label, value], i) => (
            <div key={label} className={cn("px-3 py-1.5", i % 2 === 0 && "border-r-3 border-ink", i < 2 && "border-b-3 border-ink")}>
              <dt className="text-[11px] font-bold uppercase tracking-wider opacity-70">{label}</dt>
              <dd className="font-bold">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 self-start rounded-full border-2 border-ink bg-sun px-3 py-0.5 text-xs font-bold uppercase">{RARITY[startup.stage]}</p>
      </div>
      {/* Keyboard focus ring for the stretched link */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[11px] ring-lime ring-offset-0 group-has-[:focus-visible]:ring-4" />
    </article>
  );
}
