import { describe, expect, it } from "vitest";
import {
  formatCurrency,
  formatPriceLabel,
  formatPriceNote,
} from "@/lib/format/currency";

describe("currency formatting", () => {
  it("formats IDR without decimals or a space", () => {
    expect(formatCurrency(250000)).toBe("Rp250.000");
  });

  it("labels fixed prices as exact amounts", () => {
    expect(formatPriceLabel(250000, "fixed")).toBe("Rp250.000");
    expect(formatPriceNote("fixed")).toContain("Harga tetap");
  });

  it("labels starting prices as estimates", () => {
    expect(formatPriceLabel(250000, "starting_from")).toBe(
      "Mulai dari Rp250.000",
    );
    expect(formatPriceNote("starting_from")).toContain("Harga final");
  });
});
