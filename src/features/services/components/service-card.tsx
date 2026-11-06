"use client";

import { ArrowUpRight, Clock } from "lucide-react";
import { m } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { HoverLink } from "@/components/motion/hover-link";
import { PriceLabel } from "@/components/shared/price-label";
import { CATEGORY_LABELS } from "@/lib/constants";
import type { Service } from "@/types/domain";

export function ServiceCard({
  service,
  priority = false,
}: {
  service: Service;
  priority?: boolean;
}) {
  return (
    <m.article
      className="group flex h-full flex-col"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-sm bg-blush"
        aria-label={`Lihat detail ${service.name}`}
      >
        <m.div
          className="absolute inset-0"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={service.image}
            alt={`${service.name} di Maison Belle`}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
            priority={priority}
            className="object-cover"
          />
        </m.div>
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <p className="eyebrow">{CATEGORY_LABELS[service.category]}</p>
        <h3 className="mt-2 font-display text-2xl leading-tight text-ink">
          <Link
            href={`/services/${service.slug}`}
            className="hover:text-action"
          >
            {service.name}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
          {service.shortDescription}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div>
            <PriceLabel
              price={service.price}
              pricingType={service.pricingType}
              className="text-sm"
            />
            <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {service.durationMinutes} menit
            </p>
          </div>
          <HoverLink
            href={`/booking?service=${service.slug}`}
            className="inline-flex items-center gap-1 border-b border-ink/25 pb-0.5 text-xs font-medium text-ink transition-colors hover:border-action hover:text-action"
          >
            Booking
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </HoverLink>
        </div>
      </div>
    </m.article>
  );
}
