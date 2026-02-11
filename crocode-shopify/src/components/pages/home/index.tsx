import {
  HomeAboutUs,
  Experts,
  Services,
  VideoSection,
  Comments,
  Hero,
  Industries,
  ShopifyAgency,
  Clients
} from "@/components/sections";
import { Section, Background } from "@/components/ui";
import { TProjectCard } from "@/types";
import { useTranslations } from "next-intl";
import styles from './styles.module.scss'

type TProps = {
  projects: TProjectCard[]
}

const HomePage = ({projects}: TProps) => {
  const t = useTranslations('HomePage')

  return (<>
    <Hero
      bg={{desktop: '/images/background/bg_hero.webp', mobile: '/images/background/bg_hero_mobile.webp', alt: 'bg hero'}}
      title={t('hero.title')}
      subtitle={t('hero.subtitle')}
      isShowNetwork
      button={{text: t('hero.button.text')}}
    />
    <HomeAboutUs/>
    <Clients/>
    <Industries/>
    <Section type="rounded">
      <Background desktop='/images/background/bg-black-ball-toll.webp' alt="background black with balls"/>
      <ShopifyAgency projects={projects}/>
      <Services/>
      <div className={styles.video}>
        <VideoSection
          videoUrl={t('video.videoUrl')}
          videoUrlMobile={t('video.videoUrlMobile')}
          videoTitle={t('video.title')}
          isDark
        />
      </div>
      <Comments/>
    </Section>
    <Experts/>
  </>);
}

export default HomePage;