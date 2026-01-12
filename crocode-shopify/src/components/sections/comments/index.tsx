'use client'

import styles from './styles.module.scss'

import { useState, useEffect, useCallback } from 'react'
import { BtkIcon } from '@/components/icons'
import { Comment, Section, SliderBtn, Text } from '@/components/ui'
import useEmblaCarousel from 'embla-carousel-react'
import { useTranslations } from 'next-intl'
import { splitTextIntoParagraphs } from '@/utils/parseTextContent'

const Comments = () => {
  const t = useTranslations('HomePage.comments')
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const commentKey = ['items.item1', 'items.item2', 'items.item3', 'items.item4']
  const COMMENTS = commentKey.map(key => ({
      text: t(`${key}.text`),
      author: t(`${key}.author`),
      project: t(`${key}.project`)
    }))

  const textParagraphs = splitTextIntoParagraphs(t('text'));

    useEffect(() => {
      if (!emblaApi) return;

      const updateButtons = () => {
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
      };

      updateButtons();
      emblaApi.on('select', updateButtons);
      emblaApi.on('reInit', updateButtons);

      return () => {
        emblaApi.off('select', updateButtons);
        emblaApi.off('reInit', updateButtons);
      };
    }, [emblaApi]);

  return (
    <Section className={styles.comments}>
      <div className={styles.comments__inner}>
        <Text className={styles.comments__title} tag='h2' text={t('title')} style='big'/>
        <div className={styles.comments__texts}>
          {textParagraphs.map((paragraph, index) => (
            <p key={index} className={styles.comments__text}>{paragraph}</p>
          ))}
        </div>
        <div className={styles.slider}>
          <div className={styles.slider__comment}>
            <div className={styles.slider__comment_btk}>
              <BtkIcon/>
              <BtkIcon/>
            </div>
            <div className={styles.slider__comment_btk}>
              <BtkIcon/>
              <BtkIcon/>
            </div>
            <div className={styles.embla} ref={emblaRef}>
              <div className={styles.embla__container}>
                {COMMENTS.map((item, i) => 
                  <div className={styles.embla__slide} key={i}>
                    <Comment {...item}/>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.slider__buttons}>
            <SliderBtn
              name='prev'
              disabled={!canScrollPrev}
              onClick={scrollPrev}
            />
            <SliderBtn
              name='next'
              disabled={!canScrollNext}
              onClick={scrollNext}
            />
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Comments