---
name: seo-audit
description: Audit the site (or specific routes) for technical SEO — metadata, canonicals, headings, JSON-LD, sitemap, robots, images, caching headers. Use before launch, after adding routes, or when the user asks for an SEO check.
---

# SEO audit

Work from the code first, then confirm on a running build. Report findings as a list: route, problem, fix, file:line. Don't change code unless asked.

## 1. Static checks (read the code)

For every `app/**/page.tsx`:

- [ ] Exports `metadata` / `generateMetadata` built with `buildMetadata()` or `postMetadata()` from `lib/seo.ts`, with the correct `path`.
- [ ] Title is unique; description 150–160 chars and not a placeholder.
- [ ] Exactly one `<h1>` (check the components it renders too — `Hero` owns the home page `<h1>`); headings don't skip levels.
- [ ] JSON-LD matches visible content: `faqLd` via `<Faq>`, `breadcrumbLd` via `<Breadcrumbs>`, `blogPostingLd` on posts, `softwareLd` on pricing.
- [ ] Indexable → listed in `app/sitemap.ts`. Search / preview / paginated (`?after=`, `?before=`) → `noindex`.
- [ ] `app/robots.ts` disallows `/api/`, `/blog/preview/`, `/blog/search` and blocks everything on non-production.
- [ ] Images use `next/image` with real `alt`; above-the-fold image has `priority`.
- [ ] No page sets `force-static`, `revalidate` or `generateStaticParams` (SSR is intentional).
- [ ] `proxy.ts` skips CDN caching for search, preview and API.
- [ ] Internal links use `next/link`; pagination uses real URLs.

## 2. Runtime checks

```bash
npm run build && npm start
```

Then for each route:

```bash
curl -s http://localhost:3000/<route> | grep -Eo '<title>[^<]*|rel="canonical"[^>]*|name="robots"[^>]*|<h1[^>]*>|application/ld\+json' 
curl -sI http://localhost:3000/<route> | grep -i cdn-cache-control
curl -s http://localhost:3000/sitemap.xml | head
curl -s http://localhost:3000/robots.txt
```

Canonicals use `NEXT_PUBLIC_SITE_URL`; on localhost they'll point at whatever that's set to — flag if it's still `localhost` in a production env file.

## 3. Pre-launch (from README)

- `NEXT_PUBLIC_SITE_URL` set to production.
- Every "Placeholder" in `content/site.ts` replaced (`grep -rn Placeholder content app components`).
- Old WordPress URLs redirected in `next.config.ts`.
- Rich results test on home, pricing and one post; Lighthouse mobile LCP < 2.5s, CLS < 0.1.

For a deeper independent pass, run the `seo-reviewer` agent.
