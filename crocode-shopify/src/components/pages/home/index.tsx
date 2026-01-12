import { 
  HomeAboutUs, 
  Experts, 
  Services, 
  
  Comments, 
  Hero, 
  Industries, 
  ShopifyAgency, 
  Clients 
} from "@/components/sections";
import { Section, Background } from "@/components/ui";
import { TProjectCard } from "@/types";
import { useTranslations } from "next-intl";

type TProps = {
  projects: TProjectCard[]
}

const HomePage = ({projects}: TProps) => {
  const t = useTranslations('HomePage.hero')

  return (<>
    <Hero 
      bg={{desktop: '/images/background/bg_hero.webp', mobile: '/images/background/bg_hero_mobile.webp', alt: 'bg hero'}}
      title={t('title')} 
      subtitle={t('subtitle')}
      isShowNetwork
      button={{text: t('button.text')}}
    />
    <HomeAboutUs/>
    <Clients/>
    <Industries/>
    <Section type="rounded">
      <Background desktop='/images/background/bg-black-ball-toll.webp' alt="background black with balls"/>
      <ShopifyAgency projects={projects}/>
      <Services/>
      <Comments/>
    </Section>
    <Experts/>
  </>);
}

export default HomePage;