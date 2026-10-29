---
name: add-blog-query
description: Fetch new data from WordPress via WPGraphQL — a new field on posts, a new content type (pages, tags, custom post types), or a new listing. Use whenever code needs data from WordPress that lib/wp/api.ts doesn't already provide.
---

# Add a WordPress query

All WordPress data flows: `lib/wp/queries.ts` (GraphQL string) → `lib/wp/api.ts` (typed fetcher, calls `wpQuery`) → `lib/wp/types.ts` (shape) → server component. Never call `fetch()` to WordPress anywhere else. Blog routes live under `/blogs`.

## Steps

1. **Query** in `lib/wp/queries.ts`, as a `/* GraphQL */` template string.
   - Reuse `POST_CARD_FIELDS` for anything that renders a `PostCard`.
   - Yoast fields go through the `SEO_POST` / `SEO_TERM` / `SEO_USER` constants so the query still works when `WP_SEO_PLUGIN` isn't `yoast`.
   - Ask only for fields you render.
2. **Types** in `lib/wp/types.ts`. Anything WordPress can omit is optional / `| null`.
3. **Fetcher** in `lib/wp/api.ts`:
   - `wpQuery<T>(QUERY, { variables, tags })`. It returns `null` when WordPress isn't configured — return an empty value, don't throw.
   - **Tags:** pick from `WP_TAGS` in `lib/wp/client.ts` (`posts` is added automatically). A new kind of content needs a new tag:
     1. add it to `WP_TAGS`,
     2. handle it in `app/api/revalidate/route.ts`,
     3. fire it from the WordPress mu-plugin snippet in `README.md`.
   - `noStore: true` for per-query results (search, previews). `authenticated: true` only for draft previews.
   - Wrap in React `cache()` when both `generateMetadata` and the page call it (see `getPostBySlug`).
4. **Use it** from a server component. If it isn't the page's main content, render it inside `<Suspense>` and `.catch()` failures to an empty state (see `LatestPosts`).
5. **Render HTML** fields only through `prepareContent()` from `lib/wp/content.ts` — never `dangerouslySetInnerHTML` on raw WordPress HTML.
6. **Images** use `next/image`; a new media host goes into `images.remotePatterns` in `next.config.ts`.
7. **New indexable blog routes** (e.g. tag archives) go into `app/sitemap.ts` by extending `getSitemapEntries` — marketing pages use `content/routes.ts` instead.
8. **Keep docs current:** a new tag, query family or route → update CLAUDE.md and `.claude/skills/wordpress-setup` in the same change.

## Never

- Import `lib/wp/*` into a `"use client"` file (they're `server-only`).
- Add `revalidate` / `force-static` to pages to cache data — caching lives in `wpQuery`.

## Test without WordPress

Unset `WP_GRAPHQL_URL`: pages must still render (empty states). Then `npm run typecheck && npm run lint && npm run build`.
