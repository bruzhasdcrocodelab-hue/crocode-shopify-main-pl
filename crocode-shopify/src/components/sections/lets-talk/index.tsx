import styles from './styles.module.scss'

import { Button, ProjectCardSecondary, Section, Text } from '@/components/ui'
import { getLocale, getTranslations } from 'next-intl/server';
import { fetchGraphQL } from '@/lib/sanity/graphql';
import { getProjects } from '@/lib/sanity/queries/projects';
import { TProjectCard } from '@/types';

const LetsTalk = async () => {
  const t = await getTranslations('AboutUsPage.lets-talk');
  const locale: string = await getLocale()
  const { data: projectsData } = await fetchGraphQL(getProjects(locale));
  const projects: TProjectCard[] = projectsData?.allProjects || [];

  return (
    <Section className={styles.talk}>
      <div className={styles.talk__inner}>
        <div className={styles.talk__info}>
          <div className={styles.talk__info_content}>
            <Text className={styles.talk__title} tag='h2' text={t('title')} style='big'/>
            <p className={styles.talk__description}>{t('description')}</p>
          </div>
          <Button className={styles.talk__button} as='link' href='/contact' text={t('button.text')}/>
        </div>
        <div className={styles.talk__cards}>
          <ProjectCardSecondary className={styles.talk__card} project={projects[0]} type={'long'}/>
          <ProjectCardSecondary className={styles.talk__card} project={projects[1]} type={'wide'}/>
        </div>
      </div>
    </Section>
  )
}

export default LetsTalk