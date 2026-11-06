"use client";

import { Check } from "lucide-react";
import { m } from "motion/react";
import { BOOKING_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { BookingStep } from "@/types/domain";

export function BookingStepper({ current }: { current: BookingStep }) {
  return (
    <nav aria-label="Langkah booking">
      <div aria-hidden="true" className="mb-4 h-px w-full bg-line lg:mb-5">
        <m.div
          className="h-px origin-left bg-action"
          animate={{ scaleX: (current - 1) / 4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <ol className="grid gap-2 sm:grid-cols-5 lg:grid-cols-1 lg:gap-1">
        {BOOKING_STEPS.map((step) => {
          const active = current === step.number;
          const complete = current > step.number;
          return (
            <li key={step.number}>
              <m.div
                aria-current={active ? "step" : undefined}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.18 }}
                className={cn(
                  "flex items-center gap-3 border-b border-line py-3 text-sm transition-colors lg:border-b-0",
                  active ? "text-ink" : "text-ink-soft",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs tabular-nums",
                    active && "border-action bg-action-fill text-on-action",
                    complete && "border-action/30 bg-action/10 text-action",
                    !active && !complete && "border-line-strong",
                  )}
                >
                  {complete ? (
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    step.number
                  )}
                </span>
                <span
                  className={cn(
                    "flex flex-col leading-tight",
                    active && "font-medium",
                  )}
                >
                  <span className="text-[0.62rem] uppercase tracking-[0.16em] text-ink-soft">
                    Langkah {step.number}
                  </span>
                  <span>{step.label}</span>
                </span>
              </m.div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
