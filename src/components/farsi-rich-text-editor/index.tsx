import { FRTE_Content } from '#/components/farsi-rich-text-editor/content.tsx'
import { AparatVideo } from '#/components/farsi-rich-text-editor/extensions/aparat-video.ts'
import { CustomCodeBlock } from '#/components/farsi-rich-text-editor/extensions/custom-code-block.ts'
import { FRTE_Footer } from '#/components/farsi-rich-text-editor/footer.tsx'
import { appleEmojis } from '#/components/farsi-rich-text-editor/helpers/emoji.ts'
import { FRTE_Toolbar } from '#/components/farsi-rich-text-editor/toolbar/index.tsx'
import { CharacterCount } from '@tiptap/extension-character-count'
import { Emoji } from '@tiptap/extension-emoji'
import { Highlight } from '@tiptap/extension-highlight'
import { Link } from '@tiptap/extension-link'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TableKit } from '@tiptap/extension-table'
import { TextAlign } from '@tiptap/extension-text-align'
import { Color, TextStyle } from '@tiptap/extension-text-style'
import { useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { all, createLowlight } from 'lowlight'

const lowlight = createLowlight(all)

lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

export const FarsiRichTextEditor = ({
  autofocus = false,
}: {
  autofocus?: boolean
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        heading: { levels: [2, 3, 4, 5, 6] },
        codeBlock: false,
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      CharacterCount,
      Superscript,
      Subscript,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TableKit.configure({
        table: {
          resizable: false,
        },
      }),
      AparatVideo,
      Emoji.configure({
        emojis: appleEmojis,
      }),
      CustomCodeBlock.configure({
        lowlight,
      }),
    ],
    editorProps: {
      handleClick(_, _2, event) {
        const target = event.target as HTMLElement

        if (target.tagName === 'A' || target.closest('a')) {
          event.preventDefault()

          return true
        }

        return false
      },
    },
    autofocus,
    immediatelyRender: false,
    textDirection: 'rtl',
  })

  if (!editor) return null

  return (
    <>
      <FRTE_Toolbar editor={editor} />
      <FRTE_Content editor={editor} />
      <FRTE_Footer editor={editor} />
    </>
  )
}
