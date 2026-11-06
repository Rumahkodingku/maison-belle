"use client";

import { HoverLink } from "@/components/motion/hover-link";
import { Calendar } from "@/components/ui/calendar";
import { business } from "@/config/business";
import { TimeSlots } from "@/features/booking/components/time-slots";
import { formatDateLong, getTimeOptionsForDate } from "@/lib/format/date";
import type { Service } from "@/types/domain";

export function StepSchedule({
  service,
  date,
  time,
  onDateChange,
  onTimeChange,
}: {
  service: Service;
  date?: string;
  time?: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}) {
  const hasOpeningHours = Object.values(business.openingHours).some(Boolean);

  if (!hasOpeningHours) {
    return (
      <div className="rounded-md border border-line bg-blush/40 p-6">
        <h3 className="font-display text-2xl text-ink">
          Jadwal belum tersedia.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Jam operasional studio belum dikonfigurasi. Silakan hubungi studio
          untuk memilih waktu.
        </p>
        <HoverLink
          href="/contact"
          className="mt-4 inline-block text-sm font-medium text-action underline underline-offset-4"
        >
          Buka halaman kontak
        </HoverLink>
      </div>
    );
  }

  const options = date
    ? getTimeOptionsForDate(
        date,
        service.durationMinutes,
        business.openingHours,
      )
    : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
      <div>
        <Calendar
          selected={date}
          onSelect={onDateChange}
          openingHours={business.openingHours}
        />
      </div>

      <div>
        <p className="text-sm font-medium text-ink">Waktu preferensi</p>
        {date ? (
          <>
            <p className="mt-1 text-sm text-ink-soft">{formatDateLong(date)}</p>
            <div className="mt-4">
              <TimeSlots
                options={options}
                value={time}
                onChange={onTimeChange}
              />
            </div>
          </>
        ) : (
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Pilih tanggal terlebih dahulu untuk melihat pilihan waktu.
          </p>
        )}

        <div className="mt-6 rounded-md border border-line bg-blush/35 p-4">
          <p className="text-sm font-medium text-ink">
            Jadwal ini masih preferensi.
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            Tim Maison Belle akan memeriksa ketersediaan dan mengonfirmasi
            appointment melalui WhatsApp.
          </p>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-ink-soft">
          Durasi layanan: {service.durationMinutes} menit. Opsi waktu mengikuti
          jam operasional demo dan bukan slot real-time.
        </p>
      </div>
    </div>
  );
}
