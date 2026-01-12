import styles from './styles.module.scss'

import ButtonArrow from '../../button_arrow'

type TProps = {
  className?: string;
  number: string;
  title: string;
  description: string;
  mask: 'wide' | 'toll'
}

const ServicesCard = ({className, number, mask, title, description}: TProps) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <ButtonArrow as='link' href='/services' size='service' hover className={styles.card__arrow}/>
      <div className={`${styles.card__inner} ${styles[`card__inner--${mask}`]}`}>
        <span className={styles.card__number}>{number}</span>
        <div className={styles.card__content}>
          <h3 className={styles.card__title}>{title}</h3>
          <p className={styles.card__description}>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default ServicesCard