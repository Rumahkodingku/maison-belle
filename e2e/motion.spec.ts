import { expect, test } from "@playwright/test";

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("reveals content immediately without waiting for motion", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Booking Sekarang" }).first(),
    ).toBeVisible();
    await expect(
      page.getByText("Mulai dari yang paling kamu butuhkan."),
    ).toBeVisible();
  });
});
