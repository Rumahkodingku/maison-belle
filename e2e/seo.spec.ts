import { expect, test } from "@playwright/test";

test("metadata, sitemap, robots, and structured data are present", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(
    1,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const sitemapText = await sitemap.text();
  expect(sitemapText).toContain("/services/gel-polish-nail-art");
  expect(sitemapText).toContain("/gallery");

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("Sitemap:");
});
