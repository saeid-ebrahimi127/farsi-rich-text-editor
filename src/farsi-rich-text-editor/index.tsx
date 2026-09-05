import { SimpleLoading } from '#/components/simple-loading.tsx'
import { Button } from '#/components/ui/button.tsx'
import { FRTE_Content } from '#/farsi-rich-text-editor/content.tsx'
import { Audio } from '#/farsi-rich-text-editor/extensions/audio.ts'
import { RtlColumnResizing } from '#/farsi-rich-text-editor/extensions/column-resizing.ts'
import { CustomCodeBlock } from '#/farsi-rich-text-editor/extensions/custom-code-block.ts'
import { Image } from '#/farsi-rich-text-editor/extensions/image.ts'
import { RtlTableArrowNavigation } from '#/farsi-rich-text-editor/extensions/rtl-table-arrow-navigation.ts'
import { VideoIFrame } from '#/farsi-rich-text-editor/extensions/video-iframe.ts'
import { VideoURL } from '#/farsi-rich-text-editor/extensions/video-url.ts'
import { FRTE_Footer } from '#/farsi-rich-text-editor/footer.tsx'
import { FRTE_Toolbar } from '#/farsi-rich-text-editor/toolbar/index.tsx'
import { CharacterCount } from '@tiptap/extension-character-count'
import { Highlight } from '@tiptap/extension-highlight'
import { Link } from '@tiptap/extension-link'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TableKit } from '@tiptap/extension-table'
import { TextAlign } from '@tiptap/extension-text-align'
import {
  Color,
  FontSize,
  LineHeight,
  TextStyle,
} from '@tiptap/extension-text-style'
import { useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { EyeIcon, PencilIcon } from 'lucide-react'
import { useState } from 'react'
import { lowlight } from './utils/lowlight'

export const FarsiRichTextEditor = ({
  autofocus = false,
}: {
  autofocus?: boolean
}) => {
  const [showPreview, setShowPreview] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        heading: { levels: [2, 3, 4, 5, 6] },
        codeBlock: false,
      }),

      TextStyle,
      Color,
      FontSize,
      LineHeight,

      Highlight.configure({ multicolor: true }),
      CharacterCount,
      Superscript,
      Subscript,

      Link.configure({
        openOnClick: false,
        autolink: true,
      }),

      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),

      TableKit.configure({
        table: {
          resizable: false,
          renderWrapper: true,
        },
      }),

      RtlColumnResizing,
      RtlTableArrowNavigation,

      VideoURL,
      VideoIFrame,

      CustomCodeBlock.configure({
        lowlight,
      }),

      Image,
      Audio,
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

  if (!editor)
    return (
      <div className="flex h-96 w-full items-center justify-center p-4">
        <SimpleLoading message="در حال بارگذاری ویرایشگر..." />
      </div>
    )

  return (
    <>
      <Button
        type="button"
        variant={'outline'}
        onClick={() => {
          setShowPreview((prev) => !prev)
        }}
        className="mb-2"
      >
        {!showPreview ? <EyeIcon /> : <PencilIcon />}
        {!showPreview ? 'پیش نمایش' : 'ویرایش'}
      </Button>
      <>
        {!showPreview && <FRTE_Toolbar editor={editor} />}
        <FRTE_Content editor={editor} showPreview={showPreview} />
        {!showPreview && <FRTE_Footer editor={editor} />}
      </>
    </>
  )
}
