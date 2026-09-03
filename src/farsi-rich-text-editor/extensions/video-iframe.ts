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
        tag: 'div.video-wrapper',
        getAttrs: (element) => {
          if (!(element instanceof HTMLElement)) {
            return false
          }

          const video = element.querySelector('div[data-video-iframe]')

          if (!video) {
            return false
          }

          const iframe = video.querySelector('iframe')

          return {
            src: iframe?.getAttribute('src') ?? null,
            provider: video.getAttribute('data-provider') ?? null,
          }
        },
      },
    ]
  },

  renderHTML({ node }) {
    return [
      'div',
      {
        class: 'video-wrapper',
      },
      [
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
      ],
    ]
  },
})
