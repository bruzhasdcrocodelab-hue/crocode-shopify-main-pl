import { MetadataRoute } from "next";
import { getProjectsSlug } from "@/lib/sanity/queries/projects";
import { fetchGraphQL } from "@/lib/sanity/graphql";
import { TProjectCard, TServiceCard } from "@/types";
import { getServicesSlug } from "@/lib/sanity/queries/services";

const baseUrl = "https://shopifywebdevelopmentservices.com";

const staticRoutes = [
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Загружаем данные параллельно, чтобы sitemap генерировался быстрее
  const [{ data: projectsData }, { data: servicesData }] = await Promise.all([
    fetchGraphQL(getProjectsSlug("pl")),
    fetchGraphQL(getServicesSlug("pl")),
  ]);

  const projects: TProjectCard[] = projectsData?.allProjects ?? [];
  const services: TServiceCard[] = servicesData?.allServices ?? [];

  // Статические страницы
  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));

  // Динамические страницы сервисов
  const servicePages: MetadataRoute.Sitemap = services
    .filter((service) => service?.slug?.current)
    .map((service) => ({
      url: `${baseUrl}/services/${service.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  // Динамические страницы кейсов
  const projectPages: MetadataRoute.Sitemap = projects
    .filter((project) => project?.slug?.current)
    .map((project) => ({
      url: `${baseUrl}/our-work/${project.slug.current}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticPages, ...servicePages, ...projectPages];
}
