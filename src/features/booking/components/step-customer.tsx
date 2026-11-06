"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { actionBarClass } from "@/features/booking/constants";
import {
  type CustomerFormValues,
  customerSchema,
} from "@/features/booking/schemas/booking";
import type { BookingDraft } from "@/types/domain";

export function StepCustomer({
  draft,
  onSubmit,
  onBack,
}: {
  draft: BookingDraft;
  onSubmit: (values: CustomerFormValues) => void;
  onBack: () => void;
}) {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      customerName: draft.customerName,
      customerPhone: draft.customerPhone,
      notes: draft.notes,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const notes = form.watch("notes") ?? "";
  const { errors, isValid } = form.formState;

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div>
        <Label htmlFor="customerName">
          Nama lengkap <span className="text-action">*</span>
        </Label>
        <Input
          id="customerName"
          autoComplete="name"
          placeholder="Nama yang bisa kami sapa"
          className="mt-2"
          aria-invalid={Boolean(errors.customerName)}
          aria-describedby={
            errors.customerName ? "customerName-error" : undefined
          }
          {...form.register("customerName")}
        />
        {errors.customerName ? (
          <p
            id="customerName-error"
            role="alert"
            className="mt-2 text-xs text-error"
          >
            {errors.customerName.message}
          </p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="customerPhone">
          Nomor WhatsApp <span className="text-action">*</span>
        </Label>
        <Input
          id="customerPhone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0812 3456 7890"
          className="mt-2"
          aria-invalid={Boolean(errors.customerPhone)}
          aria-describedby={
            errors.customerPhone
              ? "customerPhone-help customerPhone-error"
              : "customerPhone-help"
          }
          {...form.register("customerPhone")}
        />
        <p id="customerPhone-help" className="mt-2 text-xs text-ink-soft">
          Format Indonesia: 08…, +62…, atau 62…. Nomor hanya dipakai untuk pesan
          WhatsApp.
        </p>
        {errors.customerPhone ? (
          <p
            id="customerPhone-error"
            role="alert"
            className="mt-2 text-xs text-error"
          >
            {errors.customerPhone.message}
          </p>
        ) : null}
      </div>

      <div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="notes">Catatan tambahan</Label>
          <span className="text-xs tabular-nums text-ink-soft">
            {notes.length}/500
          </span>
        </div>
        <Textarea
          id="notes"
          placeholder="Referensi warna, alergi, atau preferensi artist…"
          className="mt-2"
          maxLength={500}
          aria-invalid={Boolean(errors.notes)}
          aria-describedby={errors.notes ? "notes-error" : "notes-help"}
          {...form.register("notes")}
        />
        <p id="notes-help" className="mt-2 text-xs text-ink-soft">
          Opsional. Jangan tuliskan data sensitif yang tidak diperlukan.
        </p>
        {errors.notes ? (
          <p id="notes-error" role="alert" className="mt-2 text-xs text-error">
            {errors.notes.message}
          </p>
        ) : null}
      </div>

      <div className={actionBarClass}>
        <Button type="button" variant="secondary" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali
        </Button>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <Button type="submit" disabled={!isValid}>
            Lihat ringkasan
          </Button>
          {!isValid ? (
            <p className="text-xs text-ink-soft">
              Lengkapi nama dan nomor WhatsApp yang valid untuk melanjutkan.
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
