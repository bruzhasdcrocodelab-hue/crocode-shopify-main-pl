import { Hero, Comments, LetsTalk, WhyChooseUs, AgencyDescription, OurServices } from "@/components/sections";
import { Background, Section } from "@/components/ui";
import { useTranslations } from "next-intl";

const WhyCrocodePage = () => {
  const t  = useTranslations('WhyCrocodePage.hero')
  return (<>
    <Hero 
      bg={{desktop: '/images/background/bg_hero.webp', mobile: '/images/background/bg_hero_mobile.webp', alt: 'bg hero'}}
      title={t('title')}
      subtitle={t('subtitle')}
    />
    <OurServices/>
    <AgencyDescription/>
    <WhyChooseUs/>
    <Section type='rounded' isBlack>
      <Background desktop='/images/background/bg-black-ball-toll.webp' alt="background black with balls"/>
      <Comments/>
      <LetsTalk/>
    </Section>
  </>)
}

export default WhyCrocodePage;