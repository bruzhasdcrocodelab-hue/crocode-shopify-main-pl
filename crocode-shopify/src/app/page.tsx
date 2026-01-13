import { HomePage } from "@/components/pages";
import { fetchGraphQL } from "@/lib/sanity/graphql";
import { getProjects } from "@/lib/sanity/queries/projects";
import { TProjectCard } from "@/types";
import { getLocale } from "next-intl/server";

export default async () => {
  const locale: string = await getLocale()
  console.log("locale: ", locale)
  const { data: projectsData } = await fetchGraphQL(getProjects(locale));
  const projects: TProjectCard[] = projectsData?.allProjects || [];
  console.log("projectsData: ", projectsData)
  console.log("projects: ", projects)

  return <HomePage projects={projects}/>
}
