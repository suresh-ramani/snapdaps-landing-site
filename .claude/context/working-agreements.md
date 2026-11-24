# Working agreements

## Git
- Commit **only when the owner asks** ("commit", "commit it", "commit both", "Commit the working tree changes with a sensible message").
- Commit straight to `master` — no feature branches or PRs. Every commit so far is on master.
- Conventional-commit subject (`feat:` / `fix:` / `refactor:` / `docs:`, optional scope like `feat(home):`) and a body that explains each area changed and why. End with the `Co-Authored-By` line.
- **Never push.** The owner pushes themselves (`git push origin master`). After a commit, say it's unpushed.
- Never commit secrets; `.claude/settings.json` denies reading `.env`, `.env.local`, `.env.*.local`.

## Docs move with the code
- Any change that adds or renames a block, token, utility, route, content file or convention updates
  CLAUDE.md ("Where things go" table + Rules) **and** the affected skills in `.claude/skills/` and
  agents in `.claude/agents/` in the same change. A task isn't done until they match.
- Decisions, open items and quirks go in this folder (`.claude/context/`).

## Done means checked
- Run `npm run typecheck`, `npm run lint`, `npm run build` before saying work is done. The build logs
  WordPress/plans fetch errors when those services are unreachable locally — handled, not a failure.
- Check the change live in the browser at phone (375), tablet (768) and desktop (1280), in light and
  dark. The owner notices mobile problems first. See [testing.md](testing.md).
- Say plainly what wasn't checked.

## Content and facts
- Never invent facts, testimonials, customer names, logos or numbers. Copy Claude writes carries a
  "Draft copy by Claude — not from the content doc; reviewed by: (pending)" comment.
- Ask before downloading anything (photos, Lottie files, packages beyond the obvious).
- No Shadcn UI Kit Pro / premium code or art — the repo is public (see CLAUDE.md → Design).
- When a design direction is genuinely the owner's call, offer 2–4 concrete options (with a
  recommendation) instead of guessing; otherwise act and report.

## Communication
- The owner writes short requests ("Swap safe components", "commit it", "status of task"). Reply with
  what changed, where, what was verified and what's open — no filler.
- "Status of task" / "any pending task?" → list uncommitted changes, unverified bits and what's
  waiting on the team (from [status.md](status.md)).
