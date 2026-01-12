import { Hero, Comments, LetsTalk, OurResult, ShopifyPlusHighlights } from "@/components/sections"
import { Background, Section } from "@/components/ui"
import { useTranslations } from "next-intl"

const AboutUsPage = () => {
  const t = useTranslations('AboutUsPage')
  return (<>
    <Hero 
      title={t('hero.title')}
      subtitle={t('hero.subtitle')}
    />
    <OurResult/>
    <ShopifyPlusHighlights/>
    <Section type="rounded" isBlack>
      <Background desktop='/images/background/bg-black-ball.webp' alt="background black with balls"/>
      <Comments/>
      <LetsTalk/>
    </Section>
  </>)
}

export default AboutUsPage