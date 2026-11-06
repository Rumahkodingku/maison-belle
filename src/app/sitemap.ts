import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";
import { getActiveServices } from "@/features/services/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl() || "http://localhost:3000";
  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    {
      url: `${base}/services`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/gallery`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/about`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${base}/booking`,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${base}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = getActiveServices().map(
    (service) => ({
      url: `${base}/services/${service.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  return [...pages, ...servicePages];
}
