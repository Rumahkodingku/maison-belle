import { describe, expect, it } from "vitest";
import {
  customerSchema,
  scheduleStepSchema,
} from "@/features/booking/schemas/booking";

describe("booking validation", () => {
  it("accepts valid customer data", () => {
    const result = customerSchema.safeParse({
      customerName: "Amanda Putri",
      customerPhone: "081234567890",
      notes: "Nail art nude.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short names, invalid phones, and long notes", () => {
    expect(
      customerSchema.safeParse({
        customerName: "A",
        customerPhone: "081234567890",
        notes: "",
      }).success,
    ).toBe(false);

    expect(
      customerSchema.safeParse({
        customerName: "Amanda",
        customerPhone: "abc",
        notes: "",
      }).success,
    ).toBe(false);

    expect(
      customerSchema.safeParse({
        customerName: "Amanda",
        customerPhone: "081234567890",
        notes: "x".repeat(501),
      }).success,
    ).toBe(false);
  });

  it("rejects past dates and accepts future dates", () => {
    expect(
      scheduleStepSchema.safeParse({
        requestedDate: "2020-01-01",
        requestedTime: "10:00",
      }).success,
    ).toBe(false);

    expect(
      scheduleStepSchema.safeParse({
        requestedDate: "2099-01-01",
        requestedTime: "10:00",
      }).success,
    ).toBe(true);
  });
});
