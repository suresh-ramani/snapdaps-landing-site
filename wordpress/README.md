# WordPress mu-plugins for snapdaps.ai

Copy these into `wp-content/mu-plugins/` on the WordPress that powers the blog (must-use plugins load
automatically — nothing to activate). Keep them in sync with this folder.

| File | What it does |
|---|---|
| `snapdaps-announcement.php` | **Settings → Announcement** screen (on/off, message, button text + link, style, start/end, "also show on home hero") and the `announcement` WPGraphQL field the site reads. Saving calls `snapdaps_revalidate()` when it exists, so the bar updates within seconds. |
| `snapdaps-noindex.php` | Sends `X-Robots-Tag: noindex, nofollow` on the WordPress front end (not the GraphQL/REST API), so only the Next.js site is indexed. Use this instead of "Discourage search engines", which with Yoast noindexes every post. |

The revalidate + preview plugin (`snapdaps-revalidate.php`) holds secrets, so it lives as a snippet in the
main README → "WordPress setup" — fill in the secrets on the server, never commit them.

## Writing posts: callouts and tables

The site styles a few WordPress blocks specially (no plugin needed):

- **Key takeaways box** — add a **Group** block near the top, open *Advanced → Additional CSS class(es)* and enter `key-takeaways`. Inside it, add a heading "Key takeaways" and a short bullet list (3–5 points).
- **Stat with its source** — add a **Group** block with the class `stat-callout`. First paragraph: put the number in **bold** (it shows large), then the sentence. Second paragraph: the source as a link, in small text (`Source: …`). Never add a number without a source.
- **Tables** — use the normal **Table** block. Wide tables scroll sideways on phones automatically.

The article also adds its own call-to-action cards (one before the text, one before the third section), so writers don't need to add CTAs by hand.
