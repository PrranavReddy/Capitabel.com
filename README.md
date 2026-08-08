# Capitabel Solutions — Marketing Website

Four-page Next.js (App Router) marketing site for **Capitabel Solutions**, built from the
[design handoff](design-reference/README.md) exported from Claude.

- **Home** — `/`
- **About** — `/about`
- **Loan products** — `/loans`
- **Contact** — `/contact`

## Stack

- [Next.js 15](https://nextjs.org) (App Router), React 19
- Plain CSS (`app/globals.css`) + inline styles matching the design tokens below — no UI framework, to stay close to the pixel-accurate handoff
- Fonts loaded via `next/font/google`: Space Grotesk, Instrument Serif, DM Sans, JetBrains Mono
- No database / CMS — copy lives in [`lib/data.js`](lib/data.js)

## Getting started

Requires [Node.js](https://nodejs.org) 18.18+ (this repo was authored on a machine without Node
installed locally — install it first if `npm` isn't found).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Design tokens

| Token | Hex | Usage |
|---|---|---|
| `navy-900` | `#16264D` | Primary text, headings, dark backgrounds |
| `navy-700` | `#334971` | Secondary text, body copy |
| `orange-500` | `#F58220` | Brand accent, CTAs, highlights |
| `cream-100` | `#F7F3E9` | Card backgrounds |
| `cream-200` | `#EFE7D5` | Image placeholder surface |
| `cream-300` | `#F5F0E4` | Section backgrounds (Journal, footers) |

Full spec, copy source, and open items to confirm with the founder: [`design-reference/README.md`](design-reference/README.md).

## Content

All page copy, stats, and lender/product data live in [`lib/data.js`](lib/data.js) — edit there
rather than in the page files.

## Known placeholders / TODO before launch

- **Photography** — hero, office, and journal images are still placeholder blocks (no real photos
  were supplied for those spots). Team portraits for Chidambaram, Harish, and Devesh are real; Thiru's
  portrait is pending.
- **Contact form** — [`components/ContactForm.js`](components/ContactForm.js) currently opens a
  pre-filled `mailto:` to `hello@capitabel.com` on submit (see the `TODO` in that file). Wire it to
  a real endpoint (Formspree, Zoho Forms, or a Next.js API route into the CRM) before launch.
- **Legal links** — Privacy / Terms / Disclosures in the footer, and the map link on Contact, are
  placeholders.
- Real phone/WhatsApp/email were carried over from the handoff — confirm they're current before go-live.

## Deployment

This repo is set up to deploy on [Vercel](https://vercel.com) directly from GitHub — push to `main`
and import the repo in the Vercel dashboard (Framework Preset: Next.js, no extra config needed).
