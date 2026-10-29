import { ImageResponse } from "next/og";
import { OgCard } from "@/components/og-card";
import { site } from "@/content/site";
import { stripHtml } from "@/lib/utils";
import { getPostBySlug } from "@/lib/wp/api";

export const alt = `${site.name} blog`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function PostOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  const title = post ? stripHtml(post.title) : site.tagline;
  const category = post?.categories?.nodes[0]?.name ?? "Blog";
  return new ImageResponse(<OgCard eyebrow={`${site.name} · ${category}`} title={title} />, size);
}
