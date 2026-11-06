import { Section } from "@/components/layout/section";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/features/services/components/service-card";
import { getFeaturedServicePerCategory } from "@/features/services/data/services";

export function FeaturedServicesSection() {
  const services = getFeaturedServicePerCategory();

  return (
    <Section tone="blush">
      <SectionHeading
        eyebrow="Layanan pilihan"
        title="Mulai dari yang paling kamu butuhkan."
        description="Empat kategori, masing-masing dengan treatment yang bisa disesuaikan bersama artist."
        actionLabel="Lihat semua layanan"
        actionHref="/services"
      />
      <Stagger className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <StaggerItem key={service.id}>
            <ServiceCard service={service} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
