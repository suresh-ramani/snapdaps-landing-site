import { notFound } from "next/navigation";
import { BlogNav } from "@/components/blog/blog-nav";
import { BlogHeader } from "@/components/blog/blog-header";
import { Pagination } from "@/components/blog/pagination";
import { PostGrid } from "@/components/blog/post-grid";
import { buildMetadata, pagedPath } from "@/lib/seo";
import { stripHtml } from "@/lib/utils";
import { getCategories, getCategory, getPosts } from "@/lib/wp/api";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ after?: string; before?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props) {
  const [{ slug }, { after, before }] = await Promise.all([params, searchParams]);
  const category = await getCategory(slug);
  if (!category) return {};
  return buildMetadata({
    // Yoast's default term title is "<Name> Archives - <Site>": drop the site suffix and "Archives".
    title:
      (category.seo?.title?.replace(/\s[-|–]\s[^-|–]+$/, "").replace(/\s+Archives$/i, "") ||
        `${category.name} articles`) + (after || before ? " (older posts)" : ""),
    description:
      category.seo?.metaDesc || stripHtml(category.description ?? "") || `Articles about ${category.name}.`,
    path: pagedPath(`/blogs/category/${slug}`, { after, before }),
    noindex: Boolean(after || before),
  });
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const [{ slug }, { after, before }] = await Promise.all([params, searchParams]);
  const [category, categories, list] = await Promise.all([
    getCategory(slug),
    getCategories().catch(() => []),
    getPosts({ category: slug, after, before }),
  ]);
  if (!category) notFound();

  return (
    <>
      <BlogHeader
        breadcrumbs={[
          { name: "Blog", path: "/blogs" },
          { name: category.name, path: `/blogs/category/${slug}` },
        ]}
        title={category.name}
        description={category.description ? <p>{stripHtml(category.description)}</p> : undefined}
        meta={typeof category.count === "number" ? `${category.count} post${category.count === 1 ? "" : "s"}` : undefined}
      >
        <BlogNav categories={categories} active={slug} />
      </BlogHeader>
      <section data-tone="default" aria-label="Posts" className="section-y pt-10 md:pt-12">
        <div className="container-page">
          <PostGrid
            headingLevel="h2"
            posts={list.posts}
            empty={{
              title: `No posts in ${category.name} yet`,
              description: "New posts in this category will appear here.",
              action: { label: "Browse all posts", href: "/blogs" },
            }}
          />
          <Pagination basePath={`/blogs/category/${slug}`} pageInfo={list.pageInfo} />
        </div>
      </section>
    </>
  );
}
