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
        tag: 'video[data-video-url]',
      },
    ]
  },
  renderHTML({ node }) {
    return [
      'video',
      mergeAttributes({
        'data-video-url': '',
        class: 'video-url',
        src: node.attrs.src,
        controls: 'true',
        playsinline: 'true',
      }),
    ]
  },
})
