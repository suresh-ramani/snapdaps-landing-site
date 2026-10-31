const withSeo = process.env.WP_SEO_PLUGIN === "yoast";

const SEO_POST = withSeo
  ? `seo { title metaDesc canonical metaRobotsNoindex opengraphImage { sourceUrl } }`
  : "";
const SEO_TERM = withSeo ? `seo { title metaDesc canonical }` : "";
const SEO_USER = withSeo ? `seo { title metaDesc }` : "";

export const POST_CARD_FIELDS = /* GraphQL */ `
  fragment PostCard on Post {
    databaseId
    slug
    title
    excerpt
    date
    modified
    dateGmt
    modifiedGmt
    featuredImage { node { sourceUrl altText mediaDetails { width height } } }
    author { node { name slug avatar(size: 96) { url } } }
    categories(first: 3) { nodes { name slug } }
  }
`;

const PAGE_INFO = `pageInfo { hasNextPage hasPreviousPage startCursor endCursor }`;

export const POSTS_QUERY = /* GraphQL */ `
  ${POST_CARD_FIELDS}
  query Posts($first: Int, $after: String, $last: Int, $before: String, $where: RootQueryToPostConnectionWhereArgs) {
    posts(first: $first, after: $after, last: $last, before: $before, where: $where) {
      nodes { ...PostCard }
      ${PAGE_INFO}
    }
  }
`;

export const POST_BY_SLUG_QUERY = /* GraphQL */ `
  ${POST_CARD_FIELDS}
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...PostCard
      content
      tags { nodes { name slug } }
      # Same avatar size as the PostCard fragment — GraphQL rejects one field with two different arguments.
      author { node { description } }
      ${SEO_POST}
    }
  }
`;

export const POST_PREVIEW_QUERY = /* GraphQL */ `
  ${POST_CARD_FIELDS}
  query PostPreview($id: ID!) {
    post(id: $id, idType: DATABASE_ID, asPreview: true) {
      ...PostCard
      content
      tags { nodes { name slug } }
      # Same avatar size as the PostCard fragment — GraphQL rejects one field with two different arguments.
      author { node { description } }
    }
  }
`;

export const RELATED_POSTS_QUERY = /* GraphQL */ `
  ${POST_CARD_FIELDS}
  query Related($category: String, $notIn: [ID]) {
    posts(first: 3, where: { categoryName: $category, notIn: $notIn }) {
      nodes { ...PostCard }
    }
  }
`;

export const CATEGORY_QUERY = /* GraphQL */ `
  query Category($slug: ID!) {
    category(id: $slug, idType: SLUG) { name slug description count ${SEO_TERM} }
  }
`;

export const CATEGORIES_QUERY = /* GraphQL */ `
  query Categories {
    categories(first: 50, where: { hideEmpty: true }) { nodes { name slug count } }
  }
`;

export const AUTHOR_QUERY = /* GraphQL */ `
  query Author($slug: ID!) {
    user(id: $slug, idType: SLUG) { name slug description avatar(size: 160) { url } ${SEO_USER} }
  }
`;

export const SITEMAP_QUERY = /* GraphQL */ `
  query Sitemap($after: String) {
    posts(first: 100, after: $after) {
      nodes { slug modified modifiedGmt }
      pageInfo { hasNextPage endCursor }
    }
    categories(first: 100, where: { hideEmpty: true }) { nodes { slug } }
  }
`;

/** Settings → Announcement (mu-plugin snapdaps-announcement.php, see README). */
export const ANNOUNCEMENT_QUERY = /* GraphQL */ `
  query Announcement {
    announcement { enabled message linkLabel linkUrl style startsAt endsAt onHero }
  }
`;
