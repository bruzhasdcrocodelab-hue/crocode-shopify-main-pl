import { ProjectPage } from "@/components/pages"
import { fetchGraphQL } from "@/lib/sanity/graphql";
import { getProject } from "@/lib/sanity/queries/projects";

type PageProps = {
  params: Promise<{ slug: string[] }>
}

export default async ({params}: PageProps) => {
  const { slug } = await params;
  const { data: projectData, errors } = await fetchGraphQL(getProject(slug[0]));
  const project = projectData?.allProjects[0];

  return (
    <ProjectPage project={project}/>
  )
}