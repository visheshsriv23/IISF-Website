"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/** Floating pill navbar. Hides on scroll down, returns on scroll up. */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLElement>(null);

  useGSAP(() => {
    const show = gsap.quickTo(bar.current, "yPercent", { duration: 0.35, ease: "power3.out" });
    ScrollTrigger.create({
      start: 120,
      onUpdate: (self) => show(self.direction === 1 ? -160 : 0),
      onLeaveBack: () => show(0),
    });
  });

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-lime focus:p-3 focus:font-bold">
        Skip to content
      </a>
      <header ref={bar} className="fixed inset-x-0 top-3 z-50 px-3 md:top-5">
        <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border-3 border-ink bg-paper py-2 pr-2 pl-4 shadow-brutal-sm">
          <Logo />
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map(({ href, label }) => {
              const active = pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn("rounded-full border-2 px-4 py-1.5 font-bold transition-colors", active ? "border-ink bg-sun" : "border-transparent hover:border-ink")}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2">
            <Button href="/apply" arrow className="whitespace-nowrap rounded-full px-4 py-2 text-sm md:px-5">Apply Now</Button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="grid size-11 place-items-center rounded-full border-3 border-ink bg-pink lg:hidden"
            >
              {open ? <X strokeWidth={3} /> : <Menu strokeWidth={3} />}
            </button>
          </div>
        </nav>
      </header>
      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </>
  );
}
