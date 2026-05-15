import { MetadataRoute } from "next";

const baseUrl = "https://shopifydeveloper.pl";

const routes = [
  "/",
  "/about-us",
  "/articles",
  "/contact",
  "/cookie-policy",
  "/faqs",
  "/our-work",
  "/privacy-policy",
  "/services",
  "/why-crocode",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
