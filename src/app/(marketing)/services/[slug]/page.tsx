import { ArrowLeft, ArrowUpRight, Check, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { HoverLink } from "@/components/motion/hover-link";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { PriceLabel } from "@/components/shared/price-label";
import { Button } from "@/components/ui/button";
import { getSiteUrl } from "@/config/site";
import {
  getActiveServices,
  getServiceBySlug,
} from "@/features/services/data/services";
import { CATEGORY_LABELS } from "@/lib/constants";
import { formatPriceNote } from "@/lib/format/currency";

type ServiceDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getActiveServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Layanan tidak ditemukan" };
  }

  const siteUrl = getSiteUrl();

  return {
    title: service.name,
    description: service.shortDescription,
    ...(siteUrl
      ? { alternates: { canonical: `/services/${service.slug}` } }
      : {}),
    openGraph: {
      title: `${service.name} — Maison Belle`,
      description: service.shortDescription,
      images: [{ url: service.image, alt: `${service.name} di Maison Belle` }],
    },
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailProps) {
  return (
    <Suspense fallback={<ServiceDetailFallback />}>
      <ServiceDetailContent params={params} />
    </Suspense>
  );
}

function ServiceDetailFallback() {
  return (
    <div className="container-editorial py-20">
      <p className="text-sm text-ink-soft">Memuat layanan…</p>
    </div>
  );
}

async function ServiceDetailContent({ params }: ServiceDetailProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <div className="pb-24 pt-10 sm:pt-14">
      <div className="container-editorial">
        <Reveal>
          <HoverLink
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Semua layanan
          </HoverLink>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Parallax
              range={16}
              className="relative aspect-4/5 overflow-hidden rounded-sm bg-blush"
            >
              <Image
                src={service.image}
                alt={`${service.name} di Maison Belle`}
                fill
                priority
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </Parallax>
          </div>

          <Reveal className="max-w-xl lg:py-8" delay={0.1}>
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">{CATEGORY_LABELS[service.category]}</p>
            </div>
            <h1 className="mt-5 text-5xl text-ink sm:text-6xl">
              {service.name}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              {service.description}
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-3 border-y border-line py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                  Harga
                </p>
                <PriceLabel
                  price={service.price}
                  pricingType={service.pricingType}
                  className="mt-1 block text-2xl"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">
                  Durasi
                </p>
                <p className="mt-1 flex items-center gap-2 text-base text-ink">
                  <Clock className="h-4 w-4 text-action" aria-hidden="true" />
                  {service.durationMinutes} menit
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-ink-soft">
              {formatPriceNote(service.pricingType)}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={`/booking?service=${service.slug}`}>
                  Booking layanan ini
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Tanya dulu</Link>
              </Button>
            </div>

            <div className="mt-10">
              <h2 className="font-display text-2xl text-ink">
                Yang perlu diketahui
              </h2>
              <Stagger className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
                {[
                  "Artist akan mengonfirmasi detail treatment sebelum aplikasi.",
                  "Jadwal yang kamu pilih adalah preferensi, bukan slot terkonfirmasi.",
                  "Harga akhir untuk layanan “Mulai dari” ditentukan setelah konsultasi.",
                ].map((item) => (
                  <StaggerItem key={item} className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-action"
                      aria-hidden="true"
                    />
                    {item}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <HoverLink
              href="/services"
              className="mt-10 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-sm font-medium text-ink transition-colors hover:border-action hover:text-action"
            >
              Lihat layanan lain
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </HoverLink>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
