import type { CSSProperties, ReactNode } from "react";
import { ACCENT_FILL, cn } from "@/lib/utils";
import type { Accent } from "@/shared/types";

type Shape = "pill" | "circle" | "star" | "burst";

const STAR = "M50 2 61 35 96 35 68 56 79 90 50 69 21 90 32 56 4 35 39 35Z";
const BURST = Array.from({ length: 24 }, (_, i) => {
  const r = i % 2 ? 40 : 49;
  const a = (i / 24) * Math.PI * 2;
  return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`;
}).join(" ");

const FILL_HEX: Record<Accent, string> = { lime: "var(--color-lime)", pink: "var(--color-pink)", sun: "var(--color-sun)", blue: "var(--color-blue)", lilac: "var(--color-lilac)" };

type Props = {
  children: ReactNode;
  color?: Accent;
  shape?: Shape;
  rotate?: number;
  /** Desktop-only drag (purely decorative, so content stays readable without it). */
  draggable?: boolean;
  /** Bounce in when scrolled into view */
  pop?: boolean;
  className?: string;
  style?: CSSProperties;
  hindi?: boolean;
};

export function Sticker({ children, color = "pink", shape = "pill", rotate = -4, draggable, pop = true, className, style, hindi }: Props) {
  const text = cn("font-bold uppercase leading-none tracking-tight", hindi && "font-hindi normal-case text-lg");
  const motion = { "data-pop": pop || undefined, "data-drag": draggable || undefined, "data-rotate": true };
  const rotation = { "--r": rotate, ...style } as CSSProperties;

  if (shape === "pill") {
    return (
      <span
        {...motion}
        style={rotation}
        className={cn("inline-block rounded-full border-3 border-ink px-4 py-2 text-sm shadow-brutal-sm", ACCENT_FILL[color], text, draggable && "cursor-grab touch-none", className)}
      >
        {children}
      </span>
    );
  }

  const size = shape === "circle" ? "size-28" : "size-32";
  return (
    <span
      {...motion}
      style={rotation}
      className={cn("relative inline-grid place-items-center text-center", size, draggable && "cursor-grab touch-none", className)}
    >
      <svg aria-hidden viewBox="-4 -4 112 112" className="absolute inset-0 size-full overflow-visible drop-shadow-[4px_4px_0_var(--color-ink)]">
        {shape === "circle" && <circle cx="50" cy="50" r="48" fill={FILL_HEX[color]} stroke="var(--color-ink)" strokeWidth="3" />}
        {shape === "star" && <path d={STAR} fill={FILL_HEX[color]} stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />}
        {shape === "burst" && <polygon points={BURST} fill={FILL_HEX[color]} stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round" />}
      </svg>
      <span className={cn("relative max-w-[70%] text-xs", color === "blue" ? "text-white" : "text-ink", text)}>{children}</span>
    </span>
  );
}
