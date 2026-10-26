import type { ReactNode } from "react";
import { ACCENT_FILL, cn } from "@/lib/utils";
import type { Accent } from "@/shared/types";

export function Tag({ children, color, className }: { children: ReactNode; color?: Accent; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border-2 border-ink px-3 py-0.5 text-xs font-bold uppercase tracking-wider", color ? ACCENT_FILL[color] : "bg-paper", className)}>
      {children}
    </span>
  );
}
