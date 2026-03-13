import { ServicesPage } from "@/components/pages"
import { fetchGROQ } from "@/lib/sanity/groq"
import { getServiceCategoriesWithServices } from "@/lib/sanity/queries/services"
import { TServiceCategoryWithServices } from "@/types"
import { getLocale } from "next-intl/server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Usługi Shopify | Crocode",
  description: "Agencja Shopify oferująca pełen zakres usług, oferująca rozwój, projektowanie, migrację, integracje i SEO, aby przyspieszyć skalowanie Twojego sklepu eCommerce.",
}

export default async function Page() {
  const locale: string = await getLocale()

  const { data } = await fetchGROQ(getServiceCategoriesWithServices(locale))
  const serviceCategories: TServiceCategoryWithServices[] = data?.serviceCategories || []

  return <ServicesPage serviceCategories={serviceCategories} />
}