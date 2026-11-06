"use client";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    finished: Promise<void>;
  };
};

export function ThemeToggle({
  showLabel = false,
  className,
}: {
  showLabel?: boolean;
  className?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const transitioning = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const color = resolvedTheme === "dark" ? "#171011" : "#FFF9F6";
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.setAttribute("content", color);
    });
  }, [mounted, resolvedTheme]);

  const isDark = mounted && resolvedTheme === "dark";
  const label = mounted
    ? isDark
      ? "Aktifkan mode terang"
      : "Aktifkan mode gelap"
    : "Ganti tema";

  function handleToggle(event: React.MouseEvent<HTMLButtonElement>) {
    if (!mounted) return;

    const next = isDark ? "light" : "dark";
    const doc = document as ViewTransitionDocument;

    if (reduceMotion || !doc.startViewTransition || transitioning.current) {
      setTheme(next);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const root = document.documentElement;
    root.style.setProperty("--theme-x", `${rect.left + rect.width / 2}px`);
    root.style.setProperty("--theme-y", `${rect.top + rect.height / 2}px`);

    transitioning.current = true;
    const transition = doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    transition.finished.then(
      () => {
        transitioning.current = false;
      },
      () => {
        transitioning.current = false;
      },
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size={showLabel ? "sm" : "icon"}
      onClick={handleToggle}
      aria-label={label}
      title={label}
      className={cn(
        "relative text-ink-soft hover:text-ink",
        showLabel && "justify-start gap-2 px-3",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={isDark ? "sun" : "moon"}
          initial={
            reduceMotion ? false : { opacity: 0, rotate: -20, scale: 0.8 }
          }
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={
            reduceMotion ? undefined : { opacity: 0, rotate: 20, scale: 0.8 }
          }
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Moon className="h-4 w-4" aria-hidden="true" />
          )}
        </m.span>
      </AnimatePresence>
      {showLabel ? (
        <span className="text-xs font-medium">
          {isDark ? "Mode terang" : "Mode gelap"}
        </span>
      ) : null}
    </Button>
  );
}
