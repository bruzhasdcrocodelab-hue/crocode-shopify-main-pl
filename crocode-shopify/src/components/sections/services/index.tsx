'use client'

import styles from './styles.module.scss'

import { Section, Accordion, Text } from '@/components/ui'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

const columns = [
  'Design & Development',
  'Cro',
  'SEO',
  'Email & SMS',
]

const ServicesSection = () => {
  const t = useTranslations('ServicesPage')
  const [idOpenAccordion, setIdOpenAccordion] = useState<string | null>(null)

  const handlerClick = (id: string) => {
    setIdOpenAccordion(idOpenAccordion === id ? null : id)
  }

  return (
    <Section className={styles.services}>
      <div className={styles.services__inner}>
        <Text className={styles.services__title} tag='h1' text={t('title')} style='small'/>
        <div className={styles.services__content}>
          {columns.map((name, id) => (
            <div className={styles.services__column} key={id}>
              <Text className={styles.services__name} tag='h2' text={name} style='big'/>
              <div className={styles.services__list}>
                {Array.from({length: 5}).map((_, i) => 
                  <Accordion isOpen={idOpenAccordion == `${id}`+`${i}`} handlerToggle={() => handlerClick(`${id}`+`${i}`)} key={i}/>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default ServicesSection