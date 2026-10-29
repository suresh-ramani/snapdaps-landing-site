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
 * Pain points with a scroll-driven visual (sticky scroll-spy, same approach as WorkflowSteps;
 * layout after Tailark's features blocks, MIT, github.com/tailark/blocks).
 *
 * - Desktop: the five points scroll by normally; the visual on the right stays pinned and swaps
 *   to the point crossing the middle of the screen (IntersectionObserver, no scroll listeners).
 *   A rail fills as you go (scaleY). Clicking a point scrolls it to the middle.
 * - Mobile/tablet: swipeable cards (CSS scroll-snap), each with its own visual.
 * - Every title and body is always in the HTML and visible; the visuals are decorative.
 *   Swaps use opacity/transform only; instant under reduced motion.
 */
export function PainPoints({ points, defaultIndex = 0 }: { points: PainPoint[]; defaultIndex?: number }) {
  const [active, setActive] = useState(defaultIndex);
  const canAnimate = useSyncExternalStore(subscribeMotion, motionAllowed, motionAllowedOnServer);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const items = itemRefs.current.filter((el): el is HTMLLIElement => el !== null);
    if (!items.length) return;
    // A thin band across the middle of the viewport: whichever item is in it is active.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    setActive(i);
    itemRefs.current[i]?.scrollIntoView({ behavior: canAnimate ? "smooth" : "auto", block: "center" });
  };

  return (
    <>
      {/* Desktop: scrolling list + pinned visual */}
      <div className="hidden gap-10 lg:grid lg:grid-cols-[1fr_1.15fr] xl:gap-16">
        <ol className="relative">
          {/* Progress rail */}
          <span aria-hidden="true" className="absolute bottom-[12vh] left-[19px] top-[12vh] w-0.5 rounded-full bg-border" />
          <span
            aria-hidden="true"
            className="absolute bottom-[12vh] left-[19px] top-[12vh] w-0.5 origin-top rounded-full bg-brand-gradient motion-safe:transition-transform motion-safe:duration-500"
            style={{ transform: `scaleY(${(active + 1) / points.length})` }}
          />
          {points.map((p, i) => {
            const Icon = icons[p.kind];
            const isActive = i === active;
            return (
              <li
                key={p.kind}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                data-index={i}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "relative flex gap-5 py-[12vh] motion-safe:transition-opacity motion-safe:duration-300",
                  !isActive && "opacity-45",
                )}
              >
                <span
                  className={cn(
                    "relative flex size-10 shrink-0 items-center justify-center rounded-xl ring-4 ring-panel motion-safe:transition-colors",
                    isActive ? "bg-before text-before-ink" : "bg-muted text-muted-foreground",
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="max-w-md">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    <button
                      type="button"
                      onClick={() => go(i)}
                      className="rounded-md text-left outline-offset-4 after:absolute after:inset-0 after:content-['']"
                    >
                      {p.title}
                    </button>
                  </h3>
                  <p className="mt-2 text-lg text-muted-foreground">{p.body}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="relative">
          <div
            aria-hidden="true"
            className="sticky top-[max(6rem,calc(50vh-15.5rem))] min-h-[31rem] overflow-hidden rounded-3xl border bg-before/40 p-8"
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
