"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Frown, HardDrive, PhoneCall, Search, Usb } from "lucide-react";
import { PainIllustration } from "@/components/mock/pain-illustrations";
import { cn } from "@/lib/utils";

export type PainPoint = {
  kind: "search" | "calls" | "pendrive" | "drive" | "referrals";
  title: string;
  body: string;
};

const icons = { search: Search, calls: PhoneCall, pendrive: Usb, drive: HardDrive, referrals: Frown };

/** Scroll distance per point while the block is pinned. */
const STEP_VH = 50;

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
 * Pain points as scroll-linked tabs + one large visual (layout after Tailark's selectable
 * features block, MIT, github.com/tailark/blocks).
 *
 * - Desktop: the tabs + visual block is pinned (CSS sticky) in a taller track, and the page keeps
 *   scrolling normally — no wheel hijacking. Invisible slices in the track (one per point) cross
 *   the middle of the screen as you scroll; IntersectionObserver makes that point active.
 * - Fast scrolling loses nothing: every title and body is always visible in the tab list
 *   (inactive tabs are muted, never collapsed); only the decorative picture is skipped.
 * - Clicking a tab, or ↑/↓/Home/End, smooth-scrolls to that point's slice so scroll position and
 *   tab always agree (instant under reduced motion). While that scroll runs, the observer is
 *   ignored so the tabs don't flick through the points in between.
 * - Each title is a button inside its h3, keeping the heading outline.
 * - Mobile/tablet: swipeable cards (CSS scroll-snap), each with its own visual.
 * - Visual swaps use opacity/transform only.
 */
export function PainPoints({ points, defaultIndex = 0 }: { points: PainPoint[]; defaultIndex?: number }) {
  const [active, setActive] = useState(defaultIndex);
  const canAnimate = useSyncExternalStore(subscribeMotion, motionAllowed, motionAllowedOnServer);
  const sliceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const jumping = useRef(false);

  useEffect(() => {
    const slices = sliceRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (!slices.length) return;
    // A thin line across the middle of the viewport: whichever slice is on it is active.
    const io = new IntersectionObserver(
      (entries) => {
        if (jumping.current) return;
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-49.5% 0px -49.5% 0px" },
    );
    slices.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const select = (i: number, focus = false) => {
    setActive(i);
    if (focus) buttonRefs.current[i]?.focus({ preventScroll: true });
    const slice = sliceRefs.current[i];
    if (!slice) return;
    const r = slice.getBoundingClientRect();
    const top = window.scrollY + r.top + r.height / 2 - window.innerHeight / 2;
    if (!canAnimate) {
      window.scrollTo({ top, behavior: "auto" });
      return;
    }
    jumping.current = true;
    const done = () => {
      jumping.current = false;
      window.removeEventListener("scrollend", done);
    };
    window.addEventListener("scrollend", done);
    window.setTimeout(done, 1200); // fallback where `scrollend` isn't supported
    window.scrollTo({ top, behavior: "smooth" });
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = points.length - 1;
    const next = { ArrowDown: i === last ? 0 : i + 1, ArrowUp: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next, true);
  };

  return (
    <>
      {/* Desktop: pinned tabs + visual inside a scroll track */}
      <div
        className="relative hidden lg:block"
        style={{ height: `calc(36rem + ${points.length * STEP_VH}vh)` }}
      >
        {/* One invisible slice per point. Inset by half the pinned block, so the first and last
            points get as much scroll as the others. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-[18rem] top-[18rem] flex flex-col">
          {points.map((p, i) => (
            <div
              key={p.kind}
              data-index={i}
              ref={(el) => {
                sliceRefs.current[i] = el;
              }}
              className="flex-1"
            />
          ))}
        </div>

        <div className="sticky top-[max(5rem,calc(50vh-18rem))] grid min-h-[36rem] items-stretch gap-10 lg:grid-cols-[1fr_1.15fr] xl:gap-16">
          <ol className="flex flex-col gap-1.5">
            {points.map((p, i) => {
              const Icon = icons[p.kind];
              const isActive = i === active;
              return (
                <li
                  key={p.kind}
                  className={cn(
                    "relative rounded-xl px-4 py-3.5 motion-safe:transition-colors",
                    isActive ? "surface" : "hover:bg-card/60",
                  )}
                >
                  <div className="flex gap-3.5">
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl motion-safe:transition-colors",
                        isActive ? "bg-before text-before-ink" : "bg-muted text-muted-foreground",
                      )}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold tracking-tight">
                        <button
                          ref={(el) => {
                            buttonRefs.current[i] = el;
                          }}
                          type="button"
                          onClick={() => select(i)}
                          onKeyDown={(e) => onKeyDown(e, i)}
                          aria-current={isActive ? "true" : undefined}
                          aria-controls="pain-visual"
                          className={cn(
                            "rounded-md text-left outline-offset-4 after:absolute after:inset-0 after:rounded-xl after:content-['']",
                            !isActive && "text-muted-foreground",
                          )}
                        >
                          {p.title}
                        </button>
                      </h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div
            id="pain-visual"
            aria-hidden="true"
            className="relative min-h-[28rem] overflow-hidden rounded-3xl border bg-before/40 p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_30%,var(--before),transparent_70%)]" />
            {points.map((p, i) => (
              <div
                key={p.kind}
                className={cn(
                  "absolute inset-8 flex items-center justify-center motion-safe:transition-[opacity,transform] motion-safe:duration-500",
                  i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
                )}
              >
                <div className="w-full max-w-md">
                  <PainIllustration kind={p.kind} />
                </div>
              </div>
            ))}
            {/* Position, e.g. 2 / 5 */}
            <span className="absolute bottom-5 right-6 text-sm font-medium tabular-nums text-muted-foreground">
              {active + 1} / {points.length}
            </span>
          </div>
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
                  <div className={cn("w-full max-w-xs origin-center", p.kind === "calls" ? "scale-[0.58]" : "scale-90")}>
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
