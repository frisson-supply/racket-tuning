import { MediaBlock } from '@/features/page-builder/blocks/media-block/component'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/features/page-builder/blocks/code/component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/features/page-builder/blocks/banner/component'
import { CallToActionBlock } from '@/features/page-builder/blocks/call-to-action/component'
import { cn } from '@/utilities/cn'
import styles from './rich-text.module.css'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    banner: ({ node }) => <BannerBlock className={styles['block-banner']} {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        imgClassName={styles['block-media-image']}
        {...node.fields}
        captionClassName={styles['block-media-caption']}
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className={styles.blockCode} {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const RichText: React.FC<Props> = (props) => {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        enableGutter ? 'container' : styles.noGutter,
        enableProse && styles.prose,
        className,
      )}
      {...rest}
    />
  )
}
