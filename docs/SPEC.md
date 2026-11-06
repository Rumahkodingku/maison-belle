# SPEC.md — Maison Belle

> **Status:** Implementation specification  
> **Version:** 1.0  
> **Language:** Bahasa Indonesia  
> **Product type:** Premium beauty studio showcase website  
> **Scope:** Frontend-first, static-data MVP  
> **Timezone:** `Asia/Jakarta`  
> **Locale:** `id-ID`  
> **Currency:** `IDR`

## 1. Tujuan Dokumen

Dokumen ini menerjemahkan kebutuhan produk pada `PRD.md` menjadi perilaku fitur, aturan validasi, struktur data, interaksi, kondisi tepi, dan kriteria implementasi yang dapat dikerjakan serta diuji oleh AI Agent.

Urutan otoritas dokumentasi:

1. `PRD.md` — kebutuhan dan ruang lingkup produk.
2. `SPEC.md` — perilaku dan spesifikasi detail fitur.
3. `ARCHITECTURE.md` — batas modul dan pola implementasi.
4. `DESIGN-DIRECTION.md` dan `DESIGN-SYSTEM.md` — keputusan visual dan aturan UI.
5. `AGENTS.md` — instruksi kerja dan konvensi agent.

Jika terdapat konflik, jangan menebak. Catat konflik tersebut dan minta keputusan, kecuali aturan prioritas di atas menyelesaikannya.

## 2. Product Constraints

### 2.1 Konsep

Maison Belle adalah website showcase studio kecantikan premium fiktif untuk demonstrasi kapabilitas RumahKodingku. Website berbahasa Indonesia dan berorientasi pada pengenalan layanan serta permintaan appointment melalui WhatsApp.

### 2.2 Batas MVP

**Termasuk:**

- Homepage dan navigasi.
- Katalog layanan serta informasi harga.
- Galeri editorial dengan filter dan lightbox.
- Profil studio dan artist.
- Testimonial, FAQ, kontak, dan informasi lokasi.
- Guided booking dengan WhatsApp handoff.
- SEO, aksesibilitas, responsive design, dan pengujian.

**Tidak termasuk:**

- Backend atau database.
- Dashboard/admin/CMS.
- Ketersediaan slot real-time.
- Booking yang otomatis terkonfirmasi.
- Pembayaran online.
- Login/akun pelanggan.
- Notifikasi atau reminder otomatis.
- Penyimpanan permanen data booking.

Konten, layanan, harga, artist, FAQ, testimonial, dan konfigurasi bisnis disediakan sebagai data statis TypeScript. Semua konten yang bersifat contoh harus jelas berstatus demo dan tidak boleh dipresentasikan sebagai fakta bisnis nyata.

## 3. Technical Baseline

Gunakan versi stabil yang kompatibel pada saat project dibuat; jangan mengunci nomor versi usang di dokumen ini.

- Next.js App Router.
- React dan TypeScript dengan strict mode.
- Tailwind CSS v4.
- shadcn/ui sebagai sumber komponen yang dapat dimiliki dan disesuaikan di project.
- Lucide icons.
- React Hook Form + Zod untuk validasi form.
- Motion hanya jika ada kebutuhan animasi yang jelas dan tetap menghormati reduced motion.
- Playwright untuk E2E.
- Vitest atau Jest untuk unit/component test, mengikuti tooling yang sudah dipilih pada bootstrap project.
- pnpm sebagai package manager.

Jangan menambahkan state manager global hanya untuk memenuhi preferensi. Gunakan state lokal untuk interaksi lokal. Booking wizard menggunakan satu state owner pada boundary client booking. Pertimbangkan Zustand hanya jika kebutuhan lintas halaman/komponen benar-benar berkembang.

## 4. Information Architecture & Routes

MVP dapat menggunakan satu homepage panjang dengan anchor navigation, ditambah route detail layanan jika konten detail memang dibutuhkan.

| Route                | Tujuan                         | Rendering                          |
| -------------------- | ------------------------------ | ---------------------------------- |
| `/`                  | Homepage seluruh section utama | Server Component                   |
| `/layanan`           | Daftar semua layanan           | Server Component                   |
| `/layanan/[slug]`    | Detail layanan                 | Server Component                   |
| `/galeri`            | Galeri penuh dengan filter     | Server Component + client gallery  |
| `/booking`           | Guided booking                 | Server shell + Client booking flow |
| `/kebijakan-privasi` | Informasi privasi sederhana    | Server Component                   |
| `not-found`          | Halaman tidak ditemukan        | Next.js not-found                  |

