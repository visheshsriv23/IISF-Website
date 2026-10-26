"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Startup } from "@/shared/types";
import { TradingCard } from "@/components/ui/TradingCard";

const ALL = "All";

function Filter({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div role="group" aria-label={`Filter by ${label}`} className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-bold uppercase tracking-wider text-sm">{label}</span>
      {[ALL, ...options].map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={cn("rounded-full border-3 border-ink px-3.5 py-1 text-sm font-bold transition-transform hover:-translate-y-0.5", value === o ? "bg-ink text-lime" : "bg-paper")}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/** Trading-card grid with sector and stage filters. */
export function StartupGrid({ startups }: { startups: Startup[] }) {
  const [sector, setSector] = useState(ALL);
  const [stage, setStage] = useState(ALL);
  const unique = (key: "sector" | "stage") => [...new Set(startups.map((s) => s[key]))];
  const shown = startups.filter((s) => (sector === ALL || s.sector === sector) && (stage === ALL || s.stage === stage));

  return (
    <>
      <div className="mb-12 flex flex-col gap-4 rounded-[14px] border-3 border-ink bg-paper p-5">
        <Filter label="Sector" options={unique("sector")} value={sector} onChange={setSector} />
        <Filter label="Stage" options={unique("stage")} value={stage} onChange={setStage} />
      </div>
      <p aria-live="polite" className="hand mb-6 text-2xl">{shown.length} card{shown.length === 1 ? "" : "s"} in the deck</p>
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s, i) => (
          <li key={s.id}><TradingCard startup={s} rotate={[-2, 1, 2, -1][i % 4]} className="h-full" /></li>
        ))}
      </ul>
      {shown.length === 0 && <p className="hand py-16 text-center text-3xl">No cards match. Maybe yours will be the first?</p>}
    </>
  );
}
