import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { WPCategory } from "@/lib/wp/types";

/**
 * Category chips (with post counts) + search. Plain links and a GET form, so it works without
 * JavaScript. Chips scroll sideways on phones instead of wrapping into a tall block.
 */
export function BlogNav({
  categories,
  active,
  query,
}: {
  categories: WPCategory[];
  active?: string;
  query?: string;
}) {
  const chip = (isActive: boolean) =>
    cn(
      "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 transition-colors",
      isActive
        ? "bg-foreground text-background ring-foreground"
        : "bg-card text-muted-foreground ring-border hover:text-foreground",
    );
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <nav aria-label="Blog categories" className="-mx-4 overflow-x-auto px-4 py-1 [scrollbar-width:none] lg:mx-0 lg:px-0">
        {/* li shrink-0: on phones the row scrolls sideways instead of squeezing chips onto two lines. */}
        <ul className="flex gap-2">
          <li className="shrink-0">
            <Link href="/blogs" className={chip(!active && !query)} aria-current={!active && !query ? "page" : undefined}>
              All posts
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.slug} className="shrink-0">
              <Link
                href={`/blogs/category/${c.slug}`}
                className={chip(active === c.slug)}
                aria-current={active === c.slug ? "page" : undefined}
              >
                {c.name}
                {typeof c.count === "number" && (
                  <span className={cn("text-xs tabular-nums", active === c.slug ? "text-background/70" : "text-muted-foreground/70")}>
                    {c.count}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <form action="/blogs/search" method="get" role="search" className="relative w-full sm:max-w-sm lg:w-72">
        <label htmlFor="blog-search" className="sr-only">
          Search the blog
        </label>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="blog-search"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Search guides"
          className="h-10 rounded-full bg-card pl-9"
        />
      </form>
    </div>
  );
}
