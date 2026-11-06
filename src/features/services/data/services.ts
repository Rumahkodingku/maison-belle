import type { Service } from "@/types/domain";

export const services: Service[] = [
  {
    id: "svc-hair-spa",
    slug: "signature-hair-spa",
    category: "hair",
    name: "Signature Hair Spa",
    shortDescription:
      "Perawatan rambut menenangkan dengan pijat kulit kepala dan masker pelembap.",
    description:
      "Ritual perawatan rambut untuk membantu tekstur terasa lebih lembut dan kulit kepala terasa nyaman. Dimulai dengan konsultasi singkat, pijat kulit kepala, pembersihan, lalu masker pelembap yang disesuaikan dengan kondisi rambut.",
    price: 350000,
    pricingType: "fixed",
    durationMinutes: 60,
    image: "/images/services/signature-hair-spa.jpg",
    featured: true,
    isActive: true,
  },
  {
    id: "svc-keratin",
    slug: "keratin-smoothing",
    category: "hair",
    name: "Keratin Smoothing",
    shortDescription:
      "Merapikan tekstur rambut dan mengurangi kusut untuk hasil yang lebih halus.",
    description:
      "Perawatan smoothing untuk rambut yang mudah kusut dan sulit diatur. Tingkat kehalusan, durasi, dan kebutuhan produk akan dikonfirmasi setelah artist melihat kondisi rambutmu.",
    price: 750000,
    pricingType: "starting_from",
    durationMinutes: 120,
    image: "/images/services/keratin-smoothing.jpg",
    featured: false,
    isActive: true,
  },
  {
    id: "svc-haircut",
    slug: "haircut-blow-dry",
    category: "hair",
    name: "Haircut & Blow Dry",
    shortDescription:
      "Potongan rambut yang dibentuk sesuai rutinitas dan preferensi harianmu.",
    description:
      "Konsultasi bentuk wajah dan rutinitas rambut, dilanjutkan dengan potongan dan finishing blow dry. Artist akan membantu memilih panjang dan layer yang mudah kamu rawat di rumah.",
    price: 200000,
    pricingType: "fixed",
    durationMinutes: 45,
    image: "/images/services/haircut-blow-dry.jpg",
    featured: false,
    isActive: true,
  },
  {
    id: "svc-gel-polish",
    slug: "gel-polish",
    category: "nails",
    name: "Gel Polish",
    shortDescription:
      "Warna solid yang rapi dengan hasil mengilap dan tahan lebih lama.",
    description:
      "Manikur sederhana dengan pembersihan kutikula, pembentukan kuku, dan aplikasi gel polish. Pilihan warna dapat disesuaikan dengan karakter dan aktivitasmu.",
    price: 150000,
    pricingType: "fixed",
    durationMinutes: 45,
    image: "/images/services/gel-polish.jpg",
    featured: false,
    isActive: true,
  },
  {
    id: "svc-nail-art",
    slug: "gel-polish-nail-art",
    category: "nails",
    name: "Gel Polish + Nail Art",
    shortDescription:
      "Gel polish dengan detail nail art yang dibuat sesuai referensi favoritmu.",
    description:
      "Kombinasi gel polish dan nail art untuk tampilan yang lebih personal. Tingkat detail, jumlah kuku, dan waktu pengerjaan akan dikonfirmasi setelah artist melihat referensi desain.",
    price: 250000,
    pricingType: "starting_from",
    durationMinutes: 90,
    image: "/images/services/gel-polish-nail-art.jpg",
    featured: true,
    isActive: true,
  },
  {
    id: "svc-nail-extension",
    slug: "nail-extension",
    category: "nails",
    name: "Nail Extension",
    shortDescription:
      "Perpanjangan kuku dengan bentuk dan panjang yang dapat disesuaikan.",
    description:
      "Nail extension untuk hasil yang lebih panjang dan terstruktur. Artist akan membantu memilih bentuk serta panjang yang nyaman untuk aktivitasmu.",
    price: 400000,
    pricingType: "starting_from",
    durationMinutes: 120,
    image: "/images/services/nail-extension.jpg",
    featured: false,
    isActive: true,
  },
  {
    id: "svc-everyday-makeup",
    slug: "everyday-makeup",
    category: "makeup",
    name: "Everyday Makeup",
    shortDescription:
      "Makeup ringan untuk acara harian dengan hasil yang tetap terasa seperti kamu.",
    description:
      "Makeup dengan pendekatan natural untuk acara harian, meeting, atau agenda santai. Artist akan menyesuaikan coverage dan warna dengan preferensi serta kondisi kulitmu.",
    price: 350000,
    pricingType: "fixed",
    durationMinutes: 60,
    image: "/images/services/everyday-makeup.jpg",
    featured: false,
    isActive: true,
  },
  {
    id: "svc-party-makeup",
    slug: "party-makeup",
    category: "makeup",
    name: "Party Makeup",
    shortDescription:
      "Tampilan makeup yang lebih ekspresif untuk acara malam dan perayaan.",
    description:
      "Makeup untuk acara pesta, dinner, atau perayaan dengan fokus pada mata dan hasil akhir yang tahan lama. Referensi warna dan intensitas dapat didiskusikan sebelum aplikasi.",
    price: 500000,
    pricingType: "fixed",
    durationMinutes: 90,
    image: "/images/services/party-makeup.jpg",
    featured: true,
    isActive: true,
  },
  {
    id: "svc-bridal-makeup",
    slug: "bridal-makeup",
    category: "makeup",
    name: "Bridal Makeup",
    shortDescription:
      "Makeup pengantin yang dirancang menyatu dengan tema dan karakter acaramu.",
    description:
      "Layanan makeup pengantin dengan konsultasi tampilan, uji coba look, dan penyesuaian pada hari acara. Cakupan layanan dan harga final akan dikonfirmasi setelah kebutuhan acara dipelajari.",
    price: 1500000,
    pricingType: "starting_from",
    durationMinutes: 150,
    image: "/images/services/bridal-makeup.jpg",
    featured: true,
    isActive: true,
  },
  {
    id: "svc-classic-lash",
    slug: "classic-lash-extension",
    category: "lash-brow",
    name: "Classic Lash Extension",
    shortDescription:
      "Ekstensi bulu mata satu per satu untuk tampilan lebih tegas dan natural.",
    description:
      "Aplikasi classic lash extension dengan pemilihan curl dan panjang yang disesuaikan dengan bentuk mata. Artist akan menjelaskan perawatan setelah aplikasi agar hasil bertahan lebih nyaman.",
    price: 300000,
    pricingType: "fixed",
    durationMinutes: 90,
    image: "/images/services/classic-lash-extension.jpg",
    featured: true,
    isActive: true,
  },
  {
    id: "svc-volume-lash",
    slug: "volume-lash-extension",
    category: "lash-brow",
    name: "Volume Lash Extension",
    shortDescription:
      "Volume lebih penuh dengan beberapa helai bulu mata pada setiap ekstensi.",
    description:
      "Volume lash extension untuk tampilan yang lebih dramatis namun tetap terkontrol. Jumlah fan, curl, dan panjang akan disesuaikan dengan kondisi bulu mata alami.",
    price: 450000,
    pricingType: "starting_from",
    durationMinutes: 120,
    image: "/images/services/volume-lash-extension.jpg",
    featured: false,
    isActive: true,
  },
  {
    id: "svc-brow",
    slug: "brow-lamination-tint",
    category: "lash-brow",
    name: "Brow Lamination & Tint",
    shortDescription:
      "Menata arah alis dan memberi warna lembut agar tampilan lebih rapi.",
    description:
      "Brow lamination untuk membantu menata arah rambut alis, dilanjutkan dengan tint sesuai warna yang diinginkan. Artist akan menyesuaikan intensitas warna dengan tone rambutmu.",
    price: 250000,
    pricingType: "fixed",
    durationMinutes: 60,
    image: "/images/services/brow-lamination-tint.jpg",
    featured: false,
    isActive: true,
  },
  {
    id: "svc-scalp",
    slug: "scalp-treatment",
    category: "hair",
    name: "Scalp Treatment",
    shortDescription:
      "Perawatan kulit kepala untuk tampilan rambut yang lebih segar.",
    description:
      "Perawatan kulit kepala dengan pembersihan dan pijat ringan. Layanan ini tidak ditampilkan di katalog publik.",
    price: 300000,
    pricingType: "fixed",
    durationMinutes: 60,
    image: "/images/services/signature-hair-spa.jpg",
    featured: false,
    isActive: false,
  },
];

export function getActiveServices() {
  return services.filter((service) => service.isActive);
}

export function getFeaturedServices() {
  return getActiveServices().filter((service) => service.featured);
}

export function getServiceBySlug(slug: string) {
  return getActiveServices().find((service) => service.slug === slug);
}

export function getServiceById(id: string) {
  return getActiveServices().find((service) => service.id === id);
}

export function getServicesByCategory(category: Service["category"]) {
  return getActiveServices().filter((service) => service.category === category);
}

export function getFeaturedServicePerCategory() {
  const categories = ["hair", "nails", "makeup", "lash-brow"] as const;

  return categories
    .map((category) => {
      const all = getServicesByCategory(category);
      return all.find((service) => service.featured) ?? all[0];
    })
    .filter((service): service is Service => Boolean(service));
}
