/**
 * Conversion events for Google Analytics 4. Browser-only.
 *
 * `track()` is a no-op until GA has loaded, which happens only when NEXT_PUBLIC_GA_ID is set and the
 * visitor allowed analytics (components/consent/analytics.tsx defines `window.gtag`). So callers
 * never check consent themselves. Never put personal data (names, emails, phone numbers, message
 * text) in an event — only what was clicked and where.
 *
 * Events (mark the first three as key events in GA4 → Admin → Events):
 * - `trial_click`    any link to the app (sign-up or a plan's pricing link) — `cta_location`, `link_text`, `plan`, `billing`
 * - `generate_lead`  demo form sent — `lead_source` (popup / contact / use-case), `event_type`, `role`
 * - `whatsapp_click` the WhatsApp chat bubble — `cta_location`
 * - `demo_open`      a "Book a demo" button or link — `cta_location`
 * - `contact_click`  mailto: / tel: links — `method`, `cta_location`
 * - `select_billing` the pricing Monthly / Yearly switch — `billing`
 * - `select_plan`    a plan row on /pricing — `plan`
 * The click events are sent by `ClickTracking` (components/consent/click-tracking.tsx) from one
 * listener; the others are called where they happen.
 */

export type TrackParams = Record<string, string | number | undefined>;

export function track(event: string, params: TrackParams = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ""));
  window.gtag("event", event, clean);
}
