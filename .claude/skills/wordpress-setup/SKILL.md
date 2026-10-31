---
name: wordpress-setup
description: Connect, configure or debug the headless WordPress backend for the /blogs section — env vars, WPGraphQL/Yoast plugins, the revalidation webhook, draft previews, media hosts. Use when the blog is empty, posts don't update, previews fail, or someone is setting up WordPress for the first time.
---

# WordPress setup and troubleshooting

The full mu-plugin snippet and plugin list are in `README.md` → "WordPress setup". This skill is the checklist and the debugging path. Blog routes live under `/blogs` (`/blogs/<slug>`, `/blogs/category/<slug>`, `/blogs/author/<slug>`, `/blogs/search`, `/blogs/preview/<id>`, `/blogs/rss.xml`).

## Setup checklist

1. WordPress on its own host (e.g. `cms.snapdaps.ai`) with **WPGraphQL**. Optional: **Yoast SEO** + **WPGraphQL for Yoast SEO**.
2. WordPress → Settings → General → Timezone: **Kolkata** (announcement start/end times use it). Settings → Reading: leave *Discourage search engines* **off** — with Yoast it turns every post's `seo.metaRobotsNoindex` into `noindex`, and `postMetadata` honours it, so the blog would be noindexed. The mu-plugin sends `X-Robots-Tag: noindex, nofollow` on the WordPress front end instead. Permalinks: `/%postname%/`.
3. `.env.local` (copy from `.env.example`):
   - `WP_URL`, `WP_GRAPHQL_URL` (`…/graphql`)
   - `WP_SEO_PLUGIN=yoast` only if the Yoast GraphQL plugin is active — queries then ask for `seo {}` fields.
   - `REVALIDATE_SECRET`, `PREVIEW_SECRET` — long random strings, same values in the mu-plugin.
   - `WP_PREVIEW_USER` + `WP_PREVIEW_APP_PASSWORD` (Application Password of an editor) for drafts.
   - `WP_CACHE_SECONDS` (default 300).
4. Copy `wordpress/mu-plugins/*.php` (announcement bar + front-end noindex) into `wp-content/mu-plugins/`. Install the mu-plugin from the README as `wp-content/mu-plugins/snapdaps-revalidate.php`, with `SNAPDAPS_SITE` pointing at this site. Its preview link must target `/api/preview`, which redirects to `/blogs/preview/<id>`.
5. Media is served from this site at `/media/…` (rewrite in `next.config.ts` → `<WP_URL>/wp-content/uploads/…`; URLs rewritten in `lib/wp/client.ts`), so the CMS domain stays private. If uploads move to another host/CDN, point the rewrite there and update `hideWordPressMedia`.
6. Old WordPress permalinks → add `redirects()` in `next.config.ts` to `/blogs/...`.

Never commit real secrets; `.env*.local` is gitignored and Claude is denied reading it (`.claude/settings.json`).

## Local WordPress (Herd / Valet)

The team's local CMS is `https://cms.snapdaps.test` (Herd, files in `../blog`). To run this site against it:
- `WP_URL=https://cms.snapdaps.test`, `WP_GRAPHQL_URL=https://cms.snapdaps.test/graphql` (in `.env.local`, or exported for one build).
- Node doesn't trust Herd's local certificate: `NODE_EXTRA_CA_CERTS="$HOME/Library/Application Support/Herd/config/valet/CA/LaravelValetCASelfSigned.pem"`.
- `*.test` resolves to 127.0.0.1, which next/image blocks; `next.config.ts` sets `dangerouslyAllowLocalIP` only when the WordPress host is `*.test`, `*.localhost` or `localhost`.
- Installed and active there: WPGraphQL, Yoast SEO and WPGraphQL Yoast SEO Addon (`add-wpgraphql-seo`), so `WP_SEO_PLUGIN=yoast` works. Permalinks `/%postname%/`; *Discourage search engines* off; `wp-content/mu-plugins/snapdaps-noindex.php` adds the front-end `X-Robots-Tag` and `snapdaps-announcement.php` adds Settings → Announcement (both copied from `wordpress/mu-plugins/`) (the revalidate/preview part of the README mu-plugin isn't installed locally). Seven posts titled "Sample: …" by "Sample Author" (user `sample-author`), in Wedding photography / Photo delivery / Event planning, exist only to preview the design — delete them (and the sample author) before real content goes in. "Hello world!" was moved to drafts.

## Debugging

| Symptom | Check |
|---|---|
| Every blog post is `noindex` | Settings → Reading → *Discourage search engines* is on; with Yoast that makes `seo.metaRobotsNoindex` = `noindex` for every post. Turn it off and rely on the mu-plugin's `X-Robots-Tag` header |
| Offer ends at the wrong time | Start/End use WordPress's timezone. Set Settings → General → Timezone to **Kolkata** (default is UTC, so 23:59 would end at 05:29 IST next day) |
| Announcement doesn't show | Settings → Announcement: on, message filled, now inside start/end (site timezone), button link `/path` or `https://…`. `curl -s -X POST $WP_GRAPHQL_URL -d '{"query":"{ announcement { enabled message startsAt endsAt } }"}' -H 'content-type: application/json'`. Field missing → the announcement mu-plugin isn't installed. Changes need the revalidate webhook (or wait `WP_CACHE_SECONDS`) |
| Blog shows empty states | `WP_GRAPHQL_URL` unset → dev console warns `[wp] WP_GRAPHQL_URL is not set`. Test: `curl -s -X POST "$WP_GRAPHQL_URL" -H 'content-type: application/json' -d '{"query":"{ posts(first:1){ nodes { slug } } }"}'` |
| `[wp] WP_SEO_PLUGIN=yoast is set but WordPress has no seo field` warning | `WP_SEO_PLUGIN=yoast` set but the WPGraphQL-for-Yoast plugin isn't active. Pages still work: `wpQuery` drops the `seo { … }` selections and retries, and metadata falls back to the post's own title/excerpt. Fix by installing Yoast SEO + WPGraphQL for Yoast SEO, or unset `WP_SEO_PLUGIN` |
| Edits take minutes to appear | Webhook not firing. Test: `curl -X POST https://<site>/api/revalidate -H 'x-revalidate-secret: <secret>' -H 'content-type: application/json' -d '{"type":"all"}'` → expect `{"ok":true,…}`; 401 = secret mismatch. The CDN may still hold HTML for 60s (`proxy.ts`). |
| Preview button 401/404 | `PREVIEW_SECRET` mismatch, or app password missing/wrong → `getPostPreview` returns null |
| Images fail to load | `/media/…` 404 → `WP_URL` unset/wrong (the rewrite is built from it at build time — rebuild after changing it). A raw WordPress URL in HTML means a field bypassed `wpQuery` |
| WordPress domain visible on the site | Something rendered a URL that isn't under `/wp-content/uploads/`. Find it with `curl -s <page> \| grep <wp-host>` and route it through `/media` or `prepareContent` |
| Stale data on multi-instance self-hosting | Data cache is per instance; add a shared `cacheHandler` (README) |

Code entry points: `lib/wp/client.ts` (`wpQuery`, `WP_TAGS`), `app/api/revalidate/route.ts`, `app/api/preview/route.ts`, `app/blogs/preview/[id]/page.tsx`.

If setup steps or env vars change, update this skill, `README.md`, `.env.example` and CLAUDE.md → "Environment" together.
