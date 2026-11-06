import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { HoverLink } from "@/components/motion/hover-link";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeading } from "@/components/shared/section-heading";
import { getServicesByCategory } from "@/features/services/data/services";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/constants";
import { formatCurrency } from "@/lib/format/currency";

export function PricingHighlightsSection() {
  const rows = CATEGORIES.map((category) => {
    const services = getServicesByCategory(category);
    const minPrice = Math.min(...services.map((service) => service.price));
    return { category, minPrice };
  }).filter((row) => Number.isFinite(row.minPrice));

  return (
    <Section tone="blush">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Panduan harga"
            title="Harga yang bisa kamu perkirakan."
            description="Harga layanan dimulai dari angka di bawah. Detail dan harga final akan dikonfirmasi studio sebelum appointment."
          />
          <p className="mt-6 max-w-sm text-xs leading-relaxed text-ink-soft">
            Semua harga adalah konten contoh untuk showcase. Layanan dengan
            label “Mulai dari” dapat berubah sesuai detail treatment.
          </p>
        </div>

        <div>
          <Stagger className="border-t border-line-strong/50">
            {rows.map((row) => (
              <StaggerItem key={row.category} hover>
                <HoverLink
                  href="/services"
                  className="group flex items-center justify-between gap-6 border-b border-line-strong/40 py-5"
                >
                  <span className="font-display text-2xl text-ink group-hover:text-action">
                    {CATEGORY_LABELS[row.category]}
                  </span>
                  <span className="flex items-center gap-4 text-sm text-ink-soft">
                    <span className="text-xs uppercase tracking-[0.14em]">
                      Mulai dari
                    </span>
                    <span className="min-w-24 text-right text-base font-medium tabular-nums text-ink">
                      {formatCurrency(row.minPrice)}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-ink-soft group-hover:text-action"
                      aria-hidden="true"
                    />
                  </span>
                </HoverLink>
              </StaggerItem>
            ))}
          </Stagger>
          <HoverLink
            href="/services"
            className="mt-8 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-sm font-medium text-ink transition-colors hover:border-action hover:text-action"
          >
            Bandingkan semua layanan
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </HoverLink>
        </div>
      </div>
    </Section>
  );
}
