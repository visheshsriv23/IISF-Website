import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { trackClass } from "@/lib/analytics";
import { FOOTER_NAV, SITE } from "@/lib/site";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { Sticker } from "@/components/ui/Sticker";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-3 border-ink bg-ink text-cream">
      <div className="container-zine pt-20 pb-10">
        <div className="relative">
          <p className="display text-[19vw] leading-[0.8] text-lime lg:text-[220px]" data-reveal>
            Let&apos;s build.
          </p>
          <div className="absolute -top-10 right-0 hidden md:block">
            <Sticker shape="burst" color="pink" rotate={12}>Made in Sultanpur</Sticker>
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="inline-block rounded-2xl bg-cream p-3 text-ink"><Logo /></div>
            <p className="mt-5 max-w-sm text-cream/80">
              Innovation Incubation and Startup Foundation, the official incubation centre of KNIT Sultanpur.
            </p>
            <ul className="mt-6 flex gap-3">
              {SITE.socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className={`${trackClass("Social Click")} grid size-12 place-items-center rounded-full border-3 border-cream bg-lime text-ink shadow-[4px_4px_0_var(--color-pink)] transition-transform duration-200 ease-bounce hover:-translate-y-1 hover:rotate-6`}
                  >
                    <SocialIcon name={s.name} className="size-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="mb-4 font-bold uppercase tracking-widest text-sm text-lime">Pages</h2>
            <ul className="grid grid-cols-2 gap-2">
              {FOOTER_NAV.map(({ href, label }) => (
                <li key={href}><Link href={href} className="hover:text-lime hover:underline">{label}</Link></li>
              ))}
            </ul>
          </nav>

          <address className="not-italic md:col-span-4">
            <h2 className="mb-4 font-bold uppercase tracking-widest text-sm text-lime">Find us</h2>
            <ul className="space-y-3 text-cream/90">
              <li className="flex gap-3"><MapPin aria-hidden className="mt-1 size-5 shrink-0" />{SITE.address}</li>
              <li className="flex gap-3"><Mail aria-hidden className="size-5 shrink-0" /><a href={`mailto:${SITE.email}`} className="hover:text-lime">{SITE.email}</a></li>
              <li className="flex gap-3"><Phone aria-hidden className="size-5 shrink-0" /><a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-lime">{SITE.phone}</a></li>
            </ul>
          </address>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t-2 border-cream/20 pt-6 md:flex-row md:items-center">
          <p className="hand text-2xl text-sun">made with chai &amp; chaos by the IISF student committee ☕</p>
          <p className="text-sm text-cream/60">© {SITE.name}</p>
        </div>
      </div>
    </footer>
  );
}
