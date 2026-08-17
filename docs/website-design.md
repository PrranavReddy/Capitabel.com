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
| `--navy-900` | `#16264D` | Primary text, headings, dark section backgrounds |
| `--navy-700` | `#334971` | Secondary text, body copy |
| `--orange-500` | `#F58220` | Brand accent — CTAs, highlights, italic accent words |
| `--cream-100` | `#F7F3E9` | Card backgrounds |
| `--cream-200` | `#EFE7D5` | Image-placeholder surface |
| `--cream-300` | `#F5F0E4` | Section backgrounds (footer, some section bands) |
| `--white` | `#FFFFFF` | Page background |
| `--navy-a08` … `--navy-a25` | `rgba(22,38,77,0.08–0.25)` | Borders/dividers at increasing opacity |

No gradients or drop shadows in the base design — depth comes from color and
border only, *except* the About page's CTA tile, which is intentionally
glassmorphic (see Components below).

## Typography

- **Display** (`--font-display`, Space Grotesk): headings, weights 500–700
- **Serif accent** (`--font-serif`, Instrument Serif, italic only): the
  recurring "highlight phrase" treatment — e.g. "with Capitabel.", "One
  relationship.", the hero tagline. Always italic, always paired with
  `--orange-500` on at least part of the phrase.
- **Body** (`--font-body`, DM Sans): all body copy
- **Mono** (`--font-mono`, JetBrains Mono): eyebrows/kickers (uppercase,
  letter-spacing ~0.14em) and the numbered section labels ("01 · What we
  finance")

## Layout

- `.container`: `max-width: var(--max-width)`, centered, horizontal padding
  that changes per breakpoint (see Responsive below)
- `--max-width` is **1400px by default** — this is the lever for the
  large-screen tier, not a separate layout system
- Nav, Footer, `CursorDotGrid`, and `ScrollProgressBar` all render once in
  `app/layout.js` (not per-page) — page files only contain page content
- Numbered eyebrows ("01 · What we finance") are sequential *within a page*
  and get renumbered whenever a section is added/removed — check neighboring
  sections when editing one

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
  auditioned and rejected/unused this round (trailing glow cursor, comet
  trail, magnetic cursor ring, spotlight-reveal mask, cursor label tag,
  plus the original non-physics dot-glow) — if asked for a change, revisit
  those before designing something new from scratch.
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

## Page-by-page structure (current)

**Landing (`/`)**
Hero (headline + single "Book a consultation call" CTA, no eyebrow pill/
subhead/second CTA/48hrs pill — all removed; right column is a large italic
serif tagline, "Growth capital advisory and fulfilment.", 72px, vertically
centered, stacks below on tablet/phone) → lender marquee → 3 product cards
(reordered MSME → LAP → Home Loans to match the Loans page) → "48 hours"
promise section (navy) → matching-engine "under the hood" facts (**no**
terminal-log panel — removed, was confusing on mobile; single full-width
column now) → FAQ (eased accordion) → CTA.

Removed from Landing entirely this round: hero picture placeholder, the
`matching-engine.log` terminal panel, "Who we serve" segments (moved to
`/loans`), "Client voices" testimonials and "Where we operate" clusters
(moved to `/about`, then clusters later removed outright), Journal section
(moved to its own `/journal` page).

**About (`/about`)**
Story → office image placeholder → "By the numbers" (3 stats: Approval,
Lenders, Clusters — the disbursement `₹50.15Cr` figure was deliberately
removed, not to be published) → founding team grid (tilt cards; Thiru's bio
is finalized short-form copy, portrait is the orange-background cutout) →
operating team table → beliefs → "Where we operate" clusters → client
testimonials → CTA (glassmorphic tile: translucent orange gradient,
backdrop-blur, soft white edge highlight — **no diagonal sheen streak**,
that was tried and removed for cutting across the copy; CTA button is
`rgba(22,38,77,0.92)`, deliberately high-opacity so it reads as solid blue
rather than orange bleeding through).

Removed from About entirely this round: "Four strategic pillars" section
(was 100% forward-looking scaling goals — ₹200Cr target, Q3/Q4 milestones,
angel/seed round language — not to be published), Company timeline section.

**Loans (`/loans`)**
Hero → summary strip → per-product deep-dive (MSME → LAP → Home Loans order,
matches Landing) → "Who we serve" segments (moved here from Landing) →
process TAT table → CTA. All "10–12 lenders" / "Twelve lenders" specific
counts were removed sitewide (replaced with the "40+ network" figure or
generic "core lender panel" language) — don't reintroduce a specific core
lender count without being asked.

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

## Known recurring issue — investigate if it happens again

Twice this session, an image file vanished from `public/images/` on disk
between commits, with no command run touching it either time — both times
it was the most-recently-added photo (`thiru-r.png`, then
`harish-bode.png`). Restored both from git history. Cause unknown — possibly
something on the user's Mac touching that folder (a sync tool, cleanup
utility, etc.), not a code/git issue. **If a team photo goes missing from
the live site after a push with no corresponding edit, check
`public/images/` on disk before assuming it's a code bug** — it's likely
this happening again, and the fix is `git show <last-good-commit>:path >
path`.

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
