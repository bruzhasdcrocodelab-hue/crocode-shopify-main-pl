'use client'

import styles from './styles.module.scss'

import { Section, Accordion, Text } from '@/components/ui'
import { useState } from 'react'



const Faqs = () => {
  const [accordionIdIsOpen, setAccordionIdIsOpen] = useState<number | null>(null)

  const handlerToggle = (id: number) => {
    setAccordionIdIsOpen(accordionIdIsOpen == id ? null : id)
  }

  return (
    <Section className={styles.section}>
      <div className={styles.section__inner}>
        <Text className={styles.section__title} tag='h1' text='Faqs' style='small'/>
        <Text className={styles.section__subtitle} tag='p' text='Shopify Theme Projects' style='big'/>
        <div className={styles.section__list}>
          {Array.from({length: 7}).map((el, i) => 
            <Accordion isOpen={i == accordionIdIsOpen} handlerToggle={() => handlerToggle(i)} key={i}/>
          )}
        </div>
      </div>
    </Section>
  )
}

export default Faqs