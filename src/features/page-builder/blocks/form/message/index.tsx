import { RichText } from '@/components/common/rich-text'
import React from 'react'

import { Width } from '../width'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import styles from '../form-block.module.css'

export const Message: React.FC<{ message: SerializedEditorState }> = ({ message }) => {
  return (
    <Width className={styles.messageWrap} width="100">
      {message && <RichText data={message} />}
    </Width>
  )
}
