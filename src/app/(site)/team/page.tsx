import type { Metadata } from "next";
import { CommitteeForm } from "@/components/forms/CommitteeForm";
import { MotionLayer } from "@/components/motion/MotionLayer";
import { PageHero } from "@/components/ui/PageHero";
import { Polaroid } from "@/components/ui/Polaroid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Sticker } from "@/components/ui/Sticker";
import { getTeam } from "@/server/content";
import type { TeamYear } from "@/shared/types";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the IISF KNIT student committee and faculty coordinators, and find out how to join.",
};

const GROUPS: { year: TeamYear; tag: string; label: string }[] = [
  { year: "faculty", tag: "Faculty", label: "The Coordinators" },
  { year: "final", tag: "Final Year", label: "The Seniors" },
  { year: "third", tag: "Third Year", label: "The Builders" },
  { year: "second", tag: "Second Year", label: "The Fresh Blood" },
];

const RECRUITMENT = [
  ["July", "Applications open"],
  ["August", "Quick chat + task round"],
  ["September", "Welcome to the chaos"],
];

export default async function TeamPage() {
  const team = await getTeam();
  return (
    <>
      <PageHero
        eyebrow="The committee"
        title="The people who'll pick up your 2am call"
        intro="(mostly). Tap the arrow on any polaroid to see who does what."
        color="pink"
        sticker={<Sticker shape="burst" color="lime" rotate={-10}>100% Student Run</Sticker>}
      />

      <section className="section-pad container-zine flex flex-col gap-24">
        {GROUPS.map(({ year, tag, label }) => {
          const members = team.filter((m) => m.year === year);
          if (!members.length) return null;
          return (
            <div key={year}>
              <h2 className="mb-12 inline-flex -rotate-2 items-center gap-3 rounded-r-full border-3 border-ink bg-sun py-2 pr-6 pl-4 shadow-brutal-sm">
                <span aria-hidden className="size-4 rounded-full border-3 border-ink bg-cream" />
                <span className="font-bold uppercase tracking-wider">{tag}</span>
                <span className="hand text-2xl">— {label}</span>
              </h2>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
                {members.map((m, i) => <li key={m.id}><Polaroid member={m} index={i} /></li>)}
              </ul>
            </div>
          );
        })}
      </section>

      <section id="join" className="section-pad scroll-mt-24 border-t-3 border-ink bg-lime">
        <div className="container-zine grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader title="Join the committee" aside="no experience needed, just energy" />
            <ol className="space-y-4">
              {RECRUITMENT.map(([when, what], i) => (
                <li key={when} className="flex items-center gap-4">
                  <span className="display grid size-12 shrink-0 place-items-center rounded-full border-3 border-ink bg-paper">{i + 1}</span>
                  <p><strong className="uppercase">{when}</strong> · {what}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="brutal bg-paper p-6 md:p-10 lg:col-span-7">
            <CommitteeForm />
          </div>
        </div>
      </section>
      <MotionLayer />
    </>
  );
}
