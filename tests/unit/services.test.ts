import { describe, expect, it } from "vitest";
import {
  getActiveServices,
  getFeaturedServicePerCategory,
  getFeaturedServices,
  getServiceById,
  getServiceBySlug,
  getServicesByCategory,
} from "@/features/services/data/services";

describe("service data", () => {
  it("exposes only active services to the public catalog", () => {
    const active = getActiveServices();
    expect(active).toHaveLength(12);
    expect(active.every((service) => service.isActive)).toBe(true);
    expect(getServiceBySlug("scalp-treatment")).toBeUndefined();
  });

  it("filters by category and featured state", () => {
    expect(getServicesByCategory("nails")).toHaveLength(3);
    expect(getFeaturedServices().length).toBeGreaterThanOrEqual(4);
    expect(getFeaturedServicePerCategory()).toHaveLength(4);
  });

  it("looks up services by stable id and slug", () => {
    expect(getServiceById("svc-nail-art")?.slug).toBe("gel-polish-nail-art");
    expect(getServiceBySlug("gel-polish")?.name).toBe("Gel Polish");
  });
});
