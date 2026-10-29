---
name: add-marketing-page
description: Create a new marketing route such as a use-case page (/use-cases/<slug>), /about, /security, a comparison page, or a case study. Use when the user wants a new page that isn't a blog post.
---

# Add a marketing page

Every marketing page is hand-built — no dynamic `[slug]` routes for features or use cases. This follows CLAUDE.md → "Adding a page"; read it and the Rules first.

## Steps

1. **Copy the closest page.** For a use case, start from `app/use-cases/wedding-photo-sharing-app/page.tsx`; for a simple page, `app/how-it-works/page.tsx`. Keep the header comment: content-doc name, target keywords, and what the doc still lacks.
2. **Copy inline** in the new `page.tsx`, word for word from the content doc. Shared bits (CTAs, workflow, core features, plans) come from `content/site.ts`. Unknowns → `"Placeholder: …"` + `TODO`.
3. **Metadata:**
   ```ts
   const PATH = "/use-cases/<slug>";
   export const metadata = buildMetadata({
     absoluteTitle: "<Meta title from the doc> | Snapdaps", // already ends in "| Snapdaps"
     description: "<150–160 chars from the doc>",
     path: PATH,
     noindex: !isIndexed(PATH), // from content/routes.ts — include while the page may be unfinished
   });
   ```
   Use `title` (not `absoluteTitle`) only when you want the layout to append "| Snapdaps".
4. **Register the route** in `content/routes.ts`: `{ path, label, indexed, priority }`. `indexed: false` while copy is placeholder (noindex + out of the sitemap); flip to `true` when it's final. The sitemap reads this list — don't edit `app/sitemap.ts`.
5. **Structure:** one `<h1>` (from `Hero`, or `<Section as="h1">`), then sections, ending with `CtaBand`. Nested pages pass `<Breadcrumbs>` into `Hero`'s `above` prop (emits `breadcrumbLd`). Use the `add-landing-section` skill for the sections.
6. **Navigation:** link it from `nav` in `content/site.ts` if it belongs in the header/footer; use-case pages also show in `SocialProof`'s event-type wall.
7. **Social image (optional):** `opengraph-image.tsx` next to the page — copy the wedding one; `ogImage("Title")` from `lib/og.tsx`, with a descriptive `alt`.
8. **Never** add `generateStaticParams`, `revalidate` or `dynamic = "force-static"` — the site is SSR on purpose. If the page must never be CDN-cached, add its prefix to the `skip` check in `proxy.ts`; if crawlers shouldn't fetch it at all, add it to `disallow` in `app/robots.ts`.
9. **Keep docs current:** new conventions or blocks → update CLAUDE.md and `.claude/` in the same change.

## Done when

`npm run typecheck`, `npm run lint` and `npm run build` pass; the page renders at 375px; `/sitemap.xml` lists it only if `indexed: true`. Consider running the `seo-reviewer` agent on the new route.
