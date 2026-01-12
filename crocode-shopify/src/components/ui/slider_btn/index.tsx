import styles from './styles.module.scss'

import { ChevronIcon } from '@/components/icons'

type TBtnProps = {
  onClick: () => void;
  name: string;
  disabled: boolean;
  className?: string
}

const SliderBtn = ({onClick, name, disabled, className}: TBtnProps) => {
  return (
    <div className={`${styles.btn} ${className}`}>
      <button 
        type='button'
        disabled={disabled}
        className={styles.btn__inner} 
        onClick={onClick}
        aria-label={name}
      >
        <span className={styles.btn__icon}>
          <ChevronIcon/>
        </span>
      </button>
    </div>
  )
}

export default SliderBtn