import type { CSSProperties } from "react";
import type { Testimonial } from "@/shared/types";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Founder quotes on torn notebook paper. */
export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <section className="section-pad">
      <div className="container-zine">
        <SectionHeader eyebrow="Founders say" title="Don't take our word for it" />
        <div className="grid gap-10 md:grid-cols-3">
          {items.map((t, i) => (
            <figure
              key={t.id}
              data-reveal
              data-rotate
              style={{ "--r": [-2, 1.5, -1][i % 3] } as CSSProperties}
              className="drop-shadow-[6px_6px_0_var(--color-ink)]"
            >
              <div className="ruled torn-bottom border-3 border-b-0 border-ink px-7 pt-8 pb-14">
                <blockquote className="text-lg leading-8">“{t.quote}”</blockquote>
                <figcaption className="hand mt-4 text-2xl">
                  {t.name} <span className="text-xl opacity-70">· {t.startup}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
