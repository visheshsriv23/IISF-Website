import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  reverse?: boolean;
  /** Seconds per loop. Smaller type on phones makes the same loop read slower. */
  speed?: number;
  className?: string;
  tilt?: number;
};

/** Infinite CSS marquee. Pauses on hover; reduced motion freezes it (globals.css). */
export function Marquee({ items, reverse, speed = 30, className = "bg-ink text-lime", tilt = 0 }: Props) {
  const row = items.map((item, i) => (
    <span key={i} className="flex items-center gap-6 px-3">
      {item}
      <span aria-hidden className="text-[0.7em]">✦</span>
    </span>
  ));
  return (
    <div
      className={cn("group relative overflow-hidden border-y-3 border-ink py-4", className)}
      style={{ rotate: `${tilt}deg` } as CSSProperties}
    >
      <p className="sr-only">{items.join(", ")}</p>
      <div
        aria-hidden
        className="display flex w-max animate-marquee text-2xl group-hover:[animation-play-state:paused] md:text-4xl"
        style={{ "--marquee-speed": `${speed}s`, animationDirection: reverse ? "reverse" : "normal" } as CSSProperties}
      >
        {row}
        {row}
      </div>
    </div>
  );
}
