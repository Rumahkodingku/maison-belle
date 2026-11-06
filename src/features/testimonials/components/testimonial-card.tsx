"use client";

import { m } from "motion/react";
import type { Testimonial } from "@/types/domain";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <m.blockquote
      className="flex h-full flex-col border-t border-line-strong/40 pt-6"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    >
      <span
        aria-hidden="true"
        className="font-display text-5xl leading-none text-dusty"
      >
        “
      </span>
      <p className="mt-2 flex-1 font-display text-2xl leading-snug text-ink">
        {testimonial.quote}
      </p>
      <footer className="mt-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-ink">
            {testimonial.customerDisplayName}
          </p>
          <p className="mt-0.5 text-xs text-ink-soft">
            {testimonial.serviceLabel}
          </p>
        </div>
      </footer>
    </m.blockquote>
  );
}
