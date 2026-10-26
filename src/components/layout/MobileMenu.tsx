"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { BOUNCE, gsap, useGSAP } from "@/lib/gsap";
import { FOOTER_NAV } from "@/lib/site";
import { Sticker } from "@/components/ui/Sticker";

/** Full-screen colourful menu for phones. */
export function MobileMenu({ onClose }: { onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(root.current, { clipPath: "circle(0% at 92% 4%)", duration: 0.5, ease: "power3.out" });
      gsap.from("li", { y: 40, opacity: 0, stagger: 0.04, duration: 0.5, ease: BOUNCE, delay: 0.15 });
    },
    { scope: root },
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div ref={root} id="mobile-menu" className="fixed inset-0 z-40 overflow-y-auto bg-pink px-6 pt-28 pb-10 lg:hidden" style={{ clipPath: "circle(150% at 92% 4%)" }}>
      <ul className="flex flex-col gap-1">
        {FOOTER_NAV.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} onClick={onClose} className="display block py-1 text-5xl hover:translate-x-2 transition-transform">
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-wrap gap-3">
        <Sticker color="lime" rotate={-4} pop={false}>Built at KNIT</Sticker>
        <Sticker color="sun" rotate={3} pop={false} hindi>जुगाड़ से जीनियस तक</Sticker>
      </div>
    </div>
  );
}
