import styles from './styles.module.scss'

type TProps = {
  children: React.ReactNode;
  className?: string;
  type?: 'rounded';
  shift?: boolean;
  isBlack?: boolean;
}

const Section = ({children, type, shift = false, isBlack = false, className}: TProps) => {
  return (
    <section className={`
    ${styles.section} 
    ${type ? styles[`section--${type}`] : ''}
    ${shift ? styles[`section--shift`] : ''} 
    ${isBlack ? styles[`section--black`] : ''} 
    ${className}
    `}>
      {children}
    </section>
  )
}

export default Section