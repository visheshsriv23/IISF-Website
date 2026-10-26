import type { Metadata } from "next";
import { MotionLayer } from "@/components/motion/MotionLayer";
import { StartupGrid } from "@/components/pages/StartupGrid";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Sticker } from "@/components/ui/Sticker";
import { getStartups } from "@/server/content";

export const metadata: Metadata = {
  title: "Startups",
  description: "Every startup incubated at IISF KNIT Sultanpur, from first prototypes to revenue.",
};

export default async function StartupsPage() {
  const startups = await getStartups();
  return (
    <>
      <PageHero
        eyebrow="The portfolio"
        title={<>Collect &apos;em all</>}
        intro="Every one of these started as a KNIT student with an idea and too little sleep. Tap a card to see the full story."
        color="sun"
        sticker={<Sticker shape="burst" color="pink" rotate={10}>Built at KNIT</Sticker>}
      />
      <section className="section-pad container-zine">
        <StartupGrid startups={startups} />
        <div className="mt-20 brutal bg-lime p-8 text-center md:p-12">
          <p className="display text-3xl md:text-5xl">Your card goes here.</p>
          <Button href="/apply" variant="dark" arrow className="mt-6">Apply to incubate</Button>
        </div>
      </section>
      <MotionLayer />
    </>
  );
}
