import type { Testimonial } from "@/types/domain";

export const testimonials: Testimonial[] = [
  {
    id: "testi-01",
    customerDisplayName: "Amanda P.",
    quote:
      "Prosesnya tenang dan detail. Aku suka bagaimana artist menjelaskan pilihan warna tanpa terasa dipaksa.",
    serviceLabel: "Gel Polish + Nail Art",
    isDemo: true,
  },
  {
    id: "testi-02",
    customerDisplayName: "Sinta R.",
    quote:
      "Makeup-nya terasa seperti versi terbaik dari wajahku sendiri. Nyaman dipakai sampai acara selesai.",
    serviceLabel: "Party Makeup",
    isDemo: true,
  },
  {
    id: "testi-03",
    customerDisplayName: "Dewi A.",
    quote:
      "Suka banget dengan suasana studio dan hasil hair spa-nya. Rambut terasa lebih ringan dan mudah diatur.",
    serviceLabel: "Signature Hair Spa",
    isDemo: true,
  },
];
