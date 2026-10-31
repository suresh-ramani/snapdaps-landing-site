import { BlogNav } from "@/components/blog/blog-nav";
import { PostGrid } from "@/components/blog/post-grid";
import { getCategories, getPosts } from "@/lib/wp/api";

export const metadata = { title: "Search the blog", robots: { index: false, follow: true } };

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim().slice(0, 100);
  const [list, categories] = await Promise.all([
    query ? getPosts({ search: query, first: 24 }) : Promise.resolve(null),
    getCategories().catch(() => []),
  ]);

  return (
    <div className="container-page pb-[var(--section-y)] pt-14 md:pt-20">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-5xl font-bold tracking-[-0.03em]">Search</h1>
        {query && (
          <p className="mt-4 text-lg text-muted-foreground" aria-live="polite">
            {list?.posts.length ?? 0} result{list?.posts.length === 1 ? "" : "s"} for “{query}”
          </p>
        )}
      </header>
      <BlogNav categories={categories} query={query} />
      <div className="mt-12">
        {query ? (
          <PostGrid posts={list?.posts ?? []} empty={{
            icon: "search",
            title: "No posts match that search",
            description: "Try a shorter or different word.",
            action: { label: "Browse all posts", href: "/blogs" },
          }} />
        ) : (
          <p className="text-muted-foreground">Type a word or phrase above to search all posts.</p>
        )}
      </div>
    </div>
  );
}
