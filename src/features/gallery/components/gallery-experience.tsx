"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { CATEGORIES, GALLERY_CATEGORY_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { GalleryCategory, GalleryItem } from "@/types/domain";

type Filter = GalleryCategory | "all";

const ease = [0.22, 1, 0.36, 1] as const;

export function GalleryExperience({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const lastTriggerId = useRef<string | null>(null);
  const reduceMotion = useReducedMotion();

  const filteredItems = useMemo(
    () =>
      filter === "all"
        ? items
        : items.filter((item) => item.category === filter),
    [filter, items],
  );

  const currentItem = openIndex === null ? null : filteredItems[openIndex];

  const filters: Array<{ value: Filter; label: string }> = [
    { value: "all", label: "Semua" },
    ...CATEGORIES.map((category) => ({
      value: category,
      label: GALLERY_CATEGORY_LABELS[category],
    })),
  ];

  function openItem(index: number) {
    const item = filteredItems[index];
    if (!item) return;
    lastTriggerId.current = item.id;
    setOpenIndex(index);
  }

  function closeLightbox() {
    setOpenIndex(null);
    const id = lastTriggerId.current;
    if (id) {
      window.setTimeout(() => triggerRefs.current[id]?.focus(), 0);
    }
  }

  const move = useCallback(
    (direction: 1 | -1) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (
          (current + direction + filteredItems.length) % filteredItems.length
        );
      });
    },
    [filteredItems.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, move]);

  return (
    <div>
      <fieldset className="flex flex-wrap gap-2 border-0 pb-2">
        <legend className="sr-only">Filter kategori galeri</legend>
        {filters.map((item) => {
          const active = filter === item.value;
          return (
            <m.button
              key={item.value}
              type="button"
              aria-pressed={active}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setFilter(item.value);
                setOpenIndex(null);
              }}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                active
                  ? "border-action bg-action-fill text-on-action"
                  : "border-line-strong text-ink-soft hover:border-ink hover:text-ink",
              )}
            >
              {item.label}
            </m.button>
          );
        })}
      </fieldset>

      {filteredItems.length > 0 ? (
        <div
          data-motion-reveal
          className="mt-8 columns-2 gap-3 md:columns-3 lg:columns-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <m.button
                key={item.id}
                type="button"
                layout
                initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                whileHover={reduceMotion ? undefined : { scale: 1.01 }}
                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                transition={{ duration: 0.3, ease }}
                ref={(node) => {
                  triggerRefs.current[item.id] = node;
                }}
                onClick={() => openItem(index)}
                className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-sm bg-blush text-left"
                aria-label={`Buka gambar: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="h-auto w-full object-cover"
                />
              </m.button>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="mt-10 rounded-lg border border-dashed border-line-strong bg-blush/30 p-10 text-center">
          <p className="font-display text-2xl text-ink">
            Belum ada gambar di kategori ini.
          </p>
          <m.button
            type="button"
            onClick={() => setFilter("all")}
            whileHover={{ x: 2 }}
            className="mt-3 text-sm font-medium text-action underline underline-offset-4"
          >
            Tampilkan semua gambar
          </m.button>
        </div>
      )}

      <Dialog
        open={openIndex !== null}
        onOpenChange={(open) => !open && closeLightbox()}
      >
        <DialogContent
          showCloseButton={false}
          className="h-[100dvh] w-screen max-w-none overflow-hidden rounded-none border-none bg-deep p-0 text-ivory"
        >
          <DialogTitle className="sr-only">
            {currentItem?.caption ?? "Galeri Maison Belle"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Gunakan tombol panah kiri dan kanan untuk berpindah gambar. Tekan
            Escape untuk menutup.
          </DialogDescription>

          {currentItem ? (
            <div className="flex h-full w-full min-w-0 flex-col">
              <div className="flex w-full items-center justify-between gap-4 border-b border-ivory/15 px-4 py-3 sm:px-6">
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.18em] text-ivory/70">
                    Galeri Maison Belle
                  </p>
                  <p
                    aria-live="polite"
                    className="mt-1 text-xs tabular-nums text-ivory/75"
                  >
                    Gambar {openIndex !== null ? openIndex + 1 : 0} dari{" "}
                    {filteredItems.length}
                  </p>
                </div>
                <m.button
                  type="button"
                  onClick={closeLightbox}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:bg-ivory/10"
                  aria-label="Tutup galeri"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </m.button>
              </div>

              <div className="relative flex min-h-0 flex-1 items-center justify-center bg-deep p-3 sm:p-8">
                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={currentItem.id}
                    initial={
                      reduceMotion ? false : { opacity: 0, scale: 0.985 }
                    }
                    animate={
                      reduceMotion ? undefined : { opacity: 1, scale: 1 }
                    }
                    exit={
                      reduceMotion ? undefined : { opacity: 0, scale: 1.01 }
                    }
                    transition={{ duration: 0.25, ease }}
                    className="flex h-full w-full min-w-0 items-center justify-center"
                  >
                    <Image
                      src={currentItem.src}
                      alt={currentItem.alt}
                      width={currentItem.width}
                      height={currentItem.height}
                      sizes="92vw"
                      className="h-auto max-h-[58vh] w-auto max-w-full object-contain sm:max-h-[64vh]"
                    />
                  </m.div>
                </AnimatePresence>

                <m.button
                  type="button"
                  onClick={() => move(-1)}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ opacity: 0.7 }}
                  className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 bg-deep/30 text-ivory backdrop-blur-sm sm:flex"
                  aria-label="Gambar sebelumnya"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </m.button>
                <m.button
                  type="button"
                  onClick={() => move(1)}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ opacity: 0.7 }}
                  className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 bg-deep/30 text-ivory backdrop-blur-sm sm:flex"
                  aria-label="Gambar berikutnya"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </m.button>
              </div>

              <div className="border-t border-ivory/15 px-4 py-3 sm:px-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-xl text-ivory">
                      {currentItem.caption ?? "Maison Belle"}
                    </p>
                    <p className="mt-1 text-xs text-ivory/70">
                      {GALLERY_CATEGORY_LABELS[currentItem.category]}
                    </p>
                  </div>
                  <div className="flex gap-2 sm:hidden">
                    <m.button
                      type="button"
                      onClick={() => move(-1)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 text-ivory"
                      aria-label="Gambar sebelumnya"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </m.button>
                    <m.button
                      type="button"
                      onClick={() => move(1)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 text-ivory"
                      aria-label="Gambar berikutnya"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </m.button>
                  </div>
                </div>

                <div className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
                  {filteredItems.map((item, index) => (
                    <m.button
                      key={item.id}
                      type="button"
                      onClick={() => setOpenIndex(index)}
                      aria-pressed={index === openIndex}
                      aria-label={`Tampilkan ${item.caption ?? item.alt}`}
                      whileHover={{ scale: 1.05, opacity: 1 }}
                      whileTap={{ scale: 0.97 }}
                      className={cn(
                        "relative h-14 w-14 shrink-0 overflow-hidden rounded-sm border-2",
                        index === openIndex
                          ? "border-dusty opacity-100"
                          : "border-transparent opacity-55",
                      )}
                    >
                      <Image
                        src={item.src}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </m.button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
