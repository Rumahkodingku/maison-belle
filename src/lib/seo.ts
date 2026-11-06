import { getSiteUrl } from "@/config/site";

export function getCanonical(path: string) {
  const base = getSiteUrl();
  return base ? { alternates: { canonical: path } } : {};
}
