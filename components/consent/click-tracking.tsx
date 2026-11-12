"use client";

import { useEffect } from "react";
import { captureAttribution, decorateAppLink, isAppLink, syncAttributionStorage } from "@/lib/attribution";
import { CONSENT_CHANGED } from "@/lib/consent";
import { track } from "@/lib/track";

/**
 * One document-level listener for every conversion click (root layout), so buttons and links
 * don't each need tracking code:
 * - links to the app → visit attribution added to the URL (lib/attribution.ts) + `trial_click`
 * - the WhatsApp chat link (wa.me/<number>) → `whatsapp_click`
 * - mailto: / tel: → `contact_click`
 * - anything with `data-track="<event>"` → that event (used by "Book a demo")
 * `cta_location` is the nearest `data-track-location`, else header / menu / footer, else the
 * heading of the section the click was in. `data-track-plan` / `data-track-billing` add those
 * params. Events reach GA only with analytics consent (lib/track.ts).
 */

function locationOf(el: Element) {
  const named = el.closest<HTMLElement>("[data-track-location]");
  if (named) return named.dataset.trackLocation;
  if (el.closest("[role=dialog]")) return "menu";
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  const heading = el.closest("section")?.querySelector("h1, h2");
  return heading?.textContent?.trim().slice(0, 80) || "page";
}

// innerText skips hidden copies (the header button has a short label below lg, a long one above).
const textOf = (el: HTMLElement) => (el.getAttribute("aria-label") || el.innerText || el.textContent || "").trim().slice(0, 80);

export function ClickTracking() {
  useEffect(() => {
    captureAttribution();
    window.addEventListener(CONSENT_CHANGED, syncAttributionStorage);

    // Capture phase + auxclick, so the URL is decorated before the browser follows it, also for
    // middle-click / cmd-click into a new tab.
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element) || (e.type === "auxclick" && e.button !== 1)) return;
      const tagged = e.target.closest<HTMLElement>("[data-track]");
      if (tagged && (e.type === "click" || tagged instanceof HTMLAnchorElement)) {
        track(tagged.dataset.track!, { cta_location: locationOf(tagged), link_text: textOf(tagged) });
      }

      const a = e.target.closest<HTMLAnchorElement>("a[href]");
      if (!a || tagged?.contains(a) || a.contains(tagged)) return;
      const href = a.getAttribute("href") ?? "";
      const where = { cta_location: locationOf(a) };

      if (isAppLink(a)) {
        decorateAppLink(a);
        const plan = a.closest<HTMLElement>("[data-track-plan]")?.dataset;
        track("trial_click", { ...where, link_text: textOf(a), plan: plan?.trackPlan, billing: plan?.trackBilling });
      } else if (/^https:\/\/wa\.me\/\d/.test(href)) {
        track("whatsapp_click", where);
      } else if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        track("contact_click", { ...where, method: href.startsWith("tel:") ? "phone" : "email" });
      }
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
      window.removeEventListener(CONSENT_CHANGED, syncAttributionStorage);
    };
  }, []);

  return null;
}
