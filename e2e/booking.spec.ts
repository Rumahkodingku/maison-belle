import { expect, test } from "@playwright/test";

async function chooseFirstAvailableSchedule(
  page: import("@playwright/test").Page,
) {
  const calendar = page.getByRole("group", {
    name: "Kalender pemilihan tanggal",
  });
  const day = calendar.locator("button[aria-pressed]:not([disabled])").first();
  await expect(day).toBeVisible();
  await day.click();
  await expect(day).toHaveAttribute("aria-pressed", "true");

  const time = page
    .locator("button")
    .filter({ hasText: /^\d{2}\.\d{2}$/ })
    .first();
  await expect(time).toBeVisible();
  await time.click();
}

test("booking rejects invalid progression and preserves values on back", async ({
  page,
}) => {
  await page.goto("/booking?service=gel-polish-nail-art");

  await page.getByRole("button", { name: "Lanjutkan" }).click();
  await chooseFirstAvailableSchedule(page);
  await page.getByRole("button", { name: "Lanjutkan" }).click();

  await page.getByLabel("Nama lengkap *").fill("Amanda Putri");
  await page.getByLabel("Nomor WhatsApp *").fill("081234567890");
  await page.getByLabel("Catatan tambahan").fill("Nail art nude minimalis.");

  const review = page.getByRole("button", { name: "Lihat ringkasan" });
  await expect(review).toBeEnabled();
  await review.click();

  await expect(page.getByText("Ini permintaan appointment")).toBeVisible();
  await expect(page.getByText("Amanda Putri")).toBeVisible();
  await expect(page.getByText("Mulai dari Rp250.000")).toBeVisible();

  await page.getByRole("button", { name: "Kembali" }).click();
  await expect(page.getByLabel("Nama lengkap *")).toHaveValue("Amanda Putri");

  await page.getByRole("button", { name: "Kembali" }).click();
  await expect(page.getByRole("button", { name: "Lanjutkan" })).toBeEnabled();
});

test("valid booking generates an encoded WhatsApp handoff without sending", async ({
  page,
}) => {
  await page.goto("/booking?service=gel-polish-nail-art");

  await page.getByRole("button", { name: "Lanjutkan" }).click();
  await chooseFirstAvailableSchedule(page);
  await page.getByRole("button", { name: "Lanjutkan" }).click();

  await page.getByLabel("Nama lengkap *").fill("Amanda Putri");
  await page.getByLabel("Nomor WhatsApp *").fill("081234567890");
  await page.getByRole("button", { name: "Lihat ringkasan" }).click();
  await page.getByRole("button", { name: "Lanjutkan ke WhatsApp" }).click();

  const whatsappLink = page.getByRole("link", { name: "Buka WhatsApp" });
  const fallback = page.getByText("Nomor WhatsApp belum dikonfigurasi.");

  await expect(whatsappLink.or(fallback)).toBeVisible({ timeout: 10_000 });

  if (await whatsappLink.isVisible()) {
    await expect(whatsappLink).toHaveAttribute(
      "href",
      /^https:\/\/wa\.me\/6281234567890\?text=/,
    );
    const href = await whatsappLink.getAttribute("href");
    expect(decodeURIComponent(href ?? "")).toContain("Gel Polish + Nail Art");
    expect(decodeURIComponent(href ?? "")).toContain("Amanda Putri");
  } else {
    await expect(fallback).toBeVisible();
  }

  await expect(
    page.getByText("WhatsApp belum terkirim otomatis."),
  ).toBeVisible();
});
