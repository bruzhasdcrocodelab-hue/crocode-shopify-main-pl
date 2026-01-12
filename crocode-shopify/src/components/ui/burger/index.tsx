import styles from './styles.module.scss';

type TProps = {
  theme?: string
  isActive: boolean;
  setIsActive?: (value: boolean) => void;
  className?: string;
}

const Burger = ({ isActive, setIsActive = () =>{}, className = '', theme }: TProps) => {
  return (
    <button 
      className={`${styles.burger} ${isActive ? styles['burger--active'] : ''} ${className}`}
      onClick={() => setIsActive(!isActive)}
      aria-label={isActive ? 'Close menu' : 'Open menu'}
      aria-expanded={isActive}
    >
      <span className={styles.burger__inner}>
        <span className={`${styles.burger__line} ${theme ? styles[`burger__line--${theme}`] : ''}`}/>
      </span>
    </button>
  )
}

export default Burger;