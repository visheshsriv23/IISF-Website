import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { FaqSection } from "@/components/home/FaqSection";
import { MotionLayer } from "@/components/motion/MotionLayer";
import { PageHero } from "@/components/ui/PageHero";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { SITE } from "@/lib/site";
import { getFaqs } from "@/server/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Find the IISF incubation centre at KNIT Sultanpur, or drop us a message.",
};

export default async function ContactPage() {
  const faqs = await getFaqs();
  const details = [
    { icon: MapPin, label: "Visit", value: SITE.address },
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Phone, label: "Call", value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
  ];

  return (
    <>
      <PageHero eyebrow="Contact" title="Slide into our inbox" intro="Mentors, investors, confused first-years: all welcome." color="sun" />
      <section className="section-pad container-zine grid gap-12 lg:grid-cols-2">
        <div className="brutal bg-paper p-6 md:p-10"><ContactForm /></div>
        <div className="flex flex-col gap-6">
          <ul className="grid gap-4">
            {details.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="brutal-sm flex gap-4 bg-paper p-5">
                <Icon aria-hidden className="mt-1 size-6 shrink-0" strokeWidth={2.5} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">{label}</p>
                  {href ? <a href={href} className="text-lg font-medium underline-offset-4 hover:underline">{value}</a> : <p className="text-lg">{value}</p>}
                </div>
              </li>
            ))}
          </ul>
          <ul className="flex gap-3">
            {SITE.socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid size-12 place-items-center rounded-full border-3 border-ink bg-pink shadow-brutal-sm transition-transform hover:-rotate-6">
                  <SocialIcon name={s.name} className="size-6" />
                </a>
              </li>
            ))}
          </ul>
          <iframe title="Map to KNIT Sultanpur" src={SITE.mapEmbed} loading="lazy" className="brutal aspect-video w-full bg-paper" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
      <FaqSection faqs={faqs} />
      <MotionLayer />
    </>
  );
}
