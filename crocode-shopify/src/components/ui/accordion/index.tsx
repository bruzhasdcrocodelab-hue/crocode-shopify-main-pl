'use client'

import styles from './styles.module.scss'

import ButtonArrow from '../button_arrow'
import { useRef } from 'react'

type TProps = {
  isOpen: boolean;
  handlerToggle: () => void 
}

const Accordion = ({isOpen = false, handlerToggle}: TProps) => {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.accordion}>
      <div className={styles.accordion__header} onClick={handlerToggle}>
        <p className={styles.accordion__title}>New build projects</p>
        <ButtonArrow as='button' size='lg' isActive={isOpen}/>
      </div>
      <div 
        className={styles.accordion__content}
        style={
        isOpen && contentRef.current 
          ? { height: contentRef.current.scrollHeight, opacity: 1 } 
          : { height: '0px', opacity: 0 }
      }
      >
        <div className={styles.accordion__content_inner} ref={contentRef}>
          <p className={styles.accordion__content_name}>Shopify Agency</p>
          <p className={styles.accordion__content_text}>We partner with brands to design, develop, launch & grow ecommerce stores to amplify growth.
We are an accredited Shopify Agency that partners with brands to launch Shopify & Shopify Plus stores. Combining creative and engaging design with leading Shopify development & technical expertise, we design and build bespoke Shopify stores alongside your brand strategy. Alternatively, we support merchants in choosing pre-built Shopify themes and provide customisation services.</p>
          <p className={styles.accordion__content_text}>Our foundations are based on growth-focused Shopify web design creativity alongside our wealth of experience in delivering cutting-edge technology. Our in-house developers build world-class e-commerce solutions, our work has won multiple awards. We support brands, in a wide range of sectors & industries all around the world, to strategically launch custom Shopify & Shopify Plus stores with outstanding communication, care, skill & of course our people-first values. We pride our approach to delivery that's on budget and on time.</p>
        </div>
      </div>
    </div>
  )
}

export default Accordion