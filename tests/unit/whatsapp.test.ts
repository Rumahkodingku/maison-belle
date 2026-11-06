import { describe, expect, it } from "vitest";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/features/booking/utils/whatsapp";
import { getServiceBySlug } from "@/features/services/data/services";
import type { BookingRequest } from "@/types/domain";

const request: BookingRequest = {
  serviceId: "svc-nail-art",
  requestedDate: "2026-11-10",
  requestedTime: "14:00",
  customerName: "Amanda Putri",
  customerPhone: "6281234567890",
  notes: "Nail art nude minimalis.",
};

describe("WhatsApp handoff", () => {
  it("builds a complete Indonesian message with a starting price", () => {
    const service = getServiceBySlug("gel-polish-nail-art");
    if (!service) throw new Error("Test service missing");

    const message = buildWhatsAppMessage({ request, service });

    expect(message).toContain("Gel Polish + Nail Art");
    expect(message).toContain("Mulai dari Rp250.000");
    expect(message).toContain("10 November 2026");
    expect(message).toContain("14.00 WIB");
    expect(message).toContain("Amanda Putri");
    expect(message).toContain("0812-3456-7890");
    expect(message).toContain("Nail art nude minimalis.");
    expect(message).toContain("Mohon konfirmasi ketersediaan");
  });

  it("keeps fixed prices as fixed in the message", () => {
    const service = getServiceBySlug("gel-polish");
    if (!service) throw new Error("Test service missing");
    const message = buildWhatsAppMessage({
      request: { ...request, serviceId: "svc-gel-polish", notes: undefined },
      service,
    });

    expect(message).toContain("Harga: Rp150.000");
    expect(message).not.toContain("Mulai dari");
    expect(message).toContain("Catatan: -");
  });

  it("encodes the message and rejects invalid numbers", () => {
    const service = getServiceBySlug("gel-polish-nail-art");
    if (!service) throw new Error("Test service missing");
    const message = buildWhatsAppMessage({ request, service });
    const url = buildWhatsAppUrl("6281234567890", message);

    expect(url).toBeTruthy();
    const urlValue = url ?? "";
    expect(urlValue.startsWith("https://wa.me/6281234567890?text=")).toBe(true);
    expect(decodeURIComponent(urlValue.split("text=")[1])).toBe(message);
    expect(buildWhatsAppUrl(null, message)).toBeNull();
    expect(buildWhatsAppUrl("12345", message)).toBeNull();
  });
});
