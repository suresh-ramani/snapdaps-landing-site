---
name: add-landing-section
description: Add or change a section on a marketing page (home, features, how it works, pricing, a use-case page) — e.g. a story, comparison, workflow, bento, offer grid, social proof, CTA. Use when the user asks for a new section, block or band, or to reuse an existing block on another page.
---

# Add a landing section

CLAUDE.md is the source of truth for the rules ("One theme across the site", "Design", "Animation, speed and SEO", "Copy"). This skill is the procedure. Read those sections before starting.

## 1. Reuse before you build

Check the blocks listed in CLAUDE.md's "Where things go" table first — most requests are an existing block with new props:

| Want | Use |
|---|---|
| Page hero | `Hero` (`layout="center"` product wall / `"split"` cards; `above` for breadcrumbs; `titleLabel` if the title animates) |
| Problem narrative | `Story` (`tone="problem"`, `visual`, `narrative`, `powerLine`, `close`) or `PainPoints` |
| Old way vs new way | `ComparisonRows` (`before-*` red / `after-*` green) |
| Steps | `WorkflowSteps` inside a `<Section>` or `QuestionSection`; pass `steps` with the page's own wording for the same 5 keys on use-case pages |
| Anything new that changes on scroll | Build it on `useScrollTabs` + `ScrollTrack` from `scroll-tabs.tsx` (see `PainPoints`, `WorkflowSteps`) |
| Feature overview | `FeatureBento`, `BentoGrid`/`BentoCard`, `FeatureRows`, `OfferGrid` |
| Dark bridge / closing | `TurningPoint`, `CtaBand` / `MiniCta` (one `ink-card` per screen) |
| Proof | `LogoCloud`, `SocialProof`, `ChatMarquee` |
| Questions | `Faq items={faqs[PATH]}` from `content/faqs.ts` (emits `faqLd`) |
| A search question answered on the page | `QuestionSection` (question H2 + 40–60-word answer) with detail as children — `InfoCards` (icon or numbered cards), `ComparisonRows`, `WorkflowSteps` |
| Product visuals | `components/product/*` cards, `components/mock/*` primitives (`PhotoTile` = real event photos from `components/mock/photos.ts`; new photos → `public/photos/` + `CREDITS.md`) — below the fold, wrap heavy ones in `LazyMount` with their height reserved; mock wrappers get `data-nosnippet` |

## 2. Copy

- Copy for one page goes **inline in that page's `page.tsx`**, taken from the content doc (Website_Content_*.docx) word for word. Keyword H1s keep the doc's title case.
- Copy shared across pages (brand, nav, CTAs, 5-step workflow, core features, plans) lives in `content/site.ts`.
- Missing copy → `"Placeholder: …"` plus a `TODO` comment saying what the doc is missing (see the wedding page header comment). Never invent clients, quotes or numbers.

## 3. Build a new block (only if nothing fits)

- `components/blocks/<name>.tsx`, server component. Interactivity goes in a small `"use client"` leaf, never the whole section.
- Wrap in `<Section id title intro tone glow>` from `./section`. Alternate `default` and `tone="panel"` with the neighbouring sections. `<PowerLine>` for the single emphasised line.
- Section title is the `<h2>`; items are `<h3>` (blocks take a `headingLevel`/`stepHeading` prop when a page needs otherwise). `as="h1"` only when the section title *is* the page title.
- Cards: `surface` / `surface-soft`; inner tiles `bg-muted/50 ring-1 ring-border rounded-xl`. Radius ladder `rounded-md` → `xl` → `2xl` → `3xl` (ink-card only).
- Colour meaning: blue = action, gradient/violet = highlight, `before-*` = problem, `after-*` = fix. Semantic tokens only — raw hex only in `components/mock/*`, brand marks and the flag.
- Icons: lucide `size-4`/`size-5`; `icon-tile` for feature icons.
- Images: `next/image`, real `alt`, `priority` if above the fold.

## 4. Animation (only if it explains something)

Content visible in server HTML, `transform`/`opacity` only. Loops: CSS keyframes in `globals.css` with a `prefers-reduced-motion` fallback. Content that arrives as a set (cards, pairs, bubbles): wrap the list in `RevealGroup` and each item in `Reveal` with a preset from `components/motion/reveal.tsx` — not on headings or the hero. Anything that changes as you scroll: `scroll-tabs.tsx`. Section links: plain `href="#id"` (SmoothAnchors keeps the URL clean). Reserve space (no layout shift).

## 5. Keep docs current

If you added or renamed a block, token, utility or convention, update CLAUDE.md's "Where things go" table / Rules **and** any affected file in `.claude/` in the same change.

## Done when

`npm run typecheck`, `npm run lint` and `npm run build` pass; the page has one `<h1>` with headings in order; it works at 375px, with keyboard focus and with reduced motion. Consider running the `ui-reviewer` agent.
