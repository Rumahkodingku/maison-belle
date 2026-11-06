import type { PricingType } from "@/types/domain";

const idrFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
  return idrFormatter.format(amount).replace(/\u00A0/g, "");
}

export function formatPriceLabel(price: number, pricingType: PricingType) {
  const formatted = formatCurrency(price);
  return pricingType === "starting_from"
    ? `Mulai dari ${formatted}`
    : formatted;
}

export function formatPriceNote(pricingType: PricingType) {
  return pricingType === "starting_from"
    ? "Harga final dikonfirmasi studio setelah detail treatment."
    : "Harga tetap untuk treatment sesuai deskripsi.";
}
