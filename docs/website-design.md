# Capitabel website — design decisions

Living record of what's been decided about the site's design, structure, and
workflow. Update this file (don't just let it go stale) whenever a decision
here changes. See also [`design-reference/README.md`](../design-reference/README.md)
for the original handoff spec this was built from — that doc is the
*starting point*; this one is the *current state*, and this one wins where
they disagree.

## Stack

- Next.js 15, App Router, React 19
- Plain CSS (`app/globals.css`) + inline styles per element — no Tailwind,
  no CSS-in-JS library. This was a deliberate choice to stay close to the
  pixel-accurate original design handoff.
- Fonts via `next/font/google`, no runtime Google Fonts request
- Content lives in `lib/data.js` (exports: `site`, `navLinks`, `landing`,
  `about`, `loans`, `contact`) — edit there, not inline in page files
- Deployed on Vercel, connected to GitHub repo `PrranavReddy/Capitabel.com`,
  branch `main`, auto-deploys on push

## Colors

| Token | Hex | Usage |
|---|---|---|
| `--navy-900` | `#16264D` | Primary text, headings, dark section/tile backgrounds |
| `--navy-700` | `#334971` | Secondary text, body copy on light surfaces |
| `--orange-500` | `#F58220` | Brand accent — CTAs, highlights, italic accent words |
| `--cream-100` | `#F7F3E9` | Card backgrounds (on both white *and* navy sections — see Landing note below) |
| `--cream-200` | `#EFE7D5` | Image-placeholder surface |
| `--cream-300` | `#F5F0E4` | Section backgrounds (footer, some section bands) |
| `--white` | `#FFFFFF` | Page background |
| `--navy-a08` … `--navy-a25` | `rgba(22,38,77,0.08–0.25)` | Borders/dividers at increasing opacity, on light surfaces |
| — | `rgba(245,240,228,0.15–0.75)` | The dark-surface equivalent — cream-tinted white at low opacity, used for borders/secondary text/chips *on* navy backgrounds (no CSS token yet, written as a literal rgba per use) |

No gradients or drop shadows in the base design — depth comes from color and
border only, *except* the About page's CTA tile, which is intentionally
glassmorphic (see Components below).

**Navy is now also a tile/card fill**, not just a section background — the
Landing product cards and "Capitabel Experience" step tiles both use navy or
cream tile fills sitting on the opposite color as a background (see
Landing section below). When putting a tile on a navy section or vice
versa, remember to flip every text/border/chip color for contrast — this
has been a recurring source of "invisible on navy" bugs (a same-color tag
chip, a navy circle button on a navy card, a dark border on a dark
background) each time a tile's fill color changed.

## Typography

- **Display** (`--font-display`, Space Grotesk): headings, weights 500–700
- **Serif accent** (`--font-serif`, Instrument Serif, italic only): the
  recurring "highlight phrase" treatment — e.g. "with Capitabel.", "One
  relationship.", the hero tagline, "…Experience.". Always italic, always
  paired with `--orange-500` on at least part of the phrase. Rendered via a
  small `Serif` helper — **see the important gotcha about this below.**
- **Body** (`--font-body`, DM Sans): all body copy
- **Mono** (`--font-mono`, JetBrains Mono): eyebrows/kickers (uppercase,
  letter-spacing ~0.14em) and the numbered section labels ("01 · How we
  work")

**Gotcha — `Serif`/`Eyebrow`/`h2Style`/`leadStyle` are not shared
components.** Each page (`app/page.js`, `app/about/page.js`,
`app/loans/page.js`, `app/contact/page.js`, `app/journal/page.js`) defines
its own local copy of these little helpers at the bottom of the file. They
started identical, but **only `app/page.js`'s `Serif` has been extended**
to accept an optional `style` prop override (added to fix letter-spacing on
the italic accent in "The Capitabel Experience." heading — italic serif
needs different tracking than the bold sans it inherits `letterSpacing`
from). The other four pages' `Serif` do **not** have this yet. If a
similar per-word style override is needed on another page, either add the
same `style` prop there too, or — better — promote `Serif`/`Eyebrow` to a
real shared component in `components/` so this stops drifting.

## Layout

- `.container`: `max-width: var(--max-width)`, centered, horizontal padding
  that changes per breakpoint (see Responsive below)
- `--max-width` is **1400px by default** — this is the lever for the
  large-screen tier, not a separate layout system
- Nav, Footer, `CursorDotGrid`, and `ScrollProgressBar` all render once in
  `app/layout.js` (not per-page) — page files only contain page content
- Numbered eyebrows ("01 · How we work") are sequential *within a page* and
  get renumbered whenever a section is added, removed, *or reordered* —
  check neighboring sections when editing one (the Landing page's first two
  sections were swapped this round; both eyebrow numbers had to move with
  them, but nothing after them changed since their numbers were already
  correct downstream)

## Responsive tiers

Four tiers, defined in `app/globals.css`:

| Tier | Range | Behavior |
|---|---|---|
| Phone | ≤640px | Full 1-column collapse everywhere, tightest heading clamp |
| Tablet | 641–1023px | Symmetric card grids → 2 columns; asymmetric sidebar/split layouts and table-style rows (FAQ, contact form, product deep-dives, ops-team rows, process table) stack to 1 column instead of squeezing into an uneven split; moderate heading clamp |
| Laptop | 1024–1439px | The original tuned design target — inline desktop values, no overrides |
| Large desktop | ≥1440px, ≥1920px | `--max-width` widens to 1600px, then 1760px — bigger layout, not just wider margins |

Grid classes are matched by name in the media queries in `globals.css` — if
a page introduces a new grid class, it must be added to the relevant
breakpoint list there or it won't respond at those sizes at all.

## Component structure

Shared components (`components/`):

- **`Nav.js`** — sticky, translucent+blurred background, active-link
  highlight, collapses to logo+icon-only CTA under 860px
- **`Footer.js`** — exports `LandingFooter` (big 4-column version with the
  giant "CAPITABEL" wordmark watermark, only on `/`) and `SimpleFooter`
  (compact version, other pages, takes a `links` prop per page)
- **`Reveal.js`** — scroll-fade-in wrapper (`opacity`/`translateY` via
  IntersectionObserver). **Important**: also forces visible if the element
  is already in the viewport on mount, and force-shows after a 1.5s
  fallback timeout regardless of observer state. This was a deliberate fix
  after finding sections could get stuck permanently invisible on mobile —
  don't remove the fallback timeout even if it looks redundant.
- **`CountUp.js`** — animates a stat number counting up when it scrolls
  into view
- **`PageTransition.js`** — cross-fade between routes, keyed on pathname
- **`CursorDotGrid.js`** — global fixed full-viewport canvas, behind
  everything (`z-index: 0`). Current style: **magnetic field** — dots
  physically push away from the cursor and brighten to orange, navy at
  rest. Every section with its own solid/tile background naturally paints
  over it, so it only shows through in plain page-background gaps — that's
  the intended mechanism, not a bug. There are 8 other cursor styles
  auditioned and rejected/unused (trailing glow cursor, comet trail,
  magnetic cursor ring, spotlight-reveal mask, cursor label tag, plus the
  original non-physics dot-glow) — if asked for a change, revisit those
  before designing something new from scratch.
- **`ScrollProgressBar.js`** — fixed 3px orange bar, top of viewport,
  `z-index: 60` (above Nav's 50)
- **`TiltCard.js`** — 3D cursor-tilt wrapper (perspective + rotateX/Y +
  slight scale). Applied to: Landing product cards, About team cards.
- **`MagneticButton.js`** — pulls toward the cursor within ~80px. Applied
  to: every primary "Book a consultation call" CTA (hero + final CTA on
  every page) and the contact form's submit button. Deliberately *not*
  applied to secondary/ghost buttons or nav — scoped to primary CTAs only,
  by design (it reads as gimmicky if overused).
- **`FAQItem.js`** — replaces native `<details>`/`<summary>` (used only on
  the Landing FAQ). Native `<details>` can't animate open/close height;
  this uses the CSS `grid-template-rows: 0fr → 1fr` trick instead. If any
  other page grows a FAQ/accordion, reuse this component rather than
  reaching for `<details>` again.
- **`ContactForm.js`** — client-side validated, currently submits via a
  `mailto:` fallback (see Open items below)

Reusable animation wrappers (`TiltCard`, `MagneticButton`, `Reveal`) all
independently check `prefers-reduced-motion` and either skip attaching
listeners or jump straight to the end state — this pattern should be
followed for any new motion/interaction component.

Page-local (not shared) helpers, duplicated across each page file: `Serif`,
`Eyebrow`, `h2Style`, `leadStyle` — see the Typography gotcha above.

## Page-by-page structure (current)

**Landing (`/`)**
Hero (headline + single "Book a consultation call" CTA; right column is a
large italic serif tagline, "Growth capital advisory and fulfilment.", 72px,
vertically centered, stacks below on tablet/phone) → lender marquee →
**"01 · How we work" — "The Capitabel Experience."** (single-line heading,
italic serif accent on "Experience." with letter-spacing reset to 0 — see
Typography gotcha; 4 cream-100 tile cards on the navy section background:
Business profiling, Human context, AI matching engine, Offer +
recommendation; below the tiles, an "Offer Honour Rate 85%" highlight block
is still there from the section's previous life as the "48-hour promise" —
never explicitly asked to change, still navy-orange, worth revisiting) →
**"02 · What we finance"** — 3 product cards, **navy-900 fill** (flipped
from cream this round — every text/border/chip color inside was flipped to
a light variant to match, see Colors note above), reordered MSME → LAP →
Home Loans to match the Loans page, CP-01/02/03 codes removed, tag chips
now a uniform translucent white pill (was per-product color, which broke
when the card itself went navy), bullets rewritten to real product terms
(ticket sizes are now floors — "₹10 L onwards" — not ranges, label changed
from "Ticket range" to "Ticket size" to match), all three `desc` fields
cleared → **"03 · Under the hood"** matching-engine facts (**no**
terminal-log panel — removed, was confusing on mobile; single full-width
column) → **"04 · FAQ"** (eased accordion) → CTA.

Removed from Landing entirely: hero eyebrow pill ("Borrowing made Simple"),
hero subhead paragraph, hero "Explore loan products" ghost button, hero
"48 hrs" pill, hero picture placeholder, the "Three products. One
relationship." section's lead paragraph, the `matching-engine.log` terminal
panel, "Who we serve" segments (moved to `/loans`), "Client voices"
testimonials and "Where we operate" clusters (moved to `/about`, then
clusters later removed outright), Journal section (moved to its own
`/journal` page). The "01 · How we work" and "02 · What we finance"
sections were originally in the opposite order (products first) — swapped
this round.

**About (`/about`)**
Story → office image placeholder → "By the numbers" (3 stats: Approval,
Lenders, Clusters — the disbursement `₹50.15Cr` figure was deliberately
removed, not to be published) → founding team grid (tilt cards; Thiru's bio
is finalized short-form copy, portrait is the orange-background cutout;
Devesh's portrait was updated this round, also orange-background, edited by
the user directly rather than by Claude) → operating team table → beliefs →
"Where we operate" clusters → client testimonials → CTA (glassmorphic tile:
translucent orange gradient, backdrop-blur, soft white edge highlight — **no
diagonal sheen streak**, that was tried and removed for cutting across the
copy; CTA button is `rgba(22,38,77,0.92)`, deliberately high-opacity so it
reads as solid blue rather than orange bleeding through).

Removed from About entirely: "Four strategic pillars" section (was 100%
forward-looking scaling goals — ₹200Cr target, Q3/Q4 milestones, angel/seed
round language — not to be published), Company timeline section.

**Loans (`/loans`)**
Hero → summary strip → per-product deep-dive (MSME → LAP → Home Loans order,
matches Landing) → "Who we serve" segments (moved here from Landing) →
process TAT table → CTA. All "10–12 lenders" / "Twelve lenders" specific
counts were removed sitewide (replaced with the "40+ network" figure or
generic "core lender panel" language) — don't reintroduce a specific core
lender count without being asked. **Note**: this page's product deep-dive
still uses the *original* longer bullets/descriptions — the Landing page's
product cards got new, shorter bullet copy this round (see above) but that
change was not mirrored here. Worth asking whether Loans should match.

**Contact (`/contact`)**
Booking form + sidebar (WhatsApp/call/email, head office, cluster contacts)
→ "what happens next" steps.

**Journal (`/journal`)**
Standalone page (moved off Landing). Post grid + CTA. Content is 3
placeholder posts (real articles not written yet).

## Logo

`public/images/capitabel-logo.png` — cropped tight to just the wordmark
(5.5:1 aspect ratio; the original file had a tagline baked in underneath
and huge canvas padding). Has a solid white background baked into the file
itself (not transparent), so every usage applies
`mixBlendMode: "multiply"` in its inline `style` to blend the white into
whatever surface it's sitting on — **don't drop that style** if the logo
`<Image>` is ever touched, or a visible white box will reappear.

## Team photo pipeline

All team portraits (`public/images/*.png`) are the same style: subject cut
out, placed on a solid `#F58220`-ish orange background. So far every one has
been supplied pre-edited by the user (either their own editing, or asked to
be saved that way before sending) — Claude has not needed to do the
background removal itself. If asked to do it directly from a plain/white-
background photo: `sips` (built-in) **cannot** do background removal (crop/
resize/format only). `pip install pillow rembg onnxruntime` was done once
this session (installs to the user-level `python3.9` site-packages, ~a
few hundred MB, takes a couple minutes) and would work — `rembg` for subject
segmentation to a transparent PNG, then composite onto a solid orange fill
with Pillow. That install should still be present; check before reinstalling.

## Known recurring issue — investigate if it happens again

Twice, an image file vanished from `public/images/` on disk between
commits, with no command run touching it either time — both times it was
the most-recently-added photo (`thiru-r.png`, then `harish-bode.png`).
Restored both from git history. Cause unknown — possibly something on the
user's Mac touching that folder (a sync tool, cleanup utility, etc.), not a
code/git issue. **If a team photo goes missing from the live site after a
push with no corresponding edit, check `public/images/` on disk before
assuming it's a code bug** — it's likely this happening again, and the fix
is `git show <last-good-commit>:path > path`.

## Deployment workflow (standing process, not a one-time note)

- This machine has **no git/gh CLI credentials, SSH key, or Vercel/GitHub
  connector** — `git push` from a Bash tool fails.
- The user is authenticated via **GitHub Desktop** instead. Standing
  workflow: edit + `git commit` locally (that part works fine via Bash),
  then the user manually clicks **"Push origin" in GitHub Desktop** — that
  is the only manual step. Don't ask the user to type git commands in a
  terminal; they've said explicitly they don't know how to use it.
- Vercel auto-deploys on push to `main`. Once, a push landed on GitHub but
  Vercel never built it (no deployment record at all, in any status) — an
  empty `git commit --allow-empty` "trigger redeploy" commit fixed it. If a
  push doesn't show up on Vercel's Deployments page within a couple
  minutes, that's the fix.
- Always run `git status --short` right before `git add -A && git commit`
  and sanity-check the file list — see the recurring missing-image issue
  above; catching an unexpected deletion here is cheaper than after.

## Open / unresolved items

- **Domain**: `capitabel.com` still points at WordPress, not yet cut over
  to Vercel. Plan agreed: add specific DNS records at the existing
  registrar (A record for apex, CNAME for `www`) rather than switching
  nameservers to Vercel DNS, to avoid breaking any existing email hosted on
  the domain. Not yet done as of this writing.
- **Contact form** submits via a `mailto:` fallback (see the `TODO` in
  `components/ContactForm.js`) — needs a real endpoint (Formspree, Zoho
  Forms, or a Next.js API route into the CRM) before launch.
- **Placeholder imagery**: About page office photo, Journal post thumbnails
  are still repeating-gradient placeholders — no real photos supplied for
  those spots.
- **Unverified content carried over from the original handoff**: the three
  client testimonials (Rajesh Kumar, Anitha Reddy, Vikram Iyer) on the
  About page were flagged in the original design handoff as needing
  founder confirmation before publishing — that confirmation hasn't
  happened in this thread, worth checking before this is treated as final.
- **Placeholder links**: Privacy/Terms/Disclosures, the Google Maps link,
  and the LinkedIn/Instagram/Facebook footer links are all `#` — no real
  URLs supplied yet.
- **Cursor background style**: currently the "magnetic field" grid; 5 other
  previewed styles were never picked (see `CursorDotGrid.js` note above) —
  if revisited, show those again before designing new ones.
- **"Offer Honour Rate 85%" block** on the Landing page's "How we work"
  section — a leftover from that section's previous identity as the
  "48-hour promise" section. Flagged to the user once, never resolved.
- **Loans page product bullets** are now out of sync with Landing's (see
  Loans section above) — worth asking whether to mirror the new copy.
- **`Serif`/`Eyebrow` duplication** across 5 page files (see Typography
  gotcha) — works today but will keep drifting; candidate for promoting to
  real shared components if it causes another inconsistency.
