"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { WhatsAppLogo } from "@/components/mock/brand-icons";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const waHref = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.message)}`;

/**
 * Bottom-right corner on every page: a WhatsApp chat bubble (opens wa.me with a prefilled message)
 * and, once the visitor is a screen and a half down, a back-to-top button.
 *
 * - Back to top is a plain `#top` link, so SmoothAnchors scrolls smoothly (instant under reduced
 *   motion), moves focus to the top of the page and keeps the hash out of the URL. Its visibility
 *   comes from an IntersectionObserver on a tall invisible sentinel — no scroll listeners. While
 *   hidden it's `inert`, so it's never a dead tab stop.
 * - Only transform/opacity animate; both are hidden in print.
 */
export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setShowTop(!entry.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div id="top-sentinel" aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-[150vh] w-px" />
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-end gap-3 print:hidden md:right-6">
        <a
          href="#top"
          aria-label="Back to top"
          inert={!showTop}
          className={cn(
            "surface flex size-11 items-center justify-center rounded-full bg-card text-foreground hover:bg-muted motion-safe:transition-[opacity,transform] motion-safe:duration-300",
            showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
          )}
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener"
          aria-label={`Chat with Snapdaps on WhatsApp, ${site.whatsapp.display} (opens in a new tab)`}
          className="group flex items-center gap-2"
        >
          <span
            aria-hidden="true"
            className="surface hidden rounded-full bg-card px-3 py-1.5 text-sm font-medium opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:transition-opacity md:block"
          >
            Chat on WhatsApp
          </span>
          <span className="flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg ring-4 ring-background/60 motion-safe:transition-transform group-hover:scale-105">
            <WhatsAppLogo mono className="size-7" />
          </span>
        </a>
      </div>
    </>
  );
}
