import { BlogHeader } from "@/components/blog/blog-header";
import { BlogNav } from "@/components/blog/blog-nav";
import { PostGrid } from "@/components/blog/post-grid";
import { getCategories, getPosts } from "@/lib/wp/api";

// Own canonical (otherwise it inherits the home page's from the root layout); never indexed.
export const metadata = {
  title: "Search the blog",
  alternates: { canonical: "/blogs/search" },
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim().slice(0, 100);
  const [list, categories] = await Promise.all([
    query ? getPosts({ search: query, first: 24 }) : Promise.resolve(null),
    getCategories().catch(() => []),
  ]);

  return (
    <>
      <BlogHeader
        breadcrumbs={[
          { name: "Blog", path: "/blogs" },
          { name: "Search", path: "/blogs/search" },
        ]}
        title={query ? <>Results for “{query}”</> : "Search the blog"}
        description={
          query ? (
            <p aria-live="polite">
              {list?.posts.length ?? 0} post{list?.posts.length === 1 ? "" : "s"} found
            </p>
          ) : (
            <p>Search every guide on sharing event photos.</p>
          )
        }
      >
        <BlogNav categories={categories} query={query} />
      </BlogHeader>
      <section data-tone="default" aria-label="Results" className="section-y pt-10 md:pt-12">
        <div className="container-page">
          {query ? (
            <PostGrid
              headingLevel="h2"
              posts={list?.posts ?? []}
              empty={{
                icon: "search",
                title: "No posts match that search",
                description: "Try a shorter or different word.",
                action: { label: "Browse all posts", href: "/blogs" },
              }}
            />
          ) : (
            <p className="text-muted-foreground">Type a word or phrase above to search all posts.</p>
          )}
        </div>
      </section>
    </>
  );
}
