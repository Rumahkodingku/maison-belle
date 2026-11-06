import type { Metadata } from "next";
import { AboutPreviewSection } from "@/features/home/components/about-preview-section";
import { ArtistsPreviewSection } from "@/features/home/components/artists-preview-section";
import { BookingCtaSection } from "@/features/home/components/booking-cta-section";
import { ContactPreviewSection } from "@/features/home/components/contact-preview-section";
import { FaqSection } from "@/features/home/components/faq-section";
import { FeaturedServicesSection } from "@/features/home/components/featured-services-section";
import { FeaturedTreatmentSection } from "@/features/home/components/featured-treatment-section";
import { GalleryPreviewSection } from "@/features/home/components/gallery-preview-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { PricingHighlightsSection } from "@/features/home/components/pricing-highlights-section";
import { TestimonialsSection } from "@/features/home/components/testimonials-section";
import { TrustSection } from "@/features/home/components/trust-section";
import { WorkflowSection } from "@/features/home/components/workflow-section";
import { getCanonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...getCanonical("/"),
  title: "Beauty Studio Premium",
  description:
    "Jelajahi layanan hair, nails, makeup, dan lash & brow di Maison Belle. Lihat estimasi harga dan ajukan appointment melalui WhatsApp.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <FeaturedServicesSection />
      <FeaturedTreatmentSection />
      <AboutPreviewSection />
      <WorkflowSection />
      <GalleryPreviewSection />
      <ArtistsPreviewSection />
      <PricingHighlightsSection />
      <TestimonialsSection />
      <FaqSection />
      <BookingCtaSection />
      <ContactPreviewSection />
    </>
  );
}
