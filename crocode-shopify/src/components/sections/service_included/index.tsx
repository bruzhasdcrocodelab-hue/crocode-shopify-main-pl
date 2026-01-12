'use client'

import styles from './styles.module.scss'
import { Section, Text } from '@/components/ui'
import { useTranslations } from 'next-intl'

type TProps = {
  slug: string
}

const ServiceIncluded = ({slug}: TProps) => {
  const t = useTranslations(`ServiceDetailPage.${slug}.included`)

  const items = ['item1', 'item2', 'item3', 'item4']

  return (
    <Section className={styles.included}>
      <div className={styles.included__inner}>
        <Text
          className={styles.included__title}
          tag='h2'
          text={t('title')}
          style='big'
        />
        <ul className={styles.included__list}>
          {items.map((key, index) => (
            <li className={styles.included__item} key={index}>
              {t(key)}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

export default ServiceIncluded
