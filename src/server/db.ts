import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;

/**
 * Service-role Supabase client. Lives on the server only and is never sent to the browser.
 * Returns null when Supabase isn't configured, so the site can run on seed content.
 */
export function getDb(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  client = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return client;
}

export function requireDb(): SupabaseClient {
  const db = getDb();
  if (!db) throw new HttpError(503, "Database isn't connected yet. Add Supabase keys to .env.local.");
  return db;
}

export class HttpError extends Error {
  constructor(public status: number, message: string, public details?: unknown) {
    super(message);
  }
}
