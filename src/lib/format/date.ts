import type { OpeningHours, Weekday } from "@/types/domain";

export const JAKARTA_TIME_ZONE = "Asia/Jakarta";

const WEEKDAY_KEYS: Weekday[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^\d{2}:\d{2}$/;

export function getTodayInJakarta(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: JAKARTA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function isValidDateString(value: string) {
  if (!DATE_PATTERN.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function isValidTimeString(value: string) {
  if (!TIME_PATTERN.test(value)) return false;

  const [hours, minutes] = value.split(":").map(Number);
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

export function getWeekdayKey(date: string): Weekday {
  const midday = new Date(`${date}T12:00:00+07:00`);
  return WEEKDAY_KEYS[midday.getUTCDay()];
}

export function isPastDate(date: string, now = new Date()) {
  return date < getTodayInJakarta(now);
}

export function isClosedDate(date: string, openingHours: OpeningHours) {
  const weekday = getWeekdayKey(date);
  return openingHours[weekday] === null;
}

export function parseTimeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export function formatMinutesToTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export function generateTimeOptions(
  open: string,
  close: string,
  durationMinutes: number,
  intervalMinutes = 30,
) {
  if (!isValidTimeString(open) || !isValidTimeString(close)) return [];

  const start = parseTimeToMinutes(open);
  const end = parseTimeToMinutes(close);
  const lastStart = end - durationMinutes;
  const options: string[] = [];

  for (let minutes = start; minutes <= lastStart; minutes += intervalMinutes) {
    options.push(formatMinutesToTime(minutes));
  }

  return options;
}

export function getTimeOptionsForDate(
  date: string,
  durationMinutes: number,
  openingHours: OpeningHours,
  now = new Date(),
) {
  if (!isValidDateString(date) || isPastDate(date, now)) return [];

  const weekday = getWeekdayKey(date);
  const hours = openingHours[weekday];

  if (!hours) return [];

  return generateTimeOptions(hours.open, hours.close, durationMinutes);
}

export function isTimeValidForDate(
  date: string,
  time: string,
  durationMinutes: number,
  openingHours: OpeningHours,
  now = new Date(),
) {
  if (!isValidTimeString(time)) return false;
  return getTimeOptionsForDate(
    date,
    durationMinutes,
    openingHours,
    now,
  ).includes(time);
}

export function formatDateLong(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: JAKARTA_TIME_ZONE,
  }).format(new Date(`${date}T12:00:00+07:00`));
}

export function formatTimeDisplay(time: string) {
  return time.replace(":", ".");
}

export function formatTimeWithWib(time: string) {
  return `${formatTimeDisplay(time)} WIB`;
}

export function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fromDateString(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

export function getMonthGrid(month: Date) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const first = new Date(year, monthIndex, 1, 12);
  const last = new Date(year, monthIndex + 1, 0, 12);
  const startOffset = first.getDay();
  const days: Array<{ date: Date; inMonth: boolean }> = [];

  for (let index = 0; index < startOffset; index += 1) {
    days.push({
      date: new Date(year, monthIndex, index - startOffset + 1, 12),
      inMonth: false,
    });
  }

  for (let day = 1; day <= last.getDate(); day += 1) {
    days.push({ date: new Date(year, monthIndex, day, 12), inMonth: true });
  }

  while (days.length % 7 !== 0) {
    const nextDay = days.length - startOffset - last.getDate() + 1;
    days.push({
      date: new Date(year, monthIndex + 1, nextDay, 12),
      inMonth: false,
    });
  }

  return days;
}
