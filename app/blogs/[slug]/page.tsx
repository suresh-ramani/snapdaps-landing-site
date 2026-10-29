import { notFound } from "next/navigation";
import { Article } from "@/components/blog/article";
import { postMetadata } from "@/lib/seo";
import { getPostBySlug } from "@/lib/wp/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return post ? postMetadata(post) : {};
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  // Same call as generateMetadata — React cache() dedupes it to one WordPress request.
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return <Article post={post} />;
}
