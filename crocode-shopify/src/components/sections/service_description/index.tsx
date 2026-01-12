'use client'

import styles from './styles.module.scss'
import { Section, Text } from '@/components/ui'
import Image from 'next/image'
import { TService } from '@/types'
import { renderParsedContent } from '@/utils/parseTextContent'
import { useTranslations } from "next-intl"

type TProps = {
  slug: string;
  service: TService;
}

const ServiceDescription = ({slug, service}: TProps) => {
  const t = useTranslations('ServicePage.ServiceDescription')
  const title = service.descriptionTitle || t('title');

  const imageUrl = service.heroImage?.image?.asset?.url || '/images/cards/our-service/background-1.png'
  const imageAlt = service.heroImage?.altText || t('imageAlt')

  return (
    <Section className={styles.description} type='rounded' shift>
      <div className={styles.description__inner}>
        <div className={styles.description__content}>
          <Text
            className={styles.description__title}
            tag='h2'
            text={title}
            style='big'
          />
          <div className={styles.description__text_wrapper}>
            {renderParsedContent(service.descriptionText, {
              paragraphClassName: styles.description__text,
              listClassName: styles.description__list,
              listItemClassName: styles.description__list_item,
              h2ClassName: styles.description__h2,
              h3ClassName: styles.description__h3,
            })}
          </div>
        </div>
        <div className={styles.description__image}>
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={592}
            height={554}
            className={styles.description__image_item}
          />
        </div>
      </div>
    </Section>
  )
}

export default ServiceDescription
