import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Doodle } from "./Doodle";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  aside?: string;
  sticker?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

/** Big display heading with an optional handwritten aside and sticker. */
export function SectionHeader({ eyebrow, title, aside, sticker, align = "left", as: Tag = "h2", className }: Props) {
  return (
    <header className={cn("relative mb-12 md:mb-16", align === "center" && "text-center", className)}>
      {eyebrow && <p className="mb-3 font-bold uppercase tracking-[0.2em] text-sm">{eyebrow}</p>}
      <Tag className={cn("display", Tag === "h1" ? "text-[44px] sm:text-6xl lg:text-8xl" : "text-[40px] sm:text-5xl lg:text-7xl")}>{title}</Tag>
      {aside && (
        <p className={cn("hand mt-3 flex items-center gap-2 text-2xl md:text-3xl", align === "center" && "justify-center")}>
          <Doodle name="arrowStraight" className="hidden w-14 -scale-x-100 rotate-[200deg] md:block" weight={3} />
          {aside}
        </p>
      )}
      {sticker && <div className={cn("absolute -top-20 hidden xl:block", align === "center" ? "right-[10%]" : "right-0")}>{sticker}</div>}
    </header>
  );
}
