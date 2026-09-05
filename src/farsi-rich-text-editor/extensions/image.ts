import { ImageNodeView } from '#/farsi-rich-text-editor/components/image-node-view.tsx'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

export const Image = Node.create({
  name: 'image',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      fullWidth: {
        default: false,
        parseHTML: (element) =>
          element.getAttribute('data-full-width') === 'true',
        renderHTML: (attributes) => ({
          'data-full-width': attributes.fullWidth,
        }),
      },
    }
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        class: `image-wrapper relative mb-[2em] ${
          node.attrs.fullWidth ? 'w-full' : 'mx-auto w-fit max-w-full'
        }`,
      }),
      [
        'img',
        {
          src: node.attrs.src,
          alt: node.attrs.alt,
          class: node.attrs.fullWidth ? 'w-full' : 'max-w-full',
        },
      ],
    ]
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView)
  },
})
