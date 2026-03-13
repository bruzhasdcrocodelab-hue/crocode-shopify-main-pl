import { ServiceCategoryPage, ServiceDetailPage } from "@/components/pages"
import { fetchGROQ } from "@/lib/sanity/groq"
import { fetchGraphQL } from "@/lib/sanity/graphql"
import { getProjects } from "@/lib/sanity/queries/projects"
import { getServiceCategoryBySlug, getServiceBySlug } from "@/lib/sanity/queries/services"
import { TProjectCard, TService, TServiceCategoryWithServices } from "@/types"
import { getLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const locale: string = await getLocale()

  const { data: categoryData } = await fetchGROQ(getServiceCategoryBySlug(slug, locale))
  const category: TServiceCategoryWithServices | null = categoryData?.serviceCategory || null

  if (category?.seo?.title || category?.seo?.description) {
    return {
      title: category.seo?.title || undefined,
      description: category.seo?.description || undefined,
    }
  }

  const { data: serviceData } = await fetchGROQ(getServiceBySlug(slug, locale))
  const service: TService | null = serviceData?.allServices?.[0] || null

  if (service?.seo?.title || service?.seo?.description) {
    return {
      title: service.seo?.title || undefined,
      description: service.seo?.description || undefined,
    }
  }

  return {}
}

export default async function ServiceOrCategoryPage({ params }: PageProps) {
  const { slug } = await params
  const locale: string = await getLocale()

  const { data: categoryData } = await fetchGROQ(getServiceCategoryBySlug(slug, locale))
  const category: TServiceCategoryWithServices | null = categoryData?.serviceCategory || null

  if (category) {
    return <ServiceCategoryPage category={category} />
  }

  const { data: serviceData } = await fetchGROQ(getServiceBySlug(slug, locale))
  const service: TService | null = serviceData?.allServices?.[0] || null

  if (!service) {
    notFound()
  }

  const { data: projectsData } = await fetchGraphQL(getProjects(locale))
  const projects: TProjectCard[] = projectsData?.allProjects || []

  return (
    <ServiceDetailPage
      slug={slug}
      service={service}
      projects={projects}
    />
  )
}
