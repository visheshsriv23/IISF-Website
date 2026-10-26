/**
 * Fills an empty Supabase project with the placeholder seed content.
 *   npm run db:seed            insert into empty tables only
 *   npm run db:seed -- --reset wipe content tables first
 */
import { createClient } from "@supabase/supabase-js";
import { seed } from "../src/server/data/seed";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local first.");

const db = createClient(url, key, { auth: { persistSession: false } });
const reset = process.argv.includes("--reset");

for (const [table, rows] of Object.entries(seed)) {
  if (reset) await db.from(table).delete().not("id", "is", null);
  const { count } = await db.from(table).select("*", { count: "exact", head: true });
  if (count) {
    console.log(`skip ${table} (${count} rows already)`);
    continue;
  }
  // Seed ids are fake ("su-1"); let Postgres generate real UUIDs.
  const { error } = await db.from(table).insert(rows.map(({ id, ...row }) => (void id, row)));
  console.log(error ? `✗ ${table}: ${error.message}` : `✓ ${table} (${rows.length})`);
}
