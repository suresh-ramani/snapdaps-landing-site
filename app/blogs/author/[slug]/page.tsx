import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/blog/breadcrumbs";
import { Pagination } from "@/components/blog/pagination";
import { PostGrid } from "@/components/blog/post-grid";
import { JsonLd } from "@/components/json-ld";
import { buildMetadata, personLd } from "@/lib/seo";
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
    title: `${author.name}, author`,
    description: author.seo?.metaDesc || author.description || `Articles written by ${author.name}.`,
    path: `/blogs/author/${slug}`,
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
    <div className="container-page pb-[var(--section-y)] pt-10 md:pt-14">
      <Breadcrumbs
        items={[
          { name: "Blog", path: "/blogs" },
          { name: author.name, path: `/blogs/author/${slug}` },
        ]}
      />
      <header className="mb-12 mt-8 flex max-w-2xl items-start gap-6 border-b pb-10">
        {author.avatar?.url && (
          <Image src={author.avatar.url} alt="" width={96} height={96} className="size-20 rounded-full" />
        )}
        <div>
          <h1 className="text-4xl font-bold tracking-[-0.03em]">{author.name}</h1>
          {author.description && <p className="mt-3 text-lg text-muted-foreground">{author.description}</p>}
        </div>
      </header>
      <PostGrid posts={list.posts} emptyText={`${author.name} hasn't published anything yet.`} />
      <Pagination basePath={`/blogs/author/${slug}`} pageInfo={list.pageInfo} />
      <JsonLd data={personLd(author)} />
    </div>
  );
}
