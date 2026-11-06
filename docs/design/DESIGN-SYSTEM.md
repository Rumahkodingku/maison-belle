# Maison Belle — Design System

**Project:** Maison Belle  
**Publisher:** RumahKodingku  
**Version:** 1.1  
**Status:** Approved design direction — Rose Pink / Balanced Luxury

---

## 1. Design Philosophy

Maison Belle uses **Rose Pink Editorial Luxury**: feminine, warm, sophisticated, photography-led, and editorial.

The identity is built around a confident rose-pink primary color, balanced by warm ivory, soft blush, and deep rose-brown typography. Pink should be recognizable as the brand signature without overwhelming the interface.

### Core principles

- Feminine, not childish.
- Premium, not cold.
- Editorial, not generic.
- Warm, not overly sweet.
- Image-led, with clear content hierarchy.
- Conversion-focused without aggressive calls to action.
- Accessible and usable across all screen sizes.

## 2. Brand Color System

### Core palette

| Token                           | Hex       | Role                        |
| ------------------------------- | --------- | --------------------------- |
| `color.brand.rose`              | `#C97991` | Primary brand pink          |
| `color.brand.dusty-rose`        | `#DDA6B5` | Secondary pink accent       |
| `color.brand.soft-blush`        | `#F3DDE3` | Soft pink surface           |
| `color.neutral.warm-ivory`      | `#FFF9F6` | Main page background        |
| `color.neutral.deep-rose-brown` | `#593D45` | Main text and dark contrast |
| `color.neutral.champagne`       | `#E9D7C8` | Neutral decorative accent   |
| `color.neutral.white`           | `#FFFFFF` | Raised surface              |
| `color.neutral.border`          | `#E8DCD8` | Borders and dividers        |

### Semantic tokens

| Token                        | Intended use                                             |
| ---------------------------- | -------------------------------------------------------- |
| `color.text.primary`         | Deep Rose Brown                                          |
| `color.text.secondary`       | A darker, contrast-checked muted neutral                 |
| `color.surface.page`         | Warm Ivory                                               |
| `color.surface.default`      | White                                                    |
| `color.surface.brand-soft`   | Soft Blush                                               |
| `color.action.primary`       | Rose Pink                                                |
| `color.action.primary-hover` | A darker rose derived and contrast-tested from Rose Pink |
| `color.border.default`       | Warm neutral border                                      |
| `color.state.success`        | Accessible semantic green                                |
| `color.state.warning`        | Accessible semantic amber                                |
| `color.state.error`          | Accessible semantic red                                  |
| `color.state.info`           | Accessible semantic blue                                 |

Semantic status colors are functional and should not be replaced with pink. Do not communicate state through color alone.

### Dark theme

Dark mode is a distinct “after-hours” palette, not an inversion of light mode.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `color.surface.page` | `#FFF9F6` | `#171011` | Page canvas |
| `color.surface.default` | `#FFFDFC` | `#211719` | Cards and panels |
| `color.surface.field` | `#FFFFFF` | `#1C1315` | Inputs and textareas |
| `color.surface.deep` | `#593D45` | `#0F0A0B` | Footer, CTA, lightbox |
| `color.text.primary` | `#593D45` | `#F8EFEC` | Body and headings |
| `color.text.secondary` | `#7A5A62` | `#CBB8BC` | Muted copy |
| `color.action.accent` | `#A8516A` | `#EDA9BC` | Links, icons, selected tint |
| `color.action.fill` | `#A8516A` | `#C97991` | CTA and selected chip background |
| `color.action.on-fill` | `#FFFFFF` | `#1A1114` | Text on action fill |
| `color.border.default` | `#E8DCD8` | `#3B2B2F` | Dividers and borders |

Rules:

- Always pair `action.fill` with `on-fill`; never use white text on the dark fill.
- Keep `deep`/`on-deep` for surfaces that are intentionally dark in both themes.
- Keep photography natural; use deep gradient overlays rather than a global dark image filter.
- Theme preference follows the OS until the user makes a manual choice. Manual choice persists in `localStorage`.
- The cinematic radial theme reveal is optional; reduced motion switches instantly.

### Balanced Luxury color distribution

Suggested visual balance:

- 40% Warm Ivory
- 25% Soft Blush
- 15% Rose Pink
- 10% Dusty Rose
- 10% Deep Rose Brown

This is a visual guideline, not a strict per-page quota. Use the palette according to content and hierarchy.

### Color usage rules

- Warm Ivory is the default page canvas.
- Rose Pink is the primary brand color and is used for main CTAs, selected states, active filters, and important brand accents.
- Soft Blush is used for alternating sections, subtle cards, and supportive surfaces.
- Dusty Rose is a secondary decorative accent.
- Deep Rose Brown is used for headings, body text, and high-contrast UI labels.
- Champagne is used sparingly for borders, separators, and small decorative details.
- Avoid large uninterrupted blocks of saturated pink.
- Do not use low-contrast pink for small text.
- All foreground/background combinations must be contrast-tested before release.

