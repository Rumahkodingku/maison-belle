import { describe, expect, it } from "vitest";
import {
  formatPhoneDisplay,
  normalizeBusinessNumber,
  normalizeIndonesianPhone,
} from "@/lib/format/phone";

describe("Indonesian phone normalization", () => {
  it("normalizes common local formats", () => {
    expect(normalizeIndonesianPhone("0812-3456-7890")).toBe("6281234567890");
    expect(normalizeIndonesianPhone("+62 812 3456 7890")).toBe("6281234567890");
    expect(normalizeIndonesianPhone("6281234567890")).toBe("6281234567890");
  });

  it("rejects letters and invalid lengths", () => {
    expect(normalizeIndonesianPhone("abc")).toBeNull();
    expect(normalizeIndonesianPhone("0812")).toBeNull();
    expect(normalizeIndonesianPhone("0212345678")).toBeNull();
  });

  it("formats a readable local number", () => {
    expect(formatPhoneDisplay("6281234567890")).toBe("0812-3456-7890");
  });

  it("validates business numbers separately", () => {
    expect(normalizeBusinessNumber("+62 812-3456-7890")).toBe("6281234567890");
    expect(normalizeBusinessNumber("")).toBeNull();
    expect(normalizeBusinessNumber("12345")).toBeNull();
  });
});
