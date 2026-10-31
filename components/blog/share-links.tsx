"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { FacebookLogo, LinkedInLogo, WhatsAppLogo } from "@/components/mock/brand-icons";
import { cn } from "@/lib/utils";

/**
 * Share a post: WhatsApp (where most of our readers share), Facebook, LinkedIn and copy-link.
 * Plain share URLs open in a new tab — no third-party scripts or trackers on the page.
 */
export function ShareLinks({ url, title, className }: { url: string; title: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const item =
    "flex size-9 items-center justify-center rounded-full bg-card ring-1 ring-border transition-colors hover:bg-muted";

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the visible URL bar still works */
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="mr-1 text-sm font-medium">Share</span>
      <a
        href={`https://wa.me/?text=${enc(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener"
        aria-label="Share on WhatsApp (opens in a new tab)"
        className={item}
      >
        <WhatsAppLogo className="size-4" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}
        target="_blank"
        rel="noopener"
        aria-label="Share on Facebook (opens in a new tab)"
        className={item}
      >
        <FacebookLogo className="size-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}
        target="_blank"
        rel="noopener"
        aria-label="Share on LinkedIn (opens in a new tab)"
        className={item}
      >
        <LinkedInLogo className="size-4" />
      </a>
      <button type="button" onClick={copy} aria-label={copied ? "Link copied" : "Copy link"} className={item}>
        {copied ? <Check className="size-4 text-after-ink" /> : <Link2 className="size-4" />}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
