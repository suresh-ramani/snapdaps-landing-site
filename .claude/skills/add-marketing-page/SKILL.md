---
name: add-marketing-page
description: Create a new indexable marketing route such as /about, /customers, /use-cases/[slug], /compare/[slug] or /security. Use when the user wants a new page (not a blog post) on the site.
---

# Add a marketing page

## Steps

1. **Copy in `content/site.ts`.** Add a typed export for the page's text. For a family of pages (`/use-cases/[slug]`) export an array with `slug`, like `features`. Placeholders say "Placeholder".
2. **Route file** `app/<route>/page.tsx` — server component, layout only:
   - Static page: `export const metadata = buildMetadata({ title, description, path: "/<route>" })`.
   - Dynamic page: `generateMetadata` + `notFound()` for unknown slugs. Copy the shape of `app/features/[slug]/page.tsx`.
   - Always pass `path` so the canonical is right. Description 150–160 chars.
   - Do **not** add `generateStaticParams`, `revalidate` or `dynamic = "force-static"` — the site is SSR on purpose (`await connection()` in the root layout).
3. **Structure:** one `<h1>` in a `container-page` header, then `<Section>` blocks from `components/blocks/`, ending with `<CtaBand />` where it fits.
4. **Breadcrumbs** for nested pages: `<Breadcrumbs items={[…]} />` (it emits `breadcrumbLd`).
5. **JSON-LD** only for what the page actually shows: `<Faq />` brings `faqLd`; pricing-like pages use `softwareLd`. Add new builders to `lib/seo.ts`, render with `<JsonLd>`.
6. **Sitemap:** add the URL (or map over the array) in `app/sitemap.ts` `staticRoutes`.
7. **Navigation:** add to `nav.main` or `nav.footer` in `content/site.ts` if users should find it.
8. **Non-indexable pages** (thank-you, internal): `noindex: true` in `buildMetadata`, leave out of the sitemap, and add to the `disallow` list in `app/robots.ts` if crawlers shouldn't fetch it.
9. If the page should never be CDN-cached, add its prefix to the `skip` check in `proxy.ts`.

## Done when

`npm run typecheck`, `npm run lint` and `npm run build` pass, the page renders at 375px, and `/sitemap.xml` lists it (if indexable). Consider running the `seo-reviewer` agent on the new route.
