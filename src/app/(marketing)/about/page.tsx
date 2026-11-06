import {
  ArrowUpRight,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Button } from "@/components/ui/button";
import { ArtistCard } from "@/features/artists/components/artist-card";
import { artists } from "@/features/artists/data/artists";
import { getCanonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...getCanonical("/about"),
  title: "Tentang",
  description:
    "Kenali pendekatan, nilai, dan artist Maison Belle—studio kecantikan dengan layanan hair, nails, makeup, dan lash & brow.",
};

const values = [
  {
    icon: HeartHandshake,
    title: "Care",
    copy: "Kami mulai dengan mendengar. Setiap treatment disesuaikan dengan kebutuhan, kenyamanan, dan rutinitasmu.",
  },
  {
    icon: Sparkles,
    title: "Craft",
    copy: "Detail kecil bukan tambahan. Tekstur, warna, dan finishing dikerjakan dengan perhatian.",
  },
  {
    icon: ShieldCheck,
    title: "Clarity",
    copy: "Harga, durasi, dan status permintaan jadwal disampaikan tanpa klaim yang berlebihan.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-24 pt-14 sm:pt-20">
      <div className="container-editorial">
        <div className="grid gap-10 border-b border-line pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">Tentang Maison Belle</p>
            </div>
            <h1 className="mt-5 max-w-4xl text-5xl text-ink sm:text-6xl lg:text-7xl">
              Beauty studio yang tumbuh dari percakapan.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-md text-base leading-relaxed text-ink-soft lg:justify-self-end">
              Maison Belle adalah konsep studio kecantikan premium untuk
              showcase RumahKodingku. Fokusnya sederhana: membuat perawatan
              terasa personal, jelas, dan tidak terburu-buru.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Parallax
            range={18}
            className="relative aspect-4/5 overflow-hidden rounded-sm bg-blush"
          >
            <Image
              src="/images/studio/about.jpg"
              alt="Interior studio Maison Belle dengan kursi dan meja rias."
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              priority
              className="object-cover"
            />
          </Parallax>
          <Reveal className="max-w-xl lg:py-8" delay={0.1}>
            <p className="eyebrow">Cerita kami</p>
            <h2 className="mt-4 text-4xl text-ink sm:text-5xl">
              Satu ruang untuk rambut, kuku, wajah, dan mata.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Kami membayangkan studio yang tidak memisahkan kecantikan
                menjadi potongan-potongan kecil. Hair, nails, makeup, dan lash
                &amp; brow saling melengkapi—dan seharusnya terasa seperti satu
                pengalaman.
              </p>
              <p>
                Karena itu, setiap kunjungan dimulai dengan percakapan: apa yang
                ingin kamu capai, bagaimana rutinitasmu, dan hasil seperti apa
                yang terasa nyaman. Artist lalu bekerja dari situ, bukan dari
                template.
              </p>
            </div>
            <Stagger className="mt-8 grid gap-6 sm:grid-cols-3">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <StaggerItem
                    key={value.title}
                    hover
                    className="border-t border-line-strong/40 pt-4"
                  >
                    <Icon className="h-4 w-4 text-action" aria-hidden="true" />
                    <h3 className="mt-3 font-display text-xl text-ink">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                      {value.copy}
                    </p>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </Reveal>
        </div>

        <section
          id="artists"
          className="scroll-mt-28 border-t border-line pt-16"
        >
          <Reveal>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Artist</p>
                <h2 className="mt-4 text-4xl text-ink sm:text-5xl">
                  Orang di balik detail.
                </h2>
              </div>
            </div>
          </Reveal>
          <Stagger className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist) => (
              <StaggerItem key={artist.id}>
                <ArtistCard artist={artist} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 sm:flex-row sm:items-center">
          <Reveal>
            <h2 className="font-display text-3xl text-ink">
              Ingin mulai dari percakapan?
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Pilih layanan dan ajukan preferensi jadwalmu.
            </p>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/booking">Booking Sekarang</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/contact">
                Hubungi studio
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
