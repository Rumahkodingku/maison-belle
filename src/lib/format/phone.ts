const CUSTOMER_PHONE_PATTERN = /^628[0-9]{7,10}$/;
const BUSINESS_PHONE_PATTERN = /^62[0-9]{8,13}$/;

export function normalizeIndonesianPhone(input: string): string | null {
  const cleaned = input.trim().replace(/[\s().-]/g, "");

  if (!cleaned) return null;

  let digits = cleaned.replace(/^\+/, "");

  if (digits.startsWith("0")) {
    digits = `62${digits.slice(1)}`;
  }

  if (!CUSTOMER_PHONE_PATTERN.test(digits)) {
    return null;
  }

  return digits;
}

export function formatPhoneDisplay(input: string): string {
  const normalized = normalizeIndonesianPhone(input);

  if (!normalized) return input.trim();

  const local = `0${normalized.slice(2)}`;
  const match = local.match(/^(\d{4})(\d{4})(\d+)$/);

  if (!match) return local;

  return `${match[1]}-${match[2]}-${match[3]}`;
}

export function normalizeBusinessNumber(input: string): string | null {
  const digits = input
    .trim()
    .replace(/^\+/, "")
    .replace(/[\s().-]/g, "");

  if (!BUSINESS_PHONE_PATTERN.test(digits)) {
    return null;
  }

  return digits;
}

export function isValidIndonesianPhone(input: string) {
  return normalizeIndonesianPhone(input) !== null;
}
