import styles from './styles.module.scss'

type TProps = {
  className?: string;
  number: string;
  title: string;
  description: string;
}

const CardIndustry = ({ className, number, title, description}: TProps) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <span className={styles.card__number}>{number}</span>
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>{title}</h3>
        <p className={styles.card__description}>{description}</p>
      </div>
    </div>
  )
}

export default CardIndustry