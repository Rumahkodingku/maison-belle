import { expect, test } from "@playwright/test";

test("homepage loads and primary navigation works", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Maison Belle/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Cantik dengan",
  );
  await expect(
    page.getByRole("link", { name: "Booking Sekarang" }).first(),
  ).toBeVisible();

  await page.getByRole("link", { name: "Layanan" }).first().click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Perawatan",
  );
});
