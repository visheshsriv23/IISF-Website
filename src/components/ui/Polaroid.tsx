"use client";

import { useState, type CSSProperties } from "react";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/shared/types";
import { Photo } from "./Photo";
import { SocialIcon } from "./SocialIcon";

const PINS = ["bg-pink", "bg-blue", "bg-lime", "bg-sun"];
const YEAR_LABEL: Record<TeamMember["year"], string> = { final: "Final year", third: "Third year", second: "Second year", faculty: "Faculty" };

/** Committee polaroid. Click/tap/Enter flips it. Back content stays in the DOM for screen readers. */
export function Polaroid({ member, index = 0, className }: { member: TeamMember; index?: number; className?: string }) {
  const [flipped, setFlipped] = useState(false);
  const rotate = ((index * 7) % 5) - 2;

  return (
    <div data-rotate data-reveal data-flipped={flipped} style={{ "--r": rotate } as CSSProperties} className={cn("flip relative aspect-[3/4] w-full", className)}>
      <span aria-hidden className={cn("absolute -top-2.5 left-1/2 z-20 size-6 -translate-x-1/2 rounded-full border-3 border-ink shadow-brutal-sm", PINS[index % PINS.length])} />
      <div className="flip-inner relative size-full">
        <div className="flip-face absolute inset-0 flex flex-col brutal bg-paper p-3 pb-0">
          <Photo src={member.photo_url} alt={member.name} label={member.name} tone="lilac" className="flex-1 rounded-md border-3 border-ink" sizes="(min-width: 1024px) 20vw, 50vw" />
          <p className="hand py-2 text-center text-[26px] leading-none">{member.name}</p>
        </div>

        <div className="flip-face flip-back absolute inset-0 flex flex-col brutal bg-sun p-5">
          <p className="display text-2xl">{member.role}</p>
          <p className="mt-1 text-sm font-bold uppercase tracking-wider">
            {YEAR_LABEL[member.year]}
            {member.branch && ` · ${member.branch}`}
          </p>
          {member.fun_fact && <p className="hand mt-4 text-[22px]">“{member.fun_fact}”</p>}
          <div className="mt-auto flex gap-2">
            {member.linkedin && <SocialLink href={member.linkedin} label={`${member.name} on LinkedIn`} icon="linkedin" active={flipped} />}
            {member.instagram && <SocialLink href={member.instagram} label={`${member.name} on Instagram`} icon="instagram" active={flipped} />}
          </div>
        </div>
      </div>
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={`Flip ${member.name}'s card`}
        onClick={() => setFlipped((f) => !f)}
        className="absolute top-1.5 right-1.5 z-20 grid size-9 place-items-center rounded-full border-3 border-ink bg-lime shadow-brutal-sm transition-transform hover:rotate-90"
      >
        <RotateCw aria-hidden className="size-4" strokeWidth={3} />
      </button>
    </div>
  );
}

function SocialLink({ href, label, icon, active }: { href: string; label: string; icon: "linkedin" | "instagram"; active: boolean }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} tabIndex={active ? 0 : -1} className="grid size-10 place-items-center rounded-full border-3 border-ink bg-paper">
      <SocialIcon name={icon} className="size-5" />
    </a>
  );
}
