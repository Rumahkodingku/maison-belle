import { HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

const values = [
  {
    icon: HeartHandshake,
    title: "Care",
    copy: "Setiap treatment dimulai dengan percakapan tentang kebutuhan dan kenyamananmu.",
  },
  {
    icon: Sparkles,
    title: "Craft",
    copy: "Detail kecil dikerjakan dengan sabar oleh artist yang memahami bidangnya.",
  },
  {
    icon: ShieldCheck,
    title: "Clarity",
    copy: "Harga, durasi, dan status permintaan jadwal disampaikan dengan jelas.",
  },
];

export function TrustSection() {
  return (
    <Section className="border-y border-line py-14 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow">Pendekatan kami</p>
          <h2 className="mt-4 max-w-md text-3xl text-ink sm:text-4xl">
            Perawatan yang terasa personal, bukan transaksi cepat.
          </h2>
        </div>
        <Stagger className="grid gap-8 sm:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <StaggerItem
                key={value.title}
                hover
                className="border-t border-line-strong/40 pt-5"
              >
                <Icon className="h-5 w-5 text-action" aria-hidden="true" />
                <h3 className="mt-4 font-display text-2xl text-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {value.copy}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
