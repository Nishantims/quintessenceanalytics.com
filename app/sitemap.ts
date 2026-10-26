import type { MetadataRoute } from "next";

// The public pages of quintessenceanalytics.com for search engines. The Yum! Brands pages are
// deliberately left out (they are noindex), as are the API routes.
const BASE = "https://www.quintessenceanalytics.com";
const PAGES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/solutions", priority: 0.9 },
  { path: "/pricing", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
  { path: "/industries", priority: 0.7 },
  { path: "/insights", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({ url: `${BASE}${p.path}`, changeFrequency: "monthly", priority: p.priority }));
}
