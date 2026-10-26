import type { Metadata } from "next";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { MotionLayer } from "@/components/motion/MotionLayer";
import { Doodle } from "@/components/ui/Doodle";
import { PageHero } from "@/components/ui/PageHero";
import { Sticker } from "@/components/ui/Sticker";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply for incubation at IISF KNIT Sultanpur. Five minutes, four steps, no fancy deck required.",
};

const TIMELINE = [
  ["Day 0", "You hit submit"],
  ["Within 1 week", "Screening call"],
  ["2–3 weeks", "Pitch to the panel"],
  ["After that", "Grant + desk + mentors"],
];

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Apply for incubation"
        title="Got an idea? Don't overthink it."
        intro="Four short steps. A rough idea is fine. You can save the polished deck for pitch day."
        color="lime"
        sticker={<Sticker shape="star" color="sun" rotate={12}>No Idea Too Small</Sticker>}
      />
      <section className="section-pad container-zine grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8"><ApplyForm /></div>
        <aside className="lg:col-span-4">
          <div className="sticky top-28 brutal rotate-1 bg-sun p-7">
            <h2 className="display text-3xl">What happens next</h2>
            <ol className="mt-6 space-y-5">
              {TIMELINE.map(([when, what]) => (
                <li key={when}>
                  <p className="text-xs font-bold uppercase tracking-wider">{when}</p>
                  <p className="text-lg font-bold">{what}</p>
                </li>
              ))}
            </ol>
            <p className="hand mt-6 flex items-center gap-2 text-2xl">
              questions? <a href="/contact" className="underline">ask us</a>
              <Doodle name="sparkle" className="w-8" weight={3} />
            </p>
          </div>
        </aside>
      </section>
      <MotionLayer />
    </>
  );
}
