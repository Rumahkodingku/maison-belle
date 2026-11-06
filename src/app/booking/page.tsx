import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingWizard } from "@/features/booking/components/booking-wizard";
import { getActiveServices } from "@/features/services/data/services";
import { getCanonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...getCanonical("/booking"),
  title: "Permintaan Appointment",
  description:
    "Susun permintaan appointment Maison Belle dalam lima langkah dan lanjutkan ke WhatsApp.",
};

export default function BookingPage() {
  const services = getActiveServices();

  return (
    <Suspense
      fallback={
        <div className="container-editorial py-20">
          <p className="text-sm text-ink-soft">Memuat alur booking…</p>
        </div>
      }
    >
      <BookingWizard services={services} />
    </Suspense>
  );
}
