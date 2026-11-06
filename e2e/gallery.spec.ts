import { expect, test } from "@playwright/test";

test("gallery filters and lightbox keyboard navigation work", async ({
  page,
}) => {
  await page.goto("/gallery");

  await page.getByRole("button", { name: "Makeup", exact: true }).click();
  const imageButton = page.locator('button[aria-label^="Buka gambar"]').first();
  await expect(imageButton).toBeVisible();
  await imageButton.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/Gambar 1 dari 3/)).toBeVisible();

  const thumbnails = dialog.getByRole("button", { name: /Tampilkan/ });
  await expect(thumbnails).toHaveCount(3);
  await thumbnails.nth(1).click();
  await expect(dialog.getByText(/Gambar 2 dari 3/)).toBeVisible();

  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByText(/Gambar 3 dari 3/)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(imageButton).toBeFocused();
});
