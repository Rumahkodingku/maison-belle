# Maison Belle — Product Requirements Document (PRD)

**Project:** Maison Belle  
**Publisher:** RumahKodingku  
**Document version:** 1.0  
**Status:** Approved product direction  
**Product type:** Responsive marketing website with WhatsApp appointment inquiry

---

## 1. Product Summary

Maison Belle is a fictional premium beauty studio website showcase. It helps visitors discover beauty services, understand treatment options and pricing, explore portfolio work, and submit an appointment request through a guided booking experience.

The website generates a prefilled WhatsApp message and hands the visitor off to WhatsApp Business. The salon must review and confirm the requested schedule manually.

## 2. Problem Statement

Potential salon customers often need to browse social media posts, ask for service details, request prices, and message the business before they can decide what to book. Information may be fragmented and the inquiry process may require repetitive manual questions.

Maison Belle demonstrates a more structured experience by bringing service discovery, pricing guidance, portfolio, business information, and appointment inquiry into one website.

## 3. Goals

### Product goals

1. Make services and treatment options easy to discover.
2. Present prices and durations clearly.
3. Build trust through brand story, artists, gallery, and testimonials.
4. Provide a guided and understandable appointment inquiry flow.
5. Generate correctly formatted WhatsApp appointment requests.
6. Deliver a polished, responsive, accessible, search-friendly website.

### Non-goals

- Confirming or reserving actual appointment slots.
- Managing staff calendars.
- Processing payments.
- Managing customer accounts.
- Operating a salon back office.
- Sending automated WhatsApp messages.
- Storing appointment records in a backend.

## 4. Target Users and Personas

### Persona A — Beauty maintenance customer

Wants to compare hair, nail, lash, or brow treatments and understand the price and duration before contacting the salon.

### Persona B — Event makeup customer

Needs makeup for an event and wants to review examples, understand available packages, and request a suitable time.

### Persona C — First-time visitor

Does not know the studio and needs reassurance through clear information, professional presentation, location, policies, and genuine proof of work.

## 5. Product Scope

### In scope — MVP

- Homepage and marketing sections.
- Service catalog and service detail.
- Mixed gallery with category filters and lightbox.
- Studio/about information.
- Artist profiles.
- Testimonials and FAQ.
- Contact and location information.
- Guided booking wizard.
- WhatsApp Click to Chat handoff.
- Responsive design.
- SEO metadata and structured data.
- Accessibility, performance, and E2E testing.

### Out of scope — MVP

- Admin dashboard and CMS.
- Database or persistent booking storage.
- Real-time availability.
- Slot locking or double-booking prevention.
- Online payment/deposit.
- Customer authentication.
- Automated reminders.
- Staff assignment and scheduling.
- WhatsApp Business API automation.
- Review submission and moderation.

## 6. Information Architecture

Recommended routes:

| Route              | Purpose                    |
| ------------------ | -------------------------- |
| `/`                | Main landing page          |
| `/services`        | Browse all services        |
| `/services/[slug]` | Treatment details          |
| `/gallery`         | Portfolio and work samples |
| `/about`           | Studio story and artists   |
| `/contact`         | Location, hours, contact   |
| `/booking`         | Guided appointment inquiry |

The homepage should provide concise previews and clear links to deeper content.

## 7. Functional Requirements

Priority definitions:

- **P0:** Required for MVP release.
- **P1:** Important quality or conversion enhancement.
- **P2:** Optional enhancement, may be deferred.

### FR-01 — Homepage and navigation (P0)

- Display Maison Belle identity and primary navigation.
- Provide primary CTA “Booking Sekarang”.
- Provide secondary CTA “Jelajahi Layanan”.
- Present hero, services, featured treatments, brand story, gallery preview, artists, pricing highlights, testimonials, contact, FAQ, and footer.
- Navigation must work on mobile and desktop.
- Sticky navigation must not obscure anchored content.

### FR-02 — Service catalog (P0)

