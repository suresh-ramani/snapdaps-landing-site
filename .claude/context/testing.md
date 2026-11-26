# Testing and environment notes

## Checking UI live (Claude desktop app's browser pane)
- **Use the owner's dev server.** They usually have `npm run dev` on :3000 already. Starting a
  second one fails (takes :3001, then exits "Another next dev server is already running"). Open
  http://localhost:3000 in the pane instead. Check what :3000 actually serves first — on
  2026-11-26 it was another local app, so Snapdaps ran via the `dev-3001` launch config on :3001.
- **Show the pane first.** When it's hidden, IntersectionObserver callbacks and animations don't run
  and `innerWidth` reads 0, so scroll-linked sections look broken when they aren't.
- **Set the viewport.** The pane is narrower than `lg`, so the site silently shows the phone layout.
  Use 1280×800 for desktop, the `mobile` (375×812) or `tablet` (768×1024) presets, and reset to
  `desktop` afterwards. Use `colorScheme: "dark"` for dark mode.
- **Dismiss the cookie card** ("Reject non-essential") before screenshots — it covers the bottom-left.
- **Prefer measurements to screenshots** (`getBoundingClientRect`, computed styles, `curl` of the
  server HTML). Screenshots right after a reload can be stale; images in dev load slowly, so
  "faded" tiles are often still loading.
- **Scroll-driven (`sd-*`) animations:** `getComputedStyle().transform` on a `view()` timeline can
  read `none` even while it's animating — judge by a screenshot. A same-page `#hash` navigation
  isn't a page load; go to another page first.
- The owner sometimes clicks in the pane during a test; if a result looks odd, re-run.

## Environment
- Local WordPress for blog previews runs separately (Laravel Herd); without it the blog shows empty
  states and the build logs handled fetch errors. Setup steps: `.claude/skills/wordpress-setup`.
- The plans API may 404 locally; `/pricing` then shows its fallback card.
- Slow `npm install` once turned out to be npm's tarball CDN, not the project — check download speed
  before suspecting the lockfile.
- shadcn CLI adds a bogus `cn` package and `from "cn"` imports — fix to `@/lib/utils`, `npm uninstall
  cn`, and decline overwriting existing `components/ui` files (CLAUDE.md → Commands).
