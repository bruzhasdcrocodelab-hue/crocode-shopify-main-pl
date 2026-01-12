'use client'

import styles from './styles.module.scss'
import { Background, Section, Text } from '@/components/ui'
import Image from 'next/image'
import { TService } from '@/types'
import { renderParsedContent } from '@/utils/parseTextContent'

type TProps = {
  slug: string;
  service: TService;
}

const ServiceDetails = ({slug, service}: TProps) => {
  const details = service.details || []

  if (details.length === 0) {
    return null
  }

  return (
    <Section className={styles.details} type='rounded' shift>
      <Background
        desktop='/images/background/bg_footer.webp'
        alt="service details background"
      />
      <Image
        src='/images/pattern/desidesing_development.svg'
        alt='pattern overlay'
        width={1979}
        height={2328}
        className={styles.details__pattern}
      />
      <div className={styles.details__inner}>
        {details.map((detail, index) => (
          <div key={index} className={styles.details__section}>
            <Text
              className={styles.details__title}
              tag='h2'
              text={detail.title}
              style='big'
            />
            {renderParsedContent(detail.text, {
              paragraphClassName: styles.details__text,
              listClassName: styles.details__list,
              listItemClassName: styles.details__item,
              h2ClassName: styles.details__h2,
              h3ClassName: styles.details__h3,
            })}
          </div>
        ))}
      </div>
    </Section>
  )
}

export default ServiceDetails
