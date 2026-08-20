'use client'

import type { AboutUsSectionBlock as AboutUsSectionBlockProps } from '@/payload-types'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import React from 'react'
import { ServiceCard } from './service-card'
import styles from './about-us-section.module.css'

type Props = {
  cards: AboutUsSectionBlockProps['cards']
  cardsTitle?: AboutUsSectionBlockProps['cardsTitle']
}

export const ServiceCards: React.FC<Props> = ({ cards, cardsTitle }) => {
  const items = cards || []

  return (
    <>
      <div className={styles.grid}>
        {items.map((card, i) => (
          <ServiceCard card={card} key={i} />
        ))}
      </div>
      <div className={styles['carousel-wrap']}>
        <Carousel opts={{ align: 'start' }}>
          <div className={styles['carousel-header']}>
            {cardsTitle && <p className={styles['carousel-title']}>{cardsTitle}</p>}
            <div className={styles['carousel-nav']}>
              <CarouselPrevious style={{ position: 'static', translate: 'none' }} />
              <CarouselNext style={{ position: 'static', translate: 'none' }} />
            </div>
          </div>
          <CarouselContent>
            {items.map((card, i) => (
              <CarouselItem key={i} style={{ flexBasis: 'min(20rem, 85%)' }}>
                <ServiceCard card={card} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  )
}
