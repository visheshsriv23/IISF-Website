import type { Faq } from "@/shared/types";
import { ChatFaq } from "@/components/ui/ChatFaq";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/Button";

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="section-pad border-t-3 border-ink bg-paper">
      <div className="container-zine">
        <SectionHeader align="center" eyebrow="FAQ" title="Asked in the canteen" aside="tap a question" />
        <ChatFaq faqs={faqs} />
        <p className="mt-12 text-center text-lg">
          Still confused? <TextLink href="/contact">Slide into our inbox</TextLink>
        </p>
      </div>
    </section>
  );
}
