import type { ReactNode } from "react";
import { ACCENT_FILL, cn } from "@/lib/utils";
import type { Accent } from "@/shared/types";
import { Doodle } from "./Doodle";

type Props = { eyebrow: string; title: ReactNode; intro?: ReactNode; color?: Accent; sticker?: ReactNode; children?: ReactNode };

/** Coloured title band used at the top of every inner page. */
export function PageHero({ eyebrow, title, intro, color = "lime", sticker, children }: Props) {
  return (
    <section className={cn("relative border-b-3 border-ink pt-36 pb-16 md:pt-44 md:pb-24", ACCENT_FILL[color])}>
      <div className="container-zine relative">
        <p className="mb-4 font-bold uppercase tracking-[0.2em] text-sm">{eyebrow}</p>
        <h1 className="display max-w-5xl text-[44px] sm:text-7xl lg:text-[96px]">{title}</h1>
        {intro && <div className="mt-6 max-w-2xl text-lg md:text-xl">{intro}</div>}
        {children}
        <Doodle name="sparkle" className="absolute top-0 right-[30%] hidden w-12 md:block" weight={3} />
        {sticker && <div className="absolute right-6 bottom-0 hidden lg:block">{sticker}</div>}
      </div>
    </section>
  );
}
