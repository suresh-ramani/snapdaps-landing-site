import "server-only";

/**
 * WPGraphQL client.
 *
 * Pages render on every request (SSR), but the WordPress *data* is held in the
 * Next.js data cache for WP_CACHE_SECONDS and tagged, so:
 *  - WordPress isn't hit on every page view
 *  - the WP webhook (/api/revalidate) can expire tags the moment a post changes
 *  - if WordPress is down, cached data keeps serving
 */

const ENDPOINT = process.env.WP_GRAPHQL_URL;
const CACHE_SECONDS = Number(process.env.WP_CACHE_SECONDS ?? 300);

export const WP_TAGS = {
  posts: "wp:posts",
  post: (slug: string) => `wp:post:${slug}`,
  categories: "wp:categories",
  authors: "wp:authors",
} as const;

type QueryOptions = {
  variables?: Record<string, unknown>;
  tags?: string[];
  /** Bypass the data cache (draft previews, search). */
  noStore?: boolean;
  /** Send the preview application password (draft previews only). */
  authenticated?: boolean;
};

export class WPError extends Error {}

export async function wpQuery<T>(query: string, opts: QueryOptions = {}): Promise<T | null> {
  if (!ENDPOINT) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[wp] WP_GRAPHQL_URL is not set — blog renders empty states.");
    }
    return null;
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (opts.authenticated && process.env.WP_PREVIEW_USER && process.env.WP_PREVIEW_APP_PASSWORD) {
    const token = Buffer.from(`${process.env.WP_PREVIEW_USER}:${process.env.WP_PREVIEW_APP_PASSWORD}`).toString(
      "base64",
    );
    headers.Authorization = `Basic ${token}`;
  }

  const init: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables: opts.variables ?? {} }),
  };
  if (opts.noStore) {
    init.cache = "no-store";
  } else {
    init.next = { revalidate: CACHE_SECONDS, tags: [WP_TAGS.posts, ...(opts.tags ?? [])] };
  }

  let res: Response;
  try {
    res = await fetch(ENDPOINT, init);
  } catch (err) {
    console.error("[wp] network error", err);
    throw new WPError("WordPress is unreachable");
  }

  if (!res.ok) throw new WPError(`WordPress responded ${res.status}`);

  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) {
    console.error("[wp] GraphQL errors", json.errors);
    if (!json.data) throw new WPError(json.errors[0].message);
  }
  return json.data ?? null;
}
