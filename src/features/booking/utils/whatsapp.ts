import { CATEGORY_LABELS } from "@/lib/constants";
import { formatPriceLabel } from "@/lib/format/currency";
import { formatDateLong, formatTimeDisplay } from "@/lib/format/date";
import { formatPhoneDisplay } from "@/lib/format/phone";
import type { BookingRequest, Service } from "@/types/domain";

export function buildWhatsAppMessage({
  request,
  service,
}: {
  request: BookingRequest;
  service: Service;
}) {
  const priceLabel = formatPriceLabel(service.price, service.pricingType);
  const priceNote =
    service.pricingType === "starting_from"
      ? "\nHarga final dikonfirmasi studio."
      : "";

  return [
    "Halo Maison Belle, saya ingin mengajukan permintaan appointment.",
    "",
    "DATA PELANGGAN",
    `Nama: ${request.customerName}`,
    `WhatsApp: ${formatPhoneDisplay(request.customerPhone)}`,
    "",
    "DETAIL LAYANAN",
    `Kategori: ${CATEGORY_LABELS[service.category]}`,
    `Treatment: ${service.name}`,
    `Durasi: ${service.durationMinutes} menit`,
    `Harga: ${priceLabel}${priceNote}`,
    "",
    "JADWAL YANG DIINGINKAN",
    `Tanggal: ${formatDateLong(request.requestedDate)}`,
    `Waktu: ${formatTimeDisplay(request.requestedTime)} WIB`,
    "",
    `Catatan: ${request.notes?.trim() || "-"}`,
    "",
    "Mohon konfirmasi ketersediaan jadwal dan detail harga. Terima kasih.",
  ].join("\n");
}

export function buildWhatsAppUrl(number: string | null, message: string) {
  if (!number || !/^62[0-9]{8,13}$/.test(number)) {
    return null;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
