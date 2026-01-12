'use client'

import {
  Hero,
  ServiceDescription,
  ShopifyAgency,
  WhyShopify,
  ShopifyOffers,
  ServiceDetails,
  VideoSection,
  Experts
} from "@/components/sections"
import { Background, Section } from "@/components/ui"
import { TProjectCard, TService } from "@/types"
import { useLightThemeForHeader } from "@/hooks/useHeaderTheme"

type TProps = {
  slug: string;
  service: TService;
  projects: TProjectCard[]
}

const ServiceDetailPage = ({slug, service, projects}: TProps) => {
  useLightThemeForHeader()

  return (<>
    <Hero
      bg={{
        desktop: '/images/background/bg_hero.webp',
        mobile: '/images/background/bg_hero_mobile.webp',
        alt: 'Design & Development background'
      }}
      title={service.title}
      subtitle={service.heroSubtitle || ''}
      shift={true}
    />

    <ServiceDescription slug={slug} service={service}/>

    <ShopifyAgency
      projects={projects.slice(0, 4)}
      showTitle={true}
      customTitleStyle="centered"
    />

    <Section type='rounded' isBlack shift>
      <Background
        desktop='/images/background/bg-dark.webp'
        alt="background black with waves"
      />
      <ShopifyOffers slug={slug} service={service}/>
    </Section>

    <ServiceDetails slug={slug} service={service}/>

    {service.videoUrl? (
    <VideoSection slug={slug} service={service}/>):(<div></div>)}

    <Experts/>
  </>)
}

export default ServiceDetailPage
