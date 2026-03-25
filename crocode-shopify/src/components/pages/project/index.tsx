import { HeroProject, Summary, Gallery, Comments, LetsTalk, CaseStudyDetails } from "@/components/sections"
import { Background, Section } from "@/components/ui"
import { TProject } from "@/types/templates/project"

type TProps = {
  project: TProject
}

const ProjectPage = ({project}: TProps) => {
  if (!project) return null

  return (
    <>
      <HeroProject
        theme={project.theme}
        title={project?.title}
        workDone={project?.workDone}
        subtitle={project?.client}
        background={{
          desktopSrc: project?.coverImage?.imageDesktop?.asset?.url || '/images/background/bg_hero.webp',
          mobileSrc: project?.coverImage?.imageMobile?.asset?.url || '/images/background/bg_hero_mobile.webp',
          alt: project?.coverImage?.altText || project?.title || 'Project cover'}}
      />
      <Summary brief={project?.brief} title={project?.title}/>
      <Gallery image={project?.gallery}/>
      <CaseStudyDetails solutionRaw={project?.solutionRaw}/>
      <Section type='rounded' isBlack>
        <Background desktop='/images/background/bg-black-ball.webp' alt="background black with balls"/>
        <Comments/>
        <LetsTalk/>
      </Section>
    </>
  )
}

export default ProjectPage