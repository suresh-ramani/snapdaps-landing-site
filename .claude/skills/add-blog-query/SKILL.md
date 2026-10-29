---
name: add-blog-query
description: Fetch new data from WordPress via WPGraphQL — a new field on posts, a new content type (pages, tags, custom post types), or a new listing. Use whenever code needs data from WordPress that lib/wp/api.ts doesn't already provide.
---

# Add a WordPress query

All WordPress data flows: `queries.ts` (GraphQL string) → `api.ts` (typed fetcher, calls `wpQuery`) → `types.ts` (shape) → server component. Never call `fetch()` to WordPress anywhere else.

## Steps

1. **Query** in `lib/wp/queries.ts`, as `/* GraphQL */` template string.
   - Reuse `POST_CARD_FIELDS` for anything that renders a `PostCard`.
   - Yoast fields go through the `SEO_POST` / `SEO_TERM` / `SEO_USER` constants so the query still works when `WP_SEO_PLUGIN` isn't `yoast`.
   - Ask only for fields you render.
2. **Types** in `lib/wp/types.ts`. Mark anything WordPress can omit as optional / `| null`.
3. **Fetcher** in `lib/wp/api.ts`:
   - Call `wpQuery<T>(QUERY, { variables, tags })`. It returns `null` when WordPress isn't configured — return an empty value, not a throw.
   - **Tags:** pick from `WP_TAGS` in `lib/wp/client.ts` (`posts` is added automatically). A new kind of content needs a new tag:
     1. add it to `WP_TAGS`,
     2. handle it in `app/api/revalidate/route.ts`,
     3. fire it from the WordPress mu-plugin snippet in `README.md`.
   - `noStore: true` for per-user or per-query results (search, previews). `authenticated: true` only for draft previews.
   - Wrap in React `cache()` when both `generateMetadata` and the page call it (see `getPostBySlug`).
4. **Use it** from a server component. If it isn't the page's main content, render it inside `<Suspense>` and `.catch()` failures to an empty state.
5. **Render HTML** fields only through `prepareContent()` from `lib/wp/content.ts` — never `dangerouslySetInnerHTML` on raw WordPress HTML.
6. **Images** from WordPress use `next/image`; if they come from a new host, add it to `images.remotePatterns` in `next.config.ts`.
7. New indexable routes built on the data go into `app/sitemap.ts` (extend `getSitemapEntries`).

## Never

- Import `lib/wp/*` into a `"use client"` file (they're `server-only`).
- Add `revalidate` / `force-static` to pages to cache data — caching lives in `wpQuery`.

## Test without WordPress

Unset `WP_GRAPHQL_URL`: pages must still render (empty states). Then `npm run typecheck && npm run lint && npm run build`.
