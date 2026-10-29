---
name: wordpress-setup
description: Connect, configure or debug the headless WordPress backend for the /blogs section — env vars, WPGraphQL/Yoast plugins, the revalidation webhook, draft previews, media hosts. Use when the blog is empty, posts don't update, previews fail, or someone is setting up WordPress for the first time.
---

# WordPress setup and troubleshooting

The full mu-plugin snippet and plugin list are in `README.md` → "WordPress setup". This skill is the checklist and the debugging path. Blog routes live under `/blogs` (`/blogs/<slug>`, `/blogs/category/<slug>`, `/blogs/author/<slug>`, `/blogs/search`, `/blogs/preview/<id>`, `/blogs/rss.xml`).

## Setup checklist

1. WordPress on its own host (e.g. `cms.snapdaps.ai`) with **WPGraphQL**. Optional: **Yoast SEO** + **WPGraphQL for Yoast SEO**.
2. WordPress → Settings → Reading: discourage search engines (only the Next.js site should be indexed). Permalinks: `/%postname%/`.
3. `.env.local` (copy from `.env.example`):
   - `WP_URL`, `WP_GRAPHQL_URL` (`…/graphql`)
   - `WP_SEO_PLUGIN=yoast` only if the Yoast GraphQL plugin is active — queries then ask for `seo {}` fields.
   - `REVALIDATE_SECRET`, `PREVIEW_SECRET` — long random strings, same values in the mu-plugin.
   - `WP_PREVIEW_USER` + `WP_PREVIEW_APP_PASSWORD` (Application Password of an editor) for drafts.
   - `WP_CACHE_SECONDS` (default 300).
4. Install the mu-plugin from the README as `wp-content/mu-plugins/snapdaps-revalidate.php`, with `SNAPDAPS_SITE` pointing at this site. Its preview link must target `/api/preview`, which redirects to `/blogs/preview/<id>`.
5. Media on another host/CDN → add it to `images.remotePatterns` in `next.config.ts`.
6. Old WordPress permalinks → add `redirects()` in `next.config.ts` to `/blogs/...`.

Never commit real secrets; `.env*.local` is gitignored and Claude is denied reading it (`.claude/settings.json`).

## Debugging

| Symptom | Check |
|---|---|
| Blog shows empty states | `WP_GRAPHQL_URL` unset → dev console warns `[wp] WP_GRAPHQL_URL is not set`. Test: `curl -s -X POST "$WP_GRAPHQL_URL" -H 'content-type: application/json' -d '{"query":"{ posts(first:1){ nodes { slug } } }"}'` |
| GraphQL errors about `seo` | `WP_SEO_PLUGIN=yoast` set but the WPGraphQL-for-Yoast plugin isn't active |
| Edits take minutes to appear | Webhook not firing. Test: `curl -X POST https://<site>/api/revalidate -H 'x-revalidate-secret: <secret>' -H 'content-type: application/json' -d '{"type":"all"}'` → expect `{"ok":true,…}`; 401 = secret mismatch. The CDN may still hold HTML for 60s (`proxy.ts`). |
| Preview button 401/404 | `PREVIEW_SECRET` mismatch, or app password missing/wrong → `getPostPreview` returns null |
| Images fail to load | Host missing from `images.remotePatterns` |
| Stale data on multi-instance self-hosting | Data cache is per instance; add a shared `cacheHandler` (README) |

Code entry points: `lib/wp/client.ts` (`wpQuery`, `WP_TAGS`), `app/api/revalidate/route.ts`, `app/api/preview/route.ts`, `app/blogs/preview/[id]/page.tsx`.

If setup steps or env vars change, update this skill, `README.md`, `.env.example` and CLAUDE.md → "Environment" together.
