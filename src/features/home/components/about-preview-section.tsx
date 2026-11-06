import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { HoverLink } from "@/components/motion/hover-link";
import { Parallax } from "@/components/motion/parallax";

export function AboutPreviewSection() {
  return (
    <Section tone="blush">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Parallax
          range={18}
          className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface"
        >
          <Image
            src="/images/studio/about.jpg"
            alt="Interior studio Maison Belle dengan kursi dan meja rias."
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </Parallax>

        <div>
          <p className="eyebrow">Tentang Maison Belle</p>
          <h2 className="mt-4 max-w-xl text-4xl text-ink sm:text-5xl">
            Ruang untuk merasa dirawat.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft">
            Maison Belle lahir dari ide sederhana: perawatan kecantikan harus
            terasa tenang, jelas, dan personal. Kami menggabungkan layanan hair,
            nails, makeup, dan lash &amp; brow dalam satu pengalaman yang tidak
            terburu-buru.
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-soft">
            Artist kami bekerja dengan percakapan, referensi, dan detail yang
            disesuaikan—bukan template yang sama untuk semua orang.
          </p>
          <HoverLink
            href="/about"
            className="mt-8 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-sm font-medium text-ink transition-colors hover:border-action hover:text-action"
          >
            Kenali studio dan artist
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </HoverLink>
        </div>
      </div>
    </Section>
  );
}
