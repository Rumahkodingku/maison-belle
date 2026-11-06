import { z } from "zod";
import {
  isPastDate,
  isValidDateString,
  isValidTimeString,
} from "@/lib/format/date";
import { isValidIndonesianPhone } from "@/lib/format/phone";

const nameSchema = z
  .string()
  .trim()
  .min(2, "Nama minimal 2 karakter.")
  .max(80, "Nama maksimal 80 karakter.");

const phoneSchema = z
  .string()
  .trim()
  .min(1, "Nomor WhatsApp wajib diisi.")
  .refine(
    isValidIndonesianPhone,
    "Gunakan nomor Indonesia yang valid, misalnya 0812 3456 7890.",
  );

const notesSchema = z
  .string()
  .trim()
  .max(500, "Catatan maksimal 500 karakter.");

export const serviceStepSchema = z.object({
  serviceId: z.string().min(1, "Pilih satu layanan."),
});

export const scheduleStepSchema = z.object({
  requestedDate: z
    .string()
    .refine(isValidDateString, "Pilih tanggal yang valid.")
    .refine((value) => !isPastDate(value), "Tanggal sudah lewat."),
  requestedTime: z
    .string()
    .refine(isValidTimeString, "Pilih waktu yang valid."),
});

export const customerSchema = z.object({
  customerName: nameSchema,
  customerPhone: phoneSchema,
  notes: notesSchema,
});

export const bookingRequestSchema = z.object({
  serviceId: z.string().min(1),
  requestedDate: z.string().refine(isValidDateString),
  requestedTime: z.string().refine(isValidTimeString),
  customerName: nameSchema,
  customerPhone: phoneSchema,
  notes: notesSchema.optional(),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
export type BookingRequestValues = z.infer<typeof bookingRequestSchema>;
