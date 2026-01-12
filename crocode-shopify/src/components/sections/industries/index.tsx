import styles from './styles.module.scss'

import { Section, Background, Text, CardIndustry } from '@/components/ui'
import { useTranslations } from 'next-intl'

const Industries = () => {
  const t = useTranslations('HomePage.industries')

  const cardsKey = ['card1', 'card2', 'card3']
  const cards = cardsKey.map((key, i) => ({
    number: i+1 > 9 ? `${i+1}` : `0${i+1}`,
    title: t(`cards.${key}.title`),
    description: t(`cards.${key}.text`),
  }))

  return (
    <Section className={styles.industries} type='rounded' shift>
      <Background desktop={'/images/background/bg_hero.webp'} mobile='/images/background/bg_hero.webp' alt='background'/>
      <div className={styles.industries__inner}>
        <Text className={styles.industries__title} tag='h2' text={t('title')} style='small'/>
        <Text className={styles.industries__subtitle} text={t('text')} />
        <div className={styles.industries__content}>
          {cards.map((item, i) => <CardIndustry className={styles.industries__card} {...item} key={i}/>)}
        </div>
      </div>
    </Section>
  )
}

export default Industries