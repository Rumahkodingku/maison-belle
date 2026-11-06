import type { Metadata } from "next";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "";
const siteUrl = rawSiteUrl.replace(/\/$/, "");

export const siteConfig = {
  name: "Maison Belle",
  tagline: "Cantik dengan caramu.",
  description:
    "Maison Belle adalah beauty studio premium dengan layanan hair, nails, makeup, dan lash & brow. Jelajahi layanan dan ajukan appointment melalui WhatsApp.",
  locale: "id_ID",
  language: "id",
  url: siteUrl,
  demo: true,
};

export const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/services", label: "Layanan" },
  { href: "/about", label: "Tentang" },
  { href: "/gallery", label: "Galeri" },
  { href: "/about#artists", label: "Artist" },
  { href: "/contact", label: "Kontak" },
] as const;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl || "http://localhost:3000"),
  title: {
    default: "Maison Belle — Beauty Studio Premium",
    template: "%s — Maison Belle",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "beauty studio",
    "hair salon",
    "nail art",
    "makeup artist",
    "lash extension",
    "Jakarta",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: "Maison Belle — Beauty Studio Premium",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Maison Belle — Beauty Studio Premium",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function getSiteUrl() {
  return siteUrl;
}
