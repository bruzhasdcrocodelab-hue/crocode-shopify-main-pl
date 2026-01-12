import styles from './styles.module.scss'

import { Text } from '@/components/ui';
import { useTranslations } from 'next-intl'
import RichText from '@/utils/rich-text';
import { splitTextIntoParagraphs } from '@/utils/parseTextContent';

const HomeAboutUs = () => {
  const t = useTranslations('HomePage.why-shopify');
  const t2 = useTranslations('HomePage.about-us');

  const whyShopifyParagraphs = splitTextIntoParagraphs(t('text'));
  const aboutUsParagraphs = splitTextIntoParagraphs(t2('text'));

  return (
    <section className={styles.aboutUs}>
      <div className={styles.aboutUs__inner}>
        <Text className={styles.aboutUs__title} tag='h2' text={t('title')} style='small'/>
        <div className={styles.aboutUs__content}>
          <RichText className={styles.aboutUs__message} translationKey={"HomePage.why-shopify.message"}/>
          <div className={styles.aboutUs__texts}>
            {whyShopifyParagraphs.map((paragraph, index) => (
              <p key={index} className={styles.aboutUs__text}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.aboutUs__inner}>
        <Text className={styles.aboutUs__title} tag='h2' text={t2('title')} style='small'/>
        <div className={styles.aboutUs__content}>
          <RichText className={styles.aboutUs__message} translationKey={"HomePage.about-us.message"}/>
          <div className={styles.aboutUs__texts}>
            {aboutUsParagraphs.map((paragraph, index) => (
              <p key={index} className={styles.aboutUs__text}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeAboutUs