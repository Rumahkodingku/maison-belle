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

export type GalleryCategory = ServiceCategory;

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  caption?: string;
  width: number;
  height: number;
};

export type Artist = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
  isDemo: boolean;
};

export type Testimonial = {
  id: string;
  customerDisplayName: string;
  quote: string;
  serviceLabel: string;
  isDemo: boolean;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  isPolicyDemo?: boolean;
};

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type OpeningHours = Record<
  Weekday,
  { open: string; close: string } | null
>;

export type BusinessConfig = {
  name: string;
  whatsappNumber: string | null;
  timezone: "Asia/Jakarta";
  locale: "id-ID";
  currency: "IDR";
  openingHours: OpeningHours;
  address: string;
  addressNote: string;
  mapUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  isDemo: boolean;
};

export type BookingRequest = {
  serviceId: string;
  requestedDate: string;
  requestedTime: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
};

export type BookingStep = 1 | 2 | 3 | 4 | 5;

export type BookingDraft = {
  serviceId?: string;
  requestedDate?: string;
  requestedTime?: string;
  customerName: string;
  customerPhone: string;
  notes: string;
};
