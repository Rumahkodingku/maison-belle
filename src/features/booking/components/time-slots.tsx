"use client";

import { m } from "motion/react";
import { formatTimeDisplay } from "@/lib/format/date";
import { cn } from "@/lib/utils";

export function TimeSlots({
  options,
  value,
  onChange,
}: {
  options: string[];
  value?: string;
  onChange: (time: string) => void;
}) {
  if (options.length === 0) {
    return (
      <p className="text-sm leading-relaxed text-ink-soft">
        Tidak ada pilihan waktu untuk tanggal ini. Coba pilih tanggal lain atau
        hubungi studio.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {options.map((time) => {
        const active = value === time;
        return (
          <m.button
            key={time}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(time)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={cn(
              "rounded-md border px-2 py-2.5 text-sm tabular-nums transition-colors",
              active
                ? "border-action bg-action-fill text-on-action"
                : "border-line-strong text-ink hover:border-action hover:text-action",
            )}
          >
            {formatTimeDisplay(time)}
          </m.button>
        );
      })}
    </div>
  );
}
