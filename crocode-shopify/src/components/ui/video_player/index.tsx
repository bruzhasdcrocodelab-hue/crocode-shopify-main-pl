'use client'

import styles from './styles.module.scss'
import { useState } from 'react'

type TProps = {
  url: string;
  title: string;
  className?: string;
}

const VideoPlayer = ({url, title, className}: TProps) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const getEmbedUrl = (url: string): string => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1]
      return `https://www.youtube.com/embed/${videoId}`
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1]
      return `https://player.vimeo.com/video/${videoId}`
    }
    return url
  }

  return (
    <div className={`${styles.player} ${className || ''}`}>
      <div className={styles.player__wrapper}>
        {/* {isPlaying ? ( */}
          <iframe
            className={styles.player__iframe}
            src={getEmbedUrl(url)}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        {/* ) : (
          <div
            className={styles.player__preview}
            onClick={() => setIsPlaying(true)}
          >
            <button className={styles.player__playBtn}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="white" fillOpacity="0.9"/>
                <path d="M32 26L54 40L32 54V26Z" fill="black"/>
              </svg>
            </button>
            <div className={styles.player__overlay}></div>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default VideoPlayer
