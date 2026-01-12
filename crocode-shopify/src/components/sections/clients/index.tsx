import styles from './styles.module.scss'

import { Section, Text, Background } from '@/components/ui'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const clients_image = [
  {
    image: '/images/clients/arcus.svg',
    alt: 'arcus client'
  },
  {
    image: '/images/clients/hvisk.svg',
    alt: 'hvisk client'
  },
  {
    image: '/images/clients/lost-boys.svg',
    alt: 'lost-boys client'
  },
  {
    image: '/images/clients/ttswtrs.svg',
    alt: 'ttswtrs client'
  },
  {
    image: '/images/clients/edition-julie-joliat.svg',
    alt: 'edition-julie-joliat client'
  },
  {
    image: '/images/clients/s.svg',
    alt: 's client'
  },
  {
    image: '/images/clients/coffeeface.svg',
    alt: 'coffeeface client'
  },
  {
    image: '/images/clients/rociosegura.svg',
    alt: 'rociosegura client'
  },
  {
    image: '/images/clients/geeiq.svg',
    alt: 'geeiq client'
  },
  {
    image: '/images/clients/atomic.svg',
    alt: 'atomic client'
  },
  {
    image: '/images/clients/hooked.svg',
    alt: 'hooked client'
  },
  {
    image: '/images/clients/valse.svg',
    alt: 'valse client'
  },
  {
    image: '/images/clients/tmrw.svg',
    alt: 'tmrw client'
  },
  {
    image: '/images/clients/aallbuy.svg',
    alt: 'aallbuy client'
  },
  {
    image: '/images/clients/ubaa-haus.svg',
    alt: 'ubaa-haus client'
  },
  {
    image: '/images/clients/kleanse.svg',
    alt: 'kleamse client'
  },
  {
    image: '/images/clients/inwohn.svg',
    alt: 'inwohn client'
  },
  {
    image: '/images/clients/sho.svg',
    alt: 'sho client'
  },
]

const Clients = () => {
  const t = useTranslations('HomePage.clients');

  return (
    <Section className={styles.clients} type='rounded' shift>
      <Background desktop='/images/background/bg-dark.webp' alt='background image'/>
      <div className={styles.clients__inner}>
        <Text className={styles.clients__title} tag='h2' text={t('title')} style='big'/>
        <div className={styles.clients__list} >
          {clients_image.map((item, i) => (
            <div className={styles.clients__item} key={i}>
              <Image src={item.image} width={180} height={100} alt={item.alt}/>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Clients