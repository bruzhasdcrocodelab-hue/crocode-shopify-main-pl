import styles from './styles.module.scss'

type TProps = {
  className?: string
  name: string;
  text: string;
}

const ResultCard = ({name, text, className}: TProps) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.card__inner}>
        <h3 className={styles.card__name}>{name}</h3>
        <span className={styles.card__text}>{text}</span>
      </div>
    </div>
  )
}

export default ResultCard