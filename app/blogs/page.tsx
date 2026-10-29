import { BlogNav } from "@/components/blog/blog-nav";
import { Pagination } from "@/components/blog/pagination";
import { PostCard } from "@/components/blog/post-card";
import { PostGrid } from "@/components/blog/post-grid";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { getCategories, getPosts } from "@/lib/wp/api";

type Props = { searchParams: Promise<{ after?: string; before?: string }> };

export async function generateMetadata({ searchParams }: Props) {
  const { after, before } = await searchParams;
  const paged = Boolean(after || before);
  return buildMetadata({
    title: paged ? "Blog (older posts)" : "Blog",
    description: `Guides, product updates and ideas from the ${site.name} team.`,
    path: "/blogs",
    // Paginated pages stay crawlable (follow) but don't compete with page one in results.
    noindex: paged,
  });
}

export default async function BlogIndexPage({ searchParams }: Props) {
  const { after, before } = await searchParams;
  const [list, categories] = await Promise.all([
    getPosts({ after, before }).catch(() => null),
    getCategories().catch(() => []),
  ]);

  const firstPage = !after && !before;
  const posts = list?.posts ?? [];
  const [featured, ...rest] = firstPage ? posts : [undefined, ...posts];

  return (
    <div className="container-page pb-[var(--section-y)] pt-14 md:pt-20">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-5xl font-bold tracking-[-0.03em] md:text-6xl">Blog</h1>
        <p className="mt-5 text-xl text-muted-foreground">
          Guides, product updates and ideas from the {site.name} team.
        </p>
      </header>

      <BlogNav categories={categories} />

      {!list ? (
        <p className="mt-12 rounded-xl border border-dashed p-10 text-muted-foreground">
          Posts couldn&apos;t load right now. Refresh the page in a minute.
        </p>
      ) : (
        <>
          {featured && (
            <div className="mt-12 border-b pb-14">
              <PostCard post={featured} featured priority />
            </div>
          )}
          <div className="mt-14">
            <PostGrid posts={rest.filter(Boolean) as typeof posts} emptyText="No posts yet. Check back soon." />
          </div>
          <Pagination basePath="/blogs" pageInfo={list.pageInfo} />
        </>
      )}
    </div>
  );
}
