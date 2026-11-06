# ARCHITECTURE.md — Maison Belle

> **Status:** Architecture decision record / implementation guide  
> **Version:** 1.0  
> **Framework:** Next.js App Router  
> **Rendering model:** Server-first React with narrow Client Component boundaries  
> **Project type:** Frontend-first premium business showcase

## 1. Architecture Goals

Arsitektur Maison Belle menggunakan pendekatan **feature-oriented modular architecture di dalam Next.js App Router**, dengan prinsip:

1. **Server-first:** Server Components menjadi default; Client Components hanya untuk interaksi browser.
2. **Feature cohesion:** Kode satu fitur dikelompokkan bersama agar mudah dipahami, diuji, dan dikembangkan.
3. **Clear boundaries:** UI, domain types, static data, validation, dan browser integrations tidak dicampur tanpa alasan.
4. **Progressive complexity:** Tidak membangun lapisan backend, repository, service, atau state manager yang belum dibutuhkan MVP.
5. **SEO and performance:** Konten utama dirender di server dan dapat diindeks.
6. **Maintainability:** Konvensi sederhana dan konsisten, tidak membuat abstraksi berlebihan.

Tidak ada satu struktur folder Next.js yang resmi diwajibkan untuk semua aplikasi. Rekomendasi ini menggabungkan konvensi resmi App Router dengan feature-oriented organization yang proporsional untuk skala Maison Belle.

## 2. Recommended Next.js Model

### 2.1 App Router

Gunakan `app/` sebagai routing layer. Folder route berisi special files Next.js seperti:

- `page.tsx`
- `layout.tsx`
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`
- `route.ts` hanya jika kelak dibutuhkan HTTP endpoint.

Jangan menaruh seluruh implementasi fitur di dalam file route. Route sebaiknya tipis: mengatur metadata, mengambil data yang dibutuhkan, dan menyusun feature components.

### 2.2 Server Components by default

Semua `page.tsx`, `layout.tsx`, dan komponen biasa adalah Server Components secara default.

Gunakan Server Components untuk:

- Homepage dan section statis.
- Katalog layanan dan detail layanan.
- Artist, testimonial, FAQ, dan konten editorial.
- Metadata dan data statis.
- Rendering konten SEO-critical.

Gunakan Client Components hanya untuk:

- Mobile navigation drawer.
- Gallery filters/lightbox.
- FAQ accordion jika implementasi membutuhkan client state (gunakan native details/summary jika cukup).
- Guided booking wizard.
- Form validation interactions.
- Copy-to-clipboard dan browser APIs.
- UI yang memerlukan event handlers, hooks, atau state.

**Aturan:** Jangan menambahkan `"use client"` ke root layout atau seluruh page hanya karena satu child memerlukan interaksi. Buat boundary client sekecil mungkin.

### 2.3 Composition pattern

Utamakan komposisi Server Component parent dengan Client Component child.

Contoh konseptual:

```tsx
// app/(marketing)/page.tsx — Server Component
import { getFeaturedServices } from "@/features/services/data";
import { HeroSection } from "@/features/home/components/hero-section";
import { FeaturedServices } from "@/features/services/components/featured-services";

export default function HomePage() {
  const services = getFeaturedServices();

  return (
    <>
      <HeroSection />
      <FeaturedServices services={services} />
    </>
  );
}
```

Contoh boundary interaktif:

```tsx
// features/gallery/components/gallery-experience.tsx
"use client";

export function GalleryExperience() {
  // Filter state, lightbox state, keyboard interactions.
  return null;
}
```

Contoh di atas hanya menunjukkan pola, bukan implementasi final komponen.

## 3. Folder Structure

Rekomendasi struktur awal:

```text
maison-belle/
├── public/
│   ├── images/
│   │   ├── brand/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── gallery/
│   │   └── artists/
│   ├── fonts/
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── layanan/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── galeri/
│   │   │   │   └── page.tsx
│   │   │   └── kebijakan-privasi/
│   │   │       └── page.tsx
│   │   │
│   │   ├── booking/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   │
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives
│   │   ├── layout/             # Header, Footer, Container
│   │   └── shared/             # Reusable cross-feature components
│   │
│   ├── features/
│   │   ├── home/
│   │   │   └── components/
│   │   ├── services/
│   │   │   ├── components/
│   │   │   ├── data/
│   │   │   ├── types/
│   │   │   └── utils/
│   │   ├── gallery/
│   │   │   ├── components/
│   │   │   ├── data/
│   │   │   └── types/
│   │   ├── artists/
│   │   │   ├── components/
│   │   │   └── data/
│   │   ├── testimonials/
│   │   │   ├── components/
│   │   │   └── data/
│   │   ├── faq/
│   │   │   ├── components/
│   │   │   └── data/
│   │   └── booking/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── schemas/
│   │       ├── utils/
│   │       └── types/
│   │
│   ├── config/
│   │   ├── site.ts
│   │   └── business.ts
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── format/
│   │   └── constants/
│   │
│   └── types/
│       └── common.ts
│
├── docs/
│   ├── README.md
│   ├── PRD.md
│   ├── SPEC.md
│   ├── ARCHITECTURE.md
│   ├── IMPLEMENTATION-PLAN.md
│   ├── CREDITS.md
│   ├── design/
│   └── showcase/
│
├── assets/
│   └── brand/
│       └── logo-source.png
├── e2e/
├── tests/
├── .env.example
├── components.json
├── next.config.ts
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── playwright.config.ts
├── README.md
└── AGENTS.md
```

### Folder rules

- `app/` owns routes, layouts, route metadata, loading/error/not-found boundaries.
- `features/` owns domain-specific UI, types, static data, schemas, and feature utilities.
- `components/ui/` contains generated/adapted shadcn primitives; do not put business-specific page sections here.
- `components/layout/` contains cross-route shell components.
- `components/shared/` contains genuinely reusable components shared by multiple features.
- `config/` contains site-wide/business configuration, not arbitrary feature data.
- `lib/` contains generic utilities without business ownership.
- `types/` is only for types shared across multiple features. Prefer colocated types when used by one feature.
- `public/` contains static assets with stable paths.
- `tests/` contains unit/component tests where colocated tests are not preferred; `e2e/` contains Playwright flows.

Do not create empty folders in advance. Create a folder when a real file needs it.

## 4. Route & Layout Strategy

### Root layout

`src/app/layout.tsx`:

- Defines `<html lang="id">`.
- Imports global CSS.
- Configures global metadata defaults and fonts.
- Renders the minimal global document shell.
- Does not become a Client Component.

### Marketing route group

`(marketing)` is a route group and does not affect URL paths. Its layout can compose Header, Footer, and marketing shell.

### Booking route

Booking can use a distinct layout if the flow needs a less distracting shell. Keep the route's page component server-rendered and mount a dedicated booking client experience inside it.

### Route handlers

No Route Handler or API route is needed for the MVP. Do not create `/api` endpoints just to proxy static local data or construct WhatsApp URLs.

## 5. Feature Module Boundaries

### Services

Owns:

- `Service` type.
- Static service catalog.
- Category filtering helpers.
- Price label/formatting helpers if service-specific.
- Service cards, catalog, detail view.

Public exports should be explicit through a small `index.ts` only when it improves import clarity. Avoid barrel exports that create circular dependencies or obscure client/server boundaries.

### Gallery

Owns:

- Gallery item type and data.
- Category filtering.
- Grid/masonry presentation.
- Lightbox interaction.
- Image metadata/alt text.

Static gallery content should be server-rendered where possible; interactive filter/lightbox state belongs in a small client component.

### Booking

Owns:

- Booking types.
- Zod schemas.
- Wizard state and step transitions.
- Summary rendering.
- Date/time helpers.
- WhatsApp message and URL builder.
- Booking-specific components.

Keep WhatsApp URL construction in a pure utility function so it can be unit tested without a browser.

### Content features

Artists, testimonials, FAQ, and home sections should remain small modules. Do not force every static section into an elaborate domain/service/repository stack.

## 6. Data Architecture

### MVP: static typed data

Use TypeScript data modules:

- `features/services/data/services.ts`
- `features/gallery/data/gallery.ts`
- `features/artists/data/artists.ts`
- `features/testimonials/data/testimonials.ts`
- `features/faq/data/faqs.ts`
- `config/business.ts`

Do not add a database, ORM, API client, repository pattern, or server actions in this MVP. The project has no backend requirement.

### Future migration path

If a CMS/backend is introduced later:

1. Keep UI components consuming stable domain types.
2. Add a data-access boundary within the owning feature.
3. Move static implementation behind that boundary.
4. Add validation and error/loading states for remote data.
5. Keep credentials and server-only access outside client modules.
6. Do not leak database or CMS-specific models directly into UI components.

## 7. State Management

### Local state first

Use React state/hooks inside the owning client feature for:

- Mobile drawer open/close.
- Gallery filter and lightbox.
- Booking current step and form values.
- Accordion state when not using native disclosure elements.

### Booking state

The booking wizard should have one state owner at the top of its client subtree. Prefer React Hook Form for field state and Zod for validation. Use a reducer or a small custom hook if step transitions become complex.

Do not use Zustand for this MVP unless state must be shared outside the booking subtree or across routes in a way that local composition cannot reasonably support.

### Persistence

Do not persist customer PII to localStorage, sessionStorage, cookies, or query strings. In-memory state is sufficient for MVP. If reload persistence is later requested, first define consent, retention, and privacy requirements.

## 8. Forms & Validation

- React Hook Form handles form state and field registration.
- Zod schemas define runtime validation.
- Keep schemas in the booking feature.
- Normalize phone numbers in a pure helper.
- Validate business WhatsApp configuration separately from customer phone input.
- Display inline errors and accessible descriptions.
- Do not duplicate validation rules in UI and URL builder; share schema/helper logic.

## 9. Styling & Design System

- Tailwind CSS v4 is the styling foundation.
- `globals.css` defines CSS variables/tokens from `DESIGN-SYSTEM.md`.
- Use Rose Pink Editorial Luxury tokens; do not replace them with a generic default pink palette.
- shadcn/ui components are adapted to Maison Belle tokens and interaction needs.
- Use Playfair Display for editorial/display headings and DM Sans for interface/body, as specified in design docs.
- Keep design tokens centralized; avoid scattered arbitrary hex values.
- Prefer semantic token names (e.g. `--color-brand`, `--color-surface`, `--color-text`) over names tied to one component.
- Ensure contrast for text and focus states; brand pink is not automatically suitable for small text.

## 10. Image & Font Strategy

- Use `next/image` for content images.
- Use local assets under `public/images/` where possible.
- Configure remote image hosts explicitly if remote images are required.
- Provide width/height or stable aspect ratios.
- Use `priority`/preload only for the actual above-the-fold LCP image, not every image.
- Lazy-load below-the-fold images.
- Use `next/font` for Google/local font loading where suitable; prefer self-hosted/local font files if licensing and project setup support it.
- Confirm image usage rights; do not use unlicensed photos as if they are Maison Belle's real portfolio.

## 11. SEO & Rendering

- Use Next.js Metadata API for static and dynamic metadata.
- Use `generateMetadata` for service detail routes when appropriate.
- Use `sitemap.ts` and `robots.ts`.
- Keep important content in Server Components for crawlable HTML.
- Generate LocalBusiness/BeautySalon structured data only from verified business information.
- Do not create fictional business facts in structured data.
- Use static rendering for static content when compatible with the current Next.js caching model.
- Do not add caching directives mechanically; choose caching/revalidation based on actual data freshness. Static local TypeScript data needs no network cache policy.

## 12. Error, Loading & Not Found

- Add `not-found.tsx` for unknown routes/services.
- Add `error.tsx` only where a meaningful recovery UI is needed; error boundary must follow Next.js client requirements.
- Add `loading.tsx` only when route work is actually asynchronous or a loading transition materially improves navigation.
- Static content should not display artificial loading skeletons.
- Provide a clear fallback for missing images and invalid configuration.
- Avoid swallowing errors silently.

## 13. Security & Privacy Boundaries

- No secrets are needed for the current static MVP.
- Never prefix private values with `NEXT_PUBLIC_`.
- Keep server-only integrations in server modules if future features add them.
- Validate all user-controlled data before constructing external URLs.
- Encode WhatsApp message content using `encodeURIComponent`.
- Do not include PII in logs, analytics, or query parameters.
- Use safe external link attributes when opening new tabs.
- Do not claim WhatsApp handoff means the salon received or confirmed the booking.

## 14. Testing Architecture

### Unit tests

Test pure helpers and schemas:

- Currency formatting.
- Price labels.
- Service filtering.
- Booking schema.
- Date/time validation.
- Phone normalization.
- WhatsApp message and URL builder.

### Component tests

Test interaction-heavy components:

- Booking stepper.
- Service selector.
- Gallery filter/lightbox.
- Mobile navigation.
- FAQ accordion if custom.

### E2E

Use Playwright for critical user journeys:

- Homepage and navigation.
- Service discovery.
- Gallery interactions.
- Full booking request flow through generated WhatsApp link.
- Mobile viewport behavior.
- Accessibility-critical keyboard interactions.

E2E must not send an actual WhatsApp message. Assert the target URL and encoded content.

## 15. Code Conventions

- TypeScript strict mode; avoid `any`.
- Prefer named exports for components and utilities.
- Default exports only where required or conventional for Next.js route special files.
- Keep components focused; extract only when reuse, complexity, or testability justifies it.
- Use `import type` for type-only imports.
- Use `@/` alias consistently.
- Avoid giant `page.tsx` files.
- Avoid premature abstractions, generic factories, and unnecessary provider layers.
- Avoid global client providers unless a real cross-app requirement exists.
- Keep server/client imports explicit; never import server-only modules into client components.
- Do not add dependencies without explaining the need and checking whether existing stack already solves it.

## 16. Suggested Implementation Sequence

1. Bootstrap Next.js App Router project with TypeScript, Tailwind v4, ESLint, and pnpm.
2. Establish global fonts, tokens, and base styles from design documentation.
3. Create root and marketing layouts, metadata, navigation, footer.
4. Implement static typed content and service catalog.
5. Build homepage sections using Server Components.
6. Implement service detail routes and metadata.
7. Implement gallery client interaction with server-rendered content.
8. Implement guided booking flow and pure WhatsApp utilities.
9. Add responsive and accessibility refinements.
10. Add unit/component tests and Playwright E2E.
11. Run lint, typecheck, tests, production build, and browser verification.
12. Review performance, SEO, and content authenticity.

## 17. Architecture Decision Summary

| Concern           | Decision                                                |
| ----------------- | ------------------------------------------------------- |
| Routing           | Next.js App Router                                      |
| Component default | Server Components                                       |
| Client boundary   | Small, feature-specific interactive components          |
| Organization      | Feature-oriented modules under `features/`              |
| Routes            | Thin route files under `app/`                           |
| Data              | Typed static TypeScript data for MVP                    |
| Forms             | React Hook Form + Zod                                   |
| State             | Local React state; no global store by default           |
| UI primitives     | shadcn/ui adapted to brand tokens                       |
| Styling           | Tailwind CSS v4                                         |
| Icons             | Lucide                                                  |
| Booking           | Client wizard → validated WhatsApp URL                  |
| Backend           | None in MVP                                             |
| Database          | None in MVP                                             |
| Tests             | Unit/component + Playwright E2E                         |
| Deployment        | Next.js-compatible hosting; deployment details separate |

## 18. Official References

Architecture decisions above follow the current official Next.js App Router guidance. Re-check these pages when upgrading Next.js because conventions and caching behavior can evolve.

- [Next.js App Router](https://nextjs.org/docs/app) — routing model, layouts, project structure, and App Router fundamentals.
- [Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) — route and file organization conventions.
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) — Server Components by default and narrow client boundaries.
- [Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data) — server-side data access, streaming, and loading states.
- [Metadata and OG Images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) — metadata conventions.

**Important:** Next.js documents framework conventions, not one mandatory enterprise folder architecture. The feature-oriented structure in this document is a project-level recommendation sized to Maison Belle's actual scope.
