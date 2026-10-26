import { Button } from "@/components/ui/Button";
import { Doodle } from "@/components/ui/Doodle";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const STEPS = [
  { title: "Submit idea", text: "Fill a 5-minute form. A rough idea is fine.", color: "bg-lime" },
  { title: "Screening", text: "We call you, ask annoying questions, and help sharpen it.", color: "bg-sun" },
  { title: "Pitch", text: "5 minutes in front of the panel. We'll prep you for it.", color: "bg-pink" },
  { title: "Get incubated", text: "Funding, desk, mentors. Now the real fun starts.", color: "bg-lilac" },
];

/** Zigzag path of numbered stickers joined by dashed doodle arrows. */
export function HowToApply() {
  return (
    <section className="section-pad border-y-3 border-ink bg-blue text-white">
      <div className="container-zine">
        <SectionHeader eyebrow="How it works" title="Four steps. Zero bureaucracy." aside="okay, very little bureaucracy" />
        <ol className="relative grid gap-12 md:grid-cols-4 md:gap-6">
          {STEPS.map((step, i) => (
            <li key={step.title} data-reveal className={cn("relative", i % 2 && "md:mt-24")}>
              <span data-pop className={cn("display grid size-20 place-items-center rounded-full border-3 border-ink text-4xl text-ink shadow-brutal", step.color)}>
                {i + 1}
              </span>
              <h3 className="display mt-5 text-3xl">{step.title}</h3>
              <p className="mt-2 max-w-[16rem] text-white/90">{step.text}</p>
              {i < STEPS.length - 1 && (
                <Doodle
                  name="arrowCurve"
                  color="white"
                  weight={3}
                  draw={false}
                  className={cn("absolute left-24 hidden w-36 [&_path:first-child]:[stroke-dasharray:8_10] md:block", i % 2 ? "-top-4 -scale-y-100" : "top-6")}
                />
              )}
            </li>
          ))}
        </ol>
        <div className="mt-16">
          <Button href="/apply" arrow>Start step 1</Button>
        </div>
      </div>
    </section>
  );
}
