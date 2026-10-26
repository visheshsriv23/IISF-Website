import "server-only";

/**
 * Email notification to the IISF inbox via Resend's HTTP API.
 * Optional: without RESEND_API_KEY the submission is still stored and this is a no-op.
 */
export async function notify(subject: string, text: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  if (!key || !to) return;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.NOTIFY_FROM ?? "IISF Website <onboarding@resend.dev>", to, subject, text }),
  });
  // A failed email shouldn't fail the submission, which is already saved.
  if (!res.ok) console.error("notify failed", res.status, await res.text());
}
