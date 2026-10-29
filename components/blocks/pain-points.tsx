"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Frown, HardDrive, PhoneCall, Search, Usb } from "lucide-react";
import { PainIllustration } from "@/components/mock/pain-illustrations";
import { cn } from "@/lib/utils";

export type PainPoint = {
  kind: "search" | "calls" | "pendrive" | "drive" | "referrals";
  title: string;
  body: string;
};

const icons = { search: Search, calls: PhoneCall, pendrive: Usb, drive: HardDrive, referrals: Frown };

const STEP_MS = 6000;

// prefers-reduced-motion as an external store: false on the server, live on the client.
const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia(motionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const motionAllowed = () => !window.matchMedia(motionQuery).matches;
const motionAllowedOnServer = () => false;

/**
 * Pain points as a selectable list + one large visual (layout after Tailark's selectable
 * features block, MIT, github.com/tailark/blocks).
 *
 * - Desktop: auto-advances every 6s with a progress bar; hover pauses, any click/keypress
 *   stops auto-advance for good. Reduced motion: no auto-advance.
 * - Mobile/tablet: swipeable cards (CSS scroll-snap), each with its own visual.
 * - Every title and body is in the HTML; each item is a button with aria-expanded that
 *   reveals its description, and the visual is decorative.
 */
export function PainPoints({ points, defaultIndex = 0 }: { points: PainPoint[]; defaultIndex?: number }) {
  const [active, setActive] = useState(defaultIndex);
  const [stopped, setStopped] = useState(false); // user picked an item: stop auto-advance
  const [paused, setPaused] = useState(false); // hover / focus inside the list
  const canAnimate = useSyncExternalStore(subscribeMotion, motionAllowed, motionAllowedOnServer);
  const auto = canAnimate && !stopped;

  useEffect(() => {
    if (!auto || paused) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % points.length), STEP_MS);
    return () => window.clearTimeout(t);
  }, [auto, paused, active, points.length]);

  const select = (i: number) => {
    setStopped(true);
    setActive(i);
  };

  return (
    <>
      {/* Desktop: list + visual */}
      <div
        className="hidden items-stretch gap-10 lg:grid lg:grid-cols-[1fr_1.15fr] xl:gap-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <ol className="flex flex-col gap-1">
          {points.map((p, i) => {
            const Icon = icons[p.kind];
            const isActive = i === active;
            const bodyId = `pain-body-${p.kind}`;
            return (
              <li key={p.kind}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-expanded={isActive}
                  aria-controls={bodyId}
                  className={cn(
                    "relative w-full overflow-hidden rounded-xl px-4 py-4 text-left transition-colors",
                    isActive ? "surface" : "hover:bg-card/60",
                  )}
                >
                  <span className="flex items-center gap-3.5">
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                        isActive ? "bg-before text-before-ink" : "bg-muted text-muted-foreground",
                      )}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className={cn("text-lg font-semibold", !isActive && "text-muted-foreground")}>
                      {p.title}
                    </span>
                  </span>
                  <span
                    id={bodyId}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300",
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <span className="overflow-hidden">
                      <span className="block pl-[3.375rem] pt-1.5 text-muted-foreground">{p.body}</span>
                    </span>
                  </span>
                  {/* Progress bar for the auto-advance */}
                  {isActive && auto && (
                    <span aria-hidden="true" className="absolute inset-x-4 bottom-0 h-0.5 overflow-hidden rounded-full bg-border">
                      <span
                        key={active}
                        className="pain-progress block h-full origin-left bg-brand-gradient"
                        style={{
                          animationDuration: `${STEP_MS}ms`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>

        <div aria-hidden="true" className="relative min-h-[26rem] overflow-hidden rounded-3xl border bg-before/40 p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_30%,var(--before),transparent_70%)]" />
          {points.map((p, i) => (
            <div
              key={p.kind}
              className={cn(
                "absolute inset-8 flex items-center justify-center transition-all duration-500",
                i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
              )}
            >
              <div className="w-full max-w-md">
                <PainIllustration kind={p.kind} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile / tablet: swipeable cards */}
      <div className="lg:hidden">
        <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] md:-mx-8 md:scroll-px-8 md:px-8">
          {points.map((p, i) => {
            const Icon = icons[p.kind];
            return (
              <li key={p.kind} className="surface flex w-[85%] shrink-0 snap-start flex-col overflow-hidden sm:w-[60%]">
                <div aria-hidden="true" className="flex h-72 items-center justify-center overflow-hidden bg-before/40 p-5">
                  <div className={cn("w-full max-w-xs origin-center", p.kind === "calls" ? "scale-[0.62]" : "scale-90")}>
                    <PainIllustration kind={p.kind} />
                  </div>
                </div>
                <div className="p-5">
                  <span className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-before text-before-ink">
                      <Icon className="size-[18px]" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {i + 1} of {points.length}
                    </span>
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-muted-foreground">{p.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-1 text-center text-xs text-muted-foreground" aria-hidden="true">
          Swipe to see all {points.length}
        </p>
      </div>
    </>
  );
}
