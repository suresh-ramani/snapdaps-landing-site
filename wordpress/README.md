# WordPress mu-plugins for snapdaps.ai

Copy these into `wp-content/mu-plugins/` on the WordPress that powers the blog (must-use plugins load
automatically — nothing to activate). Keep them in sync with this folder.

| File | What it does |
|---|---|
| `snapdaps-announcement.php` | **Settings → Announcement** screen (on/off, message, button text + link, style, start/end, "also show on home hero") and the `announcement` WPGraphQL field the site reads. Saving calls `snapdaps_revalidate()` when it exists, so the bar updates within seconds. |
| `snapdaps-noindex.php` | Sends `X-Robots-Tag: noindex, nofollow` on the WordPress front end (not the GraphQL/REST API), so only the Next.js site is indexed. Use this instead of "Discourage search engines", which with Yoast noindexes every post. |

The revalidate + preview plugin (`snapdaps-revalidate.php`) holds secrets, so it lives as a snippet in the
main README → "WordPress setup" — fill in the secrets on the server, never commit them.
