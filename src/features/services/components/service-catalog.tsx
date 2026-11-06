"use client";

import { m } from "motion/react";
import { useMemo, useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { ServiceCard } from "@/features/services/components/service-card";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Service, ServiceCategory } from "@/types/domain";

type Filter = ServiceCategory | "all";

export function ServiceCatalog({ services }: { services: Service[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const visibleServices = useMemo(
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
      <fieldset className="flex flex-wrap gap-2 border-0 pb-2">
        <legend className="sr-only">Filter kategori layanan</legend>
        {filters.map((item) => {
          const active = filter === item.value;
          return (
            <m.button
              key={item.value}
              type="button"
              aria-pressed={active}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setFilter(item.value)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                active
                  ? "border-action bg-action-fill text-on-action"
                  : "border-line-strong bg-transparent text-ink-soft hover:border-ink hover:text-ink",
              )}
            >
              {item.label}
            </m.button>
          );
        })}
      </fieldset>

      {visibleServices.length > 0 ? (
        <Stagger className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((service, index) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} priority={index === 0} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <div className="mt-12 rounded-lg border border-dashed border-line-strong bg-blush/30 p-10 text-center">
          <p className="font-display text-2xl text-ink">
            Belum ada layanan di kategori ini.
          </p>
          <m.button
            type="button"
            onClick={() => setFilter("all")}
            whileHover={{ x: 2 }}
            className="mt-3 text-sm font-medium text-action underline underline-offset-4"
          >
            Tampilkan semua layanan
          </m.button>
        </div>
      )}
    </div>
  );
}
