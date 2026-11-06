"use client";

import { ArrowDown, Check } from "lucide-react";
import { m } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/parallax";
import { Button } from "@/components/ui/button";
import { getServiceBySlug } from "@/features/services/data/services";
import { formatPriceLabel } from "@/lib/format/currency";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const signature = getServiceBySlug("signature-hair-spa");

  return (
    <section className="overflow-hidden pb-8 pt-10 sm:pb-12 sm:pt-14">
      <div className="container-editorial grid items-end gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="max-w-2xl" data-motion-reveal>
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-wrap items-center gap-3"
          >
            <p className="eyebrow">Beauty atelier · Kalimantan Barat</p>
          </m.div>

          <h1 className="mt-7 text-[clamp(3.5rem,9vw,7.2rem)] leading-[0.95] text-ink">
            <span className="block overflow-hidden pb-2">
              <m.span
                className="block"
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease }}
              >
                Cantik dengan
              </m.span>
            </span>
            <span className="mt-1 block overflow-hidden pb-2 pl-6 sm:pl-12">
              <m.span
                className="block italic text-action"
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease }}
              >
                caramu.
              </m.span>
            </span>
          </h1>

          <m.p
            className="mt-8 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
          >
            Hair, nails, makeup, dan lash &amp; brow dalam satu ruang yang
            tenang. Pilih perawatan, lihat estimasi harga, lalu ajukan jadwal
            lewat WhatsApp.
          </m.p>

          <m.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.48, ease }}
          >
            <Button asChild size="lg">
              <Link href="/booking">Booking Sekarang</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/services">Jelajahi Layanan</Link>
            </Button>
          </m.div>

          <m.p
            className="mt-7 flex max-w-md items-start gap-2 text-xs leading-relaxed text-ink-soft"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.58, ease }}
          >
            <Check
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-action"
              aria-hidden="true"
            />
            Tanggal dan waktu yang kamu pilih adalah preferensi. Studio akan
            mengonfirmasi ketersediaannya melalui WhatsApp.
          </m.p>
        </div>

        <div
          className="relative mx-auto w-full max-w-140 lg:mr-0"
          data-motion-reveal
        >
          <m.div
            aria-hidden="true"
            className="absolute -right-4 bottom-12 hidden h-56 w-56 bg-blush/70 sm:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease }}
          />

          <Parallax range={18} scaleRange={0.035} className="relative">
            <m.div
              className="relative aspect-4/5 overflow-hidden rounded-sm bg-blush"
              initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.08 }}
              animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }}
              transition={{ duration: 1.2, delay: 0.05, ease }}
            >
              <Image
                src="/images/hero/hero-portrait.jpg"
                alt="Potret editorial Maison Belle dengan riasan natural dan rambut tertata."
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-deep/55 to-transparent p-5 pt-20 text-ivory sm:p-7">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-ivory/70">
                  Signature treatment
                </p>
                <div className="mt-1 flex items-end justify-between gap-4">
                  <p className="font-display text-2xl">
                    {signature?.name ?? "Hair Spa"}
                  </p>
                  <p className="shrink-0 text-sm tabular-nums text-ivory/80">
                    {signature
                      ? formatPriceLabel(signature.price, signature.pricingType)
                      : "Rp350.000"}
                  </p>
                </div>
              </div>
            </m.div>
          </Parallax>

          <m.div
            className="absolute -left-8 top-20 hidden w-28 rotate-[-4deg] border-4 border-ivory bg-blush shadow-xl lg:block"
            initial={{ opacity: 0, y: 28, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: -4 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
          >
            <div className="relative aspect-3/4 overflow-hidden">
              <Image
                src="/images/services/gel-polish-nail-art.jpg"
                alt="Detail nail art dengan warna lembut."
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
          </m.div>
        </div>
      </div>

      <m.div
        data-motion-reveal
        className="container-editorial mt-16 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.18em] text-ink-soft sm:mt-14"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.75, ease }}
      >
        <span className="h-px w-12 bg-line-strong" />
        <span>Scroll untuk menjelajah</span>
        <m.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
        </m.span>
      </m.div>
    </section>
  );
}
