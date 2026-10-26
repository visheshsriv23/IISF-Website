"use client";

import { useRef } from "react";
import { BOUNCE, gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Doodle } from "@/components/ui/Doodle";
import { ScrapbookPhoto } from "@/components/ui/ScrapbookPhoto";
import { Sticker } from "@/components/ui/Sticker";
import { HeroScene, WhenVisible } from "@/components/three";

export function Hero({ funding }: { funding: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MQ.motion, () => {
        const split = SplitText.create("h1", { type: "words", mask: "words" });
        gsap
          .timeline({ defaults: { ease: BOUNCE } })
          .from(split.words, { yPercent: 110, rotate: 4, duration: 0.7, stagger: 0.05 })
          .fromTo(".highlight", { "--swipe": 0 }, { "--swipe": 1, duration: 0.5, ease: "power2.out" }, "-=0.2")
          .from("[data-hero-in]", { y: 24, autoAlpha: 0, duration: 0.5, stagger: 0.08 }, "-=0.3")
          .from("[data-hero-pop]", { scale: 0, rotate: -30, duration: 0.6, stagger: 0.1 }, "-=0.4")
          .from("[data-hero-photo]", { y: 60, autoAlpha: 0, duration: 0.7, stagger: 0.12 }, 0.2)
          .from(".hero-arrow path", { drawSVG: 0, duration: 0.6, ease: "power2.inOut" }, "-=0.2");
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="container-zine relative grid items-center gap-12 pt-32 pb-20 md:pt-40 lg:grid-cols-12 lg:pb-28">
      <div className="relative z-10 lg:col-span-7">
        <p data-hero-in className="mb-6 inline-flex items-center gap-2 rounded-full border-3 border-ink bg-paper px-4 py-1.5 text-sm font-bold">
          <span className="size-2.5 animate-pulse rounded-full bg-pink" /> KNIT Sultanpur&apos;s incubation centre
        </p>
        <h1 className="display text-[44px] sm:text-7xl xl:text-[100px]">
          Got an idea? We&apos;ve got <span className="highlight">{funding}</span> worth of proof.
        </h1>
        <p data-hero-in className="mt-7 max-w-xl text-lg md:text-xl">
          Seed grants, mentors who actually pick up, and a desk next to a never-empty chai kettle. Built for KNIT students, run by KNIT students.
        </p>
        <div data-hero-in className="relative mt-9 flex flex-wrap gap-4">
          <Button href="/apply" arrow>Apply to Incubate</Button>
          <Button href="/startups" variant="secondary">Meet the Startups</Button>
          <div aria-hidden className="pointer-events-none absolute top-full left-6 mt-2 hidden items-start gap-1 sm:flex">
            <Doodle name="arrowUp" draw={false} className="hero-arrow w-14" weight={3.5} />
            <span className="hand mt-8 -rotate-6 text-2xl">start here, seriously</span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-14 aspect-square w-full max-w-[560px] lg:col-span-5 lg:mt-0">
        <div data-hero-photo className="absolute top-[14%] left-[8%] w-[56%]">
          <ScrapbookPhoto caption="hackathon night 🌙" rotate={-5} tone="blue" priority />
        </div>
        <div data-hero-photo className="absolute top-[38%] right-[4%] w-[52%]">
          <ScrapbookPhoto caption="pitch day nerves" rotate={6} tone="pink" />
        </div>
        <div data-hero-photo className="absolute bottom-[2%] left-[16%] hidden w-[46%] sm:block">
          <ScrapbookPhoto caption="whiteboard wars" rotate={-2} tone="sun" />
        </div>

        <WhenVisible className="pointer-events-none absolute -inset-[12%] z-10">
          <HeroScene eventSource={root} />
        </WhenVisible>

        <div data-hero-pop className="absolute -top-4 right-[18%] z-20">
          <Sticker shape="burst" color="lime" rotate={10} draggable pop={false}>100% Student Run</Sticker>
        </div>
        <div data-hero-pop className="absolute bottom-[18%] -left-4 z-20">
          <Sticker color="sun" rotate={-8} draggable pop={false} hindi>जुगाड़ से जीनियस तक</Sticker>
        </div>
        <div data-hero-pop className="absolute -right-2 bottom-0 z-20 hidden md:block">
          <Sticker shape="star" color="pink" rotate={-6} draggable pop={false}>Pitch Ready</Sticker>
        </div>
      </div>
    </section>
  );
}
