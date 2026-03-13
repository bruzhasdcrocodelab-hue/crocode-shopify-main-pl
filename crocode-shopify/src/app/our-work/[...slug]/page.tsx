import { ProjectPage } from "@/components/pages"
import { fetchGraphQL } from "@/lib/sanity/graphql";
import { getProject } from "@/lib/sanity/queries/projects";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: projectData } = await fetchGraphQL(getProject(slug[0]));
  const project = projectData?.allProjects?.[0];

  if (project?.seo?.title || project?.seo?.description) {
    return {
      title: project.seo?.title || undefined,
      description: project.seo?.description || undefined,
    }
  }

  return {}
}

export default async ({params}: PageProps) => {
  const { slug } = await params;
  const { data: projectData, errors } = await fetchGraphQL(getProject(slug[0]));
  const project = projectData?.allProjects[0];

  return (
    <ProjectPage project={project}/>
  )
}
