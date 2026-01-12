import styles from './styles.module.scss'

type TProps = {
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4'| 'p';
  text: string;
  style?: 'small' | 'big' | string
}

const Text = ({className, tag = 'p', text, style}: TProps) => {
  const Tag = tag;
  
  return (
    <Tag className={`${styles.title} ${styles[`title--${style}`]} ${styles[tag]} ${className || ''}`}>
      {text}
    </Tag>
  )
}

export default Text