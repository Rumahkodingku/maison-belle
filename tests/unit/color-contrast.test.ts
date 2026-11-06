import { describe, expect, it } from "vitest";

function luminance(hex: string) {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4]
    .map((index) => Number.parseInt(value.slice(index, index + 2), 16) / 255)
    .map((channel) =>
      channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(a: string, b: string) {
  const [lighter, darker] = [luminance(a), luminance(b)].sort(
    (left, right) => right - left,
  );
  return (lighter + 0.05) / (darker + 0.05);
}

describe("Maison Belle contrast tokens", () => {
  it("keeps body text above WCAG AA", () => {
    expect(contrast("#593D45", "#FFF9F6")).toBeGreaterThanOrEqual(7);
    expect(contrast("#7A5A62", "#FFF9F6")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#593D45", "#F3DDE3")).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps primary action text above WCAG AA", () => {
    expect(contrast("#FFFFFF", "#A8516A")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#FFFFFF", "#8F3F57")).toBeGreaterThanOrEqual(4.5);
  });

  it("documents why brand rose is not used for small text", () => {
    expect(contrast("#C97991", "#FFF9F6")).toBeLessThan(4.5);
  });

  it("keeps semantic states readable", () => {
    expect(contrast("#A4262C", "#FFF9F6")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#2E6B4F", "#FFF9F6")).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps dark theme body and muted text readable", () => {
    expect(contrast("#F8EFEC", "#171011")).toBeGreaterThanOrEqual(7);
    expect(contrast("#CBB8BC", "#171011")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#F8EFEC", "#2A1A1F")).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps dark theme action colors readable", () => {
    expect(contrast("#EDA9BC", "#171011")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#1A1114", "#C97991")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#1A1114", "#D98AA0")).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps dark theme borders and states readable", () => {
    expect(contrast("#8F767D", "#171011")).toBeGreaterThanOrEqual(3);
    expect(contrast("#F09A9F", "#171011")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#7FD1A8", "#171011")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#E5B567", "#171011")).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#8FC7E8", "#171011")).toBeGreaterThanOrEqual(4.5);
  });
});
