import type { Metadata } from "next";
import { MotionLayer } from "@/components/motion/MotionLayer";
import { HowToApply } from "@/components/home/HowToApply";
import { PageHero } from "@/components/ui/PageHero";
import { Sticker } from "@/components/ui/Sticker";
import { StickyNote } from "@/components/ui/StickyNote";
import { getPrograms } from "@/server/content";

export const metadata: Metadata = {
  title: "Programs & Support",
  description: "Seed grants, mentorship, workspace, legal and IP help, and workshops for KNIT founders. Who can apply and how.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();
  return (
    <>
      <PageHero
        eyebrow="Programs & support"
        title="Everything you get"
        intro="Pick what you need. Most founders use all of it. Eligibility and the how-to are on each note."
        color="lime"
        sticker={<Sticker shape="star" color="pink" rotate={8}>Seed Funded</Sticker>}
      />
      <section className="section-pad container-zine">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => (
            <div key={p.id} data-reveal>
              <StickyNote color={p.color} title={p.title} rotate={[-2, 1.5, -1, 2, -1.5][i % 5]} className="h-full">
                <p>{p.blurb}</p>
                <dl className="mt-6 space-y-4 border-t-3 border-current/30 pt-5 text-base">
                  <div><dt className="font-bold uppercase tracking-wider text-xs">Who can apply</dt><dd>{p.eligibility}</dd></div>
                  <div><dt className="font-bold uppercase tracking-wider text-xs">How to get it</dt><dd>{p.how_to}</dd></div>
                </dl>
              </StickyNote>
            </div>
          ))}
        </div>
      </section>
      <HowToApply />
      <MotionLayer />
    </>
  );
}
