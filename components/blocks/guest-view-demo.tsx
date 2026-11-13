"use client";

import { useEffect, useRef, useState } from "react";
import { Check, RotateCcw, ScanFace } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Face, PhotoTile } from "@/components/mock/primitives";
import type { PhotoName } from "@/components/mock/photos";
import { cta, site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * "Try the guest view": a hands-on demo of what a guest does — pick a selfie, the sample event's
 * gallery is searched (a short scan), and only that guest's photos stay lit with a tick.
 * Draft copy by Claude — not from the content doc; reviewed by: (pending).
 *
 * Honest by design: the guests are illustrated (`Face`), the gallery is stock event photos, and the
 * note under it says so — the matches are a fixed sample, not real face recognition. Once the app
 * team supplies a real demo event, set `site.sampleGalleryUrl` and an "Open a real sample gallery"
 * button appears. Everything stays in the server HTML (all photos, the guest list); state only
 * changes which tiles are dimmed. Scan: one CSS sweep (`.demo-scan`), skipped under reduced motion.
 * As the gallery scrolls into view its photos fly in from a loose scatter and land in the grid
 * (`sd-settle`, CSS scroll-driven); without support or under reduced motion they're simply in place.
 */

const EVENT = "Riya & Arjun’s wedding";
const GALLERY: PhotoName[] = [
  "wedding-couple",
  "wedding-guests",
  "wedding-haldi",
  "wedding-henna",
  "wedding-canopy",
  "wedding-ritual",
  "wedding-attire",
  "wedding-reception",
  "wedding-guest-phone",
  "party-toast",
  "venue-banquet",
  "photographer-at-work",
];

/** Where each tile flies in from (sd-settle): a loose scatter, as if photos were dropped onto the gallery. */
const SCATTER = [
  ["-2.5rem", "2rem", "-8deg"], ["1rem", "3rem", "5deg"], ["-1rem", "2.5rem", "-4deg"],
  ["2rem", "3.5rem", "7deg"], ["-1.5rem", "3rem", "6deg"], ["2.5rem", "2rem", "-6deg"],
  ["-2rem", "4rem", "4deg"], ["1.5rem", "4.5rem", "-7deg"], ["-1rem", "3.5rem", "8deg"],
  ["2rem", "5rem", "-5deg"], ["-2.5rem", "4rem", "-3deg"], ["1rem", "5.5rem", "6deg"],
] as const;

const GUESTS = [
  { id: "meera", name: "Meera", face: 1, matches: [0, 4, 7, 9] },
  { id: "kabir", name: "Kabir", face: 2, matches: [1, 5, 10] },
  { id: "ananya", name: "Ananya", face: 4, matches: [2, 3, 6, 8, 11] },
] as const;

type Phase = "idle" | "scanning" | "found";
const SCAN_MS = 1400;

export function GuestViewDemo({ className }: { className?: string }) {
  const [guestId, setGuestId] = useState<string>("");
  const [phase, setPhase] = useState<Phase>("idle");
  const timer = useRef<number | undefined>(undefined);
  const guest = GUESTS.find((g) => g.id === guestId);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const pick = (id: string) => {
    window.clearTimeout(timer.current);
    setGuestId(id);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("found");
      return;
    }
    setPhase("scanning");
    timer.current = window.setTimeout(() => setPhase("found"), SCAN_MS);
  };

  const reset = () => {
    window.clearTimeout(timer.current);
    setGuestId("");
    setPhase("idle");
  };

  const status =
    phase === "idle" || !guest
      ? `Pick a selfie to search all ${GALLERY.length} photos.`
      : phase === "scanning"
        ? `Searching ${GALLERY.length} photos for ${guest.name}’s face…`
        : `Found ${guest.matches.length} photos of ${guest.name}. Only ${guest.name} sees these.`;

  return (
    <div data-nosnippet className={cn("grid items-start gap-6 lg:grid-cols-[minmax(0,19rem)_1fr] lg:gap-10", className)}>
      {/* Step 1: the selfie */}
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-lg font-semibold tracking-tight">You’re a guest. Pick your selfie.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            On a real event, guests scan the QR code or open the link and take a selfie.
          </p>
        </div>
        <RadioGroup
          value={guestId}
          onValueChange={pick}
          aria-label="Choose a sample guest’s selfie"
          className="grid grid-cols-3 gap-2 lg:grid-cols-1"
        >
          {GUESTS.map((g) => (
            <label
              key={g.id}
              className={cn(
                "surface flex flex-col items-center gap-2 p-3 transition-colors lg:flex-row lg:gap-3",
                g.id === guestId ? "bg-primary/5 ring-2 ring-primary" : "hover:bg-muted/60",
              )}
            >
              <RadioGroupItem value={g.id} className="sr-only lg:not-sr-only" />
              <Face seed={g.face} className="size-12 lg:size-10" />
              <span className="text-sm font-medium">{g.name}</span>
            </label>
          ))}
        </RadioGroup>

        <p aria-live="polite" className="min-h-[2.5rem] text-sm text-muted-foreground">
          {status}
        </p>

        <div className="flex flex-wrap gap-2">
          {phase === "found" ? (
            <Button asChild data-track-location="try it demo">
              <a href={cta.trial.href}>Set this up for your event</a>
            </Button>
          ) : null}
          {guestId && (
            <Button variant="outline" onClick={reset}>
              <RotateCcw data-icon="inline-start" aria-hidden="true" />
              Start over
            </Button>
          )}
        </div>
      </div>

      {/* Step 2: the event gallery */}
      <div className="surface overflow-clip">
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
          <div className="min-w-0">
            <p className="truncate font-semibold">{EVENT}</p>
            <p className="text-xs text-muted-foreground">
              {phase === "found" && guest ? `${guest.matches.length} photos of you` : `${GALLERY.length} photos · sample event`}
            </p>
          </div>
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
              phase === "found" ? "bg-after text-after-ink" : "bg-muted text-muted-foreground",
            )}
          >
            {phase === "found" ? <Check className="size-3.5" aria-hidden="true" /> : <ScanFace className="size-3.5" aria-hidden="true" />}
            {phase === "found" ? "Your photos" : phase === "scanning" ? "Searching…" : "AI face search"}
          </span>
        </div>

        <div className="relative overflow-clip p-3">
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            {GALLERY.map((photo, i) => {
              const match = phase === "found" && guest?.matches.includes(i as never);
              const dim = phase === "found" && !match;
              return (
                <li
                  key={photo}
                  className={cn("sd-settle relative transition-opacity duration-500", dim && "opacity-25")}
                  style={{ "--sx": SCATTER[i][0], "--sy": SCATTER[i][1], "--sr": SCATTER[i][2] } as React.CSSProperties}
                >
                  <PhotoTile photo={photo} sizes="(min-width: 1024px) 140px, (min-width: 640px) 22vw, 30vw" className={cn(match && "ring-2 ring-primary")} />
                  {match && (
                    <span className="animate-pop absolute right-1.5 top-1.5 grid size-6 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          {phase === "scanning" && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="demo-scan h-full w-full bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-xs text-muted-foreground">
          <p>Sample event with stock photos — on your event, AI matches each guest’s real selfie.</p>
          {site.sampleGalleryUrl && (
            <Button asChild size="sm" variant="outline" data-track-location="try it demo">
              <a href={site.sampleGalleryUrl}>Open a real sample gallery</a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
