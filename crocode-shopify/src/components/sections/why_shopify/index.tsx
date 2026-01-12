'use client'

import styles from './styles.module.scss'
import { Section, Text } from '@/components/ui'
import { useTranslations } from 'next-intl'

type TProps = {
  slug: string
}

const WhyShopify = ({slug}: TProps) => {
  const t = useTranslations(`ServiceDetailPage.${slug}.whyShopify`)

  return (
    <Section className={styles.whyShopify}>
      <div className={styles.whyShopify__inner}>
        <Text
          className={styles.whyShopify__title}
          tag='h2'
          text={t('title')}
          style='big'
        />
        <div className={styles.whyShopify__content}>
          <p className={styles.whyShopify__text}>{t('mainText')}</p>
          <div className={styles.whyShopify__columns}>
            <p className={styles.whyShopify__column}>{t('column1')}</p>
            <p className={styles.whyShopify__column}>{t('column2')}</p>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default WhyShopify
