# Handoff: Capitabel Solutions — Marketing Website

## Overview
A four-page marketing website for **Capitabel Solutions**, a fintech serving MSMEs, construction developers, and homebuyers across Tier 2/3 South India. The primary conversion goal is booking a demo / loan consultation. Tagline: **"Building Bharat through credit access."**

Pages:
1. **Landing** — hero, product cards, matching-engine panel, segment tiles, FAQ, CTA
2. **About** — founding story, key metrics, four pillars, team bios
3. **Loans** — product deep-dives (Home Loan, LAP, MSME), lender partners, process TATs
4. **Contact** — cluster-aware booking form, WhatsApp / phone / email fallbacks

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy directly. They use a proprietary Design Component runtime (`.dc.html` + `support.js`) that streams inline-styled markup with a small logic class per file.

Your task is to **recreate these designs in the target codebase's existing environment** (Next.js, Astro, plain React, etc.) using its established patterns, component library, and styling approach. If no environment exists yet, pick a modern static / SSR framework appropriate for a marketing site (Next.js App Router or Astro are both good defaults) and implement the designs there.

Do **not** ship the `.dc.html` files as-is. They will not run without the accompanying runtime.

## Fidelity
**High-fidelity (hifi).** The mocks use final colors, typography, spacing, real copy, and real metrics from Capitabel's FY 2026–27 business plan. Recreate pixel-accurately, but freely translate to the target stack's idiomatic components (e.g. `<Link>` for `<a>`, CSS modules / Tailwind / vanilla-extract for inline styles).

## Design Tokens

### Colors
| Token | Hex | Usage |
|---|---|---|
| `navy-900` | `#16264D` | Primary text, headings, dark backgrounds |
| `navy-700` | `#334971` | Secondary text, body copy |
| `orange-500` | `#F58220` | Brand accent, CTAs, highlights, eyebrow labels |
| `cream-100` | `#F7F3E9` | Card backgrounds (soft warm) |
| `cream-200` | `#EFE7D5` | Slightly warmer surface, image placeholders |
| `white` | `#FFFFFF` | Page background |
| `navy-alpha-08` | `rgba(22, 38, 77, 0.08)` | Card borders |
| `navy-alpha-12` | `rgba(22, 38, 77, 0.12)` | Divider lines |

### Typography
- **Display / headings:** `Space Grotesk`, weights 500–700, letter-spacing `-0.015em` to `-0.02em`
- **Body:** `Inter` (or system sans fallback), 14–16px, line-height 1.55
- **Mono / eyebrow labels:** `JetBrains Mono`, 10–11px, uppercase, letter-spacing `0.1em`–`0.14em`, often in `orange-500`

### Spacing scale
Multiples of 4px. Common values: 8, 12, 16, 24, 32, 48, 60, 80, 120.

### Radii
- Cards: `12px`
- Inputs / small chips: `8px`
- Pills / buttons: `999px`

### Borders & shadows
- Card border: `1px solid rgba(22,38,77,0.08)`
- Section divider: `1px solid rgba(22,38,77,0.12)`
- No drop shadows — depth comes from color and border only.

## Screens

### 1. Landing (`Landing.dc.html`)
- **Hero** — Tagline "Building Bharat through credit access", subhead about 48-hour loan matching. Primary CTA "Book a demo" (orange), secondary "See how it works" (ghost).
- **Product cards** — 3-up grid: Home Loan · LAP · MSME. Each card has an eyebrow, name, one-line pitch, ticket-size range, and "Explore" link to `Loans`.
- **Matching engine panel** — Explains the 48-hour matching process; 3-step timeline.
- **Segment tiles** — Who Capitabel serves: MSMEs, developers, homebuyers.
- **FAQ** — Accordion of common questions.
- **CTA band** — Repeat of demo booking CTA before footer.

### 2. About (`About.dc.html`)
- **Story block** — Origin story of Capitabel.
- **Metrics strip** — `₹50.15 Cr AUM · 96.3% approval rate · 15+ lender partners · <48h TAT` (verify with founder before publishing).
- **Four pillars** — Access · Speed · Trust · Institutionalise. Numbered `01`–`04`, each with a title and short paragraph.
- **Team grid** — 2-column grid of 4 members. Each card: portrait (140×175, `object-fit:cover`, radius 8), role eyebrow, name, bio, languages + base city footer row. Data is in the `Component` class's `team` array in `About.dc.html`.
  - Chidambaram Kattuputur — Co-Founder
  - Harish Bode — Co-Founder & MD (photo: `uploads/Screenshot 2026-08-08 at 12.42.10 PM.png`)
  - Devesh Narang — Founding Member · Partnerships (photo: `uploads/Screenshot 2026-08-08 at 12.41.30 PM.png`)
  - Thiru.R — Strategic Advisor
  - Chidambaram (photo: `uploads/Chidambaram.png`); Thiru portrait pending.

### 3. Loans (`Loans.dc.html`)
- Product deep-dives for **Home Loan**, **LAP**, **MSME Loan** — ticket sizes, tenure, rate ranges, documents required, target segments.
- **Lender partners** section — bank / NBFC logos or names.
- **Process TATs** per product.
- Bottom CTA to Contact.

### 4. Contact (`Contact.dc.html`)
- **Booking form** — name, phone, city / cluster, product interest, loan amount, message. On submit, currently just navigates; wire up to backend.
- **Fallbacks** — WhatsApp deeplink, phone number, email address (get real values from founder before shipping).
- Cluster picker uses Tier 2/3 South India cities.

## Interactions & Behavior
- **Nav** — Same header on every page: logo left, links right (Home · About · Loans · Contact), primary "Book demo" pill CTA.
- **Hover states** — CTAs darken slightly; card borders shift from `navy-alpha-08` to `orange-500` on hover; underline links show a full underline on hover.
- **FAQ accordion** — Single expand-collapse; smooth height transition (~200ms ease).
- **Form** — Client-side required-field validation. Submit posts to a to-be-provided endpoint (placeholder in code).
- **Responsive** — Designs are laid out for desktop (~1400px content max). Break to single-column on <900px; stack the product / team grids; keep spacing scale.

## State Management
Minimal — this is a marketing site. Local component state for the FAQ open item and the contact form. No global store required.

## Assets
- `uploads/` — user-uploaded portrait photos (Devesh, Harish, Chidambaram). Filenames with spaces — encode or rename when moving to a real repo.
- `assets/` — supporting images used in the designs.
- Logo, favicon, and any additional imagery to be supplied by the founder.
- Fonts loaded from Google Fonts: Space Grotesk, JetBrains Mono, Inter.

## Files in this bundle
- `Landing.dc.html` — landing page design reference
- `About.dc.html` — about page design reference
- `Loans.dc.html` — loans page design reference
- `Contact.dc.html` — contact page design reference
- `support.js` — runtime for the `.dc.html` files (needed only if you want to open them locally to see the designs render)
- `uploads/`, `assets/` — image assets
- `README.md` — this file

## Open items to confirm with the founder before launch
- Real photos for all four team members (Thiru pending)
- 2–3 client testimonial quotes with names + roles
- Current sanction rate ranges by product
- Contact endpoints — WhatsApp number, phone, email, form submission URL
- Final copy sign-off across all four pages
