"use client";

import { m } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <m.main
      className="container-editorial flex min-h-[70vh] flex-col items-start justify-center py-20"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="eyebrow mb-4">Terjadi kendala</p>
      <h1 className="max-w-xl text-4xl text-ink sm:text-5xl">
        Halaman ini sedang tidak bisa ditampilkan.
      </h1>
      <p className="mt-4 max-w-md text-ink-soft">
        Coba muat ulang halaman. Jika masih berlanjut, kembali ke beranda atau
        hubungi studio melalui halaman kontak.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={reset}>Coba lagi</Button>
        <Button asChild variant="secondary">
          <Link href="/">Kembali ke beranda</Link>
        </Button>
      </div>
    </m.main>
  );
}
