import { NextResponse, type NextRequest } from "next/server";

/**
 * Demo / contact requests → email to the Snapdaps team.
 *
 * Sends through Resend's HTTP API when RESEND_API_KEY is set (no SDK needed).
 * Without a key it logs the request and returns 200, so the form works in development.
 *
 * Env: RESEND_API_KEY, DEMO_INBOX (where requests go), DEMO_FROM (verified sender).
 */

type DemoRequest = {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  city?: string;
  message?: string;
  website?: string; // honeypot
  source?: string;
  page?: string;
};

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as DemoRequest | null;
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  // Bots fill the hidden field; pretend success so they don't retry.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const data = {
    name: clean(body.name, 100),
    email: clean(body.email, 200),
    phone: clean(body.phone, 30),
    role: clean(body.role, 50),
    city: clean(body.city, 80),
    message: clean(body.message, 2000),
    source: clean(body.source, 20),
    page: clean(body.page, 200),
  };

  if (!data.name || !data.phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ error: "Add your name, phone number and a valid email." }, { status: 422 });
  }

  const subject = `Demo request: ${data.name}${data.role ? ` (${data.role})` : ""}`;
  const rows = Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#5e6573">${k}</td><td>${esc(v)}</td></tr>`)
    .join("");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.DEMO_INBOX;
  if (!apiKey || !to) {
    console.warn("[demo] RESEND_API_KEY or DEMO_INBOX not set — request logged only:", data);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.DEMO_FROM ?? "Snapdaps website <website@snapdaps.ai>",
      to: to.split(",").map((s) => s.trim()),
      reply_to: data.email,
      subject,
      html: `<h2 style="font-family:sans-serif">${esc(subject)}</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
    }),
  });

  if (!res.ok) {
    console.error("[demo] email failed", res.status, await res.text().catch(() => ""));
    return NextResponse.json(
      { error: "Your request didn't go through. Email us at hello@snapdaps.ai instead." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, delivered: true });
}