Jika implementasi final memilih homepage-only, jangan membuat route yang tidak memberi nilai. Navigasi anchor harus menggunakan ID section yang stabil dan unik.

### 4.1 Navigasi utama

- Logo mengarah ke `/`.
- Menu utama: Beranda, Layanan, Tentang, Galeri, Artist, Kontak.
- CTA utama: “Booking Sekarang” menuju `/booking` atau membuka wizard yang sama.
- Mobile navigation berupa drawer/sheet yang dapat ditutup dengan Escape, klik link, atau tombol close.
- Active state harus jelas secara visual dan aksesibel.
- Hindari menu yang menutupi konten tanpa mekanisme dismiss.

## 5. Shared Domain Types

Letakkan domain types di lokasi shared yang sesuai dengan `ARCHITECTURE.md`. Contoh baseline:

```ts
export type ServiceCategory = "hair" | "nails" | "makeup" | "lash-brow";

export type PricingType = "fixed" | "starting_from";

export type Service = {
  id: string;
  slug: string;
  category: ServiceCategory;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  pricingType: PricingType;
  durationMinutes: number;
  image: string;
  galleryImages?: string[];
  featured: boolean;
  isActive: boolean;
};

export type BookingRequest = {
  serviceId: string;
  requestedDate: string; // YYYY-MM-DD, local business date
  requestedTime: string; // HH:mm, local business time
  customerName: string;
  customerPhone: string;
  notes?: string;
};

export type BusinessConfig = {
  name: string;
  whatsappNumber: string; // international digits only, no "+" or spaces
  timezone: "Asia/Jakarta";
  locale: "id-ID";
  currency: "IDR";
  openingHours: Record<string, { open: string; close: string } | null>;
  address?: string;
  mapUrl?: string;
  instagramUrl?: string;
};
```

Additional content types:

- `Artist`: id, name, role, bio, image, specialties.
- `Testimonial`: id, customerDisplayName, quote, serviceLabel, optional rating; demo content must be labeled.
- `GalleryItem`: id, src, alt, category, optional caption.
- `FaqItem`: id, question, answer.

### 5.1 Data rules

- Use stable IDs and unique slugs.
- Prices are integer IDR values; do not store formatted currency strings in source data.
- `starting_from` must render “Mulai dari” before the formatted amount.
- `fixed` renders the exact formatted amount.
- `isActive: false` services must not appear in public catalog or booking choices.
- Never invent the real salon address, WhatsApp number, opening hours, social links, staff credentials, or customer reviews. Use explicit demo placeholders/configuration and visibly mark fictional content where appropriate.
- Do not place customer PII in analytics events or URL query strings.

## 6. Feature Specifications

## 6.1 Homepage

### Content order

1. Header/navigation.
2. Hero.
3. Trust/brand introduction.
4. Featured services.
5. Featured treatments or value proposition.
6. About Maison Belle.
7. Gallery preview.
8. Artist/team preview.
9. Testimonials.
10. FAQ preview.
11. Booking CTA.
12. Contact/location.
13. Footer.

The exact visual composition follows `DESIGN-DIRECTION.md`; component styling follows `DESIGN-SYSTEM.md`.

### Behavior

- Primary CTA navigates to booking.
- Secondary CTA navigates to services or gallery.
- All sections have semantic headings.
- Images have meaningful alternative text when informative; decorative images use empty alt text.
- No autoplay audio or intrusive motion.
- Do not fabricate urgency, customer counts, awards, or performance claims.

## 6.2 Service Catalog

### Requirements

- Display active services grouped or filterable by category.
- Categories: Hair & Beauty, Nails, Makeup, Lash & Brow.
- Each service card displays name, concise description, duration when known, price, pricing label, and image.
- Featured services may be highlighted without hiding the full catalog.
- CTA selects the service and continues to booking.

### Interactions

- Category filter updates visible services.
- “All” resets category filter.
- Empty filter state provides a clear message and reset action.
- Filter state need not persist after reload.
- Selecting a service passes its stable `serviceId` to booking state; if navigation occurs, use a safe, non-PII mechanism such as a validated query parameter for service ID or a client state strategy. Do not put customer details in the URL.

### Pricing

Use `Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })`.

- Fixed: `Rp 250.000`.
- Starting: `Mulai dari Rp 250.000`.
- Do not append a price if no price has been confirmed; show “Hubungi kami” only when the content configuration explicitly requires it.

