'use client'

import styles from './styles.module.scss'
import { Section, Text, VideoPlayer } from '@/components/ui'
import useScreenSize from '@/hooks/useScreenSize'
import { useTranslations } from "next-intl"

type TProps = {
  videoUrl?: string;
  videoUrlMobile?: string;
  videoTitle?: string;
  isDark?: boolean;
}

const VideoSection = ({ videoUrl, videoUrlMobile, videoTitle, isDark }: TProps) => {
  const t = useTranslations('ServicePage.VideoSection')
  const { isMobile } = useScreenSize()

  const title = videoTitle || t('videoTitle')
  const currentUrl = (isMobile && videoUrlMobile) ? videoUrlMobile : (videoUrl || '')

  if (!currentUrl) return null

  if (isDark) {
    return (
      <div className={`${styles.video} ${styles['video--dark']}`}>
        <div className={styles.video__inner}>
          <Text
            className={`${styles.video__title} ${styles['video__title--dark']}`}
            tag='h2'
            text={title}
            style='big'
          />
          <VideoPlayer
            url={currentUrl}
            title={title}
          />
        </div>
      </div>
    )
  }

  return (
    <Section className={styles.video} type='rounded' shift>
      <div className={styles.video__inner}>
        <Text
          className={styles.video__title}
          tag='h2'
          text={title}
          style='big'
        />
        <VideoPlayer
          url={currentUrl}
          title={title}
        />
      </div>
    </Section>
  )
}

export default VideoSection
