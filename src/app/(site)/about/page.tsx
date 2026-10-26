import type { Metadata } from "next";
import { MotionLayer } from "@/components/motion/MotionLayer";
import { Stats } from "@/components/home/Stats";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Polaroid } from "@/components/ui/Polaroid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Sticker } from "@/components/ui/Sticker";
import { StickyNote } from "@/components/ui/StickyNote";
import { getStats, getTeam } from "@/server/content";

export const metadata: Metadata = {
  title: "About",
  description: "IISF is the official incubation centre of KNIT Sultanpur: seed funding, mentorship and workspace for student and alumni founders.",
};

const PARTNERS = ["Startup India", "AKTU Innovation Hub", "UP Startup Policy", "KNIT Alumni Network", "AWS Activate", "Local Industry Partners"];

export default async function AboutPage() {
  const [stats, team] = await Promise.all([getStats(), getTeam()]);
  const faculty = team.filter((m) => m.year === "faculty");

  return (
    <>
      <PageHero
        eyebrow="About IISF"
        title={<>From jugaad to genius</>}
        intro={<>The <strong>Innovation Incubation and Startup Foundation</strong> is the official incubation centre of Kamla Nehru Institute of Technology, Sultanpur. We back student and alumni founders with money, mentors and a place to work.</>}
        color="pink"
        sticker={<Sticker color="sun" rotate={-6} hindi>जुगाड़ से जीनियस तक</Sticker>}
      />

      <section className="section-pad container-zine grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeader title="The story" aside="short version" />
          <div className="space-y-5 text-lg">
            <p>IISF started with a simple observation: KNIT students were building brilliant things in hostel rooms, then shelving them after placements. Ideas needed a home and someone to say &ldquo;try it&rdquo;.</p>
            <p>Today IISF runs seed grants, mentorship, a shared workspace and a calendar of hackathons, bootcamps and pitch days. A student committee runs much of the outreach, which is why this site doesn&apos;t look like a notice board.</p>
            <p className="hand text-2xl">P.S. Our numbers are real. Our chai budget is classified.</p>
          </div>
        </div>
        <div className="flex flex-col gap-8 lg:col-span-5">
          <StickyNote color="sun" title="Mission" rotate={2}>Make building a startup a normal, supported choice for every KNIT student, not just the lucky few.</StickyNote>
          <StickyNote color="blue" title="What we give" rotate={-2}>Seed grants, mentors, a desk, legal and IP help, workshops, and an honest opinion when you need one.</StickyNote>
        </div>
      </section>

      <div className="border-y-3 border-ink bg-lime"><Stats stats={stats} /></div>

      <section className="section-pad container-zine">
        <SectionHeader title="Faculty coordinators" aside="the grown-ups who sign the cheques" />
        <ul className="grid max-w-xl grid-cols-2 gap-8">
          {faculty.map((m, i) => <li key={m.id}><Polaroid member={m} index={i} /></li>)}
        </ul>
      </section>

      <section className="section-pad border-t-3 border-ink bg-paper">
        <div className="container-zine">
          <SectionHeader title="Partners & mentors" aside="placeholder logos until the official list is in" />
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {PARTNERS.map((p) => (
              <li key={p} data-reveal className="brutal-sm grid min-h-28 place-items-center bg-cream p-4 text-center display text-lg">{p}</li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/contact" arrow>Become a mentor</Button>
            <Button href="/resources" variant="secondary">Official documents</Button>
          </div>
        </div>
      </section>
      <MotionLayer />
    </>
  );
}
