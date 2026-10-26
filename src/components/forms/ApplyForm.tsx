"use client";

import { useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { applicationSchema, fieldErrors, HELP_OPTIONS, MAX_DECK_BYTES, STAGES } from "@/shared/schemas";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ErrorBanner, SentCard } from "./FormStatus";
import { ChoiceGroup, Honeypot, Input, Select, TextArea } from "./Field";
import { useSubmit } from "./useSubmit";

const STEPS = [
  { title: "You", fields: ["founder_name", "email", "phone", "branch", "year"] },
  { title: "The idea", fields: ["idea_title", "problem", "solution"] },
  { title: "Where it's at", fields: ["stage", "team"] },
  { title: "How we help", fields: ["help_needed", "deck_url"] },
] as const;

/** Reads the form the same way the API does, so client and server validate identically. */
function readForm(form: HTMLFormElement) {
  const data = new FormData(form);
  return { ...Object.fromEntries(data), help_needed: data.getAll("help_needed") };
}

export function ApplyForm() {
  const form = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const { status, errors, message, submit, setErrors } = useSubmit("/api/applications", "Application Submitted");

  function validateStep(index: number) {
    const keys = Object.fromEntries(STEPS[index].fields.map((f) => [f, true])) as Record<(typeof STEPS)[number]["fields"][number], true>;
    const result = applicationSchema.pick(keys).safeParse(readForm(form.current!));
    const deck = form.current!.elements.namedItem("deck") as HTMLInputElement | null;
    const errs: Record<string, string> = result.success ? {} : fieldErrors(result.error);
    if (index === 3 && (deck?.files?.[0]?.size ?? 0) > MAX_DECK_BYTES) errs.deck = "Keep it under 10 MB.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function go(to: number) {
    if (to > step && !validateStep(step)) return;
    setStep(to);
    gsap.from(`[data-step="${to}"]`, { x: to > step ? 40 : -40, autoAlpha: 0, duration: 0.35, ease: "power3.out" });
    form.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (status === "sent") {
    return (
      <SentCard title="Application in! 🎉">
        We&apos;ll email you within a week to set up a screening call. Meanwhile, keep building.
      </SentCard>
    );
  }

  return (
    <form
      ref={form}
      noValidate
      className="relative scroll-mt-32"
      onSubmit={(e) => {
        e.preventDefault();
        if (step < STEPS.length - 1) return go(step + 1);
        if (validateStep(step)) submit(new FormData(e.currentTarget));
      }}
    >
      <ol className="mb-10 grid grid-cols-4 gap-2" aria-label="Application progress">
        {STEPS.map((s, i) => (
          <li key={s.title} aria-current={i === step ? "step" : undefined} className="flex flex-col items-center gap-2 text-center">
            <span className={cn("display grid size-12 place-items-center rounded-full border-3 border-ink text-xl transition-colors", i < step ? "bg-lime" : i === step ? "bg-pink shadow-brutal-sm" : "bg-paper")}>
              {i < step ? "✓" : i + 1}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider sm:text-sm">{s.title}</span>
          </li>
        ))}
      </ol>

      {status === "error" && <div className="mb-6"><ErrorBanner message={message} /></div>}

      <div className="brutal bg-paper p-6 md:p-10">
        <fieldset data-step={0} hidden={step !== 0} className="grid gap-6 md:grid-cols-2">
          <legend className="display mb-6 text-3xl">Who are you?</legend>
          <Input label="Full name" name="founder_name" autoComplete="name" error={errors.founder_name} />
          <Input label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
          <Input label="Phone" name="phone" type="tel" autoComplete="tel" error={errors.phone} />
          <Input label="Branch" name="branch" placeholder="e.g. CSE" error={errors.branch} />
          <Select label="Year" name="year" options={["1st", "2nd", "3rd", "4th", "Alumni"]} error={errors.year} />
        </fieldset>

        <fieldset data-step={1} hidden={step !== 1} className="grid gap-6">
          <legend className="display mb-6 text-3xl">Tell us the idea</legend>
          <Input label="Give it a name" name="idea_title" placeholder="Working titles welcome" error={errors.idea_title} />
          <TextArea label="What problem are you solving?" name="problem" hint="Who has this problem, and how bad is it?" error={errors.problem} />
          <TextArea label="How are you solving it?" name="solution" error={errors.solution} />
        </fieldset>

        <fieldset data-step={2} hidden={step !== 2} className="grid gap-6">
          <legend className="display mb-6 text-3xl">Where is it at?</legend>
          <ChoiceGroup label="Stage" name="stage" type="radio" options={STAGES} error={errors.stage} />
          <TextArea label="Your team (optional)" name="team" rows={3} hint="Names, branches, who does what. Solo is fine." error={errors.team} />
        </fieldset>

        <fieldset data-step={3} hidden={step !== 3} className="grid gap-6">
          <legend className="display mb-6 text-3xl">How can we help?</legend>
          <ChoiceGroup label="Pick everything you need" name="help_needed" options={HELP_OPTIONS} error={errors.help_needed} />
          <Input label="Pitch deck link (optional)" name="deck_url" type="url" placeholder="https://drive.google.com/…" error={errors.deck_url} />
          <Input label="…or upload a PDF (max 10 MB)" name="deck" type="file" accept="application/pdf" error={errors.deck} className="file:mr-4 file:rounded-full file:border-2 file:border-ink file:bg-sun file:px-4 file:py-1 file:font-bold" />
        </fieldset>

        <Honeypot />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          {step > 0 ? (
            <Button type="button" variant="secondary" onClick={() => go(step - 1)}>
              <ArrowLeft aria-hidden className="size-5" strokeWidth={2.75} /> Back
            </Button>
          ) : <span />}
          <Button type="submit" arrow disabled={status === "sending"}>
            {step < STEPS.length - 1 ? "Next" : status === "sending" ? "Sending…" : "Submit application"}
          </Button>
        </div>
      </div>
    </form>
  );
}
