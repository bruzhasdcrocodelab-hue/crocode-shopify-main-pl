'use client'

import Link from 'next/link'
import styles from './styles.module.scss'
import { TServicesGrouped } from '@/types'

type TProps = {
  servicesGrouped: TServicesGrouped;
  isDark?: boolean;
  onLinkClick?: () => void;
}

const ServicesDropdown = ({ servicesGrouped, isDark, onLinkClick }: TProps) => {
  const categories = Object.values(servicesGrouped).sort(
    (a, b) => (a.category.order || 0) - (b.category.order || 0)
  )

  return (
    <div className={styles.dropdown}>
      <div className={`${styles.dropdown__menu} ${styles.dropdown__menu_open}`}>
        <div className={styles.dropdown__grid}>
          {categories.map(({ category, services }) => (
            <div key={category._id} className={styles.dropdown__category}>
              <Link
                href={`/services/${category.slug.current}`}
                className={styles.dropdown__category_title}
                onClick={onLinkClick}
              >
                {category.categoryName}
              </Link>
              <ul className={styles.dropdown__list}>
                {services.map((service) => (
                  <li key={service._id} className={styles.dropdown__item}>
                    <Link
                      href={`/services/${service.slug.current}`}
                      className={styles.dropdown__link}
                      onClick={onLinkClick}
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesDropdown
