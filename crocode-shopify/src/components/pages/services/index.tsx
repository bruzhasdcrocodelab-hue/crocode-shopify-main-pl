'use client'

import { ServiceBlock } from "@/components/sections"
import { Background, Section } from "@/components/ui"
import { useDarkThemeForHeader } from "@/hooks/useHeaderTheme"
import { TServiceCategoryWithServices } from "@/types"
import { useTranslations } from "next-intl"
import Link from "next/link"
import styles from './styles.module.scss'

type TProps = {
  serviceCategories: TServiceCategoryWithServices[]
}

const ServicesPage = ({ serviceCategories }: TProps) => {
  useDarkThemeForHeader()
  const t = useTranslations('ServicesPage')

  return (
    <Section isBlack>
      <Background desktop='/images/background/bg-black-ball-toll.webp' alt="background black with balls"/>
      <div className={styles.services}>
        <div className={styles.services__inner}>
          {/* Hero Section */}
          <div className={styles.services__hero}>
            <div className={styles.services__heroContent}>
              <h1 className={styles.services__title}>{t('title')}</h1>
              <div className={styles.services__description}>
                <p>{t('hero.description')}</p>
                <p>{t('hero.description2')}</p>
              </div>
            </div>
            <nav className={styles.services__navigation}>
              {serviceCategories.map((category, index) => (
                <Link
                  key={category._id}
                  href={`/services/${category.slug.current}`}
                  className={styles.services__navLink}
                >
                  <span className={styles.services__navNumber}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.services__navText}>
                    {category.categoryName}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Service Blocks */}
          <div className={styles.services__blocks}>
            {serviceCategories.map((category) => (
              <ServiceBlock
                key={category._id}
                id={category.slug.current}
                title={category.categoryName}
                description={category.description || ''}
                imageUrl={category.categoryImage?.image?.asset?.url}
                imageAlt={category.categoryImage?.altText || category.categoryName}
                services={category.services}
                buttonText={t('services.development.button')}
                buttonHref={`/services/${category.slug.current}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default ServicesPage
