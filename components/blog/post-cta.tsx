import { QrCode, ScanFace } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cta } from "@/content/site";

/**
 * Conversion points inside a blog post (after “The Anatomy of the Perfect Blog Post”: solution above
 * the fold + contextual CTAs), on top of the sticky sidebar card and the closing CtaBand:
 * - `PostIntroCta`: one slim line before the article text — what Snapdaps is, with “Start free trial”.
 * - `PostInlineCta`: a card the Article drops in before the post's third H2 (only when the post has
 *   one), so every post asks once mid-read without the writer adding anything.
 * Product facts only (QR or link, selfie, only their photos, no app or login).
 */
export function PostIntroCta() {
  return (
    <aside
      aria-label="About Snapdaps"
      className="mb-10 flex flex-col gap-3 rounded-xl bg-accent px-4 py-3 text-sm ring-1 ring-primary/20 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="flex items-start gap-2.5">
        <ScanFace className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
        <span>
          <span className="font-semibold">Snapdaps</span> gives every guest their own event photos — they scan a QR code,
          take a selfie, and see only the photos they’re in.
        </span>
      </p>
      <Button asChild size="sm" className="shrink-0">
        <a href={cta.trial.href}>{cta.trial.label}</a>
      </Button>
    </aside>
  );
}

export function PostInlineCta() {
  return (
    <aside aria-label="Try Snapdaps" className="not-prose surface my-10 flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
      <span aria-hidden="true" className="icon-tile size-11 shrink-0">
        <QrCode className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-lg font-semibold tracking-tight">Deliver your next event’s photos the smart way</p>
        <p className="mt-1 text-[15px] text-muted-foreground">
          Upload once. Guests open one link or QR code, take a selfie, and get only their photos — no app, no login.
        </p>
      </div>
      <Button asChild className="shrink-0">
        <a href={cta.trial.href}>{cta.trial.label}</a>
      </Button>
    </aside>
  );
}
