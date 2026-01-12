import styles from './styles.module.scss'

import { Section, Text, Background } from '@/components/ui'
import { useTranslations } from 'next-intl'

const ShopifyPlusHighlights = () => {
  const t = useTranslations('AboutUsPage.ShopifyPlusHighlights');

  const ITEMS = ['item1', 'item2', 'item3', 'item4']
  .map(key => ({
    title: t(`items.${key}.title`),
    text: t(`items.${key}.text`),
  }))

  return (
    <Section className={styles.shopify_plus} type='rounded' shift>
      <Background desktop='/images/background/bg_hero.webp' mobile='/images/background/bg_hero_mobile.webp'alt='Image background'/>
      <div className={styles.shopify_plus__inner}>
        <Text className={styles.shopify_plus__title} tag='h2' text={t('title')} style='big'/>
        <div className={styles.shopify_plus__list}>
          {ITEMS.map((item, i) => (
            <div className={styles.shopify_plus__item} key={i}>
              <Text className={styles.shopify_plus__item_title} tag='h3' text={item.title} style='small'/>
              <p className={styles.shopify_plus__item_text}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default ShopifyPlusHighlights