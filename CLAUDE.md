# CLAUDE.md — standing rules for this repo

Capitabel Solutions marketing site (Next.js 15, App Router). Full design
history and current-state detail lives in
[`docs/website-design.md`](docs/website-design.md) — read that for context
on *why* things are the way they are. This file is the short list of rules
that should never get lost or accidentally reversed.

## Deployment — do not deviate from this

- This machine has no git/gh CLI credentials. **Never attempt `git push`**
  — it will fail, and retrying wastes a turn. Commit locally (that works
  fine), then tell the user to open **GitHub Desktop** and click
  **"Push origin"**. That is the only manual step in the workflow.
- The user does not know Terminal/command-line git. Never hand them git
  commands to type — GitHub Desktop only.
- Vercel auto-deploys on push to `main`. If a push lands on GitHub but
  never shows up on Vercel's Deployments page (any status) within a couple
  minutes, fix it with `git commit --allow-empty -m "Trigger redeploy"` +
  another push — don't debug further than that first.
- If a team photo or other asset goes missing from `public/images/` between
  sessions with no corresponding edit, **check the file on disk before
  assuming a code bug** — this has happened twice already, cause unknown,
  and the fix is restoring from git history
  (`git show <last-good-commit>:path > path`).

## Content rules

- All page copy/data lives in `lib/data.js` — never hardcode content
  directly in a page file if it belongs in a data array there.
- **Never publish specific forward-looking scaling/growth figures** — no
  disbursement targets, ₹ growth goals, angel/seed round language, or
  "Q3/Q4 milestone" framing. This was explicitly stripped from the About
  page and should not be reintroduced without the user asking for it back.
- **Never state a specific core lender count** (e.g. "10–12" or "Twelve
  lenders") — use the "40+ network" figure or generic "core lender panel"
  phrasing instead. This was deliberately scrubbed sitewide.
- Product display order is **MSME → LAP → Home Loans**, consistently on
  both the Landing page and the Loans page — keep them in sync if either
  changes.
- When a tile/card's fill color changes (e.g. cream → navy or back), every
  text/border/chip/icon color inside it must be flipped for contrast too —
  this has caused multiple "invisible on navy" bugs (a tag chip the same
  color as its card, a navy icon circle on a navy card, a dark border on a
  dark background). Check the whole tile, not just the background line.

## Code patterns to preserve

- No Tailwind, no CSS-in-JS library — plain `app/globals.css` (design
  tokens + responsive rules) plus inline `style={{}}` per element. Match
  this pattern for any new component; don't introduce a styling library.
- `components/Reveal.js` has a fail-safe timeout (forces content visible
  after 1.5s regardless of IntersectionObserver state) on top of an
  "already in viewport at mount" check. **Do not remove either safeguard**
  — without them, sections have been observed getting stuck permanently
  invisible on mobile scroll.
- The logo (`public/images/capitabel-logo.png`) has a solid white
  background baked into the file. Every `<Image>` usage applies
  `style={{ mixBlendMode: "multiply" }}` to blend it into whatever surface
  it sits on. **Don't drop that style** or a white box reappears behind it.
- Any new scroll-triggered, cursor-following, or hover animation must check
  `prefers-reduced-motion` and either skip attaching its listeners or jump
  straight to the resting/end state — every existing animation component
  (`Reveal`, `TiltCard`, `MagneticButton`, `CursorDotGrid`) already does
  this; match it.
- Responsive grids are matched **by class name** in `app/globals.css`
  media queries (phone ≤640px, tablet 641–1023px, large desktop ≥1440px).
  A new page introducing a new grid class must add that class to the
  relevant breakpoint list(s) in `globals.css`, or it won't respond at
  those sizes at all.
- `MagneticButton` is scoped to **primary CTAs only** ("Book a consultation
  call" buttons, the contact form submit). Don't apply it to secondary/
  ghost buttons or nav links — it was deliberately left off those.
- `Serif`/`Eyebrow`/`h2Style`/`leadStyle` are **not** shared components —
  each page (`app/page.js`, `app/about/page.js`, `app/loans/page.js`,
  `app/contact/page.js`, `app/journal/page.js`) defines its own local copy
  at the bottom of the file. They've already drifted once (only
  `app/page.js`'s `Serif` accepts a `style` override prop). If you change
  one page's copy, the other four don't automatically get it — either
  update all five or promote it to a real `components/` export.
- No image-editing tools are installed by default (`sips` only does
  crop/resize/format, no background removal). If background removal is
  ever needed again, `pip install pillow rembg onnxruntime` was done once
  already (user-level `python3.9` site-packages) — check whether it's
  still installed before reinstalling.

## Before committing

- Run `git status --short` before `git add -A && git commit` and sanity-
  check the file list — this repo has had files unexpectedly appear
  deleted between turns (see the missing-image issue above); catching it
  in `git status` before committing is cheaper than fixing it after.
