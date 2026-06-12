import { ArchiveBlock } from '@/features/page-builder/blocks/archive-block/component'
import { BannerBlock } from '@/features/page-builder/blocks/banner/component'
import { CallToActionBlock } from '@/features/page-builder/blocks/call-to-action/component'
import { CarouselBlock } from '@/features/page-builder/blocks/carousel/component'
import { ContentBlock } from '@/features/page-builder/blocks/content/component'
import { FormBlock } from '@/features/page-builder/blocks/form/component'
import { MediaBlock } from '@/features/page-builder/blocks/media-block/component'
import { ThreeItemGridBlock } from '@/features/page-builder/blocks/three-item-grid/component'
import { toKebabCase } from '@/utilities/to-kebab-case'
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

const blockComponents = {
  archive: ArchiveBlock,
  banner: BannerBlock,
  carousel: CarouselBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  threeItemGrid: ThreeItemGridBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore - weird type mismatch here */}
                  <Block id={toKebabCase(blockName!)} {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
