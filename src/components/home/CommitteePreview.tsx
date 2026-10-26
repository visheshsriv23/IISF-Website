import type { TeamMember } from "@/shared/types";
import { trackClass } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { Polaroid } from "@/components/ui/Polaroid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Sticker } from "@/components/ui/Sticker";

export function CommitteePreview({ members }: { members: TeamMember[] }) {
  return (
    <section className="section-pad border-y-3 border-ink bg-pink">
      <div className="container-zine">
        <SectionHeader
          eyebrow="The committee"
          title="The people who'll pick up your 2am call"
          aside="(mostly)"
          sticker={<Sticker shape="burst" color="sun" rotate={-8}>100% Student Run</Sticker>}
        />
        <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {members.slice(0, 6).map((m, i) => (
            <li key={m.id}><Polaroid member={m} index={i} /></li>
          ))}
        </ul>
        <div className="mt-14 flex flex-wrap gap-4">
          <Button href="/team" variant="secondary" arrow>Meet the whole crew</Button>
          <Button href="/team#join" variant="dark" className={trackClass("Committee CTA Click")}>Join the committee</Button>
        </div>
      </div>
    </section>
  );
}
