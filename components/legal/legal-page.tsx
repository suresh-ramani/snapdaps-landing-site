import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { BlogHeader } from "@/components/blog/blog-header";
import { Toc } from "@/components/blog/toc";
import { JsonLd } from "@/components/json-ld";
import type { LegalDoc } from "@/content/legal/types";
import { legalNav } from "@/content/site";
import { webPageLd } from "@/lib/seo";

/** h2 headings of the document, for the table of contents (the text carries its own section numbers). */
function tocOf(html: string) {
  return [...html.matchAll(/<h2 id="([^"]+)">(.*?)<\/h2>/g)].map((m) => ({
    id: m[1],
    text: m[2].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&"),
    level: 2 as const,
  }));
}

/**
 * One legal document (privacy, terms, refund, cookies): header band with breadcrumbs, H1 and the
 * "Last updated" date, then the text in the reading column with a sticky table of contents (a
 * collapsible list on phones), and links to the other policies. The HTML is the company's own text
 * from `content/legal/*` — trusted, so it's rendered as-is.
 */
export function LegalPage({ doc, path }: { doc: LegalDoc; path: string }) {
  const toc = tocOf(doc.html);
  const date = new Date(`${doc.updated}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const others = legalNav.filter((l) => l.href !== path);

  return (
    <>
      <BlogHeader
        title={doc.title}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: doc.title, path },
        ]}
        meta={
          <>
            Last updated <time dateTime={doc.updated}>{date}</time>
          </>
        }
      />

      <div data-tone="default" className="container-page pb-20 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
          <div className="min-w-0 max-w-[var(--reading)]">
            {toc.length > 1 && (
              <details className="surface group mb-8 lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                  On this page
                  <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ul className="space-y-2 border-t px-4 py-3 text-sm">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-muted-foreground hover:text-foreground">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            )}
            <div className="prose prose-snap prose-legal dark:prose-invert" dangerouslySetInnerHTML={{ __html: doc.html }} />
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-4">
              <Toc items={toc} />
            </div>
          </aside>
        </div>

        <nav aria-label="Other policies" className="mt-16 max-w-[var(--reading)] border-t pt-8">
          <h2 className="text-lg font-semibold tracking-tight">Other policies</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {others.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="surface block px-4 py-3 text-sm font-medium transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <JsonLd data={webPageLd({ name: doc.title, description: doc.description, path, dateModified: doc.updated })} />
    </>
  );
}
