import { getUnified } from '#/components/farsi-rich-text-editor/helpers/emoji.ts'
import { NodeViewWrapper } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import { Emoji as EmojiRenderer, EmojiStyle } from 'emoji-picker-react'

export const EmojiNodeView = ({ node }: NodeViewProps) => {
  const emoji = node.attrs.emoji as string

  return (
    <NodeViewWrapper as="span">
      <EmojiRenderer
        unified={getUnified(emoji)}
        emojiStyle={EmojiStyle.APPLE}
        size={22}
      />
    </NodeViewWrapper>
  )
}
