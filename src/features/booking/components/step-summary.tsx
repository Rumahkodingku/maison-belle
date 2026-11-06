"use client";

import { ArrowLeft, Check, Pencil } from "lucide-react";
import { m } from "motion/react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { actionBarClass } from "@/features/booking/constants";
import { CATEGORY_LABELS } from "@/lib/constants";
import { formatPriceLabel, formatPriceNote } from "@/lib/format/currency";
import { formatDateLong, formatTimeWithWib } from "@/lib/format/date";
import { formatPhoneDisplay } from "@/lib/format/phone";
import type { BookingDraft, Service } from "@/types/domain";

function SummaryRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: ReactNode;
  onEdit: () => void;
}) {
  return (
    <m.div
      className="flex items-start justify-between gap-4 py-4"
      whileHover={{ x: 3 }}
      transition={{ duration: 0.18 }}
    >
      <div>
        <dt className="text-xs uppercase tracking-[0.14em] text-ink-soft">
          {label}
        </dt>
        <dd className="mt-1 text-sm text-ink">{value}</dd>
      </div>
      <m.button
        type="button"
        onClick={onEdit}
        whileHover={{ x: 2 }}
        className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-action underline underline-offset-4"
      >
        <Pencil className="h-3 w-3" aria-hidden="true" />
        Ubah
      </m.button>
    </m.div>
  );
}

export function StepSummary({
  service,
  draft,
  onEdit,
  onBack,
  onContinue,
}: {
  service: Service;
  draft: BookingDraft;
  onEdit: (step: 1 | 2 | 3) => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  const date = draft.requestedDate ?? "";
  const time = draft.requestedTime ?? "";

  return (
    <div>
      <div className="rounded-md border border-line bg-surface">
        <dl className="divide-y divide-line px-4 sm:px-5">
          <SummaryRow
            label="Layanan"
            value={
              <span>
                {service.name}
                <span className="mt-1 block text-xs text-ink-soft">
                  {CATEGORY_LABELS[service.category]} ·{" "}
                  {service.durationMinutes} menit
                </span>
              </span>
            }
            onEdit={() => onEdit(1)}
          />
          <SummaryRow
            label="Jadwal preferensi"
            value={
              <span>
                {formatDateLong(date)}
                <span className="mt-1 block text-xs text-ink-soft">
                  {formatTimeWithWib(time)}
                </span>
              </span>
            }
            onEdit={() => onEdit(2)}
          />
          <SummaryRow
            label="Data pelanggan"
            value={
              <span>
                {draft.customerName}
                <span className="mt-1 block text-xs text-ink-soft">
                  {formatPhoneDisplay(draft.customerPhone)}
                </span>
              </span>
            }
            onEdit={() => onEdit(3)}
          />
          {draft.notes.trim() ? (
            <SummaryRow
              label="Catatan"
              value={draft.notes}
              onEdit={() => onEdit(3)}
            />
          ) : null}
        </dl>
      </div>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-y border-line py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-ink-soft">
            Harga
          </p>
          <p className="mt-1 text-lg font-medium tabular-nums text-ink">
            {formatPriceLabel(service.price, service.pricingType)}
          </p>
          <p className="mt-1 max-w-sm text-xs leading-relaxed text-ink-soft">
            {formatPriceNote(service.pricingType)}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-md border border-action/20 bg-blush/45 p-4">
        <p className="flex items-start gap-2 text-sm font-medium text-ink">
          <Check
            className="mt-0.5 h-4 w-4 shrink-0 text-action"
            aria-hidden="true"
          />
          Ini permintaan appointment, bukan booking terkonfirmasi.
        </p>
        <p className="mt-2 pl-6 text-xs leading-relaxed text-ink-soft">
          Tim Maison Belle akan memeriksa ketersediaan jadwal dan mengonfirmasi
          melalui WhatsApp. Harga final untuk layanan “Mulai dari” juga
          dikonfirmasi studio.
        </p>
      </div>

      <div className={actionBarClass}>
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali
        </Button>
        <Button onClick={onContinue}>Lanjutkan ke WhatsApp</Button>
      </div>
    </div>
  );
}
