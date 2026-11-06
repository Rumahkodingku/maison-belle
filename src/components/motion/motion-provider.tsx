"use client";

import { LazyMotion, MotionConfig } from "motion/react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion
      features={() =>
        import("@/components/motion/features").then((module) => module.default)
      }
      strict
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
