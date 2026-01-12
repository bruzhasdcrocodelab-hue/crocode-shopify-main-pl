import styles from './styles.module.scss'

import { MarkIcon } from '@/components/icons';

type Props = {
  classNameContainer?: string;
  classNameError?: string;
  classNameItem?: string;
  label: string;
  errorText?: string;
}

type TInput = Props &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof Props> & {
    as: 'input';
  };

type TTextArea = Props &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, keyof Props> & {
    as: 'textarea';
  };

type TCheckbox = Props &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof Props | 'placeholder'> & {
    as: 'checkbox';
    isActive: boolean;
    handlerToggle: () => void;
  };

type TProps = TInput | TTextArea | TCheckbox

const Input = ({as, classNameContainer, classNameError, classNameItem, label, errorText = '', ...props}: TProps) => {
  if(as === 'checkbox') {
    const { isActive, handlerToggle} = props as TCheckbox
    return (
      <div className={`${styles.checkbox} ${classNameContainer}`}>
        <div className={styles.checkbox__inner}>
          <button 
          type='button'
          onClick={handlerToggle} 
          className={`${styles.checkbox__main} ${isActive ? styles['checkbox__main--active'] : styles['checkbox__main--hidden']}`}
          >
            <MarkIcon/>
          </button>
          <span className={styles.checkbox__label}>{label}</span>
        </div>
        <span className={`${styles.error} ${errorText ? styles['error--active'] : styles['error--hidden']}`}>{errorText}</span>
      </div>
    )
  }

  return (
    <label className={`${styles.input} ${classNameContainer}`}>
      <span className={styles.input__label}>{label}</span>
      {as === 'input' ? (
        <input className={`${styles.input__input} ${classNameItem}`} {...props as TInput}/>
      )
      : as === 'textarea' ? (
        <textarea className={`${styles.input__input} ${classNameItem}`} {...props as TTextArea}></textarea>
      )
      : null
      }
      <span className={`${styles.error} ${errorText ? styles['error--active'] : styles['error--hidden']}`}>{errorText}</span>
    </label>
  )
}

export default Input