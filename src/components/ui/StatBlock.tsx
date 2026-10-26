import type { Stat } from "@/shared/types";
import { cn } from "@/lib/utils";

/** Bordered stat with a count-up number. Server renders the final value for no-JS/SEO. */
export function StatBlock({ stat, className }: { stat: Stat; className?: string }) {
  return (
    <div data-reveal className={cn("brutal bg-paper p-5 md:p-8", className)}>
      <p className="display text-[32px] sm:text-5xl xl:text-6xl">
        {stat.prefix}
        <span data-count={stat.value}>{stat.value.toLocaleString("en-IN")}</span>
        {stat.suffix}
      </p>
      <p className="mt-3 font-bold uppercase tracking-wider text-sm">{stat.label}</p>
    </div>
  );
}
