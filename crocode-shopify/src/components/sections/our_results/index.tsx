import styles from './styles.module.scss'

import { Section, Text, ResultCard, Background } from '@/components/ui'
import { useTranslations } from 'next-intl'

const CARDS = [
  {
    name: 'Team members',
    text: '20',
  },
  {
    name: 'Happy clients',
    text: '100+',
  },
  {
    name: 'Happy clients',
    text: '18',
  },
  {
    name: 'Happy clients',
    text: '9х',
  },
]

const OurResult = () => {
  const t = useTranslations("AboutUsPage.results")
  return (
    <Section type='rounded' className={styles.result} shift>
      <Background desktop='/images/background/bg-dark.webp' alt="background black"/>
      <div className={styles.result__inner}>
        <Text className={styles.result__title} tag='h2' text={t('title')} style='big'/>
        <div className={styles.result__content}>
          {CARDS.map((card, i) => <ResultCard {...card} key={i}/>)}
        </div>
      </div>
    </Section>
  )
}

export default OurResult