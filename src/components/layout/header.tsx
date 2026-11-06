"use client";

import { ChevronDown, Menu } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/config/site";
import { getFeaturedServices } from "@/features/services/data/services";
import { CATEGORY_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const featuredServices = getFeaturedServices().slice(0, 3);
const ease = [0.22, 1, 0.36, 1] as const;

function isActivePath(pathname: string, href: string) {
  if (href.includes("#")) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function BrandLockup({ onClick }: { onClick?: () => void }) {
  return (
    <m.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <Link
        href="/"
        onClick={onClick}
        className="group flex shrink-0 items-center gap-3"
      >
        <Image
          src="/images/logo/logo-mark.png"
          alt=""
          width={44}
          height={35}
          priority
          className="h-10 w-auto object-contain dark:hidden"
        />
        <Image
          src="/images/logo/logo-mark-light.png"
          alt=""
          width={44}
          height={35}
          priority
          className="hidden h-10 w-auto object-contain dark:block"
        />
        <span className="flex flex-col leading-none">
          <span className="font-display text-2xl tracking-tight text-ink sm:text-[1.7rem]">
            Maison <em className="text-action">Belle</em>
          </span>
          <span className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.28em] text-ink-soft">
            Beauty atelier
          </span>
        </span>
      </Link>
    </m.div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLFieldSetElement>(null);

  function closeServices() {
    setServicesOpen(false);
  }

  function handleServicesBlur(event: React.FocusEvent<HTMLFieldSetElement>) {
    if (
      servicesRef.current &&
      !servicesRef.current.contains(event.relatedTarget as Node | null)
    ) {
      closeServices();
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/92 backdrop-blur-md">
      <div className="container-editorial flex h-20 items-center justify-between gap-6">
        <BrandLockup />

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-7 lg:flex"
        >
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            if (item.label === "Layanan") {
              return (
                <fieldset
                  key={item.href}
                  ref={servicesRef}
                  className="relative m-0 border-0 p-0"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={closeServices}
                  onFocus={() => setServicesOpen(true)}
                  onBlur={handleServicesBlur}
                >
                  <legend className="sr-only">Menu layanan</legend>
                  <m.div
                    whileHover={{ y: -1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 28 }}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      aria-expanded={servicesOpen}
                      className={cn(
                        "relative flex items-center gap-1 py-2 text-sm text-ink-soft transition-colors hover:text-ink",
                        active &&
                          "text-ink after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-action",
                      )}
                    >
                      {item.label}
                      <m.span
                        animate={{ rotate: servicesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2, ease }}
                      >
                        <ChevronDown
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                      </m.span>
                    </Link>
                  </m.div>

                  <AnimatePresence>
                    {servicesOpen ? (
                      <m.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.99 }}
                        transition={{ duration: 0.2, ease }}
                        className="absolute left-0 top-full z-50 w-80 rounded-lg border border-line bg-surface p-3 shadow-xl"
                      >
                        <p className="px-3 pb-2 pt-1 text-[0.62rem] uppercase tracking-[0.18em] text-ink-soft">
                          Treatment pilihan
                        </p>
                        {featuredServices.map((service) => (
                          <m.div
                            key={service.id}
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Link
                              href={`/services/${service.slug}`}
                              onClick={closeServices}
                              className="flex items-center justify-between gap-4 rounded-md px-3 py-2.5 transition-colors hover:bg-blush/60"
                            >
                              <span className="text-sm text-ink">
                                {service.name}
                              </span>
                              <span className="shrink-0 text-[0.62rem] uppercase tracking-[0.12em] text-ink-soft">
                                {CATEGORY_LABELS[service.category]}
                              </span>
                            </Link>
                          </m.div>
                        ))}
                        <m.div whileHover={{ x: 3 }}>
                          <Link
                            href="/services"
                            onClick={closeServices}
                            className="mt-1 block border-t border-line px-3 pb-1 pt-3 text-xs font-medium text-action"
                          >
                            Lihat semua layanan
                          </Link>
                        </m.div>
                      </m.div>
                    ) : null}
                  </AnimatePresence>
                </fieldset>
              );
            }

            return (
              <m.div
                key={item.href}
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
              >
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative block py-2 text-sm text-ink-soft transition-colors hover:text-ink",
                    active &&
                      "text-ink after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-action",
                  )}
                >
                  {item.label}
                </Link>
              </m.div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/booking">Booking Sekarang</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Buka menu navigasi"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>

            <SheetContent className="w-screen max-w-none border-none bg-surface p-0">
              <div className="flex h-full flex-col p-6 sm:p-10">
                <div className="flex items-center justify-between pr-12">
                  <BrandLockup onClick={() => setOpen(false)} />
                </div>

                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigasi utama Maison Belle.
                </SheetDescription>

                <div className="mt-10 grid flex-1 gap-10 sm:grid-cols-[1.15fr_0.85fr] sm:items-center">
                  <nav aria-label="Navigasi mobile" className="flex flex-col">
                    {navItems.map((item, index) => {
                      const active = isActivePath(pathname, item.href);
                      return (
                        <m.div
                          key={item.href}
                          data-motion-reveal
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.04 * index,
                            ease,
                          }}
                        >
                          <m.div
                            whileHover={{ x: 6 }}
                            transition={{ duration: 0.18 }}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              aria-current={active ? "page" : undefined}
                              className={cn(
                                "flex items-baseline justify-between border-b border-line py-3 font-display text-3xl text-ink transition-colors hover:text-action sm:text-4xl",
                                active && "text-action",
                              )}
                            >
                              {item.label}
                              <span className="text-[0.62rem] uppercase tracking-[0.18em] text-ink-soft">
                                0{index + 1}
                              </span>
                            </Link>
                          </m.div>
                        </m.div>
                      );
                    })}
                  </nav>

                  <m.div
                    className="hidden sm:block"
                    initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                    animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                    transition={{ duration: 0.7, delay: 0.15, ease }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-blush">
                      <Image
                        src="/images/services/party-makeup.jpg"
                        alt="Detail makeup pilihan di Maison Belle."
                        fill
                        sizes="40vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/75 to-transparent p-5 pt-20 text-ivory">
                        <p className="text-[0.62rem] uppercase tracking-[0.18em] text-ivory/70">
                          Signature
                        </p>
                        <p className="mt-1 font-display text-2xl">
                          Party Makeup
                        </p>
                      </div>
                    </div>
                  </m.div>
                </div>

                <div className="mt-8 border-t border-line pt-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[0.65rem] uppercase tracking-[0.18em] text-ink-soft">
                      Tampilan
                    </p>
                    <ThemeToggle
                      showLabel
                      className="border border-line-strong/50"
                    />
                  </div>
                  <Button asChild size="lg" className="mt-4 w-full sm:w-auto">
                    <Link href="/booking" onClick={() => setOpen(false)}>
                      Booking Sekarang
                    </Link>
                  </Button>
                  <p className="mt-3 max-w-sm text-xs leading-relaxed text-ink-soft">
                    Permintaan jadwal dikonfirmasi manual oleh studio melalui
                    WhatsApp.
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
