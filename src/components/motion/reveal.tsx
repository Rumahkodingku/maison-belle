"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  variant?: "fade" | "clip";
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  variant = "fade",
}: RevealProps) {
  return (
    <m.div
      data-motion-reveal
      className={cn(className)}
      initial={
        variant === "clip"
          ? { opacity: 0, clipPath: "inset(0 0 100% 0)" }
          : { opacity: 0, y }
      }
      whileInView={
        variant === "clip"
          ? { opacity: 1, clipPath: "inset(0 0 0% 0)" }
          : { opacity: 1, y: 0 }
      }
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: variant === "clip" ? 0.9 : 0.6,
        delay,
        ease,
      }}
    >
      {children}
    </m.div>
  );
}
