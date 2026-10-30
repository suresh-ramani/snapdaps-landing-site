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
| Copy shared across pages (brand, nav, CTAs, 5-step workflow, core features, plans) | `content/site.ts` — incl. `site.definition` (the ≈60-word "Snapdaps is…" answer, reused by the home page, FAQ, Organization/SoftwareApplication schema and `/llms.txt`) |
| Per-page FAQs | `content/faqs.ts` — `faqs[path]`, one list per page (home included), rendered with `<Faq items={faqs[PATH]} />` (FAQPage schema) and listed in `/llms.txt` for indexed pages. Answers state only facts the site already states; no question repeats across pages or repeats a question heading on its own page |
| List of marketing routes + indexed / noindex flag (drives the sitemap) | `content/routes.ts` |
| Marketing sections | `components/blocks/*` — `Hero` (`layout="center"` = shadcn product wall, `"split"` = cards right; `titleLabel` = fixed aria-label when the title animates), `TypingWords` (typewriter word swap; first word server-rendered for SEO, emoji drawn by CSS), `LogoCloud` (client logos under the hero; becomes a constant-speed CSS marquee at 8+ logos, so the list can grow freely), `ChatMarquee` (two rows of client messages scrolling in opposite directions), `PainPoints` (scroll-linked tabs, desktop: pinned tabs + illustration; phone/tablet: pinned swipe cards that advance on scroll, and a swipe moves the page to match), `TurningPoint` (dark bridge banner), `SolutionFlow` (animated photos → AI → guests), `ComparisonRows` (before/after pairs), `WorkflowSteps` (scroll-linked tabs, desktop: pinned step list + panel with the step's visual and bullets; mobile: every step stacked; `steps` = page-specific copy for the same 5 keys, so use-case pages don't repeat the shared workflow), `BentoGrid`/`FeatureBento`, `FeatureRows`, `OfferGrid`, `Story`, `SocialProof` (event-type wall linking to use-case pages + client logo grid of the first 8 clients), `CtaBand` (`ink-card`; pendrive / Google Drive / WhatsApp / WeTransfer crossed out → one QR card, `components/mock/old-way-swap.tsx`)/`MiniCta`, `PricingTable`, `QuestionSection` (question H2 + 40–60-word direct answer, then detail — the AEO pattern), `InfoCards` (row of `surface` cards: icon tile or step number, title, short body — the detail under a question), `PageByline` ("By the Snapdaps team · Updated <date>" + `WebPage` schema with `dateModified`; in the Hero `note` or the H1 section's intro), `Faq` (`tone` for the rhythm; centred heading, one `surface` card of divided questions with the first open, "Still have a question? Contact us" line, FAQPage schema; layout after Shadcn UI Kit's free FAQ 1, our own code); wrap custom sections in `<Section>` (`glow` adds the brand glow; `above` puts breadcrumbs over an `as="h1"` title) |
| Anything that changes as you scroll (tabs/steps that swap a panel) | `components/blocks/scroll-tabs.tsx` — `useScrollTabs` + `ScrollTrack`, the one engine for every scroll-linked section. Don't write another scroll-spy |
| Scroll-triggered entrances (cards rise, pairs slide in, bubbles pop) | `components/motion/reveal.tsx` — `RevealGroup` + `Reveal` with a named `preset` (`rise`, `fade`, `left`, `right`, `pop`, `sequence`). Used by `ComparisonRows`, `BentoGrid`, `OfferGrid`, `SocialProof`, `WhatsAppChat reveal` (Story chat). `MotionProvider` is in the root layout |
| Links to a section (`#id`, `/page#id`) | Plain `href` — `components/layout/smooth-anchors.tsx` (root layout) smooth-scrolls, moves focus and keeps `#id` out of the URL. Never add hash handling elsewhere |
| Product UI cards (real shadcn components, sample data) + product wall | `components/product/*` — small CSS loops make them feel live (`.upload-fill`, `.feed-row`, `.animate-scan`, `.animate-pop`) |
| Event photos (real images) | `public/photos/*.webp` (16 Unsplash photos, 640×800 WebP, sources + photographers in `public/photos/CREDITS.md`), mapped in `components/mock/photos.ts`: `weddingPool` (default for `PhotoTile` by `seed` — the product cards show a wedding) and `eventPhotos` (per use-case path, for the event-type wall and `/use-cases`). `PhotoTile` takes `photo` for a specific image and `sizes` close to its rendered size |
| Story / pain-point illustrations, photo tiles, faces, QR pattern | `components/mock/*` (`primitives.tsx`: `PhotoTile` (real photo via next/image, lazy, alt=""), `Face` (illustrated avatar — stays illustrated), `PhoneFrame`, `BrowserFrame`, `QrPattern`; `whatsapp.tsx`: `WhatsAppChat`; `share-orbit.tsx`: `ShareOrbit` — icon bubbles orbiting the Snapdaps mark, the share tile's visual in `FeatureBento`) |
| Third-party brand marks (Google Drive, WhatsApp, WeTransfer) | `components/mock/brand-icons.tsx` — only to name that service, at its own colours, never larger than the text around it |
| Header / footer / logo / flag | `components/layout/*` — header trial button shows at every width: `cta.trialShort` ("Try for free") below lg, `cta.trial.label` ("Start free trial") from lg; the phone menu sheet (`mobile-nav-sheet.tsx`) puts "Start free trial" + "Book a demo" at the top, above the links; footer bottom bar reads "Made with ❤ in 🇮🇳" (lucide `Heart` labelled "love" + `IndiaFlag label="India"`, so screen readers hear "Made with love in India") (inline SVG, emoji flags break on Windows) |
| Client logos | list in `content/clients.ts`, files in `public/clients/` — section hides on the live site while empty |
| Trust statistics | figures in `content/stats.ts` (with `statsSource` + `statsAsOf`, shown as a source line); `StatsBand` — embedded at the top of `SocialProof` (home) and as its own band on `/pricing`. Also on `/about`; add it wherever a page needs trust. Placeholder entries are dev-only; hidden on the live site until real figures exist. Final numbers in server HTML — no count-up from 0 |
| Video testimonials | list in `content/video-testimonials.ts` — either a `youtube` link (any form; plays in the youtube-nocookie embed only after click, captions added in YouTube Studio, thumbnail from i.ytimg.com) or an MP4 (`src` path in `public/testimonials/` or https URL, optional `av1` source and `poster`, `.vtt` captions required for real videos) that autoplays muted and looped while on screen — paused off screen, `preload="none"`, no autoplay under reduced motion; `VideoTestimonials` renders inside `SocialProof` with click-to-play cards (`video-player.tsx`, no video bytes until play) and `videoLd` schema — hidden on the live site while empty; entries with `placeholder: true` (currently three Big Buck Bunny previews) show only in dev, never in production or schema — delete them when real videos arrive |
| Book-a-demo popup + form | `components/demo/*`, posts to `app/api/demo/route.ts`. `BookDemoButton` is a plain button that loads `DemoDialog` on hover/focus/click (`next/dynamic`), so Radix dialog + form stay out of the initial JS; the phone menu does the same (`MobileNav` → `mobile-nav-sheet.tsx`). Both return focus to their button on close |
| Heavy decorative illustrations below the fold | `components/blocks/lazy-mount.tsx` — `LazyMount` renders a same-size placeholder and mounts children near the screen (layouts hidden at the breakpoint never mount). Reserve the real height (e.g. `visualMinH` in `how-it-works.tsx`) so nothing shifts. Scroll-linked panels use `useScrollTabs().isNear(i)` (active ±1 + seen). Never wrap text or headings |
| AI-crawler map | `app/llms.txt/route.ts` — generated from `site.definition`, indexed routes, core features, workflow and each indexed page's FAQ (`content/faqs.ts`); nothing to edit by hand |
| Blog UI | `components/blog/*` (routes live under `/blogs`) |
| shadcn primitives | `components/ui/*` — don't put app logic here |
| GraphQL queries / typed fetchers | `lib/wp/queries.ts`, `lib/wp/api.ts`, `lib/wp/types.ts` |
| Metadata + JSON-LD | `lib/seo.ts` (`buildMetadata`, `*Ld` builders — incl. `howToLd` on `/how-it-works`, `itemListLd` on the `/use-cases` hub, `webPageLd` via `PageByline`), rendered with `<JsonLd>`; social images via `lib/og.tsx` |
| Design tokens | `app/globals.css` |

### Adding a page
1. Create `app/<route>/page.tsx` by copying the closest existing page (e.g. a use-case page) and editing its copy inline.
2. Use `buildMetadata({ absoluteTitle, description, path })` — `absoluteTitle` for meta titles from the content doc (they already end in "| Snapdaps").
3. Add the route to `content/routes.ts` (`indexed: false` while copy is placeholder → noindex + out of the sitemap).
4. Link it from `content/site.ts` nav if it should appear in the header/footer.
5. Add `opengraph-image.tsx` next to it using `ogImage("Title")` from `lib/og.tsx`.
6. Add `<PageByline … updated="YYYY-MM-DD">`, 2–4 `QuestionSection`s and a `faqs[PATH]` list (see the SEO rules). Copy not from the content doc gets a header comment "Draft copy by Claude — not from the content doc; reviewed by: …" until the team signs it off.

## Rules

### SEO (every route)
- Export `metadata` or `generateMetadata` built with `buildMetadata()` / `postMetadata()`. Always pass `path` so the canonical URL is correct.
- Exactly one `<h1>` per page; headings in order.
- Add the matching JSON-LD (`faqLd` next to any FAQ, `breadcrumbLd` via `<Breadcrumbs>`, `blogPostingLd` on posts).
- Marketing routes go into `content/routes.ts` (the sitemap reads it); pages with `indexed: false` pass `noindex: !isIndexed(PATH)`. Blog routes come from WordPress via `getSitemapEntries`. Non-indexable routes (search, preview, paginated archives) get `noindex` and a `robots.ts` disallow where appropriate.
- Images use `next/image` with real `alt` (empty `alt=""` only for decorative images). Above-the-fold images get `priority`.
- Stock photos: only free Unsplash/Pexels photos (never Unsplash+ / premium), downloaded into `public/photos/`, cropped and small (WebP), each listed in `public/photos/CREDITS.md` with photographer and source URL. Event scenes only — avatars and anyone shown as a named sample guest stay illustrated (`Face`), so no stock model implies an endorsement.
- Pagination uses real URLs (`?after=` / `?before=`), never infinite scroll.
- Decorative illustrations that contain sample data (product cards, frames, flow diagrams, pain/workflow visuals) carry `data-nosnippet` on their `aria-hidden` wrapper `div`/`span`, so search snippets and AI answers never quote mock numbers. New mock wrappers do the same.
- GEO/AEO: the home page keeps the "What is Snapdaps?" definition and the FAQ (`faqs["/"]` → `<Faq>` → FAQPage). FAQ answers state only real product facts; pricing, accuracy and compliance answers wait for confirmed facts.
- Question-led content (every marketing page except home): 2–4 `QuestionSection`s whose H2 is a real search question ("How do you share wedding photos with guests?") followed by a 40–60-word answer that stands on its own; a per-page FAQ in `content/faqs.ts`; one keyword cluster per page so use-case pages don't compete. Use-case pages tell the workflow and features in that event's words (`WorkflowSteps steps`, `FeatureBento items`) — never the shared copy verbatim. "AI photo gallery" stays on home, `/how-it-works`, photographers and wedding.
- E-E-A-T: every marketing page shows `PageByline` (team byline linking to /about + updated date → `WebPage` schema). Bump `updated` when the page's copy changes. Named authors, founder bio, data-retention / DPDP answers and social profiles get added only once the team supplies them.

### Brand
- Logo: `components/layout/logo.tsx` (`Logo`, `LogoFull`, `LogoMark`), traced from `snapdaps_logo_1.pdf`. Static copies in `public/brand/` (SVG light/dark, mark, PNGs); favicon `app/icon.svg`, `app/apple-icon.png`. Never redraw or recolour the logo.
- Brand colours (from the logo): blue `#155DFC` (= `--primary`, AA on white), indigo `#5E5DF9`, violet `#AA5CF6` (gradient only — fails contrast as text). Wordmark is black (white in dark mode).
- Purple (logo's second colour): `--brand-violet` #AA5CF6 for decoration; for purple text/icons use `text-purple` (#8B3FE0 light / #BE8CF9 dark, both AA) on `bg-purple-soft`.
- Utilities: `icon-tile` (gradient square, white icon — feature icons, step numbers), `text-brand-gradient` (highlight lines only), `bg-brand-gradient`, `glow-brand` (soft section backdrop; `<Section glow>`). Buttons and links stay solid brand blue. Never put the gradient on body text or large areas.

### One theme across the site
The whole site is one SaaS theme. New sections reuse these pieces instead of inventing new looks:
- **Page rhythm:** sections alternate `bg-background` and `<Section tone="panel">`; vertical spacing is `section-y`, width is `container-page`.
- **Cards:** `surface` (hairline ring, `rounded-xl`) for content cards — its ring and shadow are a `box-shadow` drawn outside the box, so a parent with `overflow-hidden` or a mask cuts them off; clip only the axis you need (`overflow-x-clip`) and leave room for the shadow (see `ChatMarquee`). Swipe strips must scroll (`overflow-x-auto`), which clips vertically too — give them `pt-2 -mt-2` (see `PainCards`); `surface-soft` for quieter ones; inner tiles use `bg-muted/50 ring-1 ring-border rounded-xl`. Corner radius goes `rounded-md` (photos) → `rounded-xl` (cards, tiles) → `rounded-2xl` (illustration panels) → `rounded-3xl` (`ink-card` only).
- **Dark moments:** only via the `ink-card` utility (`--ink-surface`, white text, logo-colour glows). Used by `TurningPoint` and `CtaBand` — at most one per screen. Primary button on ink = `bg-white text-ink-surface`; success ticks on ink = `text-ink-success`.
- **Colour meaning:** brand blue = action; gradient/violet = highlight; `before-*` (red) = old way/problem; `after-*` (green) = Snapdaps way/fix; `text-heart` only for the footer heart; `bg-whatsapp` only for WhatsApp actions.
- **Icons:** lucide at `size-4`/`size-5` in UI, emoji for friendly labels (event types, typing words); `icon-tile` for feature icons.
- **Type:** h2 section titles come from `<Section>`; card titles `text-lg font-semibold tracking-tight`; captions `text-sm text-muted-foreground`.

### Design
- Visual language follows shadcn/ui's homepage and Tailark blocks: neutral zinc surfaces, hairline rings (`surface`, `surface-soft` utilities), Geist type, brand blue only for primary actions and accents. Reference repos (MIT): shadcn-ui/ui, tailark/blocks, magicuidesign/magicui — keep the attribution comments in adapted files.
- **Third-party blocks and licences.** This repo is public. Shadcn UI Kit (shadcnuikit.com) premium/Pro blocks and illustrations must never be committed — their licence bans publishing premium items in public repos; only items marked Free may be used. Shadcn Space (shadcnspace.com) free items are OK but must keep their copyright notice + licence text; their Pro items are off-limits. Prefer our own builds of a pattern (CSS, project tokens) with an "after <source> (licence)" comment, as done for `ShareOrbit` (Magic UI OrbitingCircles, MIT).
- Use semantic tokens (`bg-background`, `text-muted-foreground`, `bg-primary`, `bg-panel`, `bg-before`/`bg-after`, `bg-ink-surface`, `text-heart`, `bg-whatsapp`, `border`) — never raw hex in components. Only exceptions: illustrations in `components/mock/*` (photo tones, WhatsApp UI colours), third-party brand marks and the flag, which are intentionally theme-independent.
- New colors go in `globals.css` as a primitive, then a semantic variable, then `@theme inline`. Define both light and `.dark`.
- Font: Geist (via `next/font`) for headings and body. `font-display` maps to the same family. Noto Sans Devanagari (`--font-devanagari`, not preloaded, loads only where Hindi appears) is the fallback for Hindi glyphs only — not a second design font.
- Avoid template tells: no ALL-CAPS eyebrow labels, no numbered markers unless the content is a real sequence, no fade-in on every section, no `→` appended to button text.
- Must work at 375px wide, keyboard focus visible, `prefers-reduced-motion` respected.
- Theme follows the system light/dark setting (`ThemeProvider` `defaultTheme="system"`, live as the device switches). `ThemeToggle` flips to the other theme, but a choice that matches the system is saved as `system`, so the site goes back to following the device instead of locking in. Every component must look right in both themes.

### Animation, speed and SEO
Animate where it explains something (beams, typing words, crossed-out old methods), never on every section. Every animation must pass all of these:
- **Content is never hidden behind an animation or JavaScript.** Server HTML already contains the final text (e.g. `TypingWords` renders the first word complete). No `opacity: 0` start states on content: entrances start from a visible state (`Reveal` presets and `pop-in` start at 0.35 opacity). Scroll-triggered entrances go on content that arrives as a set (cards, pairs, chat bubbles) — never on headings, the hero, or every section.
- **Compositor-only properties:** animate `transform` and `opacity` only. No `box-shadow`, `filter`, `width/height/top/left` or `background` animations (they repaint or re-layout every frame). Use a pseudo-element that scales/fades instead (see `.hub-pulse::after`). The only exception is the small SVG `stroke-dashoffset` beams in `SolutionFlow`. SVG gradients on beams use `gradientUnits="userSpaceOnUse"` — a straight horizontal or vertical line has a zero-size bounding box, and the default `objectBoundingBox` gradient then isn't painted at all.
- **Scroll-linked sections, one rule everywhere.** Any section that changes as you scroll uses `scroll-tabs.tsx` (`useScrollTabs` + `ScrollTrack`): the block is pinned while the page scrolls normally, each item gets half a screen, clicking or ↑/↓ smooth-scrolls to it (native `scrollTo`, instant under reduced motion). Every item's heading and main sentence stay visible in the pinned list, so fast scrolling never hides the story — scroll only swaps the panel. Below lg, either stack every item with all its text (`WorkflowSteps`) or pin a swipe strip in its own track (`ScrollTrack display="lg:hidden"` + a second `useScrollTabs`, see `PainCards`) where each card holds its full text and swipe ↔ scroll stay in sync — swipes are read when the strip settles, never mid-glide. Keep the pinned block within 36rem (`blockRem`) so it fits a laptop screen. Never take over the wheel/trackpad (no smooth-scroll libraries, no wheel `preventDefault`, no one-step-per-flick).
- **CSS first.** Loops are CSS keyframes in `globals.css`, not JS timers. JS only when state is needed (`TypingWords`, `PainPoints`, `WorkflowSteps`) — scroll-driven effects use IntersectionObserver (never `scroll` event listeners), timers pause off-screen and keep it in a small `"use client"` leaf, never a whole section.
- **Motion only through `reveal.tsx`.** The `motion` package (motion.dev) is used for scroll-triggered entrances, always via `RevealGroup`/`Reveal` presets — never `motion.*` directly (`LazyMotion strict` throws) and never a new preset without adding it to `reveal.tsx`. No other animation libraries (GSAP, Lottie). Loops and hover effects stay CSS.
- **No layout shift:** reserve space for anything that changes size (typing line has a fixed min height; marquee rows have fixed heights).
- **Reduced motion:** every keyframe has a `prefers-reduced-motion` fallback that shows the finished, meaningful state (struck-out cards, full QR card, static logo grid). Motion entrances follow it automatically (`MotionConfig reducedMotion="user"`: transforms off, opacity still eases). In-page scrolling is instant under reduced motion.

### Copy
- Page copy comes from the content doc (Website_Content_*.docx). Keep its wording; keyword H1s stay in title case as written, other headings sentence case.
- Sentence case, plain verbs. Buttons say what happens ("Start free", not "Submit").
- Never invent testimonials, customer names or metrics. Placeholders say "Placeholder". Statistics come only from Snapdaps' own data, each set dated and sourced (`statsSource`, `statsAsOf`).
- Video testimonials: real customers with written consent only — no stock footage, actors, AI avatars or AI voices. The "Verified · Not AI-generated" badge shows only on entries with `verified` set, after the team has confirmed a real customer, self-recorded, unedited apart from trimming; `verifiedNote` explains that next to the videos. Keep consent and the check on file.
- Chat and conversation mocks (`ChatMarquee`, `ChatMock`, `WhatsAppChat`) mix English, Hinglish and Hindi in Devanagari, the way Indian family groups really read. Write Hindi in Devanagari (not romanised); `ChatMarquee` and `WhatsAppChat` add `lang="hi"` automatically via `hindiLang()` in `lib/utils.ts` — any other Hindi text needs `lang="hi"` by hand. Page copy from the content doc keeps its own wording.

### WordPress content
- Render post HTML only through `prepareContent()` in `lib/wp/content.ts` (sanitises, lazy-loads images, adds heading ids for the TOC, demotes stray `<h1>`).
- `WP_SEO_PLUGIN=yoast` adds `seo { ... }` fields to queries; code must still work when they're absent.

## Environment

See `.env.example`. Key vars: `NEXT_PUBLIC_SITE_URL`, `WP_GRAPHQL_URL`, `WP_URL`, `REVALIDATE_SECRET`, `PREVIEW_SECRET`, `WP_CACHE_SECONDS`, `RESEND_API_KEY` / `DEMO_INBOX` / `DEMO_FROM` (demo-request emails).

## Project skills

In `.claude/skills/`: `add-landing-section`, `add-marketing-page`, `add-blog-query`, `seo-audit`, `design-tokens`, `wordpress-setup`. Review agents in `.claude/agents/`: `seo-reviewer`, `ui-reviewer`.
