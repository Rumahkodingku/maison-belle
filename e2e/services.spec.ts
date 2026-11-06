import { expect, test } from "@playwright/test";

test("service catalog filters and detail pages resolve", async ({ page }) => {
  await page.goto("/services");

  await page.getByRole("button", { name: "Nails", exact: true }).click();
  await expect(page.getByText("Gel Polish", { exact: true })).toBeVisible();
  await expect(
    page.locator("main").getByText("Signature Hair Spa"),
  ).toHaveCount(0);

  await page.getByRole("link", { name: "Gel Polish", exact: true }).click();
  await expect(page).toHaveURL(/\/services\/gel-polish$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Gel Polish",
  );
  await expect(
    page.getByRole("link", { name: "Booking layanan ini" }),
  ).toBeVisible();
});

test("unknown service slug returns the branded 404", async ({ page }) => {
  await page.goto("/services/layanan-tidak-ada");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "tidak ditemukan",
  );
});
