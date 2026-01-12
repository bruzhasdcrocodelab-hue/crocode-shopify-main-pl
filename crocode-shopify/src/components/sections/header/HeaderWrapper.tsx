import { fetchGROQ } from "@/lib/sanity/groq";
import { getServicesForDropdown } from "@/lib/sanity/queries/services";
import { getLocale } from "next-intl/server";
import { TServiceCard, TServiceCategory, TServicesGrouped } from "@/types";
import Header from "./index";

export default async function HeaderWrapper() {
  const locale: string = await getLocale();

  const { data } = await fetchGROQ(getServicesForDropdown(locale));

  const servicesGrouped: TServicesGrouped = {};

  if (data?.allServiceCategories && data?.allServices) {
    data.allServiceCategories.forEach((category: TServiceCategory) => {
      servicesGrouped[category._id] = {
        category,
        services: data.allServices
          .filter((service: TServiceCard) => service.category._id === category._id)
          .sort((a: TServiceCard, b: TServiceCard) => (a.order || 0) - (b.order || 0))
      };
    });
  }

  return <Header servicesGrouped={servicesGrouped} />;
}
