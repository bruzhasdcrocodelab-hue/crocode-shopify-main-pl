'use client'

import styles from './styles.module.scss'

import { Section, MapboxMap, Text } from '@/components/ui'
import { useTranslations } from 'next-intl';

const MAP_DATA = {
  center: [22.019343, 50.020982] as [number, number],
  style: 'mapbox://styles/mapbox/streets-v12',
  zoom: 12,
  markers: [
    {
      icon: '/images/marker.svg',
      coordinates: [22.019343, 50.020982] as [number, number],
      popup: 'al. Tadeusza Rejtana 53A/303 35-326 Rzeszów, Poland',
    },
  ],
};

const MapSection = () => {
  const t = useTranslations('ContactPage.map');
  return (
    <Section className={styles.section}>
      <div className={styles.section__header}>
        <Text className={styles.section__title} tag='h2' text={t('title')} style='big'/>
        <p className={styles.section__address}>{t('address')}</p>
      </div>
      <div className={styles.map}>
        <MapboxMap map={MAP_DATA}/>
      </div>
    </Section>
  )
}

export default MapSection