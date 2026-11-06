import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

async function seriousViolations(page: import("@playwright/test").Page) {
  const results = await new AxeBuilder({ page }).analyze();
  return results.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact ?? ""),
  );
}

test("homepage has no serious or critical accessibility violations", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
  await page.goto("/");
  await page.waitForTimeout(400);

  expect(await seriousViolations(page)).toEqual([]);
});

test("dark mode has no serious or critical accessibility violations on key routes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });

  for (const path of ["/", "/gallery", "/booking"]) {
    await page.goto(path);
    await page.waitForTimeout(400);
    expect(await seriousViolations(page), path).toEqual([]);
  }
});
