"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { business } from "@/config/business";
import { BookingStepper } from "@/features/booking/components/booking-stepper";
import { StepCustomer } from "@/features/booking/components/step-customer";
import { StepSchedule } from "@/features/booking/components/step-schedule";
import { StepService } from "@/features/booking/components/step-service";
import { StepSummary } from "@/features/booking/components/step-summary";
import { StepWhatsApp } from "@/features/booking/components/step-whatsapp";
import { actionBarClass } from "@/features/booking/constants";
import { useBookingWizard } from "@/features/booking/hooks/use-booking-wizard";
import type { CustomerFormValues } from "@/features/booking/schemas/booking";
import { isTimeValidForDate } from "@/lib/format/date";
import type { BookingStep, Service } from "@/types/domain";

const ease = [0.22, 1, 0.36, 1] as const;

const STEP_COPY: Record<BookingStep, { title: string; description: string }> = {
  1: {
    title: "Pilih layanan",
    description:
      "Pilih satu treatment yang paling sesuai. Kamu bisa menggantinya sebelum mengirim permintaan.",
  },
  2: {
    title: "Pilih tanggal & waktu",
    description:
      "Tentukan preferensi jadwal. Studio akan mengonfirmasi ketersediaan setelah pesan diterima.",
  },
  3: {
    title: "Data pelanggan",
    description:
      "Kami hanya meminta nama, nomor WhatsApp, dan catatan opsional untuk menyusun pesan.",
  },
  4: {
    title: "Periksa permintaan",
    description:
      "Pastikan layanan, jadwal, dan data sudah benar sebelum melanjutkan ke WhatsApp.",
  },
  5: {
    title: "Lanjutkan ke WhatsApp",
    description:
      "Pesan akan dibuka di WhatsApp. Kamu tetap memegang kendali untuk mengirimnya.",
  },
};

export function BookingWizard({ services }: { services: Service[] }) {
  const searchParams = useSearchParams();
  const {
    step,
    draft,
    selectService,
    setSchedule,
    setTime,
    setCustomer,
    goToStep,
    next,
    back,
    reset,
  } = useBookingWizard();

  const [notice, setNotice] = useState<string | null>(null);
  const preselectionApplied = useRef(false);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const selectedService = useMemo(
    () => services.find((service) => service.id === draft.serviceId),
    [draft.serviceId, services],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: focus heading when the step changes
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    stepHeadingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (preselectionApplied.current) return;
    preselectionApplied.current = true;

    const slug = searchParams.get("service");
    if (!slug) return;

    const match = services.find((service) => service.slug === slug);

    if (match) {
      selectService(match.id);
    } else {
      setNotice(
        "Layanan yang dipilih tidak tersedia. Silakan pilih layanan lain.",
      );
    }
  }, [searchParams, selectService, services]);

  const canContinueSchedule =
    Boolean(selectedService) &&
    Boolean(draft.requestedDate) &&
    Boolean(draft.requestedTime) &&
    Boolean(
      selectedService &&
        draft.requestedDate &&
        draft.requestedTime &&
        isTimeValidForDate(
          draft.requestedDate,
          draft.requestedTime,
          selectedService.durationMinutes,
          business.openingHours,
        ),
    );

  function handleCustomerSubmit(values: CustomerFormValues) {
    setCustomer(values);
    next();
  }

  if (!selectedService && step > 1) {
    return (
      <div className="container-editorial py-20">
        <p className="text-ink-soft">Pilih layanan terlebih dahulu.</p>
        <Button className="mt-4" onClick={() => goToStep(1)}>
          Kembali ke langkah 1
        </Button>
      </div>
    );
  }

  return (
    <div className="container-editorial py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <p className="eyebrow">Booking</p>
          <h1 className="mt-4 max-w-md text-4xl text-ink sm:text-5xl">
            Susun permintaan jadwalmu.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            Lima langkah singkat. Tidak perlu membuat akun, dan data tidak
            disimpan di server.
          </p>

          <div className="mt-8">
            <BookingStepper current={step} />
          </div>

          <p className="mt-6 hidden max-w-xs text-xs leading-relaxed text-ink-soft lg:block">
            Jadwal yang dipilih adalah preferensi. Tim studio akan mengonfirmasi
            ketersediaan melalui WhatsApp.
          </p>
        </aside>

        <div className="rounded-lg border border-line bg-surface p-5 sm:p-7 lg:p-9">
          <div className="mb-7">
            <p className="text-[0.68rem] uppercase tracking-[0.16em] text-ink-soft">
              Langkah {step} dari 5
            </p>
            <h2
              ref={stepHeadingRef}
              tabIndex={-1}
              aria-live="polite"
              style={{ outline: "none" }}
              className="mt-2 font-display text-3xl text-ink outline-none focus:outline-none focus-visible:outline-none sm:text-4xl"
            >
              {STEP_COPY[step].title}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
              {STEP_COPY[step].description}
            </p>
          </div>

          {notice ? (
            <output className="mb-5 block rounded-md border border-warning/30 bg-warning/10 p-3 text-xs leading-relaxed text-ink">
              {notice}
            </output>
          ) : null}

          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={step}
              data-motion-reveal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease }}
            >
              {step === 1 ? (
                <>
                  <StepService
                    services={services}
                    selectedId={draft.serviceId}
                    onSelect={(id) => {
                      selectService(id);
                      setNotice(null);
                    }}
                  />
                  <div className={actionBarClass}>
                    <Button asChild variant="secondary">
                      <Link href="/services">
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Kembali ke layanan
                      </Link>
                    </Button>
                    <div className="flex flex-col items-start gap-2 sm:items-end">
                      <Button onClick={next} disabled={!selectedService}>
                        Lanjutkan
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Button>
                      {!selectedService ? (
                        <p className="text-xs text-ink-soft">
                          Pilih satu layanan untuk melanjutkan.
                        </p>
                      ) : null}
                    </div>
                  </div>
                </>
              ) : null}

              {step === 2 && selectedService ? (
                <>
                  <StepSchedule
                    service={selectedService}
                    date={draft.requestedDate}
                    time={draft.requestedTime}
                    onDateChange={(date) => setSchedule(date)}
                    onTimeChange={setTime}
                  />
                  <div className={actionBarClass}>
                    <Button variant="secondary" onClick={back}>
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                      Kembali
                    </Button>
                    <div className="flex flex-col items-start gap-2 sm:items-end">
                      <Button onClick={next} disabled={!canContinueSchedule}>
                        Lanjutkan
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Button>
                      {!canContinueSchedule ? (
                        <p className="text-xs text-ink-soft">
                          Pilih tanggal dan waktu yang tersedia.
                        </p>
                      ) : null}
                    </div>
                  </div>
                </>
              ) : null}

              {step === 3 ? (
                <StepCustomer
                  draft={draft}
                  onSubmit={handleCustomerSubmit}
                  onBack={back}
                />
              ) : null}

              {step === 4 && selectedService ? (
                <StepSummary
                  service={selectedService}
                  draft={draft}
                  onEdit={(target) => goToStep(target)}
                  onBack={back}
                  onContinue={next}
                />
              ) : null}

              {step === 5 && selectedService ? (
                <StepWhatsApp
                  service={selectedService}
                  draft={draft}
                  onBack={back}
                  onReset={reset}
                />
              ) : null}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
