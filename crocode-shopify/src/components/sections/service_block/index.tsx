'use client'

import styles from './styles.module.scss'
import { Button } from '@/components/ui'
import { TServiceCard } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

type TProps = {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  services: TServiceCard[];
  buttonText: string;
  buttonHref: string;
  id: string;
}

const ServiceBlock = ({ title, description, imageUrl, imageAlt, services, buttonText, buttonHref, id }: TProps) => {
  const paragraphs = description.split('\n\n').filter(p => p.trim())

  return (
    <div className={styles.serviceBlock} id={id}>
      <div className={styles.serviceBlock__inner}>
        <h2 className={styles.serviceBlock__title}>{title}</h2>
        <div className={styles.serviceBlock__tags}>
          {services.map((service) => (
            <Link
              key={service._id}
              href={`/services/${service.slug.current}`}
              className={styles.serviceBlock__tag}
            >
              {service.title}
            </Link>
          ))}
        </div>
        <div className={styles.serviceBlock__video} style={{ position: 'relative', overflow: 'hidden' }}>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={imageAlt || title}
              fill
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
        <div className={styles.serviceBlock__content}>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.serviceBlock__description}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className={styles.serviceBlock__buttonBlock}>
            <Button
              as='link'
              href={buttonHref}
              text={buttonText}
              styleType='primary'
              className={styles.serviceBlock__button}
            />
          </div>
      </div>
    </div>
  )
}

export default ServiceBlock
