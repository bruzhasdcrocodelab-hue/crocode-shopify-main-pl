import styles from './styles.module.scss'

import { Section, Background } from '@/components/ui'
import { useTranslations } from 'next-intl'

type TPropsCard = {
  className?: string;
  background?: {
    src: string;
    alt: string
  }
  title: string;
  text: string;
}

const Card = ({className, title, text, background}: TPropsCard) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {background && <Background desktop={background.src} alt={background.alt}/>}
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>{title}</h3>
        <p className={styles.card__text}>{text}</p>
      </div>
    </div>
  )
}

const OurServices = () => {
  const t = useTranslations('WhyCrocodePage.ourService')

  return (
    <Section className={styles.section}>
      <div className={styles.section__inner}>
        <Card 
          background={{src: '/images/cards/our-service/background-1.png', alt: "card background"}}
          title={t('card1.title')}
          text={t('card1.description')}
          />
        <Card 
          background={{src: '/images/cards/our-service/background-2.png', alt: "card background"}}
          title={t('card2.title')}
          text={t('card2.description')}
        />
        <Card 
          background={{src: '/images/cards/our-service/background-3.png', alt: "card background"}}
          title={t('card3.title')}
          text={t('card3.description')}
        />
      </div>
    </Section>
  )
}

export default OurServices