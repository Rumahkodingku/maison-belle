import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { GalleryExperience } from "@/features/gallery/components/gallery-experience";
import { galleryItems } from "@/features/gallery/data/gallery";
import { getCanonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...getCanonical("/gallery"),
  title: "Galeri",
  description:
    "Lihat campuran potret, detail treatment, dan tekstur dari Maison Belle. Filter berdasarkan hair, nails, makeup, atau lash & brow.",
};

export default function GalleryPage() {
  return (
    <div className="pb-24 pt-14 sm:pt-20">
      <div className="container-editorial">
        <div className="grid gap-8 border-b border-line pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">Galeri</p>
            </div>
            <h1 className="mt-5 max-w-3xl text-5xl text-ink sm:text-6xl lg:text-7xl">
              Detail yang berbicara lebih dulu.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-md text-base leading-relaxed text-ink-soft lg:justify-self-end">
              Kumpulan visual untuk menunjukkan arah estetika studio. Gambar
              adalah contoh dan tidak merepresentasikan hasil pelanggan nyata.
            </p>
          </Reveal>
        </div>

        <div className="pt-10">
          <GalleryExperience items={galleryItems} />
        </div>
      </div>
    </div>
  );
}