- Display services grouped by category: Hair & Beauty, Nails, Makeup, Lash & Brow.
- Each service has name, description, image, price, pricing type, duration, category, slug, and active/featured state.
- Support category filtering.
- Provide service detail view or modal.
- Provide a CTA to book the selected service.
- When a visitor starts booking from a service, preselect that service.

### FR-03 — Mixed pricing (P0)

Support two pricing modes:

1. **Fixed:** display an exact price, e.g. “Rp250.000”.
2. **Starting from:** display “Mulai dari Rp250.000”.

The booking summary must preserve the correct pricing label. For a starting price, clearly state that the final amount may depend on the treatment details and studio confirmation.

### FR-04 — Gallery (P0)

- Display a mixed editorial masonry gallery.
- Support category filtering, such as Hair, Nails, Makeup, and Lash & Brow.
- Open images in an accessible lightbox.
- Support close, previous, next, and keyboard interactions.
- Provide meaningful alt text.
- Do not imply demo images are real customer results.

### FR-05 — About and artist profiles (P1)

- Present studio story, values, and differentiators.
- Display artist name, portrait, role/specialty, and short biography.
- Avoid unverified claims about qualifications or experience.

### FR-06 — Testimonials (P1)

- Display curated testimonial content.
- Attribute reviews only where permission and source are available.
- For fictional showcase content, label as sample/demo content.
- Do not fabricate third-party ratings or review platform badges.

### FR-07 — FAQ (P1)

- Provide answers about services, pricing, appointment requests, preparation, cancellations, and location.
- Use accessible accordion interactions.
- Ensure policy content is clearly identified as demo content until confirmed by a real business.

### FR-08 — Contact and location (P0)

- Display business address, opening hours, phone/WhatsApp, and social links from centralized configuration.
- Provide a map link or embedded map only when a real address is configured.
- Do not invent a real-world address or map pin for the fictional brand.
- Display timezone context for appointment requests.

### FR-09 — Guided booking (P0)

The booking wizard must contain the following steps:

#### Step 1 — Pilih layanan

- Show service categories.
- Allow selection of one treatment for MVP.
- Show service description, duration, and price.
- Support fixed and starting-price labels.
- Allow the user to change the selected treatment.
- If arriving from a service detail CTA, preselect that treatment.

#### Step 2 — Pilih tanggal & waktu

- Require a requested date and time.
- Reject dates in the past.
- Present selectable time preferences based on configured business hours.
- Validate selected time against configured opening hours.
- Allow business configuration of closed days and opening hours.
- Do not claim that a displayed time is available in real time.
- Explain: “Tanggal dan waktu merupakan preferensi. Tim Maison Belle akan mengonfirmasi ketersediaannya melalui WhatsApp.”

Because no availability backend exists, the user is expressing a preference only. The salon must manually confirm.

#### Step 3 — Data pelanggan

Required:

- Full name.
- WhatsApp number.

Optional:

- Additional notes.

Validation:

- Trim whitespace.
- Require a non-empty name.
- Validate phone number using a clearly documented supported format.
- Normalize phone number for display/message generation where possible.
- Limit note length and sanitize output.
- Do not collect unnecessary sensitive personal data.

#### Step 4 — Periksa permintaan

Display:

- Selected category and treatment.
- Price and price type.
- Duration.
- Requested date and time.
- Customer name and WhatsApp number.
- Optional notes.

Allow user to go back and edit previous steps without losing valid input.

Show a notice that this is an appointment request and not a confirmed booking.

#### Step 5 — Lanjutkan ke WhatsApp

- Generate a prefilled WhatsApp message from the current validated booking state.
- Use the configured business WhatsApp number.
- URL-encode the message safely.
- Open the official WhatsApp Click to Chat URL.
- Do not automatically send the message; the customer must press Send in WhatsApp.
- Provide a fallback copy-message action if opening WhatsApp fails.
- Do not display a success state that implies the salon has received or confirmed the request.

### FR-10 — Booking state and data handling (P0)

