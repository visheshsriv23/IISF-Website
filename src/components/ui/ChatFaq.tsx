import type { Faq } from "@/shared/types";

/** FAQ as a chat thread: student asks (right), IISF replies (left). Native <details> keeps it accessible. */
export function ChatFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5">
      {faqs.map((faq) => (
        <details key={faq.id} data-reveal className="group">
          <summary className="ml-auto flex w-fit max-w-[85%] cursor-pointer list-none items-start gap-3 rounded-[22px] rounded-br-md border-3 border-ink bg-blue px-5 py-3 text-lg font-bold text-white shadow-brutal-sm [&::-webkit-details-marker]:hidden">
            <span>{faq.question}</span>
            <span aria-hidden className="mt-0.5 text-xl leading-none transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="mt-3 flex items-end gap-3">
            <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full border-3 border-ink bg-lime display text-xs">IISF</span>
            <p className="max-w-[85%] rounded-[22px] rounded-bl-md border-3 border-ink bg-paper px-5 py-3 text-lg shadow-brutal-sm">
              {faq.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
