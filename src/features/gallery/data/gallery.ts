import type { GalleryItem } from "@/types/domain";

// shortcut: gallery reuses service photos to keep the demo asset set small; replace with unique portfolio images when available.
export const galleryItems: GalleryItem[] = [
  {
    id: "gal-hair-01",
    src: "/images/services/signature-hair-spa.jpg",
    alt: "Rambut panjang dengan tekstur lembut setelah perawatan hair spa.",
    category: "hair",
    caption: "Hair spa finish",
    width: 900,
    height: 1125,
  },
  {
    id: "gal-hair-02",
    src: "/images/services/keratin-smoothing.jpg",
    alt: "Rambut lurus dengan hasil halus dan warna hangat.",
    category: "hair",
    caption: "Smoothing finish",
    width: 900,
    height: 1125,
  },
  {
    id: "gal-hair-03",
    src: "/images/services/haircut-blow-dry.jpg",
    alt: "Proses blow dry dan styling rambut di studio.",
    category: "hair",
    caption: "Blow dry & styling",
    width: 900,
    height: 1125,
  },
  {
    id: "gal-nails-01",
    src: "/images/services/gel-polish.jpg",
    alt: "Kuku dengan gel polish warna gelap dan hasil mengilap.",
    category: "nails",
    caption: "Glossy gel finish",
    width: 900,
    height: 1125,
  },
  {
    id: "gal-nails-02",
    src: "/images/services/gel-polish-nail-art.jpg",
    alt: "Kuku dengan warna pink lembut dan detail nail art.",
    category: "nails",
    caption: "Nail art detail",
    width: 900,
    height: 1125,
  },
  {
    id: "gal-nails-03",
    src: "/images/services/nail-extension.jpg",
    alt: "Nail extension dengan bentuk almond dan warna nude.",
    category: "nails",
    caption: "Nail extension",
    width: 900,
    height: 1125,
  },
  {
    id: "gal-makeup-01",
    src: "/images/services/party-makeup.jpg",
    alt: "Close-up mata dengan makeup dusty pink dan eyeliner.",
    category: "makeup",
    caption: "Dusty pink eye look",
    width: 900,
    height: 1125,
  },
  {
    id: "gal-makeup-02",
    src: "/images/services/bridal-makeup.jpg",
    alt: "Detail brush makeup di meja kerja artist.",
    category: "makeup",
    caption: "Artist's table",
    width: 900,
    height: 1125,
  },
  {
    id: "gal-makeup-03",
    src: "/images/services/everyday-makeup.jpg",
    alt: "Palet dan produk makeup dengan tone hangat.",
    category: "makeup",
    caption: "Warm makeup palette",
    width: 900,
    height: 1125,
  },
  {
    id: "gal-lash-01",
    src: "/images/services/classic-lash-extension.jpg",
    alt: "Close-up mata dengan bulu mata lentik dan alis tertata.",
    category: "lash-brow",
    caption: "Classic lash detail",
    width: 900,
    height: 900,
  },
  {
    id: "gal-lash-02",
    src: "/images/services/volume-lash-extension.jpg",
    alt: "Close-up mata dengan bulu mata bervolume.",
    category: "lash-brow",
    caption: "Volume lash detail",
    width: 900,
    height: 1200,
  },
  {
    id: "gal-lash-03",
    src: "/images/services/brow-lamination-tint.jpg",
    alt: "Close-up alis dengan arah rambut tertata.",
    category: "lash-brow",
    caption: "Brow framing",
    width: 900,
    height: 1125,
  },
];

const previewIds = [
  "gal-hair-01",
  "gal-nails-02",
  "gal-makeup-01",
  "gal-lash-01",
  "gal-hair-03",
  "gal-makeup-03",
];

export function getGalleryPreview(limit = 6) {
  return previewIds
    .map((id) => galleryItems.find((item) => item.id === id))
    .filter((item): item is GalleryItem => Boolean(item))
    .slice(0, limit);
}
