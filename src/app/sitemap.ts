import { MetadataRoute } from "next";
import { pagesData } from "@/lib/data/pages-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yuvatejamtrust.org";

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  Object.keys(pagesData).forEach((slug) => {
    routes.push({
      url: `${baseUrl}/${slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: slug === "about-us" || slug === "contact-us" || slug === "donate-now" ? 0.9 : 0.7,
    });
  });

  return routes;
}
