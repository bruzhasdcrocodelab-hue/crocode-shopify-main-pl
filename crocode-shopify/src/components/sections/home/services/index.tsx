import styles from './styles.module.scss'

import { ServicesCard, Text } from '@/components/ui'
import { useTranslations } from 'next-intl'


const Services = () => {
  const t = useTranslations('HomePage.services');

  const CARDS = [
    {
      number: '01',
      title: t('cards.card1.title'),
      description: t('cards.card1.description'),
    },
    {
      number: '02',
      title: t('cards.card2.title'),
      description: t('cards.card2.description'),
    },
    {
      number: '03',
      title: t('cards.card3.title'),
      description: t('cards.card3.description'),
    },
    {
      number: '04',
      title: t('cards.card4.title'),
      description: t('cards.card4.description'),
    },
  ]

  return (
    <section className={styles.services}>
      <div className={styles.services__inner}>
        <Text className={styles.services__title} tag='h2' text={t('title')} style='small'/>
        <div className={styles.services__content}>
          {CARDS.map((item, i) => 
            <ServicesCard className={styles.services__card} mask={i+1 == 4 ? 'toll' : 'wide'} {...item} key={i}/>
          )}
        </div>
      </div>
    </section>
  )
}

export default Services