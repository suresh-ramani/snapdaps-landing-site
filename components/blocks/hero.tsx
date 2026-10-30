import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookDemoButton } from "@/components/demo/book-demo";
import { FaceMatchCard, SelfieSearchCard, ShareCard } from "@/components/product/cards";
import { ProductWall } from "@/components/product/product-wall";
import { cta } from "@/content/site";
import { cn } from "@/lib/utils";

/** Default split-hero visual: selfie → matches, with the share card behind. */
export function HeroCards() {
  return (
    <div className="relative mx-auto grid w-full max-w-xl grid-cols-[1fr_1.15fr] items-start gap-4" aria-hidden="true" data-nosnippet>
      <div className="mt-10 space-y-4">
        <SelfieSearchCard />
        <ShareCard className="hidden sm:block" />
      </div>
      <FaceMatchCard />
    </div>
  );
}

/**
 * Product hero used by every page.
 * - `layout="center"`: shadcn-homepage style — centred copy, product wall below (home page).
 * - `layout="split"`: copy left, product cards right (use-case pages).
 * Heading levels follow the content doc: h1 = keyword headline, h2 = promise line.
 */
export function Hero({
  title,
  titleLabel,
  subtitle,
  body,
  hook,
  note,
  visual,
  trustLine = cta.trustLine,
  layout = "split",
  above,
}: {
  title: React.ReactNode;
  /** Plain-text headline for screen readers when `title` animates (e.g. TypingWords). */
  titleLabel?: string;
  subtitle?: React.ReactNode;
  body?: React.ReactNode;
  hook?: React.ReactNode;
  note?: React.ReactNode;
  visual?: React.ReactNode;
  trustLine?: readonly string[];
  layout?: "split" | "center";
  /** Rendered above the headline, e.g. breadcrumbs on use-case pages. */
  above?: React.ReactNode;
}) {
  const centered = layout === "center";
  const copy = (
    <div className={cn(centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl")}>
      {above && <div className={cn("mb-6", centered && "flex justify-center")}>{above}</div>}
      <h1
        aria-label={titleLabel}
        className="text-[2.4rem] font-semibold leading-[1.05] tracking-tighter sm:text-5xl lg:text-[3.6rem]"
      >
        {title}
      </h1>
      {subtitle && (
        <h2 className="mt-5 text-xl font-semibold leading-snug tracking-tight md:text-2xl">
          <span className="text-brand-gradient">{subtitle}</span>
        </h2>
      )}
      {body && (
        <div
          className={cn(
            "mt-4 text-lg leading-relaxed text-muted-foreground [&>p+p]:mt-3",
            centered ? "mx-auto max-w-2xl" : "max-w-xl",
          )}
        >
          {body}
        </div>
      )}
      {hook && <p className="mt-5 font-medium">{hook}</p>}
      <div className={cn("mt-8 flex flex-wrap items-center gap-3", centered && "justify-center")}>
        <Button asChild size="lg">
          <a href={cta.trial.href}>{cta.trial.label}</a>
        </Button>
        <BookDemoButton />
      </div>
      {trustLine.length > 0 && (
        <ul
          className={cn(
            "mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground",
            centered && "justify-center",
          )}
        >
          {trustLine.map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <Check className="size-4 text-after-ink" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      )}
      {note && <div className="mt-4 text-sm text-muted-foreground">{note}</div>}
    </div>
  );

  if (centered) {
    return (
      <section className="relative isolate overflow-hidden pt-14 md:pt-24">
        <div aria-hidden="true" className="glow-brand pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem]" />
        <div className="container-page">{copy}</div>
        <div className="container-page mt-14 md:mt-20">{visual ?? <ProductWall />}</div>
      </section>
    );
  }

  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="glow-brand pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem]" />
      <div className="container-page grid items-center gap-14 pb-20 pt-12 md:pb-24 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        {copy}
        <div className="relative">{visual ?? <HeroCards />}</div>
      </div>
    </section>
  );
}
