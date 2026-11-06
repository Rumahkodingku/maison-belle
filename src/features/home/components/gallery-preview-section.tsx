import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeading } from "@/components/shared/section-heading";
import { getGalleryPreview } from "@/features/gallery/data/gallery";

export function GalleryPreviewSection() {
  const items = getGalleryPreview(6);

  return (
    <Section>
      <SectionHeading
        eyebrow="Galeri"
        title="Detail yang berbicara lebih dulu."
        description="Campuran potret, tekstur, dan detail treatment dari studio."
        actionLabel="Buka galeri"
        actionHref="/gallery"
      />

      <Stagger className="mt-12 columns-2 gap-3 md:columns-3">
        {items.map((item) => (
          <StaggerItem key={item.id} hover className="mb-3 break-inside-avoid">
            <Link
              href="/gallery"
              className="group block overflow-hidden rounded-sm bg-blush"
              aria-label={`Lihat galeri: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="h-auto w-full object-cover"
              />
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
