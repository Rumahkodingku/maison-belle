import { Section } from "@/components/layout/section";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeading } from "@/components/shared/section-heading";
import { ArtistCard } from "@/features/artists/components/artist-card";
import { artists } from "@/features/artists/data/artists";

export function ArtistsPreviewSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Artist"
        title="Tangan-tangan di balik detail."
        description="Profil artist demo yang mewakili spesialisasi hair, nails, dan makeup di Maison Belle."
        actionLabel="Kenali artist"
        actionHref="/about#artists"
      />
      <Stagger className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {artists.map((artist) => (
          <StaggerItem key={artist.id}>
            <ArtistCard artist={artist} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
