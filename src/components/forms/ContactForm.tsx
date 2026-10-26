"use client";

import { Button } from "@/components/ui/Button";
import { ErrorBanner, SentCard } from "./FormStatus";
import { Honeypot, Input, TextArea } from "./Field";
import { useSubmit } from "./useSubmit";

export function ContactForm() {
  const { status, errors, message, submit } = useSubmit("/api/contact", "Contact Sent");

  if (status === "sent") return <SentCard title="Message received!">We usually reply within two days. Faster if you bring chai.</SentCard>;

  return (
    <form
      noValidate
      className="relative flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        submit(Object.fromEntries(new FormData(e.currentTarget)));
      }}
    >
      {status === "error" && <ErrorBanner message={message} />}
      <Input label="Your name" name="name" autoComplete="name" required error={errors.name} />
      <Input label="Email" name="email" type="email" autoComplete="email" required error={errors.email} />
      <TextArea label="What's up?" name="message" required error={errors.message} />
      <Honeypot />
      <Button type="submit" arrow disabled={status === "sending"} className="self-start">
        {status === "sending" ? "Sending…" : "Send it"}
      </Button>
    </form>
  );
}
