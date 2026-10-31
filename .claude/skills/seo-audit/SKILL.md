---
name: seo-audit
description: Audit the site (or specific routes) for technical SEO — metadata, canonicals, headings, JSON-LD, sitemap, robots, images, caching headers, content hidden behind animation. Use before launch, after adding routes, or when the user asks for an SEO check.
---

# SEO audit

Work from the code first, then confirm on a running build. Report findings as a list: route, problem, fix, file:line. Don't change code unless asked. The rules come from CLAUDE.md ("SEO", "Animation, speed and SEO", "Copy").

## 1. Static checks (read the code)

For every `app/**/page.tsx`:

- [ ] `metadata` / `generateMetadata` built with `buildMetadata()` or `postMetadata()` (`lib/seo.ts`) with the correct `path`. Content-doc titles use `absoluteTitle` (ending "| Snapdaps") — flag "| Snapdaps | Snapdaps" from using `title` with a suffixed string.
- [ ] Title unique; description 150–160 chars and not a placeholder.
- [ ] Exactly one `<h1>` — usually from `Hero` or `<Section as="h1">`; no section title that also renders `as="h1"`. Headings don't skip levels.
- [ ] JSON-LD matches visible content: `faqLd` via `<Faq>`, `breadcrumbLd` via `<Breadcrumbs>` (often in `Hero`'s `above`), `blogPostingLd` on posts, `softwareLd` on pricing; layout adds `organizationLd` + `websiteLd`.
- [ ] Every marketing route is in `content/routes.ts`. `indexed: false` pages pass `noindex: !isIndexed(PATH)`; pages that are `indexed: true` contain no "Placeholder" text.
- [ ] Blog: search, preview and paginated archives (`?after=`, `?before=`) are `noindex`.
- [ ] `app/robots.ts` disallows `/api/`, `/blogs/preview/`, `/blogs/search` and blocks everything on non-production.
- [ ] `proxy.ts` skips CDN caching for `/api/`, `/blogs/preview`, `/blogs/search` and draft mode.
- [ ] Animated text is complete in server HTML (`TypingWords` first word, no `opacity: 0` start states — `curl -s <url> | grep -c 'opacity:0[;"]'` must be 0, `titleLabel` on an animated `Hero` title).
- [ ] Images use `next/image` with real `alt`; the above-the-fold image has `priority`. `opengraph-image.tsx` files export a descriptive `alt`.
- [ ] No page sets `force-static`, `revalidate` or `generateStaticParams` (SSR is intentional; `app/sitemap.ts` revalidate is fine).
- [ ] Internal links use `next/link`; pagination uses real URLs.
- [ ] Question-led content: every marketing page except home has 2–4 question H2s (`QuestionSection`) each followed by a 40–60-word answer, a `faqs[PATH]` FAQ with no question repeated across pages, a `PageByline` (WebPage + `dateModified`), and its own keyword cluster (no two use-case pages targeting the same query). `/how-it-works` has HowTo, `/use-cases` has ItemList.
- [ ] Duplicate copy: no sentence of 12+ words repeated across use-case pages (compare server HTML); no "Placeholder"/"TODO" text on indexed pages.
- [ ] Blog: paginated pages (`?after=`/`?before=`) have a self canonical + `noindex, follow` + "(older posts)" title; `/blogs/search` has its own canonical; posts output BlogPosting with timezone dates, BreadcrumbList, and FAQPage only when a Yoast FAQ block is present; `/blogs` outputs Blog; WordPress doesn't have "Discourage search engines" on (with Yoast it noindexes every post).
- [ ] GEO/AEO: "What is Snapdaps?" definition + FAQ (FAQPage) on home; `/llms.txt` 200; decorative mock wrappers have `data-nosnippet`; Organization schema has contact details (and `sameAs` once social links exist).

## 2. Runtime checks

```bash
npm run build && npm start
```

Then for each route:

```bash
curl -s http://localhost:3000/<route> | grep -Eo '<title>[^<]*|rel="canonical"[^>]*|name="robots"[^>]*|<h1[^>]*>|application/ld\+json'
curl -sI http://localhost:3000/<route> | grep -i cdn-cache-control
curl -s http://localhost:3000/sitemap.xml | grep -o '<loc>[^<]*' 
curl -s http://localhost:3000/robots.txt
```

`robots.txt` disallows everything unless `NODE_ENV=production` (and `VERCEL_ENV=production` on Vercel). Canonicals use `NEXT_PUBLIC_SITE_URL` — flag it if it's still localhost/staging in production config.

## 3. Pre-launch (from README)

- `NEXT_PUBLIC_SITE_URL` set to production.
- No "Placeholder" left on indexed pages: `grep -rn Placeholder app content components`.
- Old WordPress URLs redirected in `next.config.ts`.
- Rich results test on home, pricing, one use case and one post; Lighthouse mobile LCP < 2.5s, CLS < 0.1.

For a deeper independent pass, run the `seo-reviewer` agent.

Also check: every JSON-LD node joins the `schemaIds` graph (`lib/seo.ts`); no heading text appears twice as `<hN>` (responsive double-renders use `role="heading"` on the hidden copy); canonical, sitemap, robots and schema URLs use the https production host (a production build warns/fails on localhost via `SITE_URL_STRICT`).
