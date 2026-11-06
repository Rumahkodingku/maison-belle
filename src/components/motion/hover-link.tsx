"use client";

import { m } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HoverLink({
  href,
  children,
  className,
  wrapperClassName,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  ariaLabel?: string;
}) {
  return (
    <m.span
      className={cn("inline-block", wrapperClassName)}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <Link href={href} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    </m.span>
  );
}
