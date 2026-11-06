"use client";

import { ArrowUpRight } from "lucide-react";
import { m } from "motion/react";
import Image from "next/image";
import { HoverLink } from "@/components/motion/hover-link";
import type { Artist } from "@/types/domain";

export function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <m.article
      className="group flex h-full flex-col"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    >
      <div className="relative aspect-3/4 overflow-hidden rounded-sm bg-blush">
        <m.div
          className="absolute inset-0"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={artist.image}
            alt={`Potret ${artist.name}, ${artist.role} Maison Belle`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </m.div>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl text-ink">{artist.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-action">
              {artist.role}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink-soft">
          {artist.bio}
        </p>
        <p className="mt-4 text-xs text-ink-soft">
          {artist.specialties.join(" · ")}
        </p>
        <HoverLink
          href="/booking"
          className="mt-5 inline-flex w-fit items-center gap-1 border-b border-ink/25 pb-0.5 text-xs font-medium text-ink transition-colors hover:border-action hover:text-action"
        >
          Diskusikan preferensi
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </HoverLink>
      </div>
    </m.article>
  );
}
