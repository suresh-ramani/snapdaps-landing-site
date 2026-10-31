---
name: add-marketing-page
description: Create a new marketing route such as a use-case page (/use-cases/<slug>), /about, /security, a comparison page, or a case study. Use when the user wants a new page that isn't a blog post.
---

# Add a marketing page

Every marketing page is hand-built — no dynamic `[slug]` routes for features or use cases. This follows CLAUDE.md → "Adding a page"; read it and the Rules first.

## Steps

1. **Copy the closest page.** Feature pages (`/features/<slug>`) copy `app/features/ai-face-search/page.tsx`. For a use case, start from `app/use-cases/wedding-photo-sharing-app/page.tsx`; for a simple page, `app/how-it-works/page.tsx`. Keep the header comment: content-doc name, target keywords, and what the doc still lacks.
2. **Copy inline** in the new `page.tsx`, word for word from the content doc. Shared bits (CTAs, plans) come from `content/site.ts`; use-case pages tell the workflow and features in their own event's words (`WorkflowSteps steps={…}`, `FeatureBento items={…}`, see the wedding and birthday pages) instead of the shared copy. Copy you draft (not from the doc) gets "Draft copy by Claude — not from the content doc; reviewed by: …" in the header comment and stays `indexed: false` until the team approves it. Never invent facts, numbers or testimonials; leave unconfirmed claims out rather than adding placeholders to indexed pages.
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
5. **Structure:** one `<h1>` (from `Hero`, or `<Section as="h1">`), then sections, ending with `Faq` + `CtaBand`. Pages pass `<Breadcrumbs>` into `Hero`'s or `Section`'s `above` prop (emits `breadcrumbLd`). Use the `add-landing-section` skill for the sections.
   - **Byline:** `<PageByline name description path updated={updatedOf(PATH)} />` under the H1, with `updated: "YYYY-MM-DD"` on the route in `content/routes.ts` (also the sitemap lastmod) (Hero `note`, or in the H1 section's `intro`) — emits `WebPage` schema with `dateModified`.
   - **Question sections:** 2–4 `QuestionSection`s, each a real search question as the H2 with a 40–60-word standalone answer, then detail (`InfoCards`, `ComparisonRows`, `WorkflowSteps`).
   - **Use-case pages:** wrap the page in `<PhotoPool {...eventSamples[PATH]}>` after adding that event's sample (name, four folders, 6+ credited photos) to `eventSamples` in `components/mock/photos.ts`, so product cards never show another event's photos. `Hero visual={<EventPhotoHero …/>}` with a new credited photo, `UseCaseLead` right after the hero (summary, takeaways, best-for, its own animated scene — preferably a free LottieFiles animation (ask the user before downloading), recoloured to the logo palette and played with `LottieScene` (see CLAUDE.md, credit it in `public/animations/CREDITS.md`), or else a new SVG scene in `components/mock/event-scenes.tsx`), and `LeadCapture` before the FAQ (that event's offer, `event`, role). Nothing copied from another use-case page.
   - **FAQ:** add `faqs[PATH]` (4–6 questions) to `content/faqs.ts` and render `<Faq items={faqs[PATH]} />`. No question may repeat another page's FAQ or this page's question headings.
6. **Navigation:** link it from `nav` in `content/site.ts` if it belongs in the header/footer; use-case pages also show in `SocialProof`'s event-type wall.
7. **Social image:** `opengraph-image.tsx` next to the page — copy the wedding one; `ogImage("Title")` from `lib/og.tsx`, with a descriptive `alt`.
8. **Never** add `generateStaticParams`, `revalidate` or `dynamic = "force-static"` — the site is SSR on purpose. If the page must never be CDN-cached, add its prefix to the `skip` check in `proxy.ts`; if crawlers shouldn't fetch it at all, add it to `disallow` in `app/robots.ts`.
9. **Keep docs current:** new conventions or blocks → update CLAUDE.md and `.claude/` in the same change.

## Done when

`npm run typecheck`, `npm run lint` and `npm run build` pass; the page renders at 375px; `/sitemap.xml` lists it only if `indexed: true`. Consider running the `seo-reviewer` agent on the new route.
