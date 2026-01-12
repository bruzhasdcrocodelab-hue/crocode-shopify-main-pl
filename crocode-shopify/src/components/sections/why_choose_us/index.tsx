import styles from './styles.module.scss'

import { Section, Text, Background } from '@/components/ui'
import { useTranslations } from 'next-intl'

type TPropsCard = {
  className?: string;
  text?: string;
  background?: {
    src: string;
    alt: string
  } 
}

const Card = ({className, text, background}: TPropsCard) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {background && <Background desktop={background.src} alt={background.alt}/>}
      {text && <p className={styles.card__text}>{text}</p>}
    </div>
  )
}

const WhyChooseUs = () => {
  const t = useTranslations('WhyCrocodePage.whyChooseUs')
  return (
    <Section type='rounded' className={styles.section}>
      <div className={styles.section__inner}>
        <div className={styles.section__header}>
          <Text className={styles.section__title} tag='h2' text={t('title')} style='big'/>
          <p className={styles.section__description}>{t('description')}</p>
        </div>
        <div className={styles.section__list}>
          <Card className={styles.section__card} text={t('cards.card1.text')} background={{src: '/images/cards/why-crocode/whycrocode-card-1.png', alt: 'card'}}/>
          <Card className={styles.section__card} background={{src: '/images/cards/why-crocode/bg-image-1.webp', alt: 'card'}}/>
          <Card className={styles.section__card} background={{src: '/images/cards/why-crocode/bg-image-2.webp', alt: 'card'}}/>
          <Card className={styles.section__card} text={t('cards.card2.text')} background={{src: '/images/cards/why-crocode/whycrocode-card-2.png', alt: 'card'}}/>
          <Card className={styles.section__card} text={t('cards.card3.text')} background={{src: '/images/cards/why-crocode/whycrocode-card-3.png', alt: 'card'}}/>
          <Card className={styles.section__card} text={t('cards.card4.text')} background={{src: '/images/cards/why-crocode/whycrocode-card-4.png', alt: 'card'}}/>
        </div>
      </div>
    </Section>
  )
}

export default WhyChooseUs