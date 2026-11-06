import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { SkipLink } from "@/components/layout/skip-link";
import { HoverLink } from "@/components/motion/hover-link";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function BookingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <header className="border-b border-line">
        <Container className="flex h-20 items-center justify-between gap-4">
          <HoverLink
            href="/"
            wrapperClassName="shrink-0"
            className="flex items-center gap-2.5"
          >
            <Image
              src="/images/logo/logo-mark.png"
              alt=""
              width={36}
              height={28}
              priority
              className="h-9 w-auto object-contain dark:hidden"
            />
            <Image
              src="/images/logo/logo-mark-light.png"
              alt=""
              width={36}
              height={28}
              priority
              className="hidden h-9 w-auto object-contain dark:block"
            />
            <span className="font-display text-2xl tracking-tight text-ink">
              Maison <em className="text-action">Belle</em>
            </span>
          </HoverLink>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <HoverLink
              href="/"
              ariaLabel="Kembali ke beranda"
              className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Kembali ke beranda</span>
            </HoverLink>
          </div>
        </Container>
      </header>
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <footer className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>Permintaan jadwal dikonfirmasi manual oleh studio.</p>
          <p>Maison Belle · Showcase RumahKodingku</p>
        </Container>
      </footer>
    </div>
  );
}
