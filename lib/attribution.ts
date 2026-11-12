import { readConsent } from "@/lib/consent";
import { site } from "@/content/site";

/**
 * Carries where a visitor came from (UTM tags, ad click ids, landing page, referring site) onto
 * every link to the app, so a sign-up on app.snapdaps.ai can be credited to the campaign or page
 * that brought it. Browser-only.
 *
 * The first touch of the visit is kept in memory, which survives client-side navigation between
 * pages with no storage at all. Only with analytics consent is it also kept in sessionStorage, so a
 * reload or a new tab in the same session keeps it; withdrawing consent clears it.
 *
 * Parameters the app receives (the app should store them on the new account):
 * utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid — copied as they
 * arrived; landing_page — the first page of the visit; referrer_host — the referring site's host
 * (e.g. www.google.com) when there were no UTM tags; ref_page — the page the sign-up link was
 * clicked on. A parameter already on the link is never overwritten.
 */

const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];
const STORAGE_KEY = "snapdaps-attribution";
export const APP_HOST = new URL(site.appUrl).host;

type Touch = Record<string, string>;

let firstTouch: Touch | null = null;

const allowed = () => Boolean(readConsent()?.analytics);

function stored(): Touch | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Touch) : null;
  } catch {
    return null;
  }
}

/** Keep (or drop) the first touch in sessionStorage to match the visitor's analytics choice. */
export function syncAttributionStorage() {
  try {
    if (allowed() && firstTouch) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(firstTouch));
    else if (!allowed()) sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage blocked (private mode, settings): memory still covers this page view.
  }
}

/** Record the visit's first touch. Call once on load. */
export function captureAttribution() {
  if (firstTouch) return;
  firstTouch = allowed() ? stored() : null;
  if (firstTouch) return;

  const params = new URLSearchParams(location.search);
  const touch: Touch = {};
  for (const key of CAMPAIGN_KEYS) {
    const value = params.get(key);
    if (value) touch[key] = value.slice(0, 200);
  }
  touch.landing_page = location.pathname;
  if (!touch.utm_source && document.referrer) {
    try {
      const host = new URL(document.referrer).host;
      if (host && host !== location.host) touch.referrer_host = host;
    } catch {
      // Unparseable referrer: leave it out.
    }
  }
  firstTouch = touch;
  syncAttributionStorage();
}

/** The visit's first touch, for forms that send it along (the demo request). */
export const getAttribution = (): Touch => ({ ...(firstTouch ?? {}) });

export const isAppLink = (a: HTMLAnchorElement) => {
  try {
    return new URL(a.href).host === APP_HOST;
  } catch {
    return false;
  }
};

/** Add the visit's attribution to an app link, right before it's followed. */
export function decorateAppLink(a: HTMLAnchorElement) {
  const url = new URL(a.href);
  const extra: Touch = { ...(firstTouch ?? {}), ref_page: location.pathname };
  for (const [key, value] of Object.entries(extra)) {
    if (!url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  a.href = url.toString();
}
