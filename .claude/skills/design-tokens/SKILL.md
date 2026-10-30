---
name: design-tokens
description: Add or change colours, radii, spacing, utilities, keyframes or fonts in app/globals.css. Use when the user wants a new colour or surface style, a theme or dark-mode fix, a new CSS animation, or asks why a colour looks wrong.
---

# Design tokens

Everything lives in `app/globals.css`. Components use only semantic tokens and the named utilities. The rules for *when* to use each one are in CLAUDE.md → "Brand", "One theme across the site", "Design", "Animation, speed and SEO".

## Layers

| Layer | Where | Examples |
|---|---|---|
| 1. Primitives | top of `:root`, overridden in `.dark` | `--paper`, `--ink`, `--slate`, `--line`, `--mist`, `--brand-blue`, `--brand-indigo`, `--brand-violet`, `--purple-ink`, `--rose-*`, `--mint-*`, `--night`, `--love`, `--whatsapp-green` |
| 2. Semantic | `:root` below primitives | shadcn set (`--background`, `--primary`, `--muted-foreground`, `--border`, `--ring`…) + site set (`--panel`, `--before*`, `--after*`, `--ink-surface*`, `--ink-success`, `--heart`, `--whatsapp`, `--section-y`, `--reading`) |
| 3. Tailwind mapping | `@theme inline` | `--color-panel: var(--panel)` → `bg-panel`; `--font-sans`/`--font-display` (both Geist) |
| Utilities | `@utility` blocks | `container-page`, `section-y`, `surface`, `surface-soft`, `ink-card`, `icon-tile`, `bg-brand-gradient`, `text-brand-gradient`, `glow-brand`, `fade-b`, `animate-marquee` (vars `--marquee-duration`, `--marquee-gap`, `--marquee-direction`; set them as variables, not `animation-*` properties, which the shorthand overrides) |
| Animations | `@keyframes` + classes | `pop-in`, `scan`, `shake`, `marquee`, `beam-travel`/`.beam-pulse`, `hub-ring`/`.hub-pulse`, `pain-progress`, `emoji-pop`, `.typing-caret`, `old-*`/`.old-card`, `qr-in`/`.qr-card` |
| Blog prose | `.prose-snap` | WordPress article typography |

## Add a colour

1. Primitive in `:root` **and** `.dark` (check contrast: ≥ 4.5:1 for text on `background` and `card`). Note the ratio in a comment like the existing ones.
2. Semantic variable (e.g. `--success`, `--success-foreground`) — in `.dark` only if it maps to a different primitive.
3. `--color-success: var(--success)` in `@theme inline`.
4. Use `bg-success` etc. Raw hex is allowed only in `components/mock/*`, third-party brand marks and the flag.
5. Give it one meaning and add it to CLAUDE.md → "Colour meaning".

## Brand constraints

- Logo colours: blue `#155DFC` (= `--primary`), indigo `#5E5DF9`, violet `#AA5CF6`. Violet fails contrast as text — use `text-purple` on `bg-purple-soft` for purple text/icons.
- Gradient (`bg-brand-gradient`, `text-brand-gradient`, `glow-brand`) for highlights only — never body text, buttons or large areas. Buttons and links stay solid blue.
- Never redraw or recolour the logo (`components/layout/logo.tsx`, `public/brand/`, `lib/brand.ts`).
- One font family: Geist via `next/font` in `app/layout.tsx`.

## Add an animation

Keyframes in `globals.css`, animating `transform`/`opacity` only (pseudo-element trick for glows, see `.hub-pulse::after`). Start from a visible state. Add a `prefers-reduced-motion` rule that shows the finished state. No JS timers or animation libraries.

## Keep docs current

New token, utility or keyframe → add it to the tables above and to CLAUDE.md ("Where things go" / "One theme across the site") in the same change.

## Verify

Toggle light/dark and check home, a use-case page, pricing and a blog post (`.prose-snap`). Check the CtaBand/TurningPoint ink cards in both themes. `npm run lint && npm run build`.
