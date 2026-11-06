"use client";

import { useState } from "react";
import type { CustomerFormValues } from "@/features/booking/schemas/booking";
import type { BookingDraft, BookingStep } from "@/types/domain";

const initialDraft: BookingDraft = {
  customerName: "",
  customerPhone: "",
  notes: "",
};

export function useBookingWizard() {
  const [step, setStep] = useState<BookingStep>(1);
  const [draft, setDraft] = useState<BookingDraft>(initialDraft);

  function selectService(serviceId: string) {
    setDraft((current) => ({
      ...current,
      serviceId,
      requestedTime:
        current.serviceId === serviceId ? current.requestedTime : undefined,
    }));
  }

  function setSchedule(requestedDate: string, requestedTime?: string) {
    setDraft((current) => ({
      ...current,
      requestedDate,
      requestedTime,
    }));
  }

  function setTime(requestedTime: string) {
    setDraft((current) => ({ ...current, requestedTime }));
  }

  function setCustomer(values: CustomerFormValues) {
    setDraft((current) => ({
      ...current,
      customerName: values.customerName,
      customerPhone: values.customerPhone,
      notes: values.notes,
    }));
  }

  function goToStep(nextStep: BookingStep) {
    setStep(nextStep);
  }

  function next() {
    setStep((current) =>
      current < 5 ? ((current + 1) as BookingStep) : current,
    );
  }

  function back() {
    setStep((current) =>
      current > 1 ? ((current - 1) as BookingStep) : current,
    );
  }

  function reset() {
    setDraft(initialDraft);
    setStep(1);
  }

  return {
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
  };
}
