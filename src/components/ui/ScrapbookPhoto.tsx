import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import type { Accent } from "@/shared/types";
import { Photo } from "./Photo";

type Props = { src?: string | null; caption: string; rotate?: number; tone?: Accent; className?: string; priority?: boolean };

/** Taped photo with a handwritten caption. */
export function ScrapbookPhoto({ src, caption, rotate = 2, tone, className, priority }: Props) {
  return (
    <figure data-rotate data-tilt style={{ "--r": rotate } as CSSProperties} className={cn("relative brutal bg-paper p-3 pb-2", className)}>
      <span aria-hidden className="tape -top-3 -left-5 rotate-[-30deg]" />
      <span aria-hidden className="tape -top-3 -right-5 rotate-[30deg]" />
      <Photo src={src} alt={caption} label={caption} tone={tone} priority={priority} className="aspect-[4/3] rounded-md border-3 border-ink" />
      <figcaption className="hand pt-2 text-center text-2xl">{caption}</figcaption>
    </figure>
  );
}
