import { AudioNodeView } from '#/farsi-rich-text-editor/components/audio-node-view.tsx'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

export const Audio = Node.create({
  name: 'audio',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      src: {
        default: null,
      },
    }
  },
  renderHTML({ node }) {
    return [
      'div',
      mergeAttributes({
        class: 'audio-wrapper relative mx-auto mb-[2em] max-w-xl',
      }),
      [
        'audio',
        {
          src: node.attrs.src,
          controls: 'true',
          class: 'w-full',
        },
      ],
    ]
  },
  addNodeView() {
    return ReactNodeViewRenderer(AudioNodeView)
  },
})
