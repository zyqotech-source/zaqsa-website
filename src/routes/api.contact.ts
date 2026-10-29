import { createFileRoute } from "@tanstack/react-router";
import { COMPANY } from "@/lib/content";
import { contactSchema } from "@/lib/contact-schema";

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Best-effort limit per visitor. Each server instance keeps its own count, which is
// enough to stop a simple script from flooding the inbox.
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function tooMany(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 500) {
    for (const [key, times] of recent) {
      if (times.every((time) => now - time >= WINDOW_MS)) recent.delete(key);
    }
  }
  return hits.length > MAX_PER_WINDOW;
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Only our own pages may post here.
        const origin = request.headers.get("origin");
        if (origin && new URL(origin).host !== new URL(request.url).host) {
          return json({ error: "forbidden" }, 403);
        }

        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
        if (tooMany(ip)) return json({ error: "too_many_requests" }, 429);

        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return json({ error: "invalid_request" }, 400);
        }
        const parsed = contactSchema.safeParse(payload);
        if (!parsed.success) return json({ error: "invalid_request" }, 400);
        const values = parsed.data;

        const apiKey = process.env["RESEND_API_KEY"];
        if (!apiKey) {
          // Not set up yet: the page falls back to its other delivery options.
          return json({ error: "not_configured" }, 503);
        }

        const rows: Array<[string, string]> = [
          ["Name", values.name],
          ["Email", values.email],
          ["Phone", values.phone ?? ""],
          ["Company", values.company ?? ""],
          ["Need", values.need],
          ["Industry", values.industry ?? ""],
        ];
        const html = `
          <h2>New consultation request</h2>
          <table cellpadding="6" style="border-collapse:collapse">
            ${rows
              .map(
                ([label, value]) =>
                  `<tr><td><b>${label}</b></td><td>${escapeHtml(value) || "-"}</td></tr>`,
              )
              .join("")}
          </table>
          <p style="white-space:pre-wrap">${escapeHtml(values.message)}</p>`;
        const text = [
          ...rows.map(([label, value]) => `${label}: ${value}`),
          "",
          values.message,
        ].join("\n");

        let response: Response;
        try {
          response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from: process.env["CONTACT_FROM"] ?? "ZAQSA Website <onboarding@resend.dev>",
              to: [process.env["CONTACT_TO"] ?? COMPANY.email],
              reply_to: values.email,
              subject: `New consultation request: ${values.need} — ${values.name}`,
              html,
              text,
            }),
          });
        } catch (error) {
          console.error("Contact email failed", error);
          return json({ error: "delivery_failed" }, 502);
        }
        if (!response.ok) {
          console.error("Contact email rejected", response.status, await response.text());
          return json({ error: "delivery_failed" }, 502);
        }
        return json({ ok: true }, 200);
      },
    },
  },
});
