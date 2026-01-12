import styles from './styles.module.scss'

type TProps = {
  text: string;
  isActive?: boolean
  onClick: () => void
}

const Tag = ({text, isActive = false, onClick }: TProps) => {
  return (
    <button type='button' className={`${styles.tag} ${isActive ? styles['tag--active'] : ''}`} onClick={onClick}>
      <span className={styles.tag__text}>{text}</span>
    </button>
  )
}

export default Tag