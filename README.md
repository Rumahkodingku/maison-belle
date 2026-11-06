# Maison Belle

Premium beauty studio showcase for RumahKodingku. Built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, and shadcn-style UI primitives.

Maison Belle is a fictional brand. Services, prices, artists, testimonials, address, and opening hours are demo content.

## Requirements

- Node.js 24 LTS (`.nvmrc`)
- pnpm 10

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Theme

The site follows the operating-system color scheme by default. The header toggle (also available inside the full-screen mobile menu) switches between the warm light theme and the espresso/plum dark theme. A manual choice is stored in `localStorage`.

Theme changes use the native View Transition API with a radial reveal from the toggle. Browsers without support, and users with `prefers-reduced-motion: reduce`, switch instantly.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public production URL. Used for canonical URLs once set. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Business WhatsApp number in international digits, e.g. `6281234567890`. If empty, the handoff is disabled and a safe fallback is shown. |

No secrets are required. Booking data stays in browser memory and is never sent to a server by this website.

## Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm check
```

## Routes

- `/` — homepage
- `/services` — service catalog
- `/services/[slug]` — service detail
- `/gallery` — gallery with filter and lightbox
- `/about` — studio and artists
- `/contact` — contact details
- `/booking` — guided appointment request
- `/privacy` — privacy notice

## Verification

- `pnpm lint`, `pnpm typecheck`, `pnpm test` (39 tests), and `pnpm test:e2e` (28 checks) pass.
- `pnpm build` passes.
- Lighthouse on the production build: desktop Performance 99 (LCP 1.0 s, TBT 10 ms, CLS 0); mobile Performance 83 (LCP 4.5 s, TBT 150 ms, CLS 0); Accessibility, Best Practices, and SEO 100 on both.
- Chrome DevTools trace: desktop LCP 0.68 s; mobile LCP 2.57 s with 4x CPU throttling and Fast 4G; CLS 0.00 on both.

## Notes

- Appointment dates and times are preferences. The studio confirms availability manually through WhatsApp.
- Automated tests must never send a real WhatsApp message. E2E checks intercept `wa.me` URLs.
- Images are stock/demo assets; see [`docs/CREDITS.md`](docs/CREDITS.md). The brand logo is integrated in the header, footer, booking shell, and favicon.
- Motion for React (async `LazyMotion` with `domMax`) powers the cinematic hero, scroll reveals, hover responses, gallery, and booking transitions on mobile and desktop. `prefers-reduced-motion` disables non-essential motion.
- Light/dark theme uses `next-themes` with a class on `<html>`, persisted preference, and system fallback. Reduced motion also disables the theme reveal transition.
- The showcase write-up and screenshots live in [`docs/showcase/`](docs/showcase/).
- Product, engineering, design, and showcase documents are indexed in [`docs/README.md`](docs/README.md).
