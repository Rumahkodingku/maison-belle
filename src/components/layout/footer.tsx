"use client";

import { ArrowUpRight } from "lucide-react";
import { m } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { HoverLink } from "@/components/motion/hover-link";
import { business, demoDisclosure } from "@/config/business";
import { navItems } from "@/config/site";
import { WEEKDAY_LABELS, WEEKDAY_ORDER } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-deep text-on-deep">
      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.8fr_1fr]">
          <div>
            <m.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/logo/logo-mark-light.png"
                  alt=""
                  width={52}
                  height={41}
                  className="h-12 w-auto object-contain"
                />
                <span className="font-display text-3xl tracking-tight text-ivory">
                  Maison <em className="text-dusty">Belle</em>
                </span>
              </Link>
            </m.div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/65">
              Beauty studio dengan pendekatan personal untuk hair, nails,
              makeup, dan lash &amp; brow.
            </p>
            <p className="mt-6 max-w-sm text-xs leading-relaxed text-ivory/70">
              {demoDisclosure}
            </p>
          </div>

          <nav aria-label="Navigasi footer">
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-ivory/70">
              Jelajahi
            </p>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <HoverLink
                    href={item.href}
                    className="text-sm text-ivory/75 transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </HoverLink>
                </li>
              ))}
              <li>
                <HoverLink
                  href="/privacy"
                  className="text-sm text-ivory/75 transition-colors hover:text-ivory"
                >
                  Kebijakan privasi
                </HoverLink>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-ivory/70">
              Kontak
            </p>
            <div className="mt-5 space-y-3 text-sm leading-relaxed text-ivory/75">
              <p>{business.address}</p>
              <div>
                {WEEKDAY_ORDER.map((day) => {
                  const hours = business.openingHours[day];
                  return (
                    <p key={day} className="flex justify-between gap-4 text-xs">
                      <span>{WEEKDAY_LABELS[day]}</span>
                      <span className="text-ivory/75">
                        {hours
                          ? `${hours.open.replace(":", ".")}–${hours.close.replace(":", ".")}`
                          : "Tutup"}
                      </span>
                    </p>
                  );
                })}
              </div>
              <HoverLink
                href="/contact"
                className="inline-flex items-center gap-1.5 border-b border-ivory/25 pb-1 text-sm text-ivory transition-colors hover:border-dusty hover:text-dusty"
              >
                Lihat informasi kontak
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </HoverLink>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mt-16 flex justify-end border-t border-ivory/15 pt-8"
        >
          <Image
            src="/images/logo/logo-mark-light.png"
            alt=""
            width={240}
            height={188}
            className="h-36 w-auto object-contain opacity-[0.08] sm:h-44"
          />
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-ivory/15 pt-6 text-xs text-ivory/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Maison Belle. Showcase project RumahKodingku.</p>
          <p>Dibuat dengan pendekatan editorial, aksesibel, dan ringan.</p>
        </div>
      </Container>
    </footer>
  );
}
