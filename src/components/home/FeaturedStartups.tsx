"use client";

import { useState } from "react";
import { Hand } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Startup } from "@/shared/types";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Sticker } from "@/components/ui/Sticker";
import { TradingCard } from "@/components/ui/TradingCard";
import { CardStage, WhenVisible } from "@/components/three";

/** "Collect 'em all": a spinning 3D card you can pick, plus the regular card grid. */
export function FeaturedStartups({ startups }: { startups: Startup[] }) {
  const [active, setActive] = useState(startups[0]);
  if (!active) return null;

  return (
    <section className="section-pad border-y-3 border-ink bg-sun">
      <div className="container-zine">
        <SectionHeader
          title={<>Collect &apos;em all</>}
          aside="every card here was once a 2am idea"
          sticker={<Sticker shape="circle" color="pink" rotate={8}>Seed Funded</Sticker>}
        />

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative mx-auto aspect-[5/6] w-full max-w-md">
                <WhenVisible className="size-full" fallback={<TradingCard startup={active} className="mx-auto w-3/5" />}>
                  <CardStage startup={active} />
                </WhenVisible>
                <p aria-hidden className="hand absolute right-2 bottom-2 flex items-center gap-1 text-2xl">
                  <Hand className="size-5" /> drag to spin
                </p>
              </div>
              <div role="group" aria-label="Choose a card to spin" className="mt-4 flex flex-wrap justify-center gap-2">
                {startups.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={s.id === active.id}
                    onClick={() => setActive(s)}
                    className={cn(
                      "rounded-full border-3 border-ink px-4 py-1.5 text-sm font-bold transition-transform duration-200 ease-bounce hover:-translate-y-0.5",
                      s.id === active.id ? "bg-ink text-lime" : "bg-paper",
                    )}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <ul className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pt-2 pb-6 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0">
              {startups.slice(0, 4).map((s, i) => (
                <li key={s.id} data-reveal className="w-[78%] shrink-0 snap-center sm:w-auto">
                  <TradingCard startup={s} rotate={i % 2 ? 2 : -2} className="h-full" />
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center sm:justify-start">
              <Button href="/startups" variant="dark" arrow>See all startups</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
