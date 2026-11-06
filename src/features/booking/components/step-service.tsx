"use client";

import { Check, Clock } from "lucide-react";
import { m } from "motion/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { PriceLabel } from "@/components/shared/price-label";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Service, ServiceCategory } from "@/types/domain";

type Filter = ServiceCategory | "all";

export function StepService({
  services,
  selectedId,
  onSelect,
}: {
  services: Service[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? services
        : services.filter((service) => service.category === filter),
    [filter, services],
  );

  const filters: Array<{ value: Filter; label: string }> = [
    { value: "all", label: "Semua" },
    ...CATEGORIES.map((category) => ({
      value: category,
      label: CATEGORY_LABELS[category],
    })),
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2 pb-2">
        {filters.map((item) => {
          const active = filter === item.value;
          return (
            <m.button
              key={item.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item.value)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs transition-colors",
                active
                  ? "border-action bg-action-fill text-on-action"
                  : "border-line-strong text-ink-soft hover:border-ink hover:text-ink",
              )}
            >
              {item.label}
            </m.button>
          );
        })}
      </div>

      <fieldset className="mt-6">
        <legend className="sr-only">Pilih satu layanan</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {visible.map((service) => {
            const selected = selectedId === service.id;
            return (
              <m.label
                key={service.id}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "group flex cursor-pointer items-start gap-4 rounded-md border p-3 transition-colors sm:p-4",
                  selected
                    ? "border-action bg-blush/55"
                    : "border-line bg-surface hover:border-line-strong",
                )}
              >
                <input
                  type="radio"
                  name="service"
                  value={service.id}
                  checked={selected}
                  onChange={() => onSelect(service.id)}
                  className="sr-only"
                />
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-sm bg-blush">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.62rem] uppercase tracking-[0.16em] text-ink-soft">
                        {CATEGORY_LABELS[service.category]}
                      </p>
                      <h3 className="mt-1 font-display text-xl leading-tight text-ink">
                        {service.name}
                      </h3>
                    </div>
                    <m.span
                      animate={selected ? { scale: 1.1 } : { scale: 1 }}
                      className={cn(
                        "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                        selected
                          ? "scale-110 border-action bg-action-fill text-on-action"
                          : "border-line-strong text-transparent",
                      )}
                      aria-hidden="true"
                    >
                      <Check className="h-3 w-3" />
                    </m.span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-soft">
                    {service.shortDescription}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                    <PriceLabel
                      price={service.price}
                      pricingType={service.pricingType}
                    />
                    <span className="flex items-center gap-1 text-ink-soft">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {service.durationMinutes} menit
                    </span>
                  </div>
                </div>
              </m.label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
