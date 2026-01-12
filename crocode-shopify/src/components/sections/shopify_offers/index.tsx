'use client'

import styles from './styles.module.scss'
import { Section } from '@/components/ui'
import { TService } from '@/types'
import { renderParsedContent } from '@/utils/parseTextContent'
import { useTranslations } from "next-intl"

type TProps = {
  slug: string;
  service: TService;
}

const ShopifyOffers = ({slug, service}: TProps) => {
  const t = useTranslations('ServicePage.ShopifyOffers')
  const offers = service.offers || []

  return (
    <Section className={styles.offers}>
      <div className={styles.offers__heading}>
        <h2 className={styles.offers__title}>{service.whyShopifyTitle || t('title')}</h2>
        {service.whyShopifyText && (
          <div className={styles.offers__subtitle}>
            {renderParsedContent(service.whyShopifyText, {
              paragraphClassName: styles.offers__subtitle_text,
              listClassName: styles.offers__subtitle_list,
              listItemClassName: styles.offers__subtitle_list_item,
              h2ClassName: styles.offers__subtitle_h2,
              h3ClassName: styles.offers__subtitle_h3,
            })}
          </div>
        )}
      </div>
      <div className={styles.offers__inner}>
        <div className={styles.offers__grid}>
          {offers.map((offer, index) => (
            <div className={styles.offers__card} key={index}>
              <h3 className={styles.offers__card_title}>{offer.title}</h3>
              <div className={styles.offers__card_texts}>
                {renderParsedContent(offer.text, {
                  paragraphClassName: styles.offers__card_text,
                  listClassName: styles.offers__list,
                  listItemClassName: styles.offers__list_item,
                  h2ClassName: styles.offers__h2,
                  h3ClassName: styles.offers__h3,
                  underlinedClassName: styles.underlined,
                })}
              </div>
            </div>
          ))}
        </div>
        {service.whyShopifyFinalText && (
          <div className={styles.offers__final_text}>
            {renderParsedContent(service.whyShopifyFinalText, {
              paragraphClassName: styles.offers__card_text,
              listClassName: styles.offers__list,
              listItemClassName: styles.offers__list_item,
              h2ClassName: styles.offers__h2,
              h3ClassName: styles.offers__h3,
              underlinedClassName: styles.underlined,
            })}
          </div>
        )}
      </div>
    </Section>
  )
}

export default ShopifyOffers
