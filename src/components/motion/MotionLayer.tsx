"use client";

import { usePathname } from "next/navigation";
import { BOUNCE, Draggable, gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * One place for all scroll + micro interactions. Components opt in with data attributes,
 * so they can stay server components:
 *   data-reveal  slide-up + fade on scroll
 *   data-pop     sticker bounce-in
 *   data-draw    SVG path draws itself
 *   data-count   number counts up from 0
 *   data-tilt    3D tilt toward the cursor (desktop)
 *   data-drag    draggable sticker (desktop, resets on reload)
 *
 * Render it as the last child of each page, not in a layout: layouts hydrate before
 * streamed page content, and GSAP must not touch DOM that React hasn't hydrated yet.
 */
export function MotionLayer() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const all = (selector: string) => gsap.utils.toArray<HTMLElement>(selector);
      const onScroll = (trigger: Element) => ({ trigger, start: "top 88%", once: true });

      mm.add(MQ.motion, () => {
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (els) => gsap.fromTo(els, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" }),
        });

        all("[data-pop]").forEach((el) =>
          gsap.from(el, { scale: 0, rotation: -25, duration: 0.6, ease: BOUNCE, scrollTrigger: onScroll(el) }),
        );

        all("[data-draw]").forEach((el) =>
          gsap.from(el.querySelectorAll("path"), { drawSVG: 0, duration: 0.9, stagger: 0.15, ease: "power2.inOut", scrollTrigger: onScroll(el) }),
        );

        all("[data-count]").forEach((el) => {
          const counter = { value: 0 };
          const target = Number(el.dataset.count);
          gsap.to(counter, {
            value: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: onScroll(el),
            onUpdate: () => (el.textContent = Math.round(counter.value).toLocaleString("en-IN")),
          });
        });
      });

      mm.add(MQ.desktopMotion, () => {
        const cleanups = all("[data-tilt]").map((el) => {
          gsap.set(el, { transformPerspective: 800 });
          const rx = gsap.quickTo(el, "rotationX", { duration: 0.3, ease: "power2.out" });
          const ry = gsap.quickTo(el, "rotationY", { duration: 0.3, ease: "power2.out" });
          const lift = gsap.quickTo(el, "y", { duration: 0.25, ease: BOUNCE });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 12);
            rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
            lift(-4);
          };
          const leave = () => (rx(0), ry(0), lift(0));
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          return () => (el.removeEventListener("pointermove", move), el.removeEventListener("pointerleave", leave));
        });

        Draggable.create("[data-drag]", {
          inertia: true,
          bounds: "main",
          onPress() {
            gsap.to(this.target, { scale: 1.12, duration: 0.15 });
          },
          onRelease() {
            gsap.to(this.target, { scale: 1, duration: 0.3, ease: BOUNCE });
          },
        });

        return () => cleanups.forEach((fn) => fn());
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
