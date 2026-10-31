import "server-only";
import { cache } from "react";
import { wpQuery, WP_TAGS } from "./client";
import {
  ANNOUNCEMENT_QUERY,
  AUTHOR_QUERY,
  CATEGORIES_QUERY,
  CATEGORY_QUERY,
  POST_BY_SLUG_QUERY,
  POST_PREVIEW_QUERY,
  POSTS_QUERY,
  RELATED_POSTS_QUERY,
  SITEMAP_QUERY,
} from "./queries";
import type { Announcement, PageInfo, PostList, WPAnnouncement, WPAuthor, WPCategory, WPPost, WPPostCard } from "./types";

export const PAGE_SIZE = 12;

const EMPTY: PostList = {
  posts: [],
  pageInfo: { hasNextPage: false, hasPreviousPage: false },
};

type PostsArgs = {
  after?: string;
  before?: string;
  category?: string;
  author?: string;
  search?: string;
  first?: number;
};

type PostsResponse = { posts: { nodes: WPPostCard[]; pageInfo: PageInfo } };

export async function getPosts(args: PostsArgs = {}): Promise<PostList> {
  const size = args.first ?? PAGE_SIZE;
  const where: Record<string, unknown> = {};
  if (args.category) where.categoryName = args.category;
  if (args.author) where.authorName = args.author;
  if (args.search) where.search = args.search;

  const data = await wpQuery<PostsResponse>(POSTS_QUERY, {
    variables: args.before
      ? { last: size, before: args.before, where }
      : { first: size, after: args.after ?? null, where },
    tags: [
      ...(args.category ? [WP_TAGS.categories] : []),
      ...(args.author ? [WP_TAGS.authors] : []),
    ],
    // Search results are per-query; don't fill the data cache with them.
    noStore: Boolean(args.search),
  });
  if (!data?.posts) return EMPTY;
  return { posts: data.posts.nodes, pageInfo: data.posts.pageInfo };
}

/** Deduped per request, so generateMetadata and the page share one fetch. */
export const getPostBySlug = cache(async (slug: string): Promise<WPPost | null> => {
  const data = await wpQuery<{ post: WPPost | null }>(POST_BY_SLUG_QUERY, {
    variables: { slug },
    tags: [WP_TAGS.post(slug)],
  });
  return data?.post ?? null;
});

export async function getPostPreview(id: string): Promise<WPPost | null> {
  const data = await wpQuery<{ post: WPPost | null }>(POST_PREVIEW_QUERY, {
    variables: { id },
    noStore: true,
    authenticated: true,
  });
  return data?.post ?? null;
}

export async function getRelatedPosts(post: WPPost): Promise<WPPostCard[]> {
  const category = post.categories?.nodes[0]?.slug;
  const data = await wpQuery<{ posts: { nodes: WPPostCard[] } }>(RELATED_POSTS_QUERY, {
    variables: { category, notIn: [String(post.databaseId)] },
  });
  return data?.posts.nodes ?? [];
}

export const getCategory = cache(async (slug: string): Promise<WPCategory | null> => {
  const data = await wpQuery<{ category: WPCategory | null }>(CATEGORY_QUERY, {
    variables: { slug },
    tags: [WP_TAGS.categories],
  });
  return data?.category ?? null;
});

export async function getCategories(): Promise<WPCategory[]> {
  const data = await wpQuery<{ categories: { nodes: WPCategory[] } }>(CATEGORIES_QUERY, {
    tags: [WP_TAGS.categories],
  });
  return (data?.categories.nodes ?? []).filter((c) => c.slug !== "uncategorized");
}

export const getAuthor = cache(async (slug: string): Promise<WPAuthor | null> => {
  const data = await wpQuery<{ user: WPAuthor | null }>(AUTHOR_QUERY, {
    variables: { slug },
    tags: [WP_TAGS.authors],
  });
  return data?.user ?? null;
});

type SitemapResponse = {
  posts: {
    nodes: { slug: string; modified: string; modifiedGmt?: string | null }[];
    pageInfo: { hasNextPage: boolean; endCursor: string };
  };
  categories: { nodes: { slug: string }[] };
};

export async function getSitemapEntries() {
  const posts: { slug: string; modified: string; modifiedGmt?: string | null }[] = [];
  let categories: { slug: string }[] = [];
  let after: string | null = null;
  // Walk all pages, capped to avoid runaway loops.
  for (let i = 0; i < 50; i++) {
    const data: SitemapResponse | null = await wpQuery<SitemapResponse>(SITEMAP_QUERY, { variables: { after } });
    if (!data) break;
    posts.push(...data.posts.nodes);
    if (i === 0) categories = data.categories.nodes;
    if (!data.posts.pageInfo.hasNextPage) break;
    after = data.posts.pageInfo.endCursor;
  }
  return { posts, categories: categories.filter((c) => c.slug !== "uncategorized") };
}

/** Short stable id for a message, so a dismissal only hides that exact announcement. */
function announcementId(a: { message: string; href?: string; style: string }) {
  let h = 5381;
  for (const ch of `${a.style}|${a.message}|${a.href ?? ""}`) h = ((h << 5) + h + ch.charCodeAt(0)) | 0;
  return (h >>> 0).toString(36);
}

/**
 * The announcement bar (WordPress → Settings → Announcement), or null when it's off, empty, outside
 * its start/end dates, or WordPress can't answer within 1.5s — the bar sits above the header, so it
 * must never hold up or break a page. Links: site paths (`/pricing`) or full https URLs only.
 */
export const getAnnouncement = cache(async (): Promise<Announcement | null> => {
  const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 1500));
  const data = await Promise.race([
    wpQuery<{ announcement: WPAnnouncement | null }>(ANNOUNCEMENT_QUERY, { tags: [WP_TAGS.announcement] }).catch(() => null),
    timeout,
  ]);
  const a = data?.announcement;
  const message = a?.message?.trim();
  if (!a?.enabled || !message) return null;

  const now = Date.now();
  if (a.startsAt && Date.parse(a.startsAt) > now) return null;
  if (a.endsAt && Date.parse(a.endsAt) <= now) return null;

  const url = a.linkUrl?.trim() ?? "";
  const label = a.linkLabel?.trim() ?? "";
  const internal = url.startsWith("/") && !url.startsWith("//");
  const external = /^https:\/\//.test(url);
  const style = a.style === "offer" || a.style === "launch" ? a.style : "info";
  const link = label && (internal || external) ? { label, href: url, external } : undefined;
  return {
    id: announcementId({ message, href: link?.href, style }),
    message,
    link,
    style,
    onHero: Boolean(a.onHero),
    endsAt: a.endsAt ?? undefined,
  };
});
