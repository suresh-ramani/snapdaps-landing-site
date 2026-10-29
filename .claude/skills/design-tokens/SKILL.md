---
name: design-tokens
description: Add or change colors, radii, spacing, fonts or the brand palette in app/globals.css, or rebrand the site. Use when the user wants a new color, a theme tweak, dark-mode fix, or asks why a color looks wrong.
---

# Design tokens

Everything lives in `app/globals.css`, in three layers. Components only ever use layer 2 (via Tailwind classes).

| Layer | Where | Examples |
|---|---|---|
| 1. Primitives | `:root` and `.dark`, top block | `--paper`, `--ink`, `--slate`, `--line`, `--cobalt`, `--flash` |
| 2. Semantic (shadcn contract) | `:root` and `.dark`, below primitives | `--background`, `--primary`, `--muted-foreground`, `--border`, `--highlight` |
| 3. Tailwind mapping | `@theme inline` | `--color-primary: var(--primary)` → `bg-primary`, `text-primary` |
| Marketing | `:root` + utilities | `--section-y`, `--reading`, `container-page`, `section-y`, `snap-frame`, `.prose-snap` |

## Add a new color

1. Primitive in `:root` **and** `.dark` (dark value checked for contrast).
2. Semantic variable in `:root` **and** `.dark` (e.g. `--success: var(--green)`, `--success-foreground`).
3. `--color-success: var(--success)` in `@theme inline`.
4. Use `bg-success` / `text-success-foreground` in components. Never raw hex.

## Rebrand

Change primitives only. Semantic names and components stay. Then check: text contrast ≥ 4.5:1 on `background` and `card` in both themes, `--ring` visible against both, `viewport.themeColor` in `app/layout.tsx` matches the new `--paper`.

## Rules

- `--highlight` (`--flash` yellow) is the one signature accent: `snap-frame` around product visuals and `::selection`. Don't use it for badges, buttons or decoration.
- Raw hex is allowed only in the fixed ink sections (`Section tone="ink"`, `CtaBand` button) that are intentionally theme-independent.
- Fonts: `font-display` = Bricolage Grotesque (headings, applied automatically to h1–h4), `font-sans` = Instrument Sans. Both load via `next/font` in `app/layout.tsx`. No third family.
- Keep the `prefers-reduced-motion` and `:focus-visible` rules in `@layer base` intact.
- Radius: use `rounded-sm|md|lg|xl` (derived from `--radius`), not arbitrary values.

## Verify

Toggle the theme toggle in the header and check home, pricing, a blog post (`.prose-snap`) in light and dark. `npm run build`.
