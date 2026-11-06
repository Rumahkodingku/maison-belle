import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { HoverLink } from "@/components/motion/hover-link";
import { Parallax } from "@/components/motion/parallax";
import { Button } from "@/components/ui/button";

export function BookingCtaSection() {
  return (
    <Section tone="ink">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-ivory/70">
            Mulai dari sini
          </p>
          <h2 className="mt-5 max-w-2xl text-4xl text-ivory sm:text-5xl lg:text-6xl">
            Siap memilih waktu untuk dirimu?
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ivory/65">
            Susun permintaan appointment dalam lima langkah. Kamu bisa melihat
            ringkasan sebelum melanjutkan ke WhatsApp—tanpa membuat akun.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/booking">Booking Sekarang</Link>
            </Button>
            <HoverLink
              href="/contact"
              className="inline-flex items-center gap-2 border-b border-ivory/30 pb-1 text-sm text-ivory/80 transition-colors hover:border-dusty hover:text-dusty"
            >
              Tanya lewat kontak
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </HoverLink>
          </div>
          <p className="mt-7 flex max-w-md items-start gap-2 text-xs leading-relaxed text-ivory/70">
            <Check
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-dusty"
              aria-hidden="true"
            />
            Jadwal yang kamu pilih belum terkonfirmasi sampai studio membalas
            melalui WhatsApp.
          </p>
        </div>

        <Parallax range={14} className="relative mx-auto w-full max-w-md">
          <div className="absolute -right-3 -top-3 h-full w-full border border-ivory/20" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/images/services/party-makeup.jpg"
              alt="Detail makeup acara dari layanan Maison Belle."
              fill
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-cover"
            />
          </div>
        </Parallax>
      </div>
    </Section>
  );
}
