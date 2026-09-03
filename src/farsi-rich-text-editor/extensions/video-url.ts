import { VideoURLNodeView } from '#/farsi-rich-text-editor/components/video-url-node-view.tsx'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

export const VideoURL = Node.create({
  name: 'videoURL',
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
        class: 'video-wrapper relative mx-auto aspect-video w-full max-w-3xl',
      }),
      [
        'video',
        {
          src: node.attrs.src,
          controls: 'true',
          playsinline: 'true',
        },
      ],
    ]
  },
  addNodeView() {
    return ReactNodeViewRenderer(VideoURLNodeView)
  },
})
