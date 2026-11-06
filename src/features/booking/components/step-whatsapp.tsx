"use client";

import { ArrowLeft, Check, Copy, MessageCircle, RotateCcw } from "lucide-react";
import { m } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { business } from "@/config/business";
import { actionBarClass } from "@/features/booking/constants";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/features/booking/utils/whatsapp";
import { formatDateLong, formatTimeWithWib } from "@/lib/format/date";
import type { BookingDraft, BookingRequest, Service } from "@/types/domain";

export function StepWhatsApp({
  service,
  draft,
  onBack,
  onReset,
}: {
  service: Service;
  draft: BookingDraft;
  onBack: () => void;
  onReset: () => void;
}) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle",
  );

  const request: BookingRequest = useMemo(
    () => ({
      serviceId: service.id,
      requestedDate: draft.requestedDate ?? "",
      requestedTime: draft.requestedTime ?? "",
      customerName: draft.customerName,
      customerPhone: draft.customerPhone,
      notes: draft.notes || undefined,
    }),
    [draft, service.id],
  );

  const message = useMemo(
    () => buildWhatsAppMessage({ request, service }),
    [request, service],
  );
  const url = buildWhatsAppUrl(business.whatsappNumber, message);

  async function copyMessage() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(message);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  return (
    <div>
      <div className="rounded-md border border-line bg-surface p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-ink-soft">
          Ringkasan
        </p>
        <p className="mt-2 font-display text-2xl text-ink">{service.name}</p>
        <p className="mt-1 text-sm text-ink-soft">
          {formatDateLong(request.requestedDate)} ·{" "}
          {formatTimeWithWib(request.requestedTime)}
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          {request.customerName} · {request.customerPhone}
        </p>
      </div>

      <div className="mt-5 rounded-md border border-action/20 bg-blush/45 p-4">
        <p className="flex items-start gap-2 text-sm font-medium text-ink">
          <Check
            className="mt-0.5 h-4 w-4 shrink-0 text-action"
            aria-hidden="true"
          />
          WhatsApp belum terkirim otomatis.
        </p>
        <p className="mt-2 pl-6 text-xs leading-relaxed text-ink-soft">
          Kamu akan membuka WhatsApp dengan pesan yang sudah terisi. Tekan
          tombol kirim di WhatsApp jika sudah yakin. Studio akan membalas untuk
          mengonfirmasi ketersediaan.
        </p>
      </div>

      {url ? (
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="whatsapp" size="lg">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Buka WhatsApp
            </a>
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={copyMessage}
          >
            <Copy className="h-4 w-4" aria-hidden="true" />
            Salin pesan
          </Button>
        </div>
      ) : (
        <div className="mt-6 rounded-md border border-warning/30 bg-warning/10 p-4">
          <p className="text-sm font-medium text-ink">
            Nomor WhatsApp belum dikonfigurasi.
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-soft">
            Handoff WhatsApp dinonaktifkan untuk demo ini. Kamu tetap bisa
            menyalin pesan atau membuka halaman kontak untuk melihat informasi
            yang tersedia.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button type="button" variant="secondary" onClick={copyMessage}>
              <Copy className="h-4 w-4" aria-hidden="true" />
              Salin pesan
            </Button>
            <Button asChild variant="secondary">
              <Link href="/contact">Buka kontak</Link>
            </Button>
          </div>
        </div>
      )}

      <p aria-live="polite" className="mt-3 min-h-5 text-xs text-ink-soft">
        {copyStatus === "copied" ? "Pesan berhasil disalin." : null}
        {copyStatus === "failed"
          ? "Clipboard tidak tersedia. Salin pesan dari kotak di bawah."
          : null}
      </p>

      {copyStatus === "failed" ? (
        <textarea
          readOnly
          value={message}
          rows={10}
          aria-label="Pesan WhatsApp untuk disalin manual"
          className="mt-2 w-full rounded-md border border-line-strong bg-field p-3 text-xs text-ink"
          onFocus={(event) => event.currentTarget.select()}
        />
      ) : null}

      <details className="mt-6 border-t border-line pt-4">
        <m.summary
          whileHover={{ x: 2 }}
          className="cursor-pointer text-sm font-medium text-ink"
        >
          Lihat isi pesan
        </m.summary>
        <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap rounded-md bg-deep p-4 text-xs leading-relaxed text-ivory">
          {message}
        </pre>
      </details>

      <div className={actionBarClass}>
        <Button variant="secondary" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali
        </Button>
        <Button variant="ghost" onClick={onReset}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Mulai permintaan baru
        </Button>
      </div>
    </div>
  );
}