- Keep wizard state during step navigation.
- Do not persist personal booking data to a server.
- Avoid storing personal data in analytics events or logs.
- Clear booking state after the visitor explicitly finishes or starts a new request, with appropriate user feedback.
- If session persistence is introduced later, document consent, retention, and deletion behavior.

### FR-11 — WhatsApp integration (P0)

- Store the destination number in a centralized business configuration.
- Use international number format without `+`, spaces, or punctuation in the `wa.me` path.
- Generate a readable Indonesian message.
- Encode special characters and line breaks correctly.
- Include service, date, requested time, customer name, contact number, and notes when provided.
- Include the pricing type, and avoid representing starting prices as final quotes.
- Include a request for the studio to confirm availability.
- The website must not claim to send messages automatically.

### FR-12 — SEO and metadata (P0)

- Unique page title and description.
- Canonical URLs.
- Open Graph and social sharing metadata.
- Sitemap and robots directives.
- Semantic headings and landmarks.
- Descriptive image alt text.
- Local business structured data only when real business details are configured.
- Do not publish invented address, phone, opening hours, or review ratings as verified business data.

### FR-13 — Responsive, accessibility, and performance (P0)

- Support mobile, tablet, and desktop layouts.
- Avoid horizontal overflow.
- Support keyboard navigation and visible focus.
- Use accessible labels and validation messages.
- Provide sufficient contrast.
- Respect reduced-motion preference.
- Optimize images and font loading.
- Prevent layout shifts with image dimensions/aspect ratios.
- Use lazy loading below the fold where appropriate.

## 8. User Stories

| ID    | User story                                                                                | Priority |
| ----- | ----------------------------------------------------------------------------------------- | -------- |
| US-01 | As a visitor, I want to understand the studio's offer from the homepage.                  | P0       |
| US-02 | As a visitor, I want to browse services by category.                                      | P0       |
| US-03 | As a visitor, I want to see treatment prices and durations.                               | P0       |
| US-04 | As a visitor, I want to explore examples of the studio's work.                            | P0       |
| US-05 | As a visitor, I want to filter gallery images by service category.                        | P0       |
| US-06 | As a visitor, I want to select a treatment and request a date/time.                       | P0       |
| US-07 | As a visitor, I want to review my request before continuing to WhatsApp.                  | P0       |
| US-08 | As a visitor, I want my request details prefilled in WhatsApp.                            | P0       |
| US-09 | As a visitor, I want to edit my choices before handoff.                                   | P0       |
| US-10 | As a mobile visitor, I want the website and booking flow to work comfortably on my phone. | P0       |
| US-11 | As a visitor, I want to learn about the studio and its artists.                           | P1       |
| US-12 | As a visitor, I want answers to common questions before contacting the studio.            | P1       |

## 9. Booking Rules and Edge Cases

- A treatment must be selected before proceeding.
- Past dates are invalid.
- Closed days must not be selectable if configured.
- Time choices must fall within configured opening hours.
- A selected time is not a confirmed available slot.
- If opening hours are missing, booking schedule selection must show a configuration error or a safe contact fallback; do not invent hours.
- If the WhatsApp number is missing or invalid, disable the handoff and provide a clear contact fallback.
- Starting-price services must be labeled as estimates.
- Long notes must be limited.
- Special characters and line breaks must survive message encoding.
- If the user changes treatment, update price and duration in the summary.
- If the user navigates backward, retain their other valid answers.
- If WhatsApp is unavailable, offer a copy-message action and display the configured contact details.
- Do not expose personal details in URL query parameters.

## 10. Data Model (Frontend)

### Service

```ts
type ServiceCategory = "hair" | "nails" | "makeup" | "lash-brow";

type Service = {
  id: string;
  slug: string;
  category: ServiceCategory;
  name: string;
  description: string;
  price: number;
  pricingType: "fixed" | "starting_from";
  durationMinutes: number;
  image: string;
  featured: boolean;
  isActive: boolean;
};
```

### Booking request (client-side only)

```ts
type BookingRequest = {
  serviceId: string;
  requestedDate: string; // ISO date, local business date
  requestedTime: string; // HH:mm, local business time
  customerName: string;
  customerPhone: string;
  notes?: string;
};
```

### Business configuration

```ts
type BusinessConfig = {
  name: string;
  whatsappNumber: string; // international digits only
  timezone: string; // e.g. Asia/Jakarta
  locale: string; // id-ID
  currency: string; // IDR
  openingHours: Record<
    string,
    { open: string; close: string; closed?: boolean }
  >;
  address?: string;
  mapUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
};
```

No real business address or contact number should be invented for the conceptual brand.

## 11. WhatsApp Message Specification

Example message:

```text
Halo Maison Belle, saya ingin mengajukan permintaan jadwal appointment.

DATA PELANGGAN
Nama: Amanda Putri
WhatsApp: 081234567890

DETAIL LAYANAN
Kategori: Nails
Treatment: Gel Polish + Nail Art
Durasi: 90 menit
Estimasi harga: Rp250.000

JADWAL YANG DIINGINKAN
Tanggal: 10 November 2026
Waktu: 14.00 WIB

Catatan: Desain nail art nude minimalis.

Mohon konfirmasi ketersediaan jadwal dan detail harga. Terima kasih.
```

For a starting-price service, use “Harga mulai dari …” instead of “Estimasi harga …” where that is the configured pricing model.

## 12. Non-Functional Requirements

### Performance

Target Lighthouse scores:

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

These are targets to validate under a documented test environment, not guarantees.

Additional requirements:

- Optimize image formats and sizes.
- Avoid unnecessary client-side JavaScript.
- Use server rendering/static generation where appropriate.
- Prevent layout shift.
- Load only required font weights.

### Accessibility

Target WCAG 2.2 AA where practical:

- Semantic HTML.
- Keyboard access.
- Visible focus.
- Proper form labels.
- Associated validation errors.
- Dialog focus management.
- Sufficient contrast.
- Reduced-motion support.
- Accessible gallery controls.

### Security and privacy

- No secrets in client code.
- Validate and encode user-controlled message content.
- Do not collect unnecessary sensitive data.
- Do not send booking details to analytics.
- Use HTTPS in production.
- Avoid logging customer phone numbers and notes.
- Explain the WhatsApp handoff and that the user chooses to send the message.

### SEO

- Unique metadata per route.
- Canonical URL.
- Sitemap and robots.
- Structured data only for accurate, configured business information.
- Descriptive content and image alt text.
- Local SEO must use real business details before publication as a real business site.

## 13. Suggested Technical Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide React
- React Hook Form
- Zod
- Motion (subtle animations only)
- React state or Context for the MVP booking wizard; Zustand only if cross-feature state complexity justifies it
- Vercel deployment

The project is frontend-first. Static TypeScript data is sufficient for the MVP.

## 14. Suggested Application Structure

```text
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   ├── services/
│   │   ├── gallery/
│   │   ├── about/
│   │   └── contact/
│   ├── booking/
│   │   └── page.tsx
│   └── layout.tsx
├── components/
│   ├── layout/
│   ├── sections/
│   ├── services/
│   ├── gallery/
│   └── ui/
├── features/
│   └── booking/
│       ├── components/
│       ├── schemas/
│       ├── hooks/
│       ├── utils/
│       └── types/
├── data/
│   ├── services.ts
│   ├── artists.ts
│   ├── testimonials.ts
│   └── gallery.ts
├── config/
│   └── business.ts
└── lib/
    ├── whatsapp.ts
    ├── seo.ts
    └── utils.ts
```

## 15. Analytics and Success Metrics

If analytics are added, measure aggregate events without sending personal data.

Suggested events:

- `view_service`
- `filter_gallery`
- `start_booking`
- `complete_booking_review`
- `click_whatsapp_handoff`

Do not include customer name, phone number, notes, or full booking message in event payloads.

### Success indicators

- Service detail engagement.
- Booking start rate.
- Booking review completion rate.
- WhatsApp handoff click rate.
- Mobile usability and performance.
- Zero critical booking-flow defects.

A WhatsApp handoff click is not proof of a sent message or confirmed appointment.

