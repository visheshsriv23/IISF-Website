import { PartyPopper } from "lucide-react";
import type { ReactNode } from "react";

export function SentCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="status" className="brutal bg-lime p-8 text-center md:p-12">
      <PartyPopper aria-hidden className="mx-auto mb-4 size-14" strokeWidth={2.25} />
      <h2 className="display text-4xl">{title}</h2>
      <div className="mt-3 text-lg">{children}</div>
    </div>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <p role="alert" className="rounded-[14px] border-3 border-ink bg-pink px-4 py-3 font-bold">
      {message}
    </p>
  );
}
