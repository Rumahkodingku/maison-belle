import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { HoverLink } from "@/components/motion/hover-link";
import { ContactDetails } from "@/features/contact/components/contact-details";

export function ContactPreviewSection() {
  return (
    <Section id="contact">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="eyebrow">Kunjungi studio</p>
          <h2 className="mt-4 max-w-lg text-4xl text-ink sm:text-5xl">
            Datang, duduk, ceritakan.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
            Informasi alamat dan jam di bawah adalah konten demo. Untuk
            kebutuhan nyata, konfirmasikan lokasi dan jadwal melalui WhatsApp.
          </p>
          <HoverLink
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-sm font-medium text-ink transition-colors hover:border-action hover:text-action"
          >
            Buka halaman kontak
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </HoverLink>
        </div>

        <div className="rounded-lg border border-line bg-surface p-6 sm:p-8">
          <ContactDetails compact />
        </div>
      </div>
    </Section>
  );
}
