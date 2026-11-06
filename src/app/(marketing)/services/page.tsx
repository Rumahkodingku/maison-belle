import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { ServiceCatalog } from "@/features/services/components/service-catalog";
import { getActiveServices } from "@/features/services/data/services";
import { getCanonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...getCanonical("/services"),
  title: "Layanan",
  description:
    "Lihat katalog layanan Maison Belle untuk hair, nails, makeup, dan lash & brow, lengkap dengan estimasi harga dan durasi.",
};

export default function ServicesPage() {
  const services = getActiveServices();

  return (
    <div className="pb-24 pt-14 sm:pt-20">
      <div className="container-editorial">
        <div className="grid gap-8 border-b border-line pb-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">Katalog layanan</p>
            </div>
            <h1 className="mt-5 max-w-3xl text-5xl text-ink sm:text-6xl lg:text-7xl">
              Perawatan yang dibuat untuk rutinitasmu.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-md text-base leading-relaxed text-ink-soft lg:justify-self-end">
              Pilih kategori untuk melihat pilihan treatment. Semua layanan
              aktif dapat langsung dipilih saat meminta appointment.
            </p>
          </Reveal>
        </div>

        <div className="pt-10">
          <ServiceCatalog services={services} />
        </div>
      </div>
    </div>
  );
}
