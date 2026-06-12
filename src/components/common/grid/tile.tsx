import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/common/media'
import { Label } from '@/components/common/grid/label'
import { cn } from '@/utilities/cn'
import React from 'react'
import styles from './tile.module.css'

type Props = {
  active?: boolean
  isInteractive?: boolean
  label?: {
    amount: number
    position?: 'bottom' | 'center'
    title: string
  }
  media: MediaType
}

export const GridTileImage: React.FC<Props> = ({
  active,
  isInteractive = true,
  label,
  ...props
}) => {
  return (
    <div
      className={cn(
        styles.tile,
        active && styles['tile--active'],
        label && styles['tile--relative'],
      )}
    >
      {props.media ? (
        <Media
          className={cn(styles.media, isInteractive && styles['media--interactive'])}
          height={80}
          imgClassName="h-full w-full object-cover"
          resource={props.media}
          width={80}
        />
      ) : null}
      {label ? <Label amount={label.amount} position={label.position} title={label.title} /> : null}
    </div>
  )
}
