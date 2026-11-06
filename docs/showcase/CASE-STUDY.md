# Maison Belle — Showcase Case Study

## The brief

Maison Belle is a fictional premium beauty studio created to demonstrate how a considered website can help a beauty business present its services, build trust, and turn discovery into appointment inquiries.

The experience had to feel editorial and feminine without becoming childish, keep pricing and booking expectations clear, and hand the visitor off to WhatsApp without implying that an appointment was already confirmed.

## The problem

Beauty studio information is often spread across social posts, price lists, and repeated direct messages. A visitor has to ask for the same details before deciding what to book. The showcase needed one coherent place for services, pricing, portfolio, studio context, and a guided inquiry.

## The solution

A static-first Next.js marketing site with:

- A homepage that moves from brand story to services, portfolio, artists, pricing, proof, FAQ, and a single booking invitation.
- A searchable-by-category service catalog and detail pages with fixed and “starting from” prices.
- An editorial gallery with category filters and an accessible lightbox.
- A five-step appointment request flow that keeps data in browser memory, validates customer details, and prepares a WhatsApp message.
- A safe handoff: the website never sends a message or claims the salon has confirmed a slot.

## Design direction

Rose Pink Editorial Luxury: warm ivory canvas, rose accents, deep rose-brown text, Playfair Display headlines, and DM Sans for functional information.

The primary action uses a darker rose (`#A8516A`) so white button text passes WCAG AA. Brand rose (`#C97991`) remains an accent rather than small body text.

The layout uses editorial asymmetry for storytelling and predictable, restrained layouts for service information and booking.

## Identity and motion

The owner-supplied MB monogram is used as a transparent lockup in the header, footer, booking shell, and favicon. Supporting blush and champagne surfaces stay quiet so the monogram remains the signature.

Motion is cinematic but controlled. Motion for React drives the hero parallax, masked line reveals, repeat-on-scroll section reveals, staggered grids, image clip reveals, hover responses, gallery layout transitions, and five-step booking transitions. A page transition fades and rises the route 8 px over 250 ms. The shared `LazyMotion` provider loads `domMax` asynchronously, so motion behavior stays consistent on mobile and desktop. Reduced-motion users get the final state immediately.

A second, warm espresso/plum dark theme is available alongside the ivory light theme. It follows the operating-system preference on first visit, persists a manual choice in `localStorage`, and exposes a toggle in the header and mobile menu. Theme changes use a native View Transition radial reveal from the toggle, with an instant fallback when the API is unavailable or reduced motion is requested. Both themes use the same content, imagery, and Motion choreography.

## Architecture

- Next.js 16 App Router, Server Components by default.
- Client boundaries only for navigation, filters, gallery, and booking.
- Static typed data for services, gallery, artists, testimonials, FAQ, and business configuration.
- React Hook Form + Zod for customer validation.
- Pure utilities for date, phone, currency, and WhatsApp message construction.
- No backend, database, CMS, analytics, or payment integration.

## Booking model

The customer chooses a preferred date and time. The salon confirms availability manually through WhatsApp. The copy repeats this distinction in the schedule step, summary, and handoff.

The WhatsApp number is read from `NEXT_PUBLIC_WHATSAPP_NUMBER`. If it is missing or invalid, the handoff is disabled and a safe fallback is shown. No fake number is generated.

## Accessibility and quality

- Semantic headings and landmarks.
- Keyboard-operable navigation, filters, FAQ, lightbox, and booking.
- Dialog focus management and Escape support.
- Persistent form labels and associated error messages.
- Contrast-checked tokens and a unit test for critical color pairs.
- Reduced-motion support.
- Light and dark themes checked with axe on the homepage, gallery, and booking flow.
- Responsive checks at 360, 390, 768, 1024, and 1440 px.
- Axe checks on the main routes with no serious or critical violations.

## Testing

- 39 unit and component tests with Vitest and React Testing Library.
- 28 Playwright E2E checks across desktop and mobile Chromium projects, including theme persistence, mobile-menu access, and dark-mode axe audits.
- WhatsApp URLs are asserted and never opened or sent during automated tests.
- Production build, lint, and TypeScript checks pass.
- Lighthouse on the production build: desktop Performance 99 (LCP 1.0 s, TBT 10 ms, CLS 0); mobile Performance 83 (LCP 4.5 s, TBT 150 ms, CLS 0); Accessibility, Best Practices, and SEO 100 on both. Scores are environment-specific measurement results, not guarantees.
- Chrome DevTools trace on the production build: desktop LCP 0.68 s, mobile LCP 2.57 s with 4x CPU throttling and Fast 4G; CLS 0.00 on both.

## Screenshots

Captured from the production build with reduced motion enabled so every section appears in its final state.

- [Homepage — desktop, light](screenshots/home-desktop-light.jpg)
- [Homepage — desktop, dark](screenshots/home-desktop-dark.jpg)
- [Homepage — mobile, light](screenshots/home-mobile-light.jpg)
- [Homepage — mobile, dark](screenshots/home-mobile-dark.jpg)
- [Service catalog — desktop](screenshots/services-desktop-light.jpg)
- [Gallery — desktop, light](screenshots/gallery-desktop-light.jpg)
- [Gallery — desktop, dark](screenshots/gallery-desktop-dark.jpg)
- [Gallery lightbox](screenshots/gallery-lightbox.jpg)
- [Full-screen menu — tablet](screenshots/menu-tablet-light.jpg)
- [Booking — desktop, light](screenshots/booking-desktop-light.jpg)
- [Booking — desktop, dark](screenshots/booking-desktop-dark.jpg)

## Demo note

Maison Belle, its services, prices, artists, testimonials, address, and opening hours are fictional demo content. Photography is licensed stock imagery; see [`../CREDITS.md`](../CREDITS.md).
