"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import {
  fromDateString,
  getMonthGrid,
  getTodayInJakarta,
  isClosedDate,
  isPastDate,
  toDateInputValue,
} from "@/lib/format/date";
import { cn } from "@/lib/utils";
import type { OpeningHours } from "@/types/domain";

const WEEKDAY_HEADERS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

type CalendarProps = {
  selected?: string;
  onSelect: (date: string) => void;
  openingHours: OpeningHours;
  disabledDate?: (date: string) => boolean;
  className?: string;
};

export function Calendar({
  selected,
  onSelect,
  openingHours,
  disabledDate,
  className,
}: CalendarProps) {
  const today = getTodayInJakarta();
  const [month, setMonth] = useState(() => fromDateString(selected ?? today));

  const days = getMonthGrid(month);
  const monthLabel = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(month);

  const todayDate = fromDateString(today);
  const prevDisabled =
    month.getFullYear() === todayDate.getFullYear() &&
    month.getMonth() === todayDate.getMonth();

  return (
    <fieldset className={cn("w-full border-0 p-0", className)}>
      <legend className="sr-only">Kalender pemilihan tanggal</legend>
      <div className="mb-4 flex items-center justify-between">
        <m.button
          type="button"
          onClick={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 12))
          }
          disabled={prevDisabled}
          whileHover={prevDisabled ? undefined : { scale: 1.06 }}
          whileTap={prevDisabled ? undefined : { scale: 0.94 }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-blush disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Bulan sebelumnya"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </m.button>
        <p className="font-display text-xl capitalize text-ink">{monthLabel}</p>
        <m.button
          type="button"
          onClick={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 12))
          }
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-blush"
          aria-label="Bulan berikutnya"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </m.button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={monthLabel}
          data-motion-reveal
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-7 gap-1 text-center"
        >
          {WEEKDAY_HEADERS.map((day) => (
            <span
              key={day}
              className="pb-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-ink-soft"
            >
              {day}
            </span>
          ))}

          {days.map(({ date, inMonth }) => {
            const value = toDateInputValue(date);
            const closed = isClosedDate(value, openingHours);
            const past = isPastDate(value);
            const extraDisabled = disabledDate?.(value) ?? false;
            const disabled = !inMonth || closed || past || extraDisabled;
            const isSelected = selected === value;
            const isToday = value === today;

            return (
              <m.button
                key={value}
                type="button"
                disabled={disabled}
                onClick={() => onSelect(value)}
                whileHover={disabled ? undefined : { scale: 1.06 }}
                whileTap={disabled ? undefined : { scale: 0.94 }}
                aria-pressed={isSelected}
                aria-label={new Intl.DateTimeFormat("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(date)}
                className={cn(
                  "relative flex aspect-square items-center justify-center rounded-md text-sm transition-colors",
                  !inMonth && "pointer-events-none opacity-0",
                  disabled &&
                    inMonth &&
                    "cursor-not-allowed text-ink/25 line-through",
                  !disabled && !isSelected && "text-ink hover:bg-blush",
                  isSelected && "bg-action-fill text-on-action",
                  isToday && !isSelected && "border border-line-strong",
                )}
              >
                {date.getDate()}
                {isSelected ? <span className="sr-only"> dipilih</span> : null}
              </m.button>
            );
          })}
        </m.div>
      </AnimatePresence>

      <p className="mt-3 text-xs leading-relaxed text-ink-soft">
        Minggu tutup. Tanggal yang dipilih adalah preferensi, bukan slot
        terkonfirmasi.
      </p>
    </fieldset>
  );
}
