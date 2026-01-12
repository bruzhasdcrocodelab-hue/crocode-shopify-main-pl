import styles from './styles.module.scss'

import Image from 'next/image'
import ButtonArrow from '../../button_arrow'
import { TProjectCard } from '@/types'

type TProps = {
  className?: string
  type: 'long' | 'wide'
  project: TProjectCard | undefined
}

const ProjectCardSecondary = ({type, project, className}: TProps) => {
  return (
    <div className={`${styles.card} ${styles[`card--${type}`]} ${className}`}>
      <div className={styles.card__inner}>
        <Image className={styles.card__background} src={project?.cardImage.image.asset.url || ''} fill alt={project?.cardImage.altText || ''}/>
        <ButtonArrow className={styles.card__link} hover as='link' href={`/our-work/${project?.slug.current}`} size='xl'/>
      </div>
    </div>
  )
}

export default ProjectCardSecondary