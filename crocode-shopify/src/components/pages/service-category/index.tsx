'use client'

import { Background, Section } from "@/components/ui"
import { useDarkThemeForHeader } from "@/hooks/useHeaderTheme"
import { TServiceCategoryWithServices } from "@/types"
import Link from "next/link"
import styles from '../services/styles.module.scss'
import Image from 'next/image'
import { renderParsedContent } from '@/utils/parseTextContent'

type TProps = {
  category: TServiceCategoryWithServices
}

const ServiceCategoryPage = ({ category }: TProps) => {
  useDarkThemeForHeader()

  return (
    <Section isBlack>
      <Background desktop='/images/background/bg-black-ball-toll.webp' alt="background black with balls"/>
      <div className={styles.services}>
        <div className={styles.services__inner}>
          <div className={styles.services__hero}>
            <div className={styles.services__heroContent}>
              <h1 className={styles.services__title}>{category.categoryName}</h1>
              {category.description && (
                <div className={styles.services__description}>
                  {renderParsedContent(category.description, {
                    paragraphClassName: styles.services__descriptionParagraph,
                    listClassName: styles.services__descriptionList,
                    listItemClassName: styles.services__descriptionListItem,
                    h2ClassName: styles.services__descriptionH2,
                    h3ClassName: styles.services__descriptionH3,
                  })}
                </div>
              )}
            </div>
            <nav className={styles.services__navigation}>
              {category.services.map((service, index) => (
                <Link
                  key={service._id}
                  href={`/services/${service.slug.current}`}
                  className={styles.services__navLink}
                >
                  <span className={styles.services__navNumber}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.services__navText}>
                    {service.title}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          {category.categoryImage && (
            <div className={styles.services__categoryImage} style={{ position: 'relative', overflow: 'hidden' }}>
              <Image
                src={category.categoryImage.image.asset.url}
                alt={category.categoryImage.altText || category.categoryName}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          {category.text && (
            <div className={styles.services__textContent}>
              {renderParsedContent(category.text, {
                paragraphClassName: styles.services__textParagraph,
                listClassName: styles.services__list,
                listItemClassName: styles.services__listItem,
                h2ClassName: styles.services__h2,
                h3ClassName: styles.services__h3,
              })}
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}

export default ServiceCategoryPage
