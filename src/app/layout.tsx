/* biome-ignore-all lint/security/noDangerouslySetInnerHtml: static JSON-LD is escaped */
import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { MotionProvider } from "@/components/motion/motion-provider";
import { business } from "@/config/business";
import { defaultMetadata, getSiteUrl } from "@/config/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#171011" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Maison Belle",
        ...(siteUrl ? { url: siteUrl } : {}),
        inLanguage: "id-ID",
      },
      {
        "@type": "Organization",
        name: "Maison Belle",
        ...(siteUrl ? { url: siteUrl } : {}),
        description:
          "Beauty studio premium dengan layanan hair, nails, makeup, dan lash & brow.",
      },
    ],
  };

  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <body>
        <noscript>
          <style>{`[data-motion-reveal],[data-motion-reveal] *,[data-page-transition]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <span
          className="hidden"
          data-demo-brand={business.isDemo ? "true" : "false"}
        />
      </body>
    </html>
  );
}
