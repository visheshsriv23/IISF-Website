import { z } from "zod";

/** Public form schemas. Used by the API for validation and by the forms for instant feedback. */

/** Required text with one friendly message for both "missing" and "too short". */
const text = (min: number, message: string, max = 2000) => z.string(message).trim().min(min, message).max(max);

const name = text(2, "We need at least two letters here.", 80);
const email = z.email("That email looks off. Typo?");
const year = z.enum(["1st", "2nd", "3rd", "4th", "Alumni"], "Pick your year.");

export const STAGES = ["Just an idea", "Prototype", "Early users", "Making money"] as const;
export const HELP_OPTIONS = ["Seed funding", "Mentorship", "Workspace", "Legal / IP", "Tech help", "Marketing"] as const;
export const COMMITTEE_TEAMS = ["Events", "Design", "Content", "Tech", "Outreach"] as const;

export const applicationSchema = z.object({
  founder_name: name,
  email,
  phone: z.string("Drop a valid phone number.").trim().regex(/^[+\d][\d\s-]{8,15}$/, "Drop a valid phone number."),
  branch: text(2, "Which branch are you in?", 60),
  year,
  team: z.string().trim().max(600).default(""),
  idea_title: text(3, "Give your idea a name, even a working one.", 80),
  problem: text(30, "Tell us a bit more about the problem (30+ characters)."),
  solution: text(30, "And a bit more about your solution (30+ characters)."),
  stage: z.enum(STAGES, "Where's the idea at right now?"),
  help_needed: z.array(z.enum(HELP_OPTIONS)).min(1, "Pick at least one thing we can help with."),
  deck_url: z.union([z.url("That link doesn't look right."), z.literal("")]).default(""),
  website: z.string().optional(), // honeypot, checked by the backend
});

export const contactSchema = z.object({
  name,
  email,
  message: text(10, "Say a little more than that 🙂"),
  website: z.string().optional(),
});

export const committeeSchema = z.object({
  name,
  email,
  year,
  branch: text(2, "Which branch are you in?", 60),
  team_pref: z.enum(COMMITTEE_TEAMS, "Pick a team."),
  why: text(20, "Tell us why in a couple of lines (20+ characters).", 1000),
  website: z.string().optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type CommitteeInput = z.infer<typeof committeeSchema>;

export const MAX_DECK_BYTES = 10 * 1024 * 1024;

/** Turns zod issues into { field: message } for inline form errors. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
