import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StepSummary } from "@/features/booking/components/step-summary";
import { getServiceBySlug } from "@/features/services/data/services";

const service = getServiceBySlug("gel-polish-nail-art");

describe("booking summary", () => {
  it("renders the selected service, schedule, and customer data", () => {
    if (!service) throw new Error("Test service missing");

    render(
      <StepSummary
        service={service}
        draft={{
          serviceId: service.id,
          requestedDate: "2026-11-10",
          requestedTime: "14:00",
          customerName: "Amanda Putri",
          customerPhone: "6281234567890",
          notes: "Nail art nude minimalis.",
        }}
        onEdit={vi.fn()}
        onBack={vi.fn()}
        onContinue={vi.fn()}
      />,
    );

    expect(screen.getByText("Gel Polish + Nail Art")).toBeInTheDocument();
    expect(screen.getByText("10 November 2026")).toBeInTheDocument();
    expect(screen.getByText("14.00 WIB")).toBeInTheDocument();
    expect(screen.getByText("Amanda Putri")).toBeInTheDocument();
    expect(screen.getByText("0812-3456-7890")).toBeInTheDocument();
    expect(screen.getByText("Mulai dari Rp250.000")).toBeInTheDocument();
    expect(screen.getByText("Nail art nude minimalis.")).toBeInTheDocument();
  });
});
