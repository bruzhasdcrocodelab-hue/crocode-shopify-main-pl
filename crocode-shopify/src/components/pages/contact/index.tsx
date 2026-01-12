'use client'

import styles from './styles.module.scss'

import { useDarkThemeForHeader } from "@/hooks/useHeaderTheme"
import { Form, MapSection } from "@/components/sections"
import { Background, Section, Text } from '@/components/ui'
import { useTranslations } from 'next-intl'

const ContactPage = () => {
  useDarkThemeForHeader()
  const t = useTranslations('ContactPage')
  return (<>
    <Section className={styles.contact} isBlack>
      <Background desktop='/images/background/bg-black-ball-toll.webp' alt="background black with balls"/>
      <div className={styles.contact__inner}>
        <Text className={styles.contact__title} tag='h1' text={t('title')} style='small'/>
        <div className={styles.contact__content}>
          <Form/>
          <MapSection/>
        </div>
      </div>
    </Section>
  </>)
} 

export default ContactPage