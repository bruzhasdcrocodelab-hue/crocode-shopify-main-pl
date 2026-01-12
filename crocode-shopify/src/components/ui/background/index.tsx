'use client'

import styles from './styles.module.scss'

import Image from 'next/image'
import { TBackground } from '@/types'
import useScreenSize from '@/hooks/useScreenSize'

type TProps = TBackground & {
  className?: string;
  classWrapper?: string
  classNameImage?: string
  priority?: boolean;
  loading?: "eager" | "lazy" | undefined;
}

const Background = ({
  desktop,
  mobile, 
  alt, 
  priority = false,
  loading = 'lazy',
  className, 
  classWrapper, 
  classNameImage
  }: TProps) => {
  const {isSmallMobile} = useScreenSize()
  return (
    <div className={`${styles.wrapper} ${classWrapper}`}>
      <div className={`${styles.image} ${classNameImage}`}>
        <Image 
          className={`${styles.background} ${className}`} 
          priority={!!priority}
          loading={loading}
          src={isSmallMobile && mobile  ? mobile : desktop} 
          fill
          alt={alt}
        />
      </div>
    </div>
  )
}

export default Background