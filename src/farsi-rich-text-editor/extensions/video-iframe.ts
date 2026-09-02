import { Node, mergeAttributes } from '@tiptap/core'

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
  parseHTML() {
    return [
      {
        tag: 'div[data-video-iframe]',
      },
    ]
  },
  renderHTML({ node }) {
    return [
      'div',
      mergeAttributes({
        'data-video-iframe': '',
        'data-provider': node.attrs.provider,
        class: 'video-iframe',
      }),
      [
        'iframe',
        {
          src: node.attrs.src,
          allowfullscreen: 'true',
          webkitallowfullscreen: 'true',
          mozallowfullscreen: 'true',
          frameborder: '0',
        },
      ],
    ]
  },
})