## 6.3 Service Detail

- Show service name, category, description, duration, pricing label and price.
- Show relevant imagery.
- Provide booking CTA preselecting that service.
- Unknown slug returns `notFound()`.
- Inactive service is not publicly accessible as a bookable service.
- Metadata title and description must be unique per service.
- Do not imply medical/therapeutic outcomes.

## 6.4 Gallery

### Requirements

- Editorial masonry/grid layout according to design direction.
- Category filters (for example: Semua, Hair, Nails, Makeup, Lash & Brow).
- Accessible lightbox for image inspection.
- Images must be optimized and have correct aspect ratios to reduce layout shift.

### Behavior

- Filter updates gallery without full page navigation.
- Lightbox opens selected image and exposes close, previous, next controls when applicable.
- Close with Escape and close button; backdrop click may close if it does not interfere with image controls.
- Keyboard focus remains managed within the dialog while open and returns to the triggering thumbnail after close.
- Prevent background page scrolling while modal is open.
- Announce image position/caption to assistive technology.
- If no images match, show an empty state.
- Respect `prefers-reduced-motion`.

## 6.5 About & Artists

- About section describes studio concept and service philosophy.
- Artist cards include name, role/specialty, short bio, and portrait.
- Do not invent qualifications, certificates, years of experience, or awards.
- Demo profiles must be marked as fictional sample content in internal data/content notes; do not make misleading real-world claims.

## 6.6 Testimonials

- Show concise, readable quotes and service context.
- Do not invent reviews and present them as genuine customer feedback.
- If using placeholder content, label it as sample/demo content in the UI or omit the section from production-ready presentation.
- Do not add fabricated aggregate ratings or review counts.

## 6.7 FAQ

- Use accessible accordion behavior.
- Questions and answers must be authored in static content.
- Each trigger exposes expanded/collapsed state to assistive technology.
- Keyboard interaction must follow native button behavior.
- Avoid claiming policies that are not configured.

## 6.8 Contact & Location

- Show only configured contact details and address.
- External links use descriptive labels and safe external-link attributes where applicable.
- Map embed is optional; prefer a normal map link if no verified business location exists.
- Contact CTA can link to WhatsApp only when a valid configured number exists.
- Do not show a fabricated map pin or address.

## 7. Guided Booking Specifications

## 7.1 Booking model

Booking is a **request for an appointment**, not a confirmed reservation. The customer chooses a preferred date and time; the salon manually checks and confirms availability in WhatsApp.

No backend, database, real-time slot inventory, payment, account, or automatic confirmation is implemented in MVP.

## 7.2 Wizard steps

| Step         | User action                                    | Required state                           |
| ------------ | ---------------------------------------------- | ---------------------------------------- |
| 1. Layanan   | Select exactly one active service              | `serviceId`                              |
| 2. Jadwal    | Select preferred date and time                 | `requestedDate`, `requestedTime`         |
| 3. Data diri | Enter name and WhatsApp number; notes optional | `customerName`, `customerPhone`, `notes` |
| 4. Ringkasan | Review all request details                     | Valid complete request                   |
| 5. WhatsApp  | Open WhatsApp with prefilled message           | Valid WhatsApp URL                       |

### Navigation rules

- Next is disabled until the current step is valid.
- Back preserves previously entered values.
- Changing service updates displayed price and duration in summary.
- Editing a prior step returns to the correct step and preserves later values unless those values become invalid.
- Step indicator exposes current step to screen readers.
- On narrow screens, the stepper must remain understandable without horizontal overflow.
- Refresh behavior is not guaranteed; do not claim persistent booking data. Avoid persisting customer PII in localStorage/sessionStorage.

## 7.3 Service selection

- Exactly one service is selected.
- Only active services are selectable.
- Selected state uses design-system selected treatment and accessible `aria-pressed` or radio semantics.
- If service was preselected through a route/query value, validate it against active service IDs.
- Invalid or inactive preselection is ignored and user must select a valid service.

## 7.4 Date selection

- Date must be a valid calendar date.
- Date is interpreted in `Asia/Jakarta`.
- Past dates are not selectable.
- Minimum booking lead time and maximum advance window must be configurable only if business policy is provided; otherwise do not invent them.
- Do not present the chosen date as availability-confirmed.
- If the salon opening days are configured, prevent selecting closed days. If not configured, allow date preference and communicate that the salon will confirm manually.
- Handle date-only values as `YYYY-MM-DD`; avoid accidental UTC date shifts.

## 7.5 Time selection

