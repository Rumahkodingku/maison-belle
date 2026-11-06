import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { HoverLink } from "@/components/motion/hover-link";
import { Parallax } from "@/components/motion/parallax";
import { PriceLabel } from "@/components/shared/price-label";
import { getServiceBySlug } from "@/features/services/data/services";

export function FeaturedTreatmentSection() {
  const bridal = getServiceBySlug("bridal-makeup");
  const nails = getServiceBySlug("gel-polish-nail-art");
  const editorial = getServiceBySlug("party-makeup");

  if (!bridal || !nails || !editorial) return null;

  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Parallax
            range={16}
            className="relative aspect-[4/5] overflow-hidden rounded-sm bg-blush"
          >
            <Image
              src={editorial.image}
              alt="Detail makeup editorial dengan warna lembut di Maison Belle."
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-surface/95 px-4 py-3 backdrop-blur-sm">
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-ink-soft">
                Editorial makeup
              </p>
              <p className="mt-1 font-display text-xl text-ink">
                Soft, luminous, timeless.
              </p>
            </div>
          </Parallax>
        </div>

        <div className="lg:col-span-5">
          <p className="eyebrow">Treatment unggulan</p>
          <h2 className="mt-4 text-4xl text-ink sm:text-5xl">
            Untuk momen yang kamu rencanakan.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
            Mulai dari makeup acara hingga detail nail art, setiap layanan
            disiapkan sebagai bagian dari tampilan yang utuh—bukan sekadar
            daftar treatment.
          </p>

          <div className="mt-8 divide-y divide-line border-y border-line">
            <HoverLink
              href={`/services/${bridal.slug}`}
              className="group flex items-start justify-between gap-6 py-5"
            >
              <div>
                <h3 className="font-display text-2xl text-ink group-hover:text-action">
                  {bridal.name}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">
                  {bridal.durationMinutes} menit · konsultasi look
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3 text-sm">
                <PriceLabel
                  price={bridal.price}
                  pricingType={bridal.pricingType}
                />
                <ArrowUpRight
                  className="h-4 w-4 text-ink-soft group-hover:text-action"
                  aria-hidden="true"
                />
              </div>
            </HoverLink>
            <HoverLink
              href={`/services/${nails.slug}`}
              className="group flex items-start justify-between gap-6 py-5"
            >
              <div>
                <h3 className="font-display text-2xl text-ink group-hover:text-action">
                  {nails.name}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">
                  {nails.durationMinutes} menit · detail sesuai referensi
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3 text-sm">
                <PriceLabel
                  price={nails.price}
                  pricingType={nails.pricingType}
                />
                <ArrowUpRight
                  className="h-4 w-4 text-ink-soft group-hover:text-action"
                  aria-hidden="true"
                />
              </div>
            </HoverLink>
          </div>

          <HoverLink
            href="/services"
            className="mt-8 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-sm font-medium text-ink transition-colors hover:border-action hover:text-action"
          >
            Lihat semua treatment
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </HoverLink>
        </div>
      </div>
    </Section>
  );
}
