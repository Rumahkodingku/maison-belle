import { Section } from "@/components/layout/section";
import { FaqAccordion } from "@/features/faq/components/faq-accordion";
import { faqs } from "@/features/faq/data/faqs";

export function FaqSection() {
  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-4 text-4xl text-ink sm:text-5xl">
            Sebelum kamu datang.
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-ink-soft">
            Beberapa hal yang sering ditanyakan tentang layanan, jadwal, dan
            proses permintaan appointment.
          </p>
        </div>
        <FaqAccordion items={faqs} />
      </div>
    </Section>
  );
}
