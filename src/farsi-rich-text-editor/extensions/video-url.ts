import { Node, mergeAttributes } from '@tiptap/core'

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

  parseHTML() {
    return [
      {
        tag: 'div.video-wrapper',
        getAttrs: (element) => {
          if (!(element instanceof HTMLElement)) {
            return false
          }

          const video = element.querySelector('video[data-video-url]')

          if (!video) {
            return false
          }

          return {
            src: video.getAttribute('src'),
          }
        },
      },
    ]
  },

  renderHTML({ node }) {
    return [
      'div',
      mergeAttributes({
        class: 'video-wrapper',
      }),
      [
        'video',
        {
          'data-video-url': '',
          class: 'video-url',
          src: node.attrs.src,
          controls: 'true',
          playsinline: 'true',
        },
      ],
    ]
  },
})
