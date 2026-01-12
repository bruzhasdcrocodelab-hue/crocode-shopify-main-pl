'use client'

import styles  from './styles.module.scss'

import Link from 'next/link'
import { Button, Burger, ServicesDropdown } from '@/components/ui'
import { useState, useEffect, useRef } from 'react'
import disableBodyScroll from '@/utils/disableBodyScroll'
import useScreenSize from '@/hooks/useScreenSize'
import { useHeaderTheme } from '@/contexts/HeaderThemeContext'
import { useTranslations } from 'next-intl'
import { TServicesGrouped } from '@/types'

type TNav = {
  text: string
  href: string
  hasDropdown?: boolean
}

type TProps = {
  servicesGrouped: TServicesGrouped;
}

const Header = ({ servicesGrouped }: TProps) => {
  const t = useTranslations('Header')
  const {theme, isDark, hasBackgroundImage} = useHeaderTheme()
  const {isMobile} = useScreenSize()
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
  const [servicesHover, setServicesHover] = useState<boolean>(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const NAV_LIST = [
    {
      key: 'our-work',
      text: t('nav.our-work'),
      href: '/our-work'
    },
    {
      key: 'services',
      text: t('nav.services'),
      href: '/services',
      hasDropdown: true
    },
    {
      key: 'about-us',
      text: t('nav.about-us'),
      href: '/our-work'
    },
    {
      key: 'contact',
      text: t('nav.contact'),
      href: '/contact'
    },
  ]

  const handleServicesEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setServicesHover(true)
  }

  const handleServicesLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesHover(false)
    }, 200)
  }

  useEffect(() => {
    disableBodyScroll({isDisabled: menuIsOpen})
    return () => disableBodyScroll({remove: true})
  }, [menuIsOpen])

  useEffect(() => {
    if (!isMobile) {
      setMenuIsOpen(false)
    }
    return (() => {
      setMenuIsOpen(false)
    })
  }, [isMobile])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])
  
  return (
    <header
    className={`${styles.header}
    ${isDark ? styles[`header--dark`] : styles[`header--light`]}
    ${hasBackgroundImage ? styles[`header--has-bg-image`] : ''}
    ${menuIsOpen ? styles[`header--menu-open`] : styles[`header--menu-hidden`]}`
    }>
      <div className={styles.header__inner}>
        <Link href={'/'} onClick={() => setMenuIsOpen(false)}>
          <span className={styles.header__logo}>Crocode</span>
        </Link>
        <div className={`${styles.header__menu} ${menuIsOpen ? styles[`header__menu--open`] : ''}`}>
           <nav className={styles.header__nav}>
            {NAV_LIST.map((item, i) => (
              <li
                className={styles.header__nav_item}
                key={i}
                onMouseEnter={() => item.hasDropdown && handleServicesEnter()}
                onMouseLeave={() => item.hasDropdown && handleServicesLeave()}
              >
                <Link
                  className={styles.header__nav_link}
                  onClick={() => setMenuIsOpen(false)}
                  href={item.href}
                >
                  {item.text}
                </Link>
                {item.hasDropdown && !isMobile && servicesHover && (
                  <div onMouseEnter={handleServicesEnter} onMouseLeave={handleServicesLeave}>
                    <ServicesDropdown
                      servicesGrouped={servicesGrouped}
                      isDark={isDark}
                      onLinkClick={() => setServicesHover(false)}
                    />
                  </div>
                )}
              </li>
            ))}
          </nav>
          <Button className={styles.header__button} as='link' href='/contact' styleType='secondary' text='Get in Touch'/>
        </div>
        <Burger className={styles.header__burger} theme={theme} isActive={menuIsOpen} setIsActive={() => setMenuIsOpen(!menuIsOpen)}/>
      </div>
    </header>
  )
}

export default Header