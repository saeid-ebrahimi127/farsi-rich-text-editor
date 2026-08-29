import { EmojiNodeView } from '#/components/farsi-rich-text-editor/components/emoji-node-view.tsx'
import { Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

export const Emoji = Node.create({
  name: 'emoji',
  inline: true,
  group: 'inline',
  atom: true,
  selectable: true,
  addAttributes() {
    return {
      emoji: {
        default: '',
      },
    }
  },
  parseHTML() {
    return [
      {
        tag: 'span[data-emoji]',
        getAttrs: (el) => ({
          emoji: el.getAttribute('data-emoji'),
        }),
      },
    ]
  },
  renderHTML({ node }) {
    return [
      'span',
      {
        'data-emoji': node.attrs.emoji,
      },
      node.attrs.emoji,
    ]
  },
  addNodeView() {
    return ReactNodeViewRenderer(EmojiNodeView)
  },
})