## 16. Testing Strategy

### Unit tests

- Price formatting for fixed and starting prices.
- Booking schema validation.
- Past-date validation.
- Opening-hour validation.
- WhatsApp message generation and URL encoding.
- Phone number normalization.

### Component tests

- Service selection.
- Gallery filters.
- Lightbox interactions.
- Booking step navigation.
- Booking summary updates.
- Form validation and error states.

### Playwright E2E

1. Open homepage and navigate to services.
2. Select a treatment.
3. Start booking with preselected service.
4. Choose a valid future date and time preference.
5. Enter valid customer information.
6. Review the request.
7. Verify the WhatsApp handoff URL and message.
8. Verify invalid input and past date are rejected.
9. Verify mobile navigation and booking flow.
10. Verify gallery filter and lightbox keyboard behavior.

Do not send an actual WhatsApp message during automated tests.

## 17. Acceptance Criteria

The MVP is ready for release when:

- [ ] All approved routes and homepage sections are implemented.
- [ ] Service categories and details render from centralized data.
- [ ] Fixed and starting prices are displayed correctly.
- [ ] Gallery filtering and accessible lightbox work.
- [ ] Booking wizard contains all five steps.
- [ ] Booking data remains intact when navigating backward.
- [ ] Past dates and invalid inputs are rejected.
- [ ] Requested time is clearly described as a preference.
- [ ] Booking review accurately reflects selected data.
- [ ] WhatsApp message is correctly formatted and URL-encoded.
- [ ] No automatic sending or false confirmation is implied.
- [ ] Missing WhatsApp configuration has a safe fallback.
- [ ] Responsive layouts work at mobile, tablet, and desktop sizes.
- [ ] SEO metadata and structured data are accurate.
- [ ] Accessibility checks cover keyboard, focus, labels, and contrast.
- [ ] No critical browser console errors.
- [ ] E2E tests pass.
- [ ] Lighthouse targets are checked and documented.
- [ ] Fictional/demo content is clearly identified in the showcase case study.

## 18. Development Phases

### Phase 1 — Foundation and brand system

- Project setup.
- Brand tokens and typography.
- Layout, navigation, footer.
- Responsive foundations.

### Phase 2 — Marketing experience

- Homepage sections.
- Service catalog and details.
- Gallery and lightbox.
- About, artists, testimonials, FAQ, contact.

### Phase 3 — Guided booking

- Booking state and schema.
- Service selection.
- Date/time preference.
- Customer information.
- Review step.
- WhatsApp message and handoff.

### Phase 4 — Quality and release

- SEO.
- Accessibility.
- Performance.
- Unit/component/E2E tests.
- Cross-device QA.
- Production deployment.
- Showcase case study.

## 19. Risks and Mitigations

| Risk                                               | Mitigation                                                         |
| -------------------------------------------------- | ------------------------------------------------------------------ |
| Visitors think selected time is confirmed          | Repeat clear preference/confirmation messaging                     |
| Fictional details look like a real operating salon | Label the concept and use demo contact details responsibly         |
| Starting price is mistaken for final price         | Show explicit “Mulai dari” labels in catalog and summary           |
| WhatsApp number is misconfigured                   | Centralize configuration and validate before enabling CTA          |
| Gallery imagery lacks rights                       | Use licensed or original images                                    |
| Visual polish harms usability                      | Test contrast, responsive behavior, and task completion            |
| Scope expands into salon management software       | Keep admin, database, payment, and real-time scheduling out of MVP |

## 20. Future Opportunities

Potential future versions may add:

- Admin/CMS for service and gallery management.
- Backend appointment request storage.
- Real availability and staff calendars.
- Appointment confirmation and status tracking.
- Deposits or online payment.
- Automated reminders.
- Multi-branch support.

These are separate product phases and must not be represented as existing MVP capabilities.

---

**Product decision:** Maison Belle MVP is a premium, editorial beauty studio marketing website with a guided appointment inquiry flow and WhatsApp handoff. It is not a booking management system.
