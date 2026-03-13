import { HomePage } from "@/components/pages";
import { fetchGraphQL } from "@/lib/sanity/graphql";
import { getProjects } from "@/lib/sanity/queries/projects";
import { TProjectCard } from "@/types";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agencja Shopify Plus – Oficjalny Partner Premier Shopify | Crocode",
  description: "Oficjalny partner Shopify Premier i agencja Shopify Plus oferująca rozwiązania z zakresu rozwoju przedsiębiorstw, integracji i wzrostu dla globalnych marek.",
};

export default async () => {
  const locale: string = await getLocale()
  const { data: projectsData } = await fetchGraphQL(getProjects(locale));
  const projects: TProjectCard[] = projectsData?.allProjects || [];

  return <HomePage projects={projects}/>
}
