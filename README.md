# snapdaps.ai — landing site + blog

Next.js 16 (App Router, server-rendered on every request) · Tailwind CSS v4 · shadcn/ui · headless WordPress (WPGraphQL).

## Run it

```bash
cp .env.example .env.local      # fill in WP_GRAPHQL_URL etc.
npm install
npm run dev                     # http://localhost:3000
npm run build && npm start      # production check
```

The site runs without WordPress configured — blog pages show empty states.

## Where things live

| Path | What |
|---|---|
| `content/site.ts` | **All marketing copy, nav, plans, FAQ.** Replace every "Placeholder" here. |
| `app/globals.css` | Design tokens: primitives → shadcn semantic vars → marketing layer. Rebrand by editing the primitives. |
| `components/ui/` | shadcn primitives (button, badge, card, input, accordion, sheet, separator). Add more with `npx shadcn@latest add <name>`. |
| `components/blocks/` | Marketing sections (hero, feature grid, how it works, pricing, FAQ, CTA, latest posts). |
| `components/blog/` | Post card, article layout, TOC, breadcrumbs, author box, pagination, category nav + search. |
| `lib/wp/` | WordPress client (`client.ts`), GraphQL queries, typed API functions, HTML sanitising + TOC. |
| `lib/seo.ts` | `buildMetadata()` for every route + JSON-LD builders. |
| `proxy.ts` | CDN cache headers for public HTML (Next 16's renamed middleware). |

## Routes

Every marketing page is a hand-written `page.tsx` (no dynamic feature/use-case routes), so each one can be edited on its own. The list and indexed/noindex status live in `content/routes.ts`.

| Route | Notes |
|---|---|
| `/` | Hero with face-search demo, scroll-synced pain points, before/after compare, feature bento, social proof, 5-step how it works, latest posts, CTA |
| `/how-it-works` | 5-step workflow (tabs on desktop, stacked on mobile) |
| `/features` | Bento overview, alternating feature rows, before/after |
| `/use-cases` | Hub: by role and by event type |
| `/use-cases/photo-sharing-app-for-photographers` | Story-driven problem/solution, workflow, features |
| `/use-cases/photo-sharing-app-for-event-planners` | Feature rows, offer grid |
| `/use-cases/wedding-photo-sharing-app` | Hero + story (rest uses shared sections until copy arrives) |
| `/use-cases/{birthday-party,corporate-events,award-ceremony,sports-events}` | Draft layouts, **noindex** until content is written |
| `/case-studies` | Empty state, **noindex** |
| `/pricing` | Placeholder plans |
| `/contact` | Demo / contact form |
| `/blogs` … | Blog index, posts, categories, authors, search, preview, RSS (WordPress) |
| `/api/demo` | Demo form → email via Resend (`RESEND_API_KEY`, `DEMO_INBOX`, `DEMO_FROM`) |
| `/api/revalidate`, `/api/preview` | WordPress webhook + preview entry |

Old URLs redirect permanently: `/blog/*` → `/blogs/*`, `/use-cases/photographers|event-planners|wedding` → the keyword slugs.

## Client logos

1. Put logo files in `public/clients/` (SVG preferred).
2. Add entries to `content/clients.ts` — `{ name, logo: "/clients/file.svg", width, height, href? }`.
3. The strip appears under the hero on the home, use-case and pricing pages. Up to 7 logos show as a row; 8+ switch to a slow scrolling marquee (static for visitors who prefer reduced motion).

While the list is empty the section is hidden on the live site; `npm run dev` shows placeholder slots.

## How SSR + caching works

1. **Every page renders per request** — `await connection()` in `app/layout.tsx`.
2. **WordPress data is cached** in the Next.js data cache for `WP_CACHE_SECONDS` (default 300) and tagged (`wp:posts`, `wp:post:<slug>`, …). So most requests never touch WordPress.
3. **WordPress clears the cache on publish** via `/api/revalidate` (below), so edits show up on the next request.
4. **The CDN may hold HTML for 60s** and serve stale for 10 min while refreshing (`proxy.ts`). Preview, search and API routes are never CDN-cached. Set this to `no-store` if you need zero staleness.
5. **Slow parts stream**: latest posts and related posts are in `<Suspense>` so they never block first byte.

If you self-host on multiple Node instances, the data cache is per-instance by default — add a shared cache handler (e.g. Redis) via `cacheHandler` in `next.config.ts`.

## WordPress setup

1. Install plugins: **WPGraphQL**, **Yoast SEO** + **WPGraphQL for Yoast SEO** (optional; set `WP_SEO_PLUGIN=yoast`).
2. Put WordPress on its own host (e.g. `cms.snapdaps.ai`). **Don't** tick Settings → Reading → *Discourage search engines*: with Yoast active it makes every post report `noindex` over GraphQL, and the Next.js blog honours that, so the whole blog would drop out of search. The mu-plugin below keeps the WordPress front end out of search with an `X-Robots-Tag` header instead.
3. Set **Settings → Permalinks** to `/%postname%/` (slugs map to `/blogs/<slug>`).
4. Add this as `wp-content/mu-plugins/snapdaps-revalidate.php`:

```php
<?php
/* Tell the Next.js site to refresh cached content whenever posts change. */
const SNAPDAPS_SITE = 'https://snapdaps.ai';
const SNAPDAPS_SECRET = 'same value as REVALIDATE_SECRET';

function snapdaps_revalidate(array $body) {
  wp_remote_post(SNAPDAPS_SITE . '/api/revalidate', [
    'headers'  => ['Content-Type' => 'application/json', 'x-revalidate-secret' => SNAPDAPS_SECRET],
    'body'     => wp_json_encode($body),
    'timeout'  => 5,
    'blocking' => false,
  ]);
}
add_action('transition_post_status', function ($new, $old, $post) {
  if ($post->post_type !== 'post' || ($new !== 'publish' && $old !== 'publish')) return;
  snapdaps_revalidate(['type' => 'post', 'slug' => $post->post_name]);
}, 10, 3);
add_action('edited_category', fn() => snapdaps_revalidate(['type' => 'category']));
add_action('profile_update',  fn() => snapdaps_revalidate(['type' => 'user']));

/* Keep the WordPress front end out of search (the Next.js site is the public one). A header, not
   "Discourage search engines", so Yoast still reports each post's own index/noindex choice. */
add_action('send_headers', function () {
  if (is_admin() || (defined('REST_REQUEST') && REST_REQUEST)) return;
  if (function_exists('is_graphql_http_request') && is_graphql_http_request()) return;
  header('X-Robots-Tag: noindex, nofollow', true);
});

/* Point WordPress "Preview" at the Next.js draft route. */
add_filter('preview_post_link', function ($link, $post) {
  return SNAPDAPS_SITE . '/api/preview?secret=' . urlencode('same value as PREVIEW_SECRET') . '&id=' . $post->ID;
}, 10, 2);
```

5. Copy `wordpress/mu-plugins/*.php` from this repo into `wp-content/mu-plugins/` (announcement bar settings + front-end noindex header; see `wordpress/README.md`).
6. For previews, create an **Application Password** for an editor user and set `WP_PREVIEW_USER` / `WP_PREVIEW_APP_PASSWORD`.
7. If media is served from a different host than `WP_URL` (e.g. a CDN), add that host to `images.remotePatterns` in `next.config.ts`.

## SEO checklist before launch

- [ ] `NEXT_PUBLIC_SITE_URL` set to the production URL (canonicals, sitemap, OG all use it)
- [ ] Every placeholder in `content/site.ts` replaced; descriptions 150–160 chars
- [ ] Real product visual in the hero (`components/blocks/hero.tsx`) via `next/image` with `priority`
- [ ] Old WordPress URLs redirected (`redirects()` in `next.config.ts`)
- [ ] Search Console: verify domain, submit `/sitemap.xml`
- [ ] Validate schema at search.google.com/test/rich-results (home, pricing, one post)
- [ ] Lighthouse on mobile: LCP < 2.5s, CLS < 0.1, TTFB < 600ms

## Design tokens

Colors and type are defined once in `app/globals.css`. The look follows ui.shadcn.com and Tailark: neutral zinc surfaces, hairline rings, brand blue only for primary actions.

- **Primitives**: zinc scale (`--paper`, `--ink`, `--slate`, `--line`, `--mist`), `--cobalt` (brand blue), plus the before/after reds and greens (`--rose-*`, `--mint-*`).
- **Semantic**: shadcn's names (`--background`, `--primary`, `--muted`, …) mapped to primitives; `.dark` only redefines primitives.
- **Marketing**: `--section-y` (section rhythm), `--reading` (article width), `surface` / `surface-soft` utilities (hairline-ring cards), `animate-marquee` (client logos).
- **Font**: Geist via `next/font` in `app/layout.tsx`, for headings and body.
- **Adapted sources (MIT)**: shadcn/ui (components in `components/ui`, product wall pattern), Magic UI (bento grid, marquee), Tailark (section layouts). Attribution comments are kept at the top of adapted files.
