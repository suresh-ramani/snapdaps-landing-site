# snapdaps.ai landing site + blog

Marketing site and blog for snapdaps.ai. Next.js 16 App Router, server-rendered on every request, Tailwind CSS v4, shadcn/ui, headless WordPress (WPGraphQL) for the blog.

> **Keep this file and `.claude/` current.** Any change that adds or renames a block, token, utility, route, content file or convention updates CLAUDE.md in the same change (the "Where things go" table and the Rules below) **and** the affected skills in `.claude/skills/` and review agents in `.claude/agents/`. A task isn't done until both match the code.

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
| Marketing sections | `components/blocks/*` — `Hero` (`layout="center"` = shadcn product wall, `"split"` = cards right; `titleLabel` = fixed aria-label when the title animates), `TypingWords` (typewriter word swap; first word server-rendered for SEO, emoji drawn by CSS), `LogoCloud` (client logos under the hero; becomes a constant-speed CSS marquee at 8+ logos, so the list can grow freely), `ChatMarquee` (two rows of client messages scrolling in opposite directions), `PainPoints` (scroll-linked tabs, desktop: pinned tabs + illustration; mobile: swipe cards), `TurningPoint` (dark bridge banner), `SolutionFlow` (animated photos → AI → guests), `ComparisonRows` (before/after pairs), `WorkflowSteps` (scroll-linked tabs, desktop: pinned step list + panel with the step's visual and bullets; mobile: every step stacked), `BentoGrid`/`FeatureBento`, `FeatureRows`, `OfferGrid`, `Story`, `SocialProof` (event-type wall linking to use-case pages + client logo grid of the first 8 clients), `CtaBand` (`ink-card`; pendrive / Google Drive / WhatsApp / WeTransfer crossed out → one QR card, `components/mock/old-way-swap.tsx`)/`MiniCta`, `PricingTable`, `Faq`; wrap custom sections in `<Section>` (`glow` adds the brand glow) |
| Anything that changes as you scroll (tabs/steps that swap a panel) | `components/blocks/scroll-tabs.tsx` — `useScrollTabs` + `ScrollTrack`, the one engine for every scroll-linked section. Don't write another scroll-spy |
| Product UI cards (real shadcn components, sample data) + product wall | `components/product/*` |
| Story / pain-point illustrations, photo tiles, faces, QR pattern | `components/mock/*` (`primitives.tsx`: `PhotoTile`, `Face`, `PhoneFrame`, `BrowserFrame`, `QrPattern`; `whatsapp.tsx`: `WhatsAppChat`) |
| Third-party brand marks (Google Drive, WhatsApp, WeTransfer) | `components/mock/brand-icons.tsx` — only to name that service, at its own colours, never larger than the text around it |
| Header / footer / logo / flag | `components/layout/*` — footer bottom bar reads "Made with ❤ in 🇮🇳" (lucide `Heart` labelled "love" + `IndiaFlag label="India"`, so screen readers hear "Made with love in India") (inline SVG, emoji flags break on Windows) |
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
- Marketing routes go into `content/routes.ts` (the sitemap reads it); pages with `indexed: false` pass `noindex: !isIndexed(PATH)`. Blog routes come from WordPress via `getSitemapEntries`. Non-indexable routes (search, preview, paginated archives) get `noindex` and a `robots.ts` disallow where appropriate.
- Images use `next/image` with real `alt` (empty `alt=""` only for decorative images). Above-the-fold images get `priority`.
- Pagination uses real URLs (`?after=` / `?before=`), never infinite scroll.

### Brand
- Logo: `components/layout/logo.tsx` (`Logo`, `LogoFull`, `LogoMark`), traced from `snapdaps_logo_1.pdf`. Static copies in `public/brand/` (SVG light/dark, mark, PNGs); favicon `app/icon.svg`, `app/apple-icon.png`. Never redraw or recolour the logo.
- Brand colours (from the logo): blue `#155DFC` (= `--primary`, AA on white), indigo `#5E5DF9`, violet `#AA5CF6` (gradient only — fails contrast as text). Wordmark is black (white in dark mode).
- Purple (logo's second colour): `--brand-violet` #AA5CF6 for decoration; for purple text/icons use `text-purple` (#8B3FE0 light / #BE8CF9 dark, both AA) on `bg-purple-soft`.
- Utilities: `icon-tile` (gradient square, white icon — feature icons, step numbers), `text-brand-gradient` (highlight lines only), `bg-brand-gradient`, `glow-brand` (soft section backdrop; `<Section glow>`). Buttons and links stay solid brand blue. Never put the gradient on body text or large areas.

### One theme across the site
The whole site is one SaaS theme. New sections reuse these pieces instead of inventing new looks:
- **Page rhythm:** sections alternate `bg-background` and `<Section tone="panel">`; vertical spacing is `section-y`, width is `container-page`.
- **Cards:** `surface` (hairline ring, `rounded-xl`) for content cards — its ring and shadow are a `box-shadow` drawn outside the box, so a parent with `overflow-hidden` or a mask cuts them off; clip only the axis you need (`overflow-x-clip`) and leave room for the shadow (see `ChatMarquee`); `surface-soft` for quieter ones; inner tiles use `bg-muted/50 ring-1 ring-border rounded-xl`. Corner radius goes `rounded-md` (photos) → `rounded-xl` (cards, tiles) → `rounded-2xl` (illustration panels) → `rounded-3xl` (`ink-card` only).
- **Dark moments:** only via the `ink-card` utility (`--ink-surface`, white text, logo-colour glows). Used by `TurningPoint` and `CtaBand` — at most one per screen. Primary button on ink = `bg-white text-ink-surface`; success ticks on ink = `text-ink-success`.
- **Colour meaning:** brand blue = action; gradient/violet = highlight; `before-*` (red) = old way/problem; `after-*` (green) = Snapdaps way/fix; `text-heart` only for the footer heart; `bg-whatsapp` only for WhatsApp actions.
- **Icons:** lucide at `size-4`/`size-5` in UI, emoji for friendly labels (event types, typing words); `icon-tile` for feature icons.
- **Type:** h2 section titles come from `<Section>`; card titles `text-lg font-semibold tracking-tight`; captions `text-sm text-muted-foreground`.

### Design
- Visual language follows shadcn/ui's homepage and Tailark blocks: neutral zinc surfaces, hairline rings (`surface`, `surface-soft` utilities), Geist type, brand blue only for primary actions and accents. Reference repos (MIT): shadcn-ui/ui, tailark/blocks, magicuidesign/magicui — keep the attribution comments in adapted files.
- Use semantic tokens (`bg-background`, `text-muted-foreground`, `bg-primary`, `bg-panel`, `bg-before`/`bg-after`, `bg-ink-surface`, `text-heart`, `bg-whatsapp`, `border`) — never raw hex in components. Only exceptions: illustrations in `components/mock/*` (photo tones, WhatsApp UI colours), third-party brand marks and the flag, which are intentionally theme-independent.
- New colors go in `globals.css` as a primitive, then a semantic variable, then `@theme inline`. Define both light and `.dark`.
- Font: Geist (via `next/font`) for headings and body. `font-display` maps to the same family.
- Avoid template tells: no ALL-CAPS eyebrow labels, no numbered markers unless the content is a real sequence, no fade-in on every section, no `→` appended to button text.
- Must work at 375px wide, keyboard focus visible, `prefers-reduced-motion` respected.

### Animation, speed and SEO
Animate where it explains something (beams, typing words, crossed-out old methods), never on every section. Every animation must pass all of these:
- **Content is never hidden behind an animation or JavaScript.** Server HTML already contains the final text (e.g. `TypingWords` renders the first word complete). No `opacity: 0` start states on content, no fade-in-on-scroll; entrance effects start from a visible state (`pop-in` starts at 0.35 opacity).
- **Compositor-only properties:** animate `transform` and `opacity` only. No `box-shadow`, `filter`, `width/height/top/left` or `background` animations (they repaint or re-layout every frame). Use a pseudo-element that scales/fades instead (see `.hub-pulse::after`). The only exception is the small SVG `stroke-dashoffset` beams in `SolutionFlow`.
- **Scroll-linked sections, one rule everywhere.** Any section that changes as you scroll uses `scroll-tabs.tsx` (`useScrollTabs` + `ScrollTrack`): the block is pinned while the page scrolls normally, each item gets half a screen, clicking or ↑/↓ smooth-scrolls to it (native `scrollTo`, instant under reduced motion). Every item's heading and main sentence stay visible in the pinned list, so fast scrolling never hides the story — scroll only swaps the panel; the mobile layout shows everything. Keep the pinned block within 36rem (`blockRem`) so it fits a laptop screen. Never take over the wheel/trackpad (no smooth-scroll libraries, no wheel `preventDefault`, no one-step-per-flick).
- **CSS first.** Loops are CSS keyframes in `globals.css`, not JS timers. JS only when state is needed (`TypingWords`, `PainPoints`, `WorkflowSteps`) — scroll-driven effects use IntersectionObserver (never `scroll` event listeners), timers pause off-screen and keep it in a small `"use client"` leaf, never a whole section.
- **No animation libraries** (`motion`, GSAP, Lottie) — patterns from Magic UI etc. are rebuilt in CSS.
- **No layout shift:** reserve space for anything that changes size (typing line has a fixed min height; marquee rows have fixed heights).
- **Reduced motion:** every keyframe has a `prefers-reduced-motion` fallback that shows the finished, meaningful state (struck-out cards, full QR card, static logo grid).

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
