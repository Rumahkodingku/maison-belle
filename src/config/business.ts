import { normalizeBusinessNumber } from "@/lib/format/phone";
import type { BusinessConfig } from "@/types/domain";

export const business: BusinessConfig = {
  name: "Maison Belle",
  whatsappNumber: normalizeBusinessNumber(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  ),
  timezone: "Asia/Jakarta",
  locale: "id-ID",
  currency: "IDR",
  openingHours: {
    monday: { open: "09:00", close: "21:00" },
    tuesday: { open: "09:00", close: "21:00" },
    wednesday: { open: "09:00", close: "21:00" },
    thursday: { open: "09:00", close: "21:00" },
    friday: { open: "09:00", close: "21:00" },
    saturday: { open: "09:00", close: "21:00" },
    sunday: null,
  },
  address:
    "Putussibau Kota, Kec. Putussibau Utara, Kabupaten Kapuas Hulu, Kalimantan Barat",
  addressNote: "Alamat contoh untuk showcase",
  isDemo: true,
};

export const demoDisclosure =
  "Maison Belle adalah brand fiktif untuk showcase RumahKodingku. Seluruh layanan, harga, artist, testimoni, dan informasi bisnis di halaman ini adalah konten contoh.";
