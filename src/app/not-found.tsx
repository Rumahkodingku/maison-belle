import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container-editorial flex min-h-[70vh] flex-col items-start justify-center py-20">
      <Reveal>
        <p className="eyebrow mb-4">404</p>
        <h1 className="max-w-xl text-4xl text-ink sm:text-5xl">
          Halaman yang kamu cari tidak ditemukan.
        </h1>
        <p className="mt-4 max-w-md text-ink-soft">
          Mungkin tautannya sudah berubah. Kamu bisa kembali ke beranda atau
          melihat pilihan layanan Maison Belle.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/">Kembali ke beranda</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/services">Jelajahi layanan</Link>
          </Button>
        </div>
      </Reveal>
    </main>
  );
}
