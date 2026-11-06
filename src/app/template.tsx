"use client";

import { m } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      data-page-transition
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
