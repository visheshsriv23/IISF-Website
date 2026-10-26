import { Building2, Coins, Lightbulb } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StickyNote } from "@/components/ui/StickyNote";
import { Sticker } from "@/components/ui/Sticker";
import { TextLink } from "@/components/ui/Button";

const NOTES = [
  { color: "sun", title: "Funding", icon: Coins, rotate: -3, text: "Seed grants so you can stop asking your parents for money." },
  { color: "pink", title: "Mentorship", icon: Lightbulb, rotate: 2, text: "Founders, alumni and faculty who'll pick up your 2am call (mostly)." },
  { color: "blue", title: "Space & Resources", icon: Building2, rotate: -1, text: "Desks, Wi-Fi, legal help, cloud credits and a whiteboard wall to argue on." },
] as const;

export function WhatIsIISF() {
  return (
    <section className="section-pad border-b-3 border-ink bg-lilac">
      <div className="container-zine">
        <SectionHeader
          eyebrow="So what is IISF?"
          title={<>Your idea&apos;s <span className="highlight">first home</span></>}
          aside="not a government office, promise"
          sticker={<Sticker shape="star" color="lime" rotate={-10}>No Idea Too Small</Sticker>}
        />
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {NOTES.map(({ icon: Icon, text, ...note }) => (
            <div key={note.title} data-reveal>
              <StickyNote {...note} className="min-h-72 h-full" icon={<Icon aria-hidden className="size-10" strokeWidth={2.5} />}>
                {text}
              </StickyNote>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-lg">
          <TextLink href="/programs">See everything we offer →</TextLink>
        </p>
      </div>
    </section>
  );
}
