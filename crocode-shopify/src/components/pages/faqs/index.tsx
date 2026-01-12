'use client'

import styles from './styles.module.scss'

import { Background, Section, Text } from '@/components/ui'
import { useDarkThemeForHeader } from '@/hooks/useHeaderTheme'
import { Faqs, Comments, Experts } from '@/components/sections'

const FaqsPage = () => {
  useDarkThemeForHeader()

  return (<>
    <Section className={styles.faqs} isBlack>
      <Background desktop='/images/background/bg-black-ball-toll.webp' alt="background black with balls"/>
      <Faqs/>
      <Comments/>
      <Experts/>
    </Section>
  </>)
}

 export default FaqsPage