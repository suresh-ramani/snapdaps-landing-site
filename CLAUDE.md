# snapdaps.ai landing site + blog

Marketing site and blog for snapdaps.ai. Next.js 16 App Router, server-rendered on every request, Tailwind CSS v4, shadcn/ui, headless WordPress (WPGraphQL) for the blog.

## Commands

```bash
npm run dev         # local dev on :3000
npm run build       # production build — run before saying work is done
npm run typecheck   # tsc --noEmit
npm run lint        # ESLint 9 flat config (eslint.config.mjs)
```

Linting runs ESLint directly — Next 16 removed `next lint`. `eslint.config.mjs` uses `eslint-config-next` (core-web-vitals + typescript, which includes jsx-a11y). Stay on ESLint 9: the bundled `eslint-plugin-react` doesn't support ESLint 10 yet. Before saying work is done, run `typecheck`, `lint` and `build`.

Add shadcn components with `npx shadcn@latest add <name>` (config in `components.json`, style new-york, RSC on).

## Architecture (read before changing anything)

- **Rendering is SSR.** `app/layout.tsx` calls `await connection()`, so every route renders per request. Do not add `export const dynamic = "force-static"`, `generateStaticParams` or `revalidate` on pages to "make it static" — the team chose SSR on purpose.
- **WordPress data is cached, pages are not.** All WordPress calls go through `wpQuery()` in `lib/wp/client.ts`, which caches responses in the Next data cache for `WP_CACHE_SECONDS` and tags them (`WP_TAGS`). Never call `fetch()` to WordPress directly from a page or component.
- **Cache invalidation** happens in `app/api/revalidate/route.ts`, called by a WordPress mu-plugin (snippet in README). New tags must be added to `WP_TAGS` and handled there.
- **CDN headers** for public HTML are set in `proxy.ts` (Next 16's renamed middleware). Search, preview and API routes must stay uncached.
- **Slow WordPress-backed sections stream** inside `<Suspense>` (latest posts, related posts). Keep anything that isn't the page's main content out of the critical path.
- **Server components by default.** Add `"use client"` only for interactivity (menu sheet, theme toggle, accordion, TOC). Never import `lib/wp/*` into a client component — those modules are `server-only`.

## Where things go

| Need | Location |
|---|---|
| Copy for one page | **That page's own `page.tsx`** — every marketing page is hand-built, no dynamic `[slug]` routes for features or use cases |
| Copy shared across pages (brand, nav, CTAs, 5-step workflow, core features, plans) | `content/site.ts` |
| List of marketing routes + indexed / noindex flag (drives the sitemap) | `content/routes.ts` |
| Marketing sections | `components/blocks/*` — `Hero` (`layout="center"` = shadcn product wall, `"split"` = cards right), `LogoCloud`, `ChatMarquee` (scrolling client messages), `PainPoints` (auto-advancing list + visual; swipe cards on mobile), `TurningPoint` (dark bridge banner), `SolutionFlow` (animated photos → AI → guests), `ComparisonRows` (before/after pairs), `WorkflowSteps` (scroll-spy), `BentoGrid`/`FeatureBento`, `FeatureRows`, `OfferGrid`, `Story`, `SocialProof`, `CtaBand`/`MiniCta`, `PricingTable`, `Faq`; wrap custom sections in `<Section>` (`glow` adds the brand glow) |
| Product UI cards (real shadcn components, sample data) + product wall | `components/product/*` |
| Story / pain-point illustrations, photo tiles, faces | `components/mock/*` |
| Client logos | list in `content/clients.ts`, files in `public/clients/` — section hides on the live site while empty |
| Book-a-demo popup + form | `components/demo/*`, posts to `app/api/demo/route.ts` |
| Blog UI | `components/blog/*` (routes live under `/blogs`) |
| shadcn primitives | `components/ui/*` — don't put app logic here |
| GraphQL queries / typed fetchers | `lib/wp/queries.ts`, `lib/wp/api.ts`, `lib/wp/types.ts` |
| Metadata + JSON-LD | `lib/seo.ts` (`buildMetadata`, `*Ld` builders), rendered with `<JsonLd>`; social images via `lib/og.tsx` |
| Design tokens | `app/globals.css` |

### Adding a page
1. Create `app/<route>/page.tsx` by copying the closest existing page (e.g. a use-case page) and editing its copy inline.
2. Use `buildMetadata({ absoluteTitle, description, path })` — `absoluteTitle` for meta titles from the content doc (they already end in "| Snapdaps").
3. Add the route to `content/routes.ts` (`indexed: false` while copy is placeholder → noindex + out of the sitemap).
4. Link it from `content/site.ts` nav if it should appear in the header/footer.
5. Optional: add `opengraph-image.tsx` next to it using `ogImage("Title")` from `lib/og.tsx`.

## Rules

### SEO (every route)
- Export `metadata` or `generateMetadata` built with `buildMetadata()` / `postMetadata()`. Always pass `path` so the canonical URL is correct.
- Exactly one `<h1>` per page; headings in order.
- Add the matching JSON-LD (`faqLd` next to any FAQ, `breadcrumbLd` via `<Breadcrumbs>`, `blogPostingLd` on posts).
- New indexable routes go into `app/sitemap.ts`. Non-indexable routes (search, preview, paginated archives) get `noindex` and a `robots.ts` disallow where appropriate.
- Images use `next/image` with real `alt` (empty `alt=""` only for decorative images). Above-the-fold images get `priority`.
- Pagination uses real URLs (`?after=` / `?before=`), never infinite scroll.

### Brand
- Logo: `components/layout/logo.tsx` (`Logo`, `LogoFull`, `LogoMark`), traced from `snapdaps_logo_1.pdf`. Static copies in `public/brand/` (SVG light/dark, mark, PNGs); favicon `app/icon.svg`, `app/apple-icon.png`. Never redraw or recolour the logo.
- Brand colours (from the logo): blue `#155DFC` (= `--primary`, AA on white), indigo `#5E5DF9`, violet `#AA5CF6` (gradient only — fails contrast as text). Wordmark is black (white in dark mode).
- Purple (logo's second colour): `--brand-violet` #AA5CF6 for decoration; for purple text/icons use `text-purple` (#8B3FE0 light / #BE8CF9 dark, both AA) on `bg-purple-soft`.
- Utilities: `icon-tile` (gradient square, white icon — feature icons, step numbers), `text-brand-gradient` (highlight lines only), `bg-brand-gradient`, `glow-brand` (soft section backdrop; `<Section glow>`). Buttons and links stay solid brand blue. Never put the gradient on body text or large areas.

### Design
- Visual language follows shadcn/ui's homepage and Tailark blocks: neutral zinc surfaces, hairline rings (`surface`, `surface-soft` utilities), Geist type, brand blue only for primary actions and accents. Reference repos (MIT): shadcn-ui/ui, tailark/blocks, magicuidesign/magicui — keep the attribution comments in adapted files.
- Use semantic tokens (`bg-background`, `text-muted-foreground`, `bg-primary`, `bg-panel`, `bg-before`/`bg-after`, `border`) — never raw hex in components, except the fixed ink sections and the illustrations in `components/mock/*` (photo tones, WhatsApp green), which are intentionally theme-independent.
- New colors go in `globals.css` as a primitive, then a semantic variable, then `@theme inline`. Define both light and `.dark`.
- Font: Geist (via `next/font`) for headings and body. `font-display` maps to the same family.
- Avoid template tells: no ALL-CAPS eyebrow labels, no numbered markers unless the content is a real sequence, no fade-in on every section, no `→` appended to button text.
- Must work at 375px wide, keyboard focus visible, `prefers-reduced-motion` respected.

### Copy
- Page copy comes from the content doc (Website_Content_*.docx). Keep its wording; keyword H1s stay in title case as written, other headings sentence case.
- Sentence case, plain verbs. Buttons say what happens ("Start free", not "Submit").
- Never invent testimonials, customer names or metrics. Placeholders say "Placeholder".

### WordPress content
- Render post HTML only through `prepareContent()` in `lib/wp/content.ts` (sanitises, lazy-loads images, adds heading ids for the TOC, demotes stray `<h1>`).
- `WP_SEO_PLUGIN=yoast` adds `seo { ... }` fields to queries; code must still work when they're absent.

## Environment

See `.env.example`. Key vars: `NEXT_PUBLIC_SITE_URL`, `WP_GRAPHQL_URL`, `WP_URL`, `REVALIDATE_SECRET`, `PREVIEW_SECRET`, `WP_CACHE_SECONDS`, `RESEND_API_KEY` / `DEMO_INBOX` / `DEMO_FROM` (demo-request emails).

## Project skills

In `.claude/skills/`: `add-landing-section`, `add-marketing-page`, `add-blog-query`, `seo-audit`, `design-tokens`, `wordpress-setup`. Review agents in `.claude/agents/`: `seo-reviewer`, `ui-reviewer`.
