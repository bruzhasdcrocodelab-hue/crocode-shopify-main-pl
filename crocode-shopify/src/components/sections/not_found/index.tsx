import styles from './styles.module.scss'

import { Button, Background } from '@/components/ui'

const NotFound = () => {
  return (
    <section className={styles.section}>
      <Background desktop='/images/background/bg_hero.webp' mobile='/images/background/bg_hero_mobile.webp'alt='Image background'/>
      <div className={styles.section__inner}>
        <h1 className={styles.section__title}>404</h1>
        <Button as='link' href='/' text='return to home'/>
      </div>
    </section>
  )
}

export default NotFound