import { VideoIFrameNodeView } from '#/farsi-rich-text-editor/components/video-iframe-node-view.tsx'
import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

export const VideoIFrame = Node.create({
  name: 'videoIFrame',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      src: {
        default: null,
      },
      provider: {
        default: null,
      },
    }
  },
  renderHTML({ node }) {
    return [
      'div',
      mergeAttributes({
        'data-provider': node.attrs.provider,
        class:
          'video-wrapper relative mx-auto my-[2em] aspect-video w-full max-w-3xl',
      }),
      [
        'iframe',
        {
          src: node.attrs.src,
          allowfullscreen: 'true',
          webkitallowfullscreen: 'true',
          mozallowfullscreen: 'true',
          frameborder: '0',
          class: 'absolute inset-0 h-full w-full border-0',
        },
      ],
    ]
  },
  addNodeView() {
    return ReactNodeViewRenderer(VideoIFrameNodeView)
  },
})
