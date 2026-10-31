import { BlogHeader } from "@/components/blog/blog-header";
import { BlogNav } from "@/components/blog/blog-nav";
import { Pagination } from "@/components/blog/pagination";
import { PostCard } from "@/components/blog/post-card";
import { PostGrid } from "@/components/blog/post-grid";
import { CtaBand } from "@/components/blocks/cta-band";
import { site } from "@/content/site";
import { JsonLd } from "@/components/json-ld";
import { blogLd, buildMetadata, pagedPath } from "@/lib/seo";
import { getCategories, getPosts } from "@/lib/wp/api";

type Props = { searchParams: Promise<{ after?: string; before?: string }> };

export async function generateMetadata({ searchParams }: Props) {
  const { after, before } = await searchParams;
  const paged = Boolean(after || before);
  return buildMetadata({
    title: paged ? "Blog (older posts)" : "Blog: guides to sharing event photos",
    description: `Guides on sharing event photos with every guest — QR codes, AI face search, wedding and event photo delivery — from the ${site.name} team.`,
    path: pagedPath("/blogs", { after, before }),
    // Paginated pages: self canonical, noindex/follow (see pagedPath).
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
    <>
      <BlogHeader
        title="The Snapdaps blog"
        description={
          <p>
            Guides to sharing event photos with every guest — QR codes, AI face search, and photo delivery for
            weddings, parties and conferences.
          </p>
        }
      >
        <BlogNav categories={categories} />
      </BlogHeader>

      <section data-tone="default" aria-label="Posts" className="section-y">
        <div className="container-page">
          {!list ? (
            <p className="rounded-xl border border-dashed p-10 text-muted-foreground">
              Posts couldn&apos;t load right now. Refresh the page in a minute.
            </p>
          ) : (
            <>
              {featured && (
                <div className="mb-10">
                  <PostCard post={featured} featured priority headingLevel="h2" />
                </div>
              )}
              <PostGrid
                headingLevel="h2"
                posts={rest.filter(Boolean) as typeof posts}
                empty={{
                  title: "No posts yet",
                  description: "We’re writing our first guides on sharing event photos. Check back soon.",
                  action: { label: "See how Snapdaps works", href: "/how-it-works" },
                }}
              />
              <Pagination basePath="/blogs" pageInfo={list.pageInfo} />
            </>
          )}
        </div>
      </section>

      <CtaBand title="Put these guides to work at your next event" body="Upload once. Let AI do the rest." />

      {firstPage && posts.length > 0 && <JsonLd data={blogLd(posts)} />}
    </>
  );
}
