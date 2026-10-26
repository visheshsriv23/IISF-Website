"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Public entry for 3D. Scenes are code-split (ssr: false) and only mounted
 * once their slot scrolls near the viewport, so three.js never blocks LCP.
 */

export const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });
export const CardStage = dynamic(() => import("./CardStage"), { ssr: false });

export function WhenVisible({ children, fallback = null, className }: { children: ReactNode; fallback?: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible ? children : fallback}
    </div>
  );
}
