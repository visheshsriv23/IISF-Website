import { clsx, type ClassValue } from "clsx";
import type { Accent } from "@/shared/types";

export const cn = (...classes: ClassValue[]) => clsx(classes);

/** Fill + readable text colour for each accent (black on bright fills, white on blue). */
export const ACCENT_FILL: Record<Accent, string> = {
  lime: "bg-lime text-ink",
  pink: "bg-pink text-ink",
  sun: "bg-sun text-ink",
  blue: "bg-blue text-white",
  lilac: "bg-lilac text-ink",
};

export const ACCENT_HEX: Record<Accent, string> = {
  lime: "#C6F432",
  pink: "#FF4FA3",
  sun: "#FFD60A",
  blue: "#2F5BFF",
  lilac: "#C9B6FF",
};

export const SECTOR_ACCENT: Record<string, Accent> = {
  AgriTech: "lime",
  EdTech: "sun",
  HealthTech: "pink",
  FinTech: "blue",
  CleanTech: "lime",
  DeepTech: "lilac",
  Consumer: "pink",
};

export const sectorAccent = (sector: string): Accent => SECTOR_ACCENT[sector] ?? "lilac";

export const RARITY: Record<string, string> = {
  Idea: "Idea ☆",
  Prototype: "Prototype ★",
  Seed: "Seed Stage ★★",
  Revenue: "Revenue ★★★",
};

/** Splits "a | b" list entries used by founders, milestones and galleries. */
export const splitPair = (entry: string) => {
  const [a = "", b = ""] = entry.split("|").map((s) => s.trim());
  return [a, b] as const;
};

/** Deterministic tilt in degrees (-max..max) so server and client render the same rotation. */
export const tilt = (seed: number, max = 3) => Math.round(((Math.sin(seed * 9.73) + 1) / 2) * max * 2 - max);

const IST = { timeZone: "Asia/Kolkata" } as const;
export const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }) =>
  new Intl.DateTimeFormat("en-IN", { ...IST, ...opts }).format(new Date(iso));
