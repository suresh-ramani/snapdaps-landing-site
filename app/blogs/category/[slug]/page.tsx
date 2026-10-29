import { notFound } from "next/navigation";
import { BlogNav } from "@/components/blog/blog-nav";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { Pagination } from "@/components/blog/pagination";
import { PostGrid } from "@/components/blog/post-grid";
import { buildMetadata } from "@/lib/seo";
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
    title: category.seo?.title?.replace(/\s[-|–]\s[^-|–]+$/, "") || `${category.name} articles`,
    description:
      category.seo?.metaDesc || stripHtml(category.description ?? "") || `Articles about ${category.name}.`,
    path: `/blogs/category/${slug}`,
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
    <div className="container-page pb-[var(--section-y)] pt-10 md:pt-14">
      <Breadcrumbs
        items={[
          { name: "Blog", path: "/blogs" },
          { name: category.name, path: `/blogs/category/${slug}` },
        ]}
      />
      <header className="mb-10 mt-8 max-w-2xl">
        <h1 className="text-5xl font-bold tracking-[-0.03em]">{category.name}</h1>
        {category.description && (
          <p className="mt-5 text-xl text-muted-foreground">{stripHtml(category.description)}</p>
        )}
      </header>
      <BlogNav categories={categories} active={slug} />
      <div className="mt-12">
        <PostGrid posts={list.posts} emptyText={`No posts in ${category.name} yet.`} />
      </div>
      <Pagination basePath={`/blogs/category/${slug}`} pageInfo={list.pageInfo} />
    </div>
  );
}
