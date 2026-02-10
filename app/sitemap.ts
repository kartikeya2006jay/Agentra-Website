import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://agentra.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://agentra.vercel.app/about",
      lastModified: new Date(),
    },
    {
      url: "https://agentra.vercel.app/work",
      lastModified: new Date(),
    },
  ]
}