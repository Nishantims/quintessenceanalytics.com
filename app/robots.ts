import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/yum"] },
    sitemap: "https://www.quintessenceanalytics.com/sitemap.xml",
  };
}
