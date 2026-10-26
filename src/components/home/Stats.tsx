import type { Stat } from "@/shared/types";
import { Doodle } from "@/components/ui/Doodle";
import { StatBlock } from "@/components/ui/StatBlock";

/** Deliberately quiet: no stickers, just big numbers. */
export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section aria-label="IISF in numbers" className="section-pad">
      <div className="container-zine">
        <h2 className="hand mb-8 flex items-center gap-3 text-3xl md:text-4xl">
          the receipts <Doodle name="arrowStraight" className="w-20 rotate-12" weight={3} />
        </h2>
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatBlock key={stat.id} stat={stat} className={i % 2 ? "md:translate-y-6" : ""} />
          ))}
        </div>
      </div>
    </section>
  );
}
