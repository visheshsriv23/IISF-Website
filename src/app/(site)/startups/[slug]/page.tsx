import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { MotionLayer } from "@/components/motion/MotionLayer";
import { CardStage, WhenVisible } from "@/components/three";
import { Button, TextLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { StickyNote } from "@/components/ui/StickyNote";
import { Tag } from "@/components/ui/Tag";
import { TradingCard } from "@/components/ui/TradingCard";
import { RARITY, sectorAccent, splitPair } from "@/lib/utils";
import { getStartup, getStartups } from "@/server/content";

export async function generateStaticParams() {
  const startups = await getStartups();
  return startups.length ? startups.map((s) => ({ slug: s.slug })) : [{ slug: "__none__" }];
}

export async function generateMetadata({ params }: PageProps<"/startups/[slug]">): Promise<Metadata> {
  const startup = await getStartup((await params).slug);
  return startup ? { title: startup.name, description: startup.tagline } : {};
}

export default async function StartupPage({ params }: PageProps<"/startups/[slug]">) {
  const startup = await getStartup((await params).slug);
  if (!startup) notFound();

  const accent = sectorAccent(startup.sector);
  const links = [
    { href: startup.website, label: "Website" },
    { href: startup.instagram, label: "Instagram", icon: "instagram" as const },
    { href: startup.linkedin, label: "LinkedIn", icon: "linkedin" as const },
  ].filter((l) => l.href);

  return (
    <>
      <section className="container-zine grid items-center gap-12 pt-32 pb-16 md:pt-40 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <TextLink href="/startups" className="mb-8"><ArrowLeft aria-hidden className="size-4" /> All startups</TextLink>
          <div className="mt-6 flex flex-wrap gap-2">
            <Tag color={accent}>{startup.sector}</Tag>
            <Tag>{RARITY[startup.stage]}</Tag>
            <Tag>Since {startup.founded}</Tag>
          </div>
          <h1 className="display mt-5 text-[44px] sm:text-7xl lg:text-[96px]">{startup.name}</h1>
          <p className="mt-5 max-w-xl text-xl md:text-2xl">{startup.tagline}</p>
          <dl className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            {[["Funding", startup.funding || "—"], ["Team", `${startup.team_size} people`], ["Stage", startup.stage]].map(([k, v]) => (
              <div key={k} className="brutal-sm bg-paper p-4">
                <dt className="text-xs font-bold uppercase tracking-wider opacity-70">{k}</dt>
                <dd className="display mt-1 text-2xl">{v}</dd>
              </div>
            ))}
          </dl>
          {links.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-3">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href!} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-3 border-ink bg-paper px-4 py-2 font-bold hover:bg-sun">
                    {l.icon ? <SocialIcon name={l.icon} className="size-5" /> : <ExternalLink aria-hidden className="size-5" />} {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative mx-auto aspect-[5/6] w-full max-w-md lg:col-span-5">
          <WhenVisible className="size-full" fallback={<TradingCard startup={startup} className="mx-auto w-3/5" />}>
            <CardStage startup={startup} />
          </WhenVisible>
          <p aria-hidden className="hand absolute right-4 bottom-2 text-2xl">drag to spin ↻</p>
        </div>
      </section>

      <section className="section-pad border-y-3 border-ink bg-lilac">
        <div className="container-zine grid gap-10 md:grid-cols-2">
          <div data-reveal><StickyNote color="pink" title="The problem" rotate={-2}>{startup.problem}</StickyNote></div>
          <div data-reveal><StickyNote color="sun" title="The fix" rotate={2}>{startup.solution}</StickyNote></div>
        </div>
      </section>

      <section className="section-pad container-zine grid gap-16 lg:grid-cols-2">
        <div>
          <h2 className="display mb-8 text-4xl md:text-5xl">Founders</h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {startup.founders.map((f, i) => {
              const [name, role] = splitPair(f);
              return (
                <li key={f} data-reveal className="brutal bg-paper p-3">
                  <Photo alt={name} label={name.split(" ")[0]} tone={i % 2 ? "blue" : "lime"} className="aspect-square rounded-md border-3 border-ink" />
                  <p className="hand mt-2 text-2xl">{name}</p>
                  <p className="text-sm font-bold uppercase">{role}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h2 className="display mb-8 text-4xl md:text-5xl">Milestones</h2>
          <ol className="relative ml-4 border-l-3 border-dashed border-ink">
            {startup.milestones.map((m) => {
              const [when, what] = splitPair(m);
              return (
                <li key={m} data-reveal className="relative mb-8 pl-8">
                  <span aria-hidden className="absolute top-1 -left-[13px] size-6 rounded-full border-3 border-ink bg-lime" />
                  <p className="font-bold uppercase tracking-wider text-sm">{when}</p>
                  <p className="text-xl">{what}</p>
                </li>
              );
            })}
          </ol>
          <Button href="/apply" arrow className="mt-4">Start your own story</Button>
        </div>
      </section>
      <MotionLayer />
    </>
  );
}
