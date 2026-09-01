import { Node, mergeAttributes } from '@tiptap/core'

export const AparatVideo = Node.create({
  name: 'aparatVideo',
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
        tag: 'div[data-aparat-video]',
      },
    ]
  },
  renderHTML({ node }) {
    return [
      'div',
      mergeAttributes({
        'data-aparat-video': '',
        class: 'aparat-video',
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
