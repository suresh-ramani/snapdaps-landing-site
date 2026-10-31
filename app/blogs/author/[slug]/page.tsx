import Image from "next/image";
import { notFound } from "next/navigation";
import { BlogHeader } from "@/components/blog/blog-header";
import { Pagination } from "@/components/blog/pagination";
import { PostGrid } from "@/components/blog/post-grid";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, pagedPath, personLd } from "@/lib/seo";
import { getAuthor, getPosts } from "@/lib/wp/api";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ after?: string; before?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props) {
  const [{ slug }, { after, before }] = await Promise.all([params, searchParams]);
  const author = await getAuthor(slug);
  if (!author) return {};
  return buildMetadata({
    title: `${author.name}, author` + (after || before ? " (older posts)" : ""),
    description: author.seo?.metaDesc || author.description || `Articles written by ${author.name}.`,
    path: pagedPath(`/blogs/author/${slug}`, { after, before }),
    image: author.avatar?.url,
    noindex: Boolean(after || before),
  });
}

export default async function AuthorPage({ params, searchParams }: Props) {
  const [{ slug }, { after, before }] = await Promise.all([params, searchParams]);
  const author = await getAuthor(slug);
  if (!author) notFound();
  // WPGraphQL's authorName filter matches the user's nicename (= slug).
  const list = await getPosts({ author: slug, after, before });

  return (
    <>
      <BlogHeader
        breadcrumbs={[
          { name: "Blog", path: "/blogs" },
          { name: author.name, path: `/blogs/author/${slug}` },
        ]}
        aside={
          author.avatar?.url ? (
            <Image
              src={author.avatar.url}
              alt=""
              width={96}
              height={96}
              className="size-16 shrink-0 rounded-full ring-1 ring-border md:size-20"
            />
          ) : undefined
        }
        title={author.name}
        description={author.description ? <p>{author.description}</p> : undefined}
        meta={`${list.posts.length}${list.pageInfo.hasNextPage ? "+" : ""} post${list.posts.length === 1 ? "" : "s"}`}
      />
      <section data-tone="default" aria-label={`Posts by ${author.name}`} className="section-y pt-10 md:pt-12">
        <div className="container-page">
          <PostGrid
            headingLevel="h2"
            posts={list.posts}
            empty={{
              title: `${author.name} hasn’t published anything yet`,
              description: "Their posts will appear here.",
              action: { label: "Browse all posts", href: "/blogs" },
            }}
          />
          <Pagination basePath={`/blogs/author/${slug}`} pageInfo={list.pageInfo} />
        </div>
      </section>
      <JsonLd data={personLd(author)} />
    </>
  );
}
