import styles from './styles.module.scss'

type TProps = {
  text: string;
  author: string;
  project: string;
}

const Comment = ({text, author, project}: TProps) => {
  return (
    <div className={styles.comment}>
      <div className={styles.comment__inner}>
        <p className={styles.comment__text}>{text}</p>
        <span className={styles.comment__author}>{author}</span>
        <span className={styles.comment__project}>{project}</span>
      </div>
    </div>
  )
}

export default Comment