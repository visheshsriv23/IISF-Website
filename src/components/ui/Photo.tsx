import Image from "next/image";
import { Camera } from "lucide-react";
import { ACCENT_FILL, cn } from "@/lib/utils";
import type { Accent } from "@/shared/types";

type Props = {
  src?: string | null;
  alt: string;
  /** Shown on the placeholder so it's obvious what photo to shoot */
  label?: string;
  tone?: Accent;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Real photo when we have one, otherwise a clearly-marked placeholder (brief §11).
 * Parent controls aspect ratio via className.
 */
export function Photo({ src, alt, label, tone = "lilac", className, sizes = "(min-width: 768px) 33vw, 100vw", priority }: Props) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover contrast-110 saturate-110" />
      ) : (
        <div role="img" aria-label={`${alt} (photo coming soon)`} className={cn("absolute inset-0 grid place-items-center p-4 text-center", ACCENT_FILL[tone])}>
          <div className="absolute inset-0 opacity-15 [background-image:repeating-linear-gradient(45deg,currentColor_0_2px,transparent_2px_14px)]" />
          <div className="relative">
            <Camera aria-hidden className="mx-auto mb-2 size-8" strokeWidth={2.5} />
            <p className="hand text-2xl">{label ?? alt}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest opacity-70">Placeholder photo</p>
          </div>
        </div>
      )}
    </div>
  );
}
