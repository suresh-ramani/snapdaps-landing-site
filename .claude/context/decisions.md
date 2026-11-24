# Decisions the owner made

Newest first. Each says what was decided and why, so later work doesn't undo it. CLAUDE.md records
the resulting rules; this file records that the owner chose them.

## 2026-11-13
- **Use-case heroes are product windows.** The owner disliked the hero right side on the seven
  use-case pages (one stock photo + floating chips + QR card). Chosen from four options: a guest's
  gallery window for that event (`EventGalleryHero`). Rejected: photo + phone, photo mosaic, text-only.
- **Parallax / screenshot motion, our way.** Asked to learn from samaro.ai's scroll animations (GSAP +
  Lenis pinned scenes). We use CSS scroll-driven `sd-*` utilities only — no pinned scroll-jacking,
  no smooth-scroll library, decorative visuals only.
- **Ideas 1–3 from the samaro.ai review were built:** hands-on guest-view demo (`#try-it`, honest
  sample until a real demo event exists), "Who is Snapdaps for?" audience cards after the home hero,
  "Try it" buttons on feature rows. Not copied from samaro: no cookie-less tracking, no unsourced
  stats, no urgency banners, no smooth-scroll takeover.
- **Home page trimmed:** removed the "Built for weddings…" events wall and the "Studios and brands
  using Snapdaps" card from social proof; the section hides until real stats/videos exist.
- **Privacy-first bento tile** needed a real picture, not a lone lock icon → fanned prints, guest's
  own photo in front ("Yours"), others blurred with locks.
- **shadcn primitives over hand-built UI** where safe (Badge, Table, ToggleGroup, RadioGroup,
  Breadcrumb, Pagination; `flex flex-col gap-*` over `space-y-*`).

## 2026-10-27 → 2026-10-31
- **Scroll-linked sections everywhere** behave the same on every device: pinned, normal page scroll,
  clicks/swipes in sync, survives fast scrolling — always on the shared `scroll-tabs.tsx` engine.
- **`motion` (motion.dev) for scroll-triggered entrances**, only via `reveal.tsx` presets.
- **In-page links smooth-scroll with no `#hash` in the URL**, native scrolling (no Lenis).
- **Hindi in chat mocks**, in Devanagari, mixed with English/Hinglish (exact wording not yet confirmed
  by the owner).
- **Third-party UI:** free sources + our own builds only (repo is public).
- **Question-led pages:** Claude drafts copy, owner reviews; only facts the site already states.
  Birthday/corporate/award/sports pages were indexed on the owner's go-ahead (copy review pending).
- **Feature pages:** hybrid — four (later five) dedicated feature pages; the rest stay on `/features`.
- **Product facts and "not live yet" list** are in CLAUDE.md → Copy (team, 2026-10-31). Features
  not live appear only under "Coming soon" on `/pricing`.
- **Comparison pages ("vs …") are deferred** — "we will add comparison page later".
