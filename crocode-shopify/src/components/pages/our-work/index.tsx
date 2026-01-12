import { Comments, Hero, Projects, LetsTalk} from "@/components/sections"
import { Section, Background } from "@/components/ui"
import { fetchGraphQL } from "@/lib/sanity/graphql";
import { getProjectCategories } from "@/lib/sanity/queries/projectCategories";
import { getProjects } from "@/lib/sanity/queries/projects";
import { TProjectCategory, TProjectCard } from "@/types";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

const OurWorkPage = async () => {
  const t = await getTranslations('OurWork.hero')
  const locale: string = await getLocale()
  const { data: projectsData } = await fetchGraphQL(getProjects(locale));
  const { data: projectCategories} = await fetchGraphQL(getProjectCategories(locale));
  const projects: TProjectCard[] = projectsData?.allProjects || [];
  const categories: TProjectCategory[] = projectCategories?.allProjectCategories || [];

  return (<>
    <Hero 
      title={t('title')} 
      subtitle={t('subtitle')}
    />
    <Projects projects={projects} categories={categories}/>
    <Section type="rounded">
      <Background desktop='/images/background/bg-black-ball.webp' alt="background black with balls"/>
      <Comments/>
      <LetsTalk/>
    </Section>
  </>)
}

export default OurWorkPage
