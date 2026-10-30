"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Shared engine for scroll-linked tabs (PainPoints, WorkflowSteps). One rule for every section
 * that changes as you scroll:
 *
 * - The tabs + panel block is pinned (CSS sticky) inside a taller track and the page scrolls
 *   normally — no wheel hijacking, no smooth-scroll library.
 * - Invisible slices in the track, one per tab, cross the middle of the screen as you scroll;
 *   IntersectionObserver makes that tab active (no scroll listeners).
 * - Clicking a tab, or ↑/↓/Home/End, smooth-scrolls to its slice so scroll position and tab
 *   always agree (instant under reduced motion). The observer is ignored during that scroll so
 *   the tabs don't flick through the ones in between.
 * - Callers keep every tab's heading and main sentence visible in the pinned list, so fast
 *   scrolling never hides the story; scroll only swaps the panel.
 */

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia(motionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const motionAllowed = () => !window.matchMedia(motionQuery).matches;
const motionAllowedOnServer = () => false;

/** Scroll distance per tab while the block is pinned. */
const STEP_VH = 50;

export function useScrollTabs(count: number, defaultIndex = 0) {
  const [active, setActive] = useState(defaultIndex);
  const canAnimate = useSyncExternalStore(subscribeMotion, motionAllowed, motionAllowedOnServer);
  const slices = useRef<(HTMLDivElement | null)[]>([]);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const jumping = useRef(false);

  useEffect(() => {
    const els = slices.current.filter((el): el is HTMLDivElement => el !== null);
    if (!els.length) return;
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
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [count]);

  const select = (i: number, focus = false) => {
    setActive(i);
    if (focus) buttons.current[i]?.focus({ preventScroll: true });
    const slice = slices.current[i];
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

  /** Props for each tab's button. */
  const tabProps = (i: number, panelId: string) => ({
    ref: (el: HTMLButtonElement | null) => {
      buttons.current[i] = el;
    },
    type: "button" as const,
    onClick: () => select(i),
    onKeyDown: (e: React.KeyboardEvent) => {
      const last = count - 1;
      const next = { ArrowDown: i === last ? 0 : i + 1, ArrowUp: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
      if (next === undefined) return;
      e.preventDefault();
      select(next, true);
    },
    "aria-current": i === active ? ("true" as const) : undefined,
    "aria-controls": panelId,
  });

  const sliceRef = (i: number) => (el: HTMLDivElement | null) => {
    slices.current[i] = el;
  };

  return { active, canAnimate, select, tabProps, sliceRef };
}

/**
 * The tall track with one invisible slice per tab and the pinned block inside. `blockRem` is the
 * pinned block's height; the slices are inset by half of it so the first and last tabs get as
 * much scroll as the others. `display` sets where the track shows (desktop by default; pass
 * `lg:hidden` for a separate phone/tablet track — each track needs its own `useScrollTabs`).
 */
export function ScrollTrack({
  count,
  sliceRef,
  blockRem = 36,
  display = "hidden lg:block",
  className,
  children,
}: {
  count: number;
  sliceRef: (i: number) => (el: HTMLDivElement | null) => void;
  blockRem?: number;
  /** Visibility classes for the whole track. */
  display?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const half = `${blockRem / 2}rem`;
  return (
    <div className={`relative ${display}`} style={{ height: `calc(${blockRem}rem + ${count * STEP_VH}vh)` }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 flex flex-col" style={{ top: half, bottom: half }}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} data-index={i} ref={sliceRef(i)} className="flex-1" />
        ))}
      </div>
      <div className={className} style={{ position: "sticky", top: `max(5rem, calc(50vh - ${half}))`, minHeight: `${blockRem}rem` }}>
        {children}
      </div>
    </div>
  );
}
