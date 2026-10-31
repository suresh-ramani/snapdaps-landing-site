/**
 * Cookie consent: the visitor's choice, kept in a first-party cookie so it survives reloads and is
 * readable on any page. Browser-only helpers (no server imports) — used by the banner, the footer
 * "Cookie settings" button and the analytics loader.
 *
 * Categories: `necessary` is always on (site needs it: theme, dismissed announcement, this cookie);
 * `analytics` (Google Analytics) only after an explicit yes. Bump CONSENT_VERSION when categories or
 * vendors change so everyone is asked again.
 */

export const CONSENT_COOKIE = "snapdaps-consent";
export const CONSENT_VERSION = 1;
/** ~6 months, then ask again. */
const MAX_AGE = 60 * 60 * 24 * 182;

/** Fired on window when the choice changes (detail = Consent) and to open the settings panel. */
export const CONSENT_CHANGED = "snapdaps:consent-changed";
export const OPEN_COOKIE_SETTINGS = "snapdaps:cookie-settings";

export type Consent = { analytics: boolean; version: number; at: string };

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  if (!raw) return null;
  try {
    const c = JSON.parse(decodeURIComponent(raw)) as Consent;
    return c.version === CONSENT_VERSION ? c : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: { analytics: boolean }) {
  const consent: Consent = { analytics: choice.analytics, version: CONSENT_VERSION, at: new Date().toISOString() };
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_CHANGED, { detail: consent }));
  return consent;
}

export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS));