- Time format is `HH:mm` (24-hour).
- If opening hours are configured, available preference options must be within opening hours and use a documented interval (default 30 minutes only if approved as a UI convention, not as real slot availability).
- If opening hours are not configured, allow the customer to enter/select a preference and clearly state it requires manual confirmation.
- A preferred time is not a real-time available slot.
- Never show “slot tersedia” or “booking berhasil” before manual confirmation.

## 7.6 Customer details validation

Use React Hook Form with Zod.

Rules:

- `customerName`: trim whitespace; required; minimum 2 characters; maximum 80 characters.
- `customerPhone`: required; accept common Indonesian input forms (e.g. `08...`, `+62...`, `62...`) and normalize for message display. Reject letters and clearly invalid lengths. Do not assume all international formats unless product requirements expand.
- `notes`: optional; trim; maximum 500 characters.
- Show field-level error text and associate it with the relevant input.
- Do not rely on placeholder text as the only label.
- Do not log form values or phone number to console/analytics.

## 7.7 Booking summary

Display:

- Service name.
- Price and pricing type.
- Duration if configured.
- Preferred date and time.
- Customer name.
- Customer WhatsApp number in readable form.
- Optional notes.

Include a clear notice:

> Jadwal yang Anda pilih merupakan preferensi. Tim Maison Belle akan memeriksa ketersediaan dan mengonfirmasi appointment melalui WhatsApp.

Provide actions:

- “Kembali” to edit.
- “Lanjutkan ke WhatsApp” to open the handoff.
- Do not label this stage “Booking confirmed”.

## 7.8 WhatsApp handoff

### Number configuration

- Store business WhatsApp number as international digits only, e.g. `6281234567890`.
- Validate configuration before building URL.
- If number is missing or invalid, disable WhatsApp action and show a helpful fallback contact message. Never construct a fake number.

### Message content

The Indonesian prefilled message should include:

- Greeting and request for appointment.
- Service name.
- Price label and formatted price.
- Preferred date.
- Preferred time.
- Customer name.
- Customer WhatsApp number if useful for recipient context.
- Notes if provided.
- Explicit request for salon confirmation.

Example template:

```text
Halo Maison Belle, saya ingin mengajukan appointment.

Layanan: {serviceName}
Harga: {priceLabel}
Tanggal pilihan: {formattedDate}
Waktu pilihan: {formattedTime}
Nama: {customerName}
WhatsApp: {customerPhone}
Catatan: {notesOrDash}

Mohon konfirmasi ketersediaan jadwal tersebut. Terima kasih.
```

### URL construction

- Use `https://wa.me/{businessNumber}?text={encodedMessage}`.
- Encode message with `encodeURIComponent`.
- Do not concatenate untrusted text without encoding.
- Open in a new tab/window with safe rel attributes, or use a normal anchor so browser behavior is predictable.
- E2E tests must assert the generated URL/message but must never send an actual message.
- Opening WhatsApp is not proof of delivery or confirmation.
- After handoff, UI may say “WhatsApp terbuka untuk mengirim permintaan Anda” only if the browser successfully opens the target; otherwise provide a copy-message fallback.

### Fallback

- Provide a “Salin pesan” action if popup/navigation is blocked or WhatsApp cannot be opened.
- Clipboard failure must show a useful manual-copy fallback.
- Never claim the request has reached the salon.

## 8. Interaction & Motion

- Use native links for navigation and buttons for actions.
- All controls need visible focus states.
- Hover effects must have equivalent focus/active behavior.
- Motion should support the editorial brand without delaying interaction.
- Respect `prefers-reduced-motion: reduce`.
- Avoid scroll hijacking, autoplay carousels, and parallax that harms readability/performance.
- Use transitions sparingly and keep interaction response immediate.

## 9. Responsive Specifications

Test at minimum:

- 360px mobile.
- 390px mobile.
- 768px tablet.
- 1024px laptop.
- 1440px desktop.

Requirements:

- No horizontal overflow.
- Navigation changes to a mobile pattern at a suitable breakpoint.
- Hero composition is art-directed for mobile; not merely scaled down.
- Gallery reflows without awkward single-image gaps.
- Booking form controls are touch-friendly.
- Sticky/fixed elements must not obscure content or keyboard focus.
- Text remains readable at 200% zoom.
- Use fluid sizing where useful, but retain deliberate max-widths for editorial content.

## 10. SEO & Metadata

- Provide a meaningful root metadata title and description in Indonesian.
- Use unique metadata for service detail pages.
- Add canonical URLs only when deployment domain is finalized.
- Add Open Graph and Twitter metadata with valid images.
- Use semantic HTML and one clear page-level `h1`.
- Provide sitemap and robots configuration appropriate to public pages.
- Add LocalBusiness/BeautySalon structured data only when real business details are verified. Do not publish fictional address, telephone, opening hours, or ratings as structured data.
- Avoid duplicate titles/descriptions.
- Use descriptive image alt text; do not stuff keywords.

## 11. Accessibility

Target WCAG 2.2 AA.

- Semantic landmarks and heading hierarchy.
- Keyboard operability for navigation, filters, accordions, lightbox, and booking.
- Visible focus indicator with sufficient contrast.
- Accessible labels, descriptions, and validation errors.
- Dialog focus management for lightbox.
- Sufficient color contrast; Rose Pink must not be used as small body text on light backgrounds unless measured contrast passes.
- Do not communicate state through color alone.
- Reduced-motion support.
- Touch targets should be comfortably usable; aim for at least 44×44 CSS px where practical.
- Images need appropriate alt treatment.
- Form errors must be announced and associated with fields.

## 12. Performance & Media

- Prefer `next/image` for local/remote image optimization with explicit remote host configuration where required.
- Set image dimensions/aspect ratio to reduce layout shift.
- Use appropriate image formats and responsive sizes.
- Prioritize only the actual hero/LCP image; lazy-load below-the-fold media.
- Avoid shipping large client bundles for static content.
- Keep most page sections as Server Components.
- Load interactive gallery/booking code only where needed.
- Avoid unnecessary animation libraries and duplicate icon packages.
- Target strong Core Web Vitals and Lighthouse results, but treat scores as measurement goals rather than guarantees.
- Test on throttled mobile network and mid-range device profiles.

## 13. Error & Edge Cases

- Unknown service slug → Next.js not-found page.
- Inactive service → not selectable and not bookable.
- Empty gallery category → informative empty state.
- Missing business WhatsApp number → disable handoff and provide configured fallback.
- Invalid WhatsApp number → do not generate link.
- Invalid date/time → block progression and show field-level error.
- User navigates backward → preserve entered form state.
- Popup blocked → expose normal link/copy fallback.
- Clipboard unavailable → show message for manual selection/copy.
- Missing optional image → use a designed fallback; avoid broken-image icon.
- Missing business address → hide map/address section rather than inventing one.
- Empty optional notes → omit notes line or use a neutral dash in WhatsApp message.
- No actual availability service → clearly label date/time as preferences.

## 14. Analytics & Privacy

- Do not add analytics unless explicitly configured.
- Never send customer name, phone, notes, booking details, or other PII to analytics.
- Do not store booking PII in persistent browser storage.
- Avoid query strings containing PII.
- Include a short privacy notice near booking submission explaining that details are used to prepare the WhatsApp request.
- Any future analytics must be privacy-conscious and documented.

## 15. Testing Specifications

### Unit tests

- IDR formatting.
- Starting-from/fixed price labels.
- Date parsing and past-date validation in business timezone.
- Time format validation.
- Customer name/phone/notes schema.
- WhatsApp message builder.
- WhatsApp URL builder and invalid business number handling.
- Active-service filtering.

### Component tests

- Service category filter.
- Service selection.
- Booking step progression and back navigation.
- Field validation and error announcement.
- Booking summary.
- Gallery filter and lightbox keyboard behavior.
- FAQ accordion.

### Playwright E2E

1. Homepage loads and primary navigation works.
2. Service catalog filters correctly.
3. Service detail page loads for valid slug and 404s for invalid slug.
4. Gallery filtering and lightbox work with keyboard.
5. Booking wizard blocks invalid progression.
6. Booking wizard preserves values when navigating backward.
7. Valid booking generates the expected WhatsApp URL and encoded message.
8. No test sends a real WhatsApp message.
9. Mobile navigation and booking layout work at mobile viewport.
10. No uncaught console errors or failed critical assets.

## 16. Definition of Done

A feature is complete only when:

- It satisfies the relevant PRD requirement and this specification.
- It follows the architecture and design system.
- It is responsive at defined viewports.
- It is keyboard accessible and has appropriate semantic markup.
- It has appropriate unit/component/E2E coverage.
- It has no obvious console/runtime errors.
- It does not fabricate business data or claim booking confirmation.
- Relevant metadata and image optimization are in place.
- The implementation is documented where a non-obvious decision was made.
