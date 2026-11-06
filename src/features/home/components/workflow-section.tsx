import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { HoverLink } from "@/components/motion/hover-link";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

const steps = [
  {
    number: "01",
    title: "Konsultasi",
    copy: "Ceritakan rutinitas, referensi, dan hasil yang kamu inginkan. Artist akan membantu membaca kebutuhanmu.",
  },
  {
    number: "02",
    title: "Treatment",
    copy: "Detail layanan disesuaikan dengan kondisi dan kenyamananmu—bukan template yang sama untuk semua orang.",
  },
  {
    number: "03",
    title: "Konfirmasi",
    copy: "Setelah permintaan dikirim, studio memeriksa ketersediaan dan mengonfirmasi jadwal melalui WhatsApp.",
  },
];

export function WorkflowSection() {
  return (
    <Section className="border-y border-line">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <div>
          <p className="eyebrow">Cara kami bekerja</p>
          <h2 className="mt-4 max-w-md text-4xl text-ink sm:text-5xl">
            Tiga langkah, satu pengalaman yang terasa personal.
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-ink-soft">
            Dari percakapan pertama sampai konfirmasi jadwal, semuanya dibuat
            jelas dan tanpa tekanan.
          </p>
          <HoverLink
            href="/booking"
            className="link-draw mt-8 inline-flex items-center gap-2 pb-1 text-sm font-medium text-ink"
          >
            Mulai dari konsultasi
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </HoverLink>
        </div>

        <Stagger className="grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <StaggerItem
              key={step.number}
              hover
              className="border-t border-line-strong/45 pt-5"
            >
              <p className="workflow-number font-display text-4xl text-action/35">
                {step.number}
              </p>
              <h3 className="mt-6 font-display text-2xl text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {step.copy}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
