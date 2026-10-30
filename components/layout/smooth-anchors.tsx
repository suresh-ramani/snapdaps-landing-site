"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Smooth, hash-free in-page navigation for every `#section` link on the site.
 *
 * - Same-page links (`#main`, `#pricing`): smooth-scroll to the target (instant under reduced
 *   motion), move keyboard focus there, and leave the URL alone — no `#section` is added.
 * - Links to a section on another page (`/features#privacy`): navigate without the hash, then
 *   smooth-scroll to the section once it has rendered.
 * - Arriving with a hash (a shared or bookmarked link), or a hash added any other way: the
 *   browser jumps there, then the hash is removed from the address bar.
 *
 * Links keep their real `href`, so they still work without JavaScript, open in a new tab with
 * cmd/ctrl-click, and stay crawlable. Targets honour `scroll-padding-top` / `scroll-mt-*`.
 */

let pendingTarget: string | null = null;

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function scrollToSection(id: string) {
  const el = document.getElementById(decodeURIComponent(id));
  if (!el) return false;
  el.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
  // Move focus for keyboard and screen-reader users without a second jump.
  if (!el.matches("a[href], button, input, select, textarea, [tabindex]")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  return true;
}

const stripHash = () => {
  if (window.location.hash) {
    window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
  }
};

export function SmoothAnchors() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || !url.hash || url.hash === "#") return;
      const id = url.hash.slice(1);

      if (url.pathname === window.location.pathname) {
        if (scrollToSection(id)) e.preventDefault();
        return;
      }
      // Another page: navigate without the hash, scroll once it renders (effect below).
      e.preventDefault();
      pendingTarget = id;
      router.push(url.pathname + url.search);
    };
    // Capture phase, so this runs before next/link's own click handler (which then sees
    // defaultPrevented and does nothing).
    document.addEventListener("click", onClick, true);
    // A hash added any other way (typed into the address bar, a plain `location.hash = …`):
    // the browser has jumped to it; drop it from the URL.
    window.addEventListener("hashchange", stripHash);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", stripHash);
    };
  }, [router]);

  useEffect(() => {
    // Arrived with a hash from outside: the browser has already jumped; clean the URL. Deferred,
    // because Next's router effect runs after ours (parent after child) and rewrites the URL.
    const strip = window.setTimeout(stripHash, 0);
    if (!pendingTarget) return () => window.clearTimeout(strip);
    const id = pendingTarget;
    pendingTarget = null;
    // The new page may still be streaming; wait for the section for up to ~1s.
    let frames = 0;
    let raf = 0;
    const tryScroll = () => {
      if (scrollToSection(id) || ++frames > 60) return;
      raf = requestAnimationFrame(tryScroll);
    };
    raf = requestAnimationFrame(tryScroll);
    return () => {
      window.clearTimeout(strip);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
