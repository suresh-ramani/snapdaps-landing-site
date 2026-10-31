"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_CHANGED, readConsent, type Consent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Remove Google Analytics cookies when the visitor withdraws consent. */
function clearGaCookies() {
  const host = location.hostname.replace(/^www\./, "");
  for (const c of document.cookie.split("; ")) {
    const name = c.split("=")[0];
    if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
      for (const domain of ["", `; domain=${host}`, `; domain=.${host}`]) {
        document.cookie = `${name}=; Max-Age=0; Path=/${domain}`;
      }
    }
  }
}

/**
 * Google Analytics 4, only with consent (root layout). Nothing loads unless NEXT_PUBLIC_GA_ID is set
 * AND the visitor allowed analytics in the cookie banner. Google Consent Mode v2 starts every
 * signal at "denied" (ads signals stay denied — the site runs no ads); analytics_storage is granted
 * only from the visitor's choice. Withdrawing consent switches it back to denied and deletes the GA
 * cookies. gtag.js loads after the page is interactive, so it never delays the first paint.
 */
export function Analytics() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    // The choice lives in a browser cookie, so it's read after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGranted(Boolean(readConsent()?.analytics));
    const onChange = (e: Event) => {
      const analytics = (e as CustomEvent<Consent>).detail.analytics;
      setGranted(analytics);
      window.gtag?.("consent", "update", { analytics_storage: analytics ? "granted" : "denied" });
      if (!analytics) clearGaCookies();
    };
    window.addEventListener(CONSENT_CHANGED, onChange);
    return () => window.removeEventListener(CONSENT_CHANGED, onChange);
  }, []);

  if (!GA_ID || !granted) return null;
  return (
    <>
      <Script id="ga-consent" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)},{anonymize_ip:true});`}
      </Script>
      <Script id="ga-src" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>
  );
}
