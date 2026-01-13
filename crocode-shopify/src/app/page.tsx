import { HomePage } from "@/components/pages";
import { fetchGraphQL } from "@/lib/sanity/graphql";
import { getProjects } from "@/lib/sanity/queries/projects";
import { TProjectCard } from "@/types";
import { getLocale } from "next-intl/server";

export default async () => {
  const locale: string = await getLocale()
  const { data: projectsData } = await fetchGraphQL(getProjects(locale));
  const projects: TProjectCard[] = projectsData?.allProjects || [];

  return <HomePage projects={projects}/>
}
