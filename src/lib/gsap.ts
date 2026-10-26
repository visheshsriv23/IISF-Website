"use client";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, Draggable, InertiaPlugin, SplitText);

export const BOUNCE = "back.out(1.7)";

/** Media queries reused by every animation (brief §6 + §10.3). */
export const MQ = {
  desktopMotion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  motion: "(prefers-reduced-motion: no-preference)",
};

export { gsap, ScrollTrigger, Draggable, SplitText, useGSAP };
