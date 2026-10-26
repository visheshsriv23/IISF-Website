import "server-only";
import {
  applicationSchema,
  committeeSchema,
  contactSchema,
  MAX_DECK_BYTES,
} from "@/shared/schemas";
import { HttpError, requireDb } from "./db";
import { notify } from "./notify";

/** Write side for public forms. Each function validates, stores and notifies. */

async function insert(table: string, values: Record<string, unknown>) {
  const { error } = await requireDb().from(table).insert(values);
  if (error) throw new HttpError(500, "Couldn't save that. Try again in a minute.");
}

/** Rejects bot submissions that filled the hidden honeypot field. */
function stripHoneypot<T extends { website?: string }>({ website, ...rest }: T) {
  if (website) throw new HttpError(400, "Nice try, bot.");
  return rest;
}

async function uploadDeck(file: File) {
  if (file.type !== "application/pdf") throw new HttpError(422, "Pitch decks must be PDFs.", { deck: "PDF only, please." });
  if (file.size > MAX_DECK_BYTES) throw new HttpError(422, "That deck is over 10 MB.", { deck: "Keep it under 10 MB." });
  const path = `${crypto.randomUUID()}.pdf`;
  const { error } = await requireDb().storage.from("pitch-decks").upload(path, file, { contentType: file.type });
  if (error) throw new HttpError(500, "Deck upload failed. Try a link instead?");
  return `storage:${path}`;
}

export async function submitApplication(form: FormData) {
  const raw = Object.fromEntries(form);
  const values = stripHoneypot(applicationSchema.parse({ ...raw, help_needed: form.getAll("help_needed") }));
  const deck = form.get("deck");
  if (deck instanceof File && deck.size > 0) values.deck_url = await uploadDeck(deck);

  await insert("applications", values);
  await notify(`New incubation application: ${values.idea_title}`, `${values.founder_name} <${values.email}>\nStage: ${values.stage}`);
}

export async function submitContact(input: unknown) {
  const values = stripHoneypot(contactSchema.parse(input));
  await insert("contact_messages", values);
  await notify(`New message from ${values.name}`, `${values.email}\n\n${values.message}`);
}

export async function submitCommittee(input: unknown) {
  const values = stripHoneypot(committeeSchema.parse(input));
  await insert("committee_applications", values);
  await notify(`Committee application: ${values.name}`, `${values.email} · ${values.team_pref} team`);
}
