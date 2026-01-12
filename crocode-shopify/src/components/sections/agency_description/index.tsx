import styles from './styles.module.scss'

import { Section, Text, Background } from '@/components/ui';
import { useTranslations } from 'next-intl';

const AgencyDescription = () => {
  const t = useTranslations('WhyCrocodePage.AgencyDescription')
  
  return ( 
    <Section type='rounded' className={styles.section}>
      <Background desktop='/images/background/bg-dark.webp' alt='background image'/>
      <div className={styles.section__inner}>
        <Text className={styles.section__title} tag='h2' text={t('title')} style='big'/>
        <div className={styles.section__content}>
          <p className={styles.section__text}>{t('text1')}</p>
          <p className={styles.section__text}>{t('text2')}</p>
        </div>
      </div>
    </Section>
  )
}

export default AgencyDescription;