import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { WPCategory } from "@/lib/wp/types";

/** Category chips + search. Plain links and a GET form, so it works without JavaScript. */
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
      "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
      isActive ? "border-foreground bg-foreground text-background" : "bg-card hover:border-foreground/40",
    );
  return (
    <div className="flex flex-col gap-4 border-b pb-8 md:flex-row md:items-center md:justify-between">
      <nav aria-label="Blog categories">
        <ul className="flex flex-wrap gap-2">
          <li>
            <Link href="/blogs" className={chip(!active)} aria-current={!active ? "page" : undefined}>
              All
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/blogs/category/${c.slug}`}
                className={chip(active === c.slug)}
                aria-current={active === c.slug ? "page" : undefined}
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <form action="/blogs/search" method="get" role="search" className="relative w-full md:w-72">
        <label htmlFor="blog-search" className="sr-only">
          Search the blog
        </label>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input id="blog-search" name="q" type="search" defaultValue={query} placeholder="Search posts" className="pl-9" />
      </form>
    </div>
  );
}
