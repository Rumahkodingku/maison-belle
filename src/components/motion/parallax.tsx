"use client";

import { m, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function Parallax({
  children,
  className,
  range = 22,
  scaleRange = 0,
}: {
  children: ReactNode;
  className?: string;
  range?: number;
  scaleRange?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1 + scaleRange, 1],
  );

  return (
    <m.div
      ref={ref}
      data-parallax
      className={cn(className)}
      style={{ y, scale }}
    >
      {children}
    </m.div>
  );
}
