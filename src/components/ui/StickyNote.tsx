import type { CSSProperties, ReactNode } from "react";
import { ACCENT_FILL, cn } from "@/lib/utils";
import type { Accent } from "@/shared/types";

type Props = { color: Accent; title: string; rotate?: number; children: ReactNode; className?: string; icon?: ReactNode };

/** Square-ish rotated note with a tape strip. */
export function StickyNote({ color, title, rotate = -2, children, className, icon }: Props) {
  return (
    <article
      data-tilt
      data-rotate
      style={{ "--r": rotate } as CSSProperties}
      className={cn("relative flex flex-col brutal p-7 md:p-8", ACCENT_FILL[color], className)}
    >
      <span aria-hidden className="tape -top-4 left-1/2 -translate-x-1/2 rotate-[-3deg]" />
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="display mb-3 text-3xl md:text-4xl">{title}</h3>
      <div className="text-lg leading-snug">{children}</div>
    </article>
  );
}
