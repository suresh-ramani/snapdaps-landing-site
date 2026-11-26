# Status

_Last updated: 2026-11-26._

## Recent work (all committed on master; the owner pushes)
| Commit | What |
|---|---|
| `0259dc0` | Use-case heroes → `EventGalleryHero` product window (all 7 use-case pages) |
| `c59596a` | Scroll-linked depth: `sd-tilt` / `sd-rise` / `sd-drift` / `sd-settle` CSS utilities |
| `3a13e99` | Home: `GuestViewDemo` (#try-it), `AudienceCards`, "Try it" buttons on `/features` rows |
| `eecc10d` | Privacy-first bento picture, slimmer `SocialProof` |
| `c5984d1` | shadcn primitives in place of hand-built UI |
| `aa9e190` | Conversion tracking + campaign attribution |

Run `git log --oneline -20` for the rest.

## Not verified yet
- Scroll-linked `sd-*` motion in Firefox (falls back to static by design), Safari, and with
  reduced motion turned on.
- After the `EventGalleryHero` swap, only wedding, corporate (desktop) and birthday (phone, dark)
  were looked at in the browser; photographers, planners, award and sports weren't.
- Blog pagination (local WordPress was down when the shadcn `Pagination` swap landed).

## Waiting on the team
- **Sample gallery link:** a public demo event in the app → set `site.sampleGalleryUrl` in
  `content/site.ts` to show "Open a real sample gallery" on the home demo.
- **Copy review:** every page with a "reviewed by: (pending)" comment, incl. the audience cards,
  guest-view demo and "Try it" labels (2026-11-13) and the four event pages.
- **Proof:** real stats (`content/stats.ts`, dated + sourced), client logos with permission,
  written/video testimonials with consent, a case study.
- **E-E-A-T facts:** founder roles/bios/LinkedIn (photos added 2026-11-26), privacy / DPDP / data-retention answers,
  LinkedIn and YouTube profiles.
- **App side:** store the attribution params (`utm_*`, `gclid`, `fbclid`, `landing_page`,
  `referrer_host`, `ref_page`) on sign-up; mark GA4 key events (`trial_click`, `generate_lead`,
  `whatsapp_click`).
- **Deploy env:** `NEXT_PUBLIC_SITE_URL`, `SITE_URL_STRICT=1`, GA4 id, Resend keys, WordPress URLs.
- **Before launch:** delete the seven "Sample: …" WordPress posts and the "Sample Author" user that
  exist only for design preview on the local WordPress.

## Open / later
- Comparison pages ("Snapdaps vs …") — deferred by the owner.
- Ideas not yet requested: skeleton fallbacks for the streamed blog sections, InputGroup for blog
  search, a UTM link builder, a copy-review board artifact.
- `/about` story copy is still placeholder (page is noindex).
- "Dynamic watermark" sits in `paidPlanFeatures` while the copy rules say not to claim watermarks —
  confirm with the team which is right.
