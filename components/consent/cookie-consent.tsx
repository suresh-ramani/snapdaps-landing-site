"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { OPEN_COOKIE_SETTINGS, readConsent, saveConsent } from "@/lib/consent";
import { cn } from "@/lib/utils";

/**
 * Cookie consent (root layout). A small card at the bottom of the screen for visitors who haven't
 * chosen yet — “Accept all” and “Reject non-essential” with equal weight (DPDP/GDPR: refusing must
 * be as easy as accepting), plus “Customise”. The settings panel is a native <dialog> (focus trap,
 * Esc, no extra library) with Necessary (always on) and Analytics. The footer “Cookie settings”
 * button reopens it any time (`openCookieSettings()`).
 *
 * Shown only after hydration when no valid choice exists, so returning visitors never see it and it
 * never shifts the layout (fixed position). Nothing optional loads until the visitor says yes — see
 * components/consent/analytics.tsx.
 */
export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const settingsTitleId = useId();

  useEffect(() => {
    const current = readConsent();
    // Reading a browser-only cookie after hydration: the banner can't be decided on the server.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!current) setShow(true);
    else setAnalytics(current.analytics);

    const open = () => {
      setAnalytics(readConsent()?.analytics ?? false);
      dialog.current?.showModal();
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, open);
  }, []);

  const decide = (choice: { analytics: boolean }) => {
    saveConsent(choice);
    setAnalytics(choice.analytics);
    setShow(false);
    if (dialog.current?.open) dialog.current.close();
  };

  return (
    <>
      {show && (
        <section
          aria-labelledby={titleId}
          className={cn(
            "fixed inset-x-3 bottom-3 z-50 rounded-2xl border bg-card p-5 text-card-foreground shadow-xl print:hidden",
            "sm:inset-x-auto sm:left-4 sm:max-w-md md:bottom-6 md:left-6",
          )}
        >
          <div className="flex items-start gap-3">
            <span aria-hidden="true" className="icon-tile size-9 shrink-0">
              <Cookie className="size-5" />
            </span>
            <div className="min-w-0">
              <h2 id={titleId} className="text-base font-semibold tracking-tight">
                Cookies on Snapdaps
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                We use essential cookies to run this site. With your permission we’d also use analytics cookies to
                see how it’s used and improve it. Read our{" "}
                <Link href="/cookie-policy" className="font-medium text-primary underline-offset-4 hover:underline">
                  cookie policy
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button size="sm" onClick={() => decide({ analytics: true })}>
              Accept all
            </Button>
            <Button size="sm" variant="outline" onClick={() => decide({ analytics: false })}>
              Reject non-essential
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="col-span-2 text-muted-foreground"
              onClick={() => dialog.current?.showModal()}
            >
              Customise
            </Button>
          </div>
        </section>
      )}

      <dialog
        ref={dialog}
        aria-labelledby={settingsTitleId}
        className="m-auto w-[min(100%-2rem,28rem)] rounded-2xl border bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-black/50"
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 id={settingsTitleId} className="text-lg font-semibold tracking-tight">
              Cookie settings
            </h2>
            <button
              type="button"
              aria-label="Close cookie settings"
              onClick={() => dialog.current?.close()}
              className="-m-1 rounded-md p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose which cookies Snapdaps can use. You can change this any time from “Cookie settings” in the footer.
          </p>

          <ul className="mt-5 divide-y rounded-xl ring-1 ring-border">
            <li className="flex items-start justify-between gap-4 p-4">
              <div>
                <p className="font-medium">Necessary</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Keep the site working — your theme, a dismissed announcement and this choice.
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                Always on
              </span>
            </li>
            <li className="flex items-start justify-between gap-4 p-4">
              <label htmlFor="consent-analytics" className="cursor-pointer">
                <span id="consent-analytics-label" className="block font-medium">
                  Analytics
                </span>
                <span id="consent-analytics-desc" className="mt-0.5 block text-sm text-muted-foreground">
                  Google Analytics: anonymous visit counts and page views, so we can improve the site.
                </span>
              </label>
              <Switch
                id="consent-analytics"
                aria-labelledby="consent-analytics-label"
                aria-describedby="consent-analytics-desc"
                checked={analytics}
                onCheckedChange={setAnalytics}
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/40"
              />
            </li>
          </ul>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => decide({ analytics: false })}>
              Reject non-essential
            </Button>
            <Button onClick={() => decide({ analytics })}>Save choices</Button>
          </div>
        </div>
      </dialog>
    </>
  );
}

