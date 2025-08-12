import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://gotravelsco.vercel.app",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: "https://gotravelsco.vercel.app/flights",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: "https://gotravelsco.vercel.app/hotels",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: "https://gotravelsco.vercel.app/activities",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
  ];
}
