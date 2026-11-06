import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BookingStepper } from "@/features/booking/components/booking-stepper";

describe("booking stepper", () => {
  it("marks the current step for assistive technology", () => {
    render(<BookingStepper current={2} />);

    const current = screen.getByText("Jadwal").closest("[aria-current]");
    expect(current).toHaveAttribute("aria-current", "step");
    expect(screen.getByText("Layanan")).toBeInTheDocument();
    expect(screen.getByText("Ringkasan")).toBeInTheDocument();
  });
});
