import { CommitteePreview } from "@/components/home/CommitteePreview";
import { EventsScrapbook } from "@/components/home/EventsScrapbook";
import { FaqSection } from "@/components/home/FaqSection";
import { FeaturedStartups } from "@/components/home/FeaturedStartups";
import { Hero } from "@/components/home/Hero";
import { HowToApply } from "@/components/home/HowToApply";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { WhatIsIISF } from "@/components/home/WhatIsIISF";
import { MotionLayer } from "@/components/motion/MotionLayer";
import { Marquee } from "@/components/ui/Marquee";
import { getEventsByStatus, getFaqs, getFeaturedStartups, getMarquee, getStats, getTeam, getTestimonials } from "@/server/content";

export default async function HomePage() {
  const [stats, marquee, startups, events, team, testimonials, faqs] = await Promise.all([
    getStats(),
    getMarquee(),
    getFeaturedStartups(),
    getEventsByStatus(),
    getTeam(),
    getTestimonials(),
    getFaqs(),
  ]);
  const funding = stats.find((s) => s.prefix === "₹");

  return (
    <>
      <Hero funding={funding ? `₹${funding.value} lakh` : "real"} />
      <div className="relative z-10">
        <Marquee items={marquee} />
        <Marquee items={["Pitch ready", "Seed funded", "Bootstrapped", "Made in Sultanpur", "No idea too small"]} reverse tilt={-1.5} className="-mt-3 bg-lime text-ink" speed={40} />
      </div>
      <WhatIsIISF />
      <Stats stats={stats} />
      <FeaturedStartups startups={startups} />
      <HowToApply />
      <EventsScrapbook upcoming={events.upcoming} past={events.past} />
      <CommitteePreview members={team.filter((m) => m.year !== "faculty")} />
      <Testimonials items={testimonials} />
      <FaqSection faqs={faqs} />
      <MotionLayer />
    </>
  );
}
