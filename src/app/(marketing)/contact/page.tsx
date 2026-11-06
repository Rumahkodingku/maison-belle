import { ArrowUpRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ContactDetails } from "@/features/contact/components/contact-details";
import { getCanonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...getCanonical("/contact"),
  title: "Kontak",
  description:
    "Informasi kontak, jam operasional, dan alamat demo Maison Belle. Ajukan appointment melalui WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="pb-24 pt-14 sm:pt-20">
      <div className="container-editorial">
        <div className="grid gap-8 border-b border-line pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">Kontak</p>
            </div>
            <h1 className="mt-5 max-w-3xl text-5xl text-ink sm:text-6xl lg:text-7xl">
              Mari mulai dengan percakapan.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-md text-base leading-relaxed text-ink-soft lg:justify-self-end">
              Tanyakan layanan, kirim referensi, atau ajukan jadwal. Tim akan
              membantu mengonfirmasi ketersediaan melalui WhatsApp.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <ContactDetails />
          </Reveal>

          <Reveal
            delay={0.15}
            className="h-fit rounded-lg border border-line bg-blush/40 p-6 sm:p-8"
          >
            <p className="eyebrow">Sebelum datang</p>
            <h2 className="mt-4 font-display text-3xl text-ink">
              Tiga hal yang membantu.
            </h2>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-ink-soft">
              {[
                "Bawa referensi warna, bentuk, atau makeup jika ada.",
                "Sampaikan alergi atau sensitivitas kulit pada catatan booking.",
                "Datang beberapa menit lebih awal agar sesi tidak terburu-buru.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-action"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/booking">Ajukan jadwal</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/services">
                  Lihat layanan
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
