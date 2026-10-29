---
name: add-landing-section
description: Add a new marketing section (block) to the home page or another marketing page — e.g. a comparison table, integrations list, stats band, use cases. Use when the user asks for a new section, block or band on a landing/marketing page.
---

# Add a landing section

A section is a server component in `components/blocks/`, its copy in `content/site.ts`, and one line in the page that uses it.

## Steps

1. **Copy first.** Add a typed export to `content/site.ts` (follow `features`, `steps`, `plans`). Unknown text is `"Placeholder: …"` — never invent customers, quotes, logos or numbers.
2. **Create `components/blocks/<name>.tsx`.**
   - Server component (no `"use client"`). If one small part needs interactivity, put only that part in its own client component.
   - Wrap in `<Section id="<name>" title=… intro=…>` from `./section`. Use `tone="card"` or `tone="ink"` to vary rhythm instead of custom padding/backgrounds.
   - The section title is the `<h2>` (Section renders it). Items inside use `<h3>`. Never add an `<h1>`.
   - Lists of things are `<ul>/<li>`.
3. **Mount it** in the page (`app/page.tsx`, etc.) in reading order. Pages stay layout-only.
   - If it fetches WordPress data, wrap it in `<Suspense fallback={null}>` like `<LatestPosts />`, call `lib/wp/api.ts` functions (never `fetch`), and `.catch()` to render nothing on failure.
4. **Schema:** FAQ-like content → reuse `<Faq items={…} />` (it emits `faqLd`). Don't add JSON-LD that doesn't describe visible content.
5. **Hide when empty** if the content may not exist yet (see `testimonials.tsx` returning `null`).

## Design rules (from CLAUDE.md)

- Semantic tokens only: `bg-card`, `text-muted-foreground`, `bg-primary`, `border`. Raw hex only inside `tone="ink"`.
- `font-display` comes automatically on `h1–h4`. No new font families.
- `snap-frame` / `--highlight` only around a product visual.
- No ALL-CAPS eyebrows, no "01 / 02" markers unless it's a real sequence, no `→` on buttons, no fade-in on scroll.
- Images: `next/image`, real `alt`, `priority` only if above the fold.
- Check at 375px wide and with keyboard focus.

## Done when

`npm run typecheck`, `npm run lint` and `npm run build` pass, and the page still has exactly one `<h1>` with headings in order.
