import styles from './styles.module.scss'

import { Section, Article } from '@/components/ui'
import { TArticles } from '@/types'

type TProps = {
  articles: TArticles[]
}

const ArticlesSection = ({articles}: TProps) => {
  console.log(articles)
  return (
    <Section className={styles.articles}>
      <div className={styles.articles__inner}>
        <div className={styles.articles__list}>
          {articles?.map((article, i) => 
            <Article article={article} key={i}/>
          )}
        </div>
      </div>
    </Section>
  )
}

export default ArticlesSection