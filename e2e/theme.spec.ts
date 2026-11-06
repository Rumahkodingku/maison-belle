import { expect, test } from "@playwright/test";

test.describe("theme", () => {
  test("defaults to the system light theme and persists a manual choice", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
    await page.goto("/");

    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await expect(page.locator("html")).toHaveClass(/light/);

    const toggle = page.getByRole("button", {
      name: "Aktifkan mode gelap",
    });
    await expect(toggle).toBeVisible();
    await toggle.click();

    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(
      page.getByRole("button", { name: "Aktifkan mode terang" }),
    ).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("theme")))
      .toBe("dark");

    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.getByRole("button", { name: "Aktifkan mode terang" }).click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem("theme")))
      .toBe("light");
  });

  test("follows a dark system preference on first visit", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      colorScheme: "dark",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(
      page.getByRole("button", { name: "Aktifkan mode terang" }),
    ).toBeVisible();

    await context.close();
  });

  test("exposes the theme control inside the mobile menu", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
    await page.goto("/");

    await page.getByRole("button", { name: "Buka menu navigasi" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await dialog.getByRole("button", { name: "Aktifkan mode gelap" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(
      dialog.getByRole("button", { name: "Aktifkan mode terang" }),
    ).toBeVisible();
  });
});
