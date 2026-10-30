import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/content/site";
import { webPageLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

/**
 * Who wrote this page and when it was last updated (E-E-A-T), plus the matching WebPage schema.
 * Authored by the Snapdaps team (links to /about) until named authors exist — then swap in a
 * person and a Person schema. Update `updated` (YYYY-MM-DD) whenever the page's copy changes.
 */
export function PageByline({
  name,
  description,
  path,
  updated,
  className,
}: {
  name: string;
  description: string;
  path: string;
  updated: string;
  className?: string;
}) {
  const date = new Date(`${updated}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  return (
    <>
      <p className={cn("text-sm text-muted-foreground", className)}>
        By the{" "}
        <Link href="/about" className="font-medium text-foreground hover:text-primary">
          {site.name} team
        </Link>{" "}
        · Updated <time dateTime={updated}>{date}</time>
      </p>
      <JsonLd data={webPageLd({ name, description, path, dateModified: updated })} />
    </>
  );
}
