"use client";

import { COMMITTEE_TEAMS } from "@/shared/schemas";
import { Button } from "@/components/ui/Button";
import { ErrorBanner, SentCard } from "./FormStatus";
import { ChoiceGroup, Honeypot, Input, Select, TextArea } from "./Field";
import { useSubmit } from "./useSubmit";

export function CommitteeForm() {
  const { status, errors, message, submit } = useSubmit("/api/committee", "Committee Application");

  if (status === "sent") return <SentCard title="You're on the list!">We&apos;ll ping you when recruitment interviews open.</SentCard>;

  return (
    <form
      noValidate
      className="relative grid gap-6 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        submit(Object.fromEntries(new FormData(e.currentTarget)));
      }}
    >
      {status === "error" && <div className="md:col-span-2"><ErrorBanner message={message} /></div>}
      <Input label="Name" name="name" autoComplete="name" error={errors.name} />
      <Input label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
      <Select label="Year" name="year" options={["1st", "2nd", "3rd", "4th"]} error={errors.year} />
      <Input label="Branch" name="branch" error={errors.branch} />
      <div className="md:col-span-2">
        <ChoiceGroup label="Which team?" name="team_pref" type="radio" options={COMMITTEE_TEAMS} error={errors.team_pref} />
      </div>
      <div className="md:col-span-2">
        <TextArea label="Why do you want in?" name="why" rows={3} error={errors.why} />
      </div>
      <Honeypot />
      <Button type="submit" arrow disabled={status === "sending"} className="justify-self-start">
        {status === "sending" ? "Sending…" : "Count me in"}
      </Button>
    </form>
  );
}
