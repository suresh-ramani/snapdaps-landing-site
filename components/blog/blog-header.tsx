import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { cn } from "@/lib/utils";

/**
 * Top band of every blog listing page (index, category, author, search): breadcrumbs, the H1, a
 * short description and the page's controls (category chips + search). A `default` tone band with
 * the brand glow. It carries its own bottom gap (`pb-*`): the listing below is the same tone, so the
 * site's spacing rule (globals.css) drops that band's top padding.
 */
export function BlogHeader({
  title,
  description,
  breadcrumbs,
  aside,
  meta,
  children,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: { name: string; path: string }[];
  /** Shown left of the title, e.g. an author's avatar. */
  aside?: React.ReactNode;
  /** A small line under the description, e.g. "7 posts". */
  meta?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section data-tone="default" className="relative isolate overflow-hidden pb-10 pt-12 md:pb-12 md:pt-16">
      <div aria-hidden="true" className="glow-brand pointer-events-none absolute inset-x-0 top-0 -z-10 h-[28rem]" />
      <div className="container-page">
        {breadcrumbs && (
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <div className={cn("flex max-w-3xl items-start gap-5", !aside && "block")}>
          {aside}
          <div>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight md:text-[3.4rem]">{title}</h1>
            {description && <div className="mt-4 text-lg leading-relaxed text-muted-foreground">{description}</div>}
            {meta && <p className="mt-3 text-sm text-muted-foreground">{meta}</p>}
          </div>
        </div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
