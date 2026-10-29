export type WPImage = {
  sourceUrl: string;
  altText?: string | null;
  mediaDetails?: { width?: number | null; height?: number | null } | null;
};

export type WPSeo = {
  title?: string | null;
  metaDesc?: string | null;
  canonical?: string | null;
  metaRobotsNoindex?: string | null;
  opengraphImage?: { sourceUrl?: string | null } | null;
};

export type WPCategory = {
  name: string;
  slug: string;
  description?: string | null;
  count?: number | null;
  seo?: WPSeo | null;
};

export type WPAuthor = {
  name: string;
  slug: string;
  description?: string | null;
  avatar?: { url: string } | null;
  seo?: WPSeo | null;
};

export type WPPostCard = {
  databaseId: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage?: { node: WPImage } | null;
  author?: { node: WPAuthor } | null;
  categories?: { nodes: WPCategory[] } | null;
};

export type WPPost = WPPostCard & {
  content: string;
  tags?: { nodes: { name: string; slug: string }[] } | null;
  seo?: WPSeo | null;
};

export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string | null;
  endCursor?: string | null;
};

export type PostList = { posts: WPPostCard[]; pageInfo: PageInfo };
