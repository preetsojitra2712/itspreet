import type { MetadataRoute } from "next";

import { projects } from "@/content/preet";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://preet-sojitra.vercel.app";
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/resume`, changeFrequency: "monthly", priority: 0.7 },
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.85 : 0.6,
    })),
  ];
}
