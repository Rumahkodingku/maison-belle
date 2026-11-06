import { Section } from "@/components/layout/section";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialCard } from "@/features/testimonials/components/testimonial-card";
import { testimonials } from "@/features/testimonials/data/testimonials";

export function TestimonialsSection() {
  return (
    <Section>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Testimoni"
          title="Cerita dari kursi studio."
          description="Kutipan berikut adalah konten contoh untuk menggambarkan pengalaman yang ingin kami hadirkan."
        />
      </div>

      <Stagger className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        {testimonials.map((testimonial) => (
          <StaggerItem key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
