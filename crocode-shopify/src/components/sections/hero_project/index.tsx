'use client'

import { useDarkThemeForHeader } from '@/hooks/useHeaderTheme';
import styles from './styles.module.scss'

import { Section, Text, Background } from "@/components/ui"

type TProps = {
  theme: string | null;
  title: string;
  workDone: string;
  subtitle: string;
  background: {
    desktopSrc: string;
    mobileSrc: string;
    alt: string;
  }
}

const HeroProject = ({title, theme, subtitle, workDone, background}: TProps) => {
  const isDarkTheme = theme == 'light'
  if(isDarkTheme) useDarkThemeForHeader()

  return (
    <Section className={styles.hero}>
      <Background 
        classNameImage={styles.hero__image} 
        desktop={background.desktopSrc} 
        mobile={background.mobileSrc} 
        alt={background.alt}
        priority
        loading='eager'
      />
        <div className={styles.hero__content}>
          <Text className={`${styles.hero__title} ${isDarkTheme ? styles['hero__title--dark'] : ''}`} tag='h1' text={title} style={'big'}/>
          {subtitle && <Text className={`${styles.hero__subtitle} ${isDarkTheme ? styles['hero__subtitle--dark'] : ''}`} tag='h2' text={subtitle} style={'small'}/>}
          <p className={`${styles.hero__text} ${isDarkTheme ? styles['hero__text--dark'] : ''}`}>{workDone}</p>
        </div>
    </Section>
  )
}

export default HeroProject