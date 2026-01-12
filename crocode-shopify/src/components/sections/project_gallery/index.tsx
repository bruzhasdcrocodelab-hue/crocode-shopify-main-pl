'use client'

import styles from './styles.module.scss'

import { Section } from '@/components/ui'
import useScreenSize from '@/hooks/useScreenSize'
import { TImagesBigAndSmall } from '@/types/templates/image'
import Image from 'next/image'

type TProps = {
  image: TImagesBigAndSmall
}

const Gallery = ({image}: TProps) => {
  const images = {
    desktop: image.imageDesktop.asset.url,
    mobile: image.imageMobile.asset.url,
    alt: image.altText,
  }
  const {isSmallMobile} = useScreenSize()
  return (
    <Section className={styles.gallery}>
      <Image className={styles.gallery__image} src={isSmallMobile ? images.mobile : images.desktop} width={1920} height={1300} alt={image.altText}/>
    </Section>
  )
}

export default Gallery