## 3. Typography

### Font families

| Role                        | Typeface         | Fallback          |
| --------------------------- | ---------------- | ----------------- |
| Display / editorial heading | Playfair Display | Georgia, serif    |
| Body / interface            | DM Sans          | Arial, sans-serif |

### Type scale

| Token        | Desktop |  Mobile | Use                     |
| ------------ | ------: | ------: | ----------------------- |
| `display-xl` | 64–80px | 44–56px | Hero statement          |
| `display-lg` | 52–64px | 38–46px | Major editorial heading |
| `heading-1`  | 40–48px | 32–38px | Section heading         |
| `heading-2`  | 30–36px | 26–30px | Subsection              |
| `heading-3`  | 22–26px | 20–24px | Card/feature heading    |
| `body-lg`    |    18px | 17–18px | Intro copy              |
| `body`       |    16px |    16px | Main content            |
| `body-sm`    |    14px |    14px | Supporting content      |
| `caption`    | 12–13px | 12–13px | Metadata                |

### Typography rules

- Use Playfair Display for editorial expression.
- Use DM Sans for navigation, forms, service information, prices, and long-form copy.
- Body line-height should generally be 1.5–1.7.
- Keep paragraph measure comfortable.
- Use tabular numerals for prices and time values where available.
- Avoid excessive all-caps text and overly small labels.

## 4. Spacing and Layout

Use a 4px base spacing unit.

| Token      | Value |
| ---------- | ----: |
| `space-1`  |   4px |
| `space-2`  |   8px |
| `space-3`  |  12px |
| `space-4`  |  16px |
| `space-5`  |  20px |
| `space-6`  |  24px |
| `space-8`  |  32px |
| `space-10` |  40px |
| `space-12` |  48px |
| `space-16` |  64px |
| `space-20` |  80px |
| `space-24` |  96px |

### Container guidance

- Maximum content width: approximately 1280px.
- Desktop gutters: 48–64px.
- Tablet gutters: 32px.
- Mobile gutters: 20–24px.
- Use generous vertical spacing between editorial sections.
- Keep booking forms narrower and easier to scan.

### Grid

- Desktop: 12-column editorial grid.
- Tablet: 8-column or simplified grid.
- Mobile: 4-column grid.
- Use asymmetry for selected storytelling sections; keep functional layouts predictable.

## 5. Shape, Borders, and Elevation

### Radius tokens

| Token         | Value | Use                         |
| ------------- | ----: | --------------------------- |
| `radius-sm`   |   6px | Small controls              |
| `radius-md`   |  10px | Inputs and compact panels   |
| `radius-lg`   |  16px | Service cards               |
| `radius-xl`   |  24px | Large image panels          |
| `radius-full` | 999px | Pills and circular controls |

Do not round every component equally. Editorial imagery may use square or minimally rounded corners.

### Borders and shadows

- Use warm neutral hairline borders.
- Use shadows sparingly.
- Avoid heavy drop shadows and glassmorphism.
- Use pink borders for selected states only when paired with another clear indicator.

## 6. Imagery and Media

- Use premium, authentic-looking beauty photography.
- Prefer natural light and warm, consistent color grading.
- Mix portrait, landscape, and detail images.
- Use deliberate editorial crops.
- Avoid imagery that clashes with the rose-pink palette.
- Use original or properly licensed imagery.
- Do not imply fictional imagery is real customer work.
- Provide meaningful alt text and explicit image dimensions.

### Aspect ratio guidance

| Context         | Ratio               |
| --------------- | ------------------- |
| Hero portrait   | 4:5 or 3:4          |
| Service card    | 4:5                 |
| Gallery         | Mixed 4:5, 1:1, 3:4 |
| Artist portrait | 3:4                 |
| Wide banner     | 16:9 or 2:1         |

## 7. Components

### Navigation

- Desktop header with brand, primary links, and prominent booking CTA.
- Mobile navigation uses an accessible drawer or panel.
- Use Rose Pink sparingly for active navigation state.
- Sticky navigation must not obscure content.

### Buttons

Variants:

- Primary: Rose Pink background with a contrast-verified foreground.
- Secondary: Warm Ivory or white surface with Deep Rose Brown text and warm border.
- Tertiary: text action.
- WhatsApp: clear label and recognizable icon; do not rely on green alone.

States:

- Default
- Hover
- Focus-visible
- Active
- Disabled

Primary button labels should use clear verbs, e.g. “Booking Sekarang” and “Lanjutkan”.

### Service cards

Required:

- Image.
- Category.
- Treatment name.
- Short description.
- Price and pricing type.
- Duration where relevant.
- Detail or booking CTA.

Pricing:

- Fixed: “Rp250.000”.
- Starting price: “Mulai dari Rp250.000”.
- Starting prices must not be presented as guaranteed final quotes.

Use ivory and soft-blush surfaces. Rose Pink should highlight key actions or small labels, not dominate every card.

### Gallery

- Mixed editorial masonry layout.
- Category filters for Hair, Nails, Makeup, and Lash & Brow.
- Rose Pink selected filter state.
- Accessible lightbox with close, previous, next, and keyboard support.
- Respect reduced motion.

### Testimonials

- Magazine-style quote composition.
- Use genuine and permissioned attribution for real reviews.
- Mark sample content as demo content.

### Form controls

- Persistent labels.
- Clear required and optional indicators.
- Visible focus states.
- Inline validation and helpful error messages.
- Selected date/time states use Rose Pink plus shape/border/label cues.
- Minimum comfortable touch target approximately 44×44px.

## 8. Guided Booking Patterns

The booking wizard is functional and calm, with a more restrained layout than the editorial homepage.

### Steps

1. Pilih layanan.
2. Pilih tanggal & waktu.
3. Data pelanggan.
4. Periksa permintaan.
5. Lanjutkan ke WhatsApp.

### Requirements

- Show progress and current step.
- Preserve values when navigating backward.
- Display service, price type, and duration.
- Reject past dates.
- Show requested time preferences from configured opening hours.
- Explain that date/time are preferences, not confirmed slots.
- Use Rose Pink for selected service, date, time, and primary CTA.
- Ensure selected states remain understandable without color.
- Validate customer name and WhatsApp number.
- Make notes optional.
- Show editable summary before handoff.
- Explain that the salon will confirm through WhatsApp.

### Booking status language

Use:

- “Permintaan jadwal”
- “Jadwal pilihan”
- “Menunggu konfirmasi salon”
- “Lanjutkan ke WhatsApp”

Do not use “Booking berhasil” or “Jadwal sudah terpesan” unless a real backend confirms availability.

## 9. Motion and Interaction

- Motion for React with a shared async `LazyMotion` + `domMax` provider.
- Page transition: fade and rise 8 px over 250 ms.
- Hero parallax, masked text reveals, scroll-linked image reveals, staggered grids, and short hover responses on every interactive surface.
- Hover movement stays at 1–4 px or 1.01–1.03 scale; no section pinning, horizontal scroll, 3D tilt, or cursor trail.
- Respect `prefers-reduced-motion`; keep content available without animation or JavaScript.
- Avoid scroll-jacking and layout-shifting animation.

## 10. Responsive Behavior

### Mobile

- Single-column layouts by default.
- Prominent but unobtrusive booking CTA.
- Comfortable touch targets.
- Full-width form controls.
- No horizontal overflow.
- Gallery adapts to available width.

### Tablet

- Balanced two-column layouts where appropriate.
- Maintain image/text hierarchy.
- Keep navigation usable.

### Desktop

- Editorial 12-column compositions.
- Generous whitespace.
- Readable max-width.
- Booking form should not become excessively wide.

## 11. Accessibility

Target WCAG 2.2 AA where practical.

- Semantic HTML and heading hierarchy.
- Keyboard access to all controls.
- Visible focus indicators.
- Contrast-checked text and controls.
- Persistent form labels.
- Errors associated with their fields.
- Dialog focus management and Escape support.
- Alt text for informative images.
- Reduced-motion support.
- Light and dark themes both pass contrast checks and axe audits.
- Do not communicate selection or status through color alone.

**Important color guardrail:** Rose Pink is a brand accent, not the default body-text color. Use Deep Rose Brown for text on Warm Ivory and Soft Blush unless a specific combination passes contrast testing.

## 12. Localization and Content

- Primary language: Bahasa Indonesia.
- Currency: Indonesian Rupiah (`Rp`).
- Initial demo timezone: `Asia/Jakarta`.
- Use Indonesian date formatting and 24-hour time.
- Keep tone warm, polished, and easy to understand.
- Ensure error messages and accessible labels are localized.

## 13. Design QA Checklist

- [ ] Rose Pink is clearly recognizable as the primary brand color.
- [ ] Warm Ivory remains the dominant canvas.
- [ ] Soft Blush supports rather than overwhelms content.
- [ ] Deep Rose Brown is used for readable text.
- [ ] All color combinations pass contrast checks.
- [ ] Primary button foreground/background contrast is verified.
- [ ] Responsive layouts are checked on mobile, tablet, and desktop.
- [ ] Focus states are visible.
- [ ] Gallery lightbox is keyboard-operable.
- [ ] Motion respects reduced-motion preference.
- [ ] Images have appropriate alt text and dimensions.
- [ ] Booking availability language is accurate.
- [ ] Fixed and starting prices are clearly distinguished.
- [ ] Demo content is not presented as verified real-world claims.
