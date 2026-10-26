import type { SVGProps } from "react";

/** Hand-drawn SVG doodles. Decorative only, so hidden from screen readers. */
const DOODLES = {
  arrowCurve: { viewBox: "0 0 160 110", paths: ["M8 12 C 40 4, 120 10, 128 78", "M108 64 L 129 86 L 146 60"] },
  arrowUp: { viewBox: "0 0 100 100", paths: ["M92 90 C 66 88, 28 76, 18 14", "M5 30 L 18 11 L 34 27"] },
  arrowLoop: { viewBox: "0 0 200 120", paths: ["M6 90 C 40 100, 70 70, 60 40 C 50 10, 10 30, 40 55 C 80 85, 150 80, 180 30", "M160 30 L 182 26 L 180 50"] },
  arrowStraight: { viewBox: "0 0 160 40", paths: ["M4 22 C 50 18, 100 24, 146 20", "M130 6 L 150 20 L 128 34"] },
  underline: { viewBox: "0 0 300 24", paths: ["M4 16 C 60 6, 140 20, 200 10 S 280 8, 296 14"] },
  circle: { viewBox: "0 0 220 100", paths: ["M120 8 C 40 2, 4 30, 10 56 C 18 92, 170 100, 206 62 C 230 34, 170 4, 96 10"] },
  squiggle: { viewBox: "0 0 160 30", paths: ["M4 16 Q 18 2, 32 16 T 60 16 T 88 16 T 116 16 T 144 16"] },
  sparkle: { viewBox: "0 0 60 60", paths: ["M30 4 C 32 22, 38 28, 56 30 C 38 32, 32 38, 30 56 C 28 38, 22 32, 4 30 C 22 28, 28 22, 30 4"] },
  star: { viewBox: "0 0 60 60", paths: ["M30 4 L37 23 L56 24 L41 36 L47 56 L30 44 L13 56 L19 36 L4 24 L23 23 Z"] },
  exclaim: { viewBox: "0 0 40 80", paths: ["M18 6 C 22 24, 20 40, 21 54", "M20 68 l 1 4"] },
} as const;

export type DoodleName = keyof typeof DOODLES;

type Props = SVGProps<SVGSVGElement> & { name: DoodleName; color?: string; weight?: number; draw?: boolean };

export function Doodle({ name, color = "var(--color-ink)", weight = 4, draw = true, ...props }: Props) {
  const { viewBox, paths } = DOODLES[name];
  return (
    <svg aria-hidden viewBox={viewBox} fill="none" data-draw={draw || undefined} {...props}>
      {paths.map((d, i) => (
        // Varying stroke width per path keeps the hand-drawn wobble.
        <path key={i} d={d} stroke={color} strokeWidth={weight - i * 0.6} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}
