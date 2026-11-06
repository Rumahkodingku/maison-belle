import { describe, expect, it } from "vitest";
import { business } from "@/config/business";
import {
  formatDateLong,
  formatTimeWithWib,
  generateTimeOptions,
  getTimeOptionsForDate,
  getTodayInJakarta,
  getWeekdayKey,
  isClosedDate,
  isPastDate,
  isValidDateString,
} from "@/lib/format/date";

const now = new Date("2026-11-05T12:00:00+07:00");

describe("Jakarta date helpers", () => {
  it("gets the business date in Asia/Jakarta", () => {
    expect(getTodayInJakarta(now)).toBe("2026-11-05");
  });

  it("validates real calendar dates", () => {
    expect(isValidDateString("2026-11-10")).toBe(true);
    expect(isValidDateString("2026-02-30")).toBe(false);
  });

  it("maps weekdays and closed days", () => {
    expect(getWeekdayKey("2026-11-08")).toBe("sunday");
    expect(isClosedDate("2026-11-08", business.openingHours)).toBe(true);
    expect(isClosedDate("2026-11-09", business.openingHours)).toBe(false);
  });

  it("rejects past dates but allows today", () => {
    expect(isPastDate("2026-11-04", now)).toBe(true);
    expect(isPastDate("2026-11-05", now)).toBe(false);
  });

  it("generates duration-aware 30 minute options", () => {
    const options = generateTimeOptions("10:00", "19:00", 60);
    expect(options[0]).toBe("10:00");
    expect(options.at(-1)).toBe("18:00");
    expect(options).toHaveLength(17);
  });

  it("returns no options for a closed date", () => {
    expect(
      getTimeOptionsForDate("2026-11-08", 60, business.openingHours, now),
    ).toEqual([]);
  });

  it("formats dates and times in Indonesian", () => {
    expect(formatDateLong("2026-11-10")).toBe("10 November 2026");
    expect(formatTimeWithWib("14:00")).toBe("14.00 WIB");
  });
});
