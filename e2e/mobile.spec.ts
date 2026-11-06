import { expect, test } from "@playwright/test";

test("mobile navigation opens and there is no horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    ),
  ).toBe(false);

  await page.getByRole("button", { name: "Buka menu navigasi" }).click();
  const mobileNav = page.getByRole("navigation", { name: "Navigasi mobile" });
  await expect(mobileNav).toBeVisible();
  await mobileNav.getByRole("link", { name: "Layanan" }).click();
  await expect(page).toHaveURL(/\/services$/);
});
