import styles from './styles.module.scss'

import { Section, Background } from '@/components/ui'
import Image from 'next/image'
import { TSolution } from '@/types/templates/project'

type TProps = {
  solution: TSolution
}

const CaseStudyDetails = ({solution}: TProps) => {
  return (
    <Section className={styles.details}>
      <div className={styles.details__inner}>
        <p className={styles.details__description}>{solution.solutionText}</p>
        <Image className={styles.details__image} src={solution.projectScreenshot.image.asset.url} width={1920} height={1300} alt={solution?.projectScreenshot.altText ?? 'Project Screenshot'}/>
      </div>
    </Section>
  )
}

export default CaseStudyDetails