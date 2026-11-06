"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { FaqItem } from "@/types/domain";

const ease = [0.22, 1, 0.36, 1] as const;

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div key={item.id}>
            <m.button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId(open ? null : item.id)}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.18 }}
              className="flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left"
            >
              <span className="flex flex-col gap-2">
                <span className="text-base font-medium text-ink">
                  {item.question}
                </span>
              </span>
              <m.span
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.25, ease }}
                className="mt-1 shrink-0 text-ink-soft"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </m.span>
            </m.button>

            <AnimatePresence initial={false}>
              {open ? (
                <m.div
                  id={panelId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-5 pr-8 text-sm leading-relaxed text-ink-soft">
                    {item.answer}
                  </p>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
