import { ServicesPage } from "@/components/pages"
import { fetchGROQ } from "@/lib/sanity/groq"
import { getServiceCategoriesWithServices } from "@/lib/sanity/queries/services"
import { TServiceCategoryWithServices } from "@/types"
import { getLocale } from "next-intl/server"

export default async function Page() {
  const locale: string = await getLocale()

  const { data } = await fetchGROQ(getServiceCategoriesWithServices(locale))
  const serviceCategories: TServiceCategoryWithServices[] = data?.serviceCategories || []

  return <ServicesPage serviceCategories={serviceCategories} />
}