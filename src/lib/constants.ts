import type { ServiceCategory, Weekday } from "@/types/domain";

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  hair: "Hair & Beauty",
  nails: "Nails",
  makeup: "Makeup",
  "lash-brow": "Lash & Brow",
};

export const GALLERY_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  hair: "Hair",
  nails: "Nails",
  makeup: "Makeup",
  "lash-brow": "Lash & Brow",
};

export const CATEGORIES: ServiceCategory[] = [
  "hair",
  "nails",
  "makeup",
  "lash-brow",
];

export const WEEKDAY_LABELS: Record<Weekday, string> = {
  monday: "Senin",
  tuesday: "Selasa",
  wednesday: "Rabu",
  thursday: "Kamis",
  friday: "Jumat",
  saturday: "Sabtu",
  sunday: "Minggu",
};

export const WEEKDAY_ORDER: Weekday[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const BOOKING_STEPS = [
  { number: 1, label: "Layanan" },
  { number: 2, label: "Jadwal" },
  { number: 3, label: "Data diri" },
  { number: 4, label: "Ringkasan" },
  { number: 5, label: "WhatsApp" },
] as const;
