import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ServiceCatalog } from "@/features/services/components/service-catalog";
import { getActiveServices } from "@/features/services/data/services";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // biome-ignore lint/performance/noImgElement: test double for next/image
    <img src={src} alt={alt} />
  ),
}));

describe("service catalog filter", () => {
  it("shows all services initially and filters by category", async () => {
    const user = userEvent.setup();
    render(<ServiceCatalog services={getActiveServices()} />);

    expect(screen.getByText("Signature Hair Spa")).toBeInTheDocument();
    expect(screen.getByText("Gel Polish")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Nails" }));

    expect(screen.getByText("Gel Polish")).toBeInTheDocument();
    expect(screen.queryByText("Signature Hair Spa")).not.toBeInTheDocument();
  });
});
