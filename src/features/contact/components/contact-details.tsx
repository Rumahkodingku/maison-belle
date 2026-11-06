import { Clock, MapPin, MessageCircle } from "lucide-react";
import { HoverLink } from "@/components/motion/hover-link";
import { Button } from "@/components/ui/button";
import { business } from "@/config/business";
import { WEEKDAY_LABELS, WEEKDAY_ORDER } from "@/lib/constants";
import { formatTimeDisplay } from "@/lib/format/date";

function getHoursSummary() {
  const openDays = WEEKDAY_ORDER.filter((day) => business.openingHours[day]);

  if (openDays.length === 0) return "Jam operasional belum dikonfigurasi.";

  const first = business.openingHours[openDays[0]];
  const last = business.openingHours[openDays[openDays.length - 1]];
  const sameHours =
    first && last && first.open === last.open && first.close === last.close;

  if (!sameHours) return null;

  return `${WEEKDAY_LABELS[openDays[0]]}–${WEEKDAY_LABELS[openDays[openDays.length - 1]]}, ${formatTimeDisplay(first.open)}–${formatTimeDisplay(first.close)} WIB`;
}

export function ContactDetails({ compact = false }: { compact?: boolean }) {
  const summary = getHoursSummary();

  return (
    <div className={compact ? "space-y-5" : "grid gap-10 sm:grid-cols-2"}>
      <div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-action" aria-hidden="true" />
          <h3 className="text-sm font-medium text-ink">Studio</h3>
        </div>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
          {business.address}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-action" aria-hidden="true" />
          <h3 className="text-sm font-medium text-ink">Jam operasional</h3>
        </div>
        {summary ? (
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {summary}
          </p>
        ) : (
          <div className="mt-3 space-y-1 text-sm text-ink-soft">
            {WEEKDAY_ORDER.map((day) => {
              const hours = business.openingHours[day];
              return (
                <p key={day} className="flex justify-between gap-6">
                  <span>{WEEKDAY_LABELS[day]}</span>
                  <span>
                    {hours
                      ? `${formatTimeDisplay(hours.open)}–${formatTimeDisplay(hours.close)}`
                      : "Tutup"}
                  </span>
                </p>
              );
            })}
          </div>
        )}
        {!compact ? (
          <p className="mt-3 text-xs text-ink-soft">
            Waktu Indonesia Barat (WIB). Jadwal akhir dikonfirmasi melalui
            WhatsApp.
          </p>
        ) : null}
      </div>

      {!compact ? (
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-action" aria-hidden="true" />
            <h3 className="text-sm font-medium text-ink">WhatsApp</h3>
          </div>
          {business.whatsappNumber ? (
            <Button asChild variant="whatsapp" className="mt-4">
              <a
                href={`https://wa.me/${business.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tanyakan melalui WhatsApp
              </a>
            </Button>
          ) : (
            <div className="mt-4 rounded-md border border-line bg-blush/40 p-4">
              <p className="text-sm text-ink">
                Nomor WhatsApp belum dikonfigurasi untuk demo ini.
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                Booking tetap bisa dimulai, tetapi tombol handoff akan nonaktif
                sampai nomor tersedia.
              </p>
              <HoverLink
                href="/booking"
                className="mt-3 inline-block text-sm font-medium text-action underline underline-offset-4"
              >
                Lihat alur booking
              </HoverLink>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
