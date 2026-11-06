import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { artists } from "@/features/artists/data/artists";
import { faqs } from "@/features/faq/data/faqs";
import { galleryItems } from "@/features/gallery/data/gallery";
import { getActiveServices, services } from "@/features/services/data/services";
import { testimonials } from "@/features/testimonials/data/testimonials";
import { CATEGORIES } from "@/lib/constants";

function exists(publicPath: string) {
  return fs.existsSync(path.join(process.cwd(), "public", publicPath));
}

describe("static content integrity", () => {
  it("has unique service ids and slugs", () => {
    expect(new Set(services.map((service) => service.id)).size).toBe(
      services.length,
    );
    expect(new Set(services.map((service) => service.slug)).size).toBe(
      services.length,
    );
  });

  it("keeps inactive services out of the public catalog", () => {
    expect(getActiveServices().some((service) => !service.isActive)).toBe(
      false,
    );
  });

  it("uses valid categories and existing service images", () => {
    for (const service of services) {
      expect(CATEGORIES).toContain(service.category);
      expect(exists(service.image)).toBe(true);
    }
  });

  it("uses existing gallery images with meaningful alt text", () => {
    for (const item of galleryItems) {
      expect(exists(item.src)).toBe(true);
      expect(item.alt.trim().length).toBeGreaterThan(10);
    }
  });

  it("marks demo profiles and testimonials", () => {
    expect(artists.every((artist) => artist.isDemo)).toBe(true);
    expect(testimonials.every((testimonial) => testimonial.isDemo)).toBe(true);
  });

  it("has unique FAQ ids and artist images", () => {
    expect(new Set(faqs.map((faq) => faq.id)).size).toBe(faqs.length);
    for (const artist of artists) {
      expect(exists(artist.image)).toBe(true);
    }
  });
});
