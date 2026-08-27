import { FRTE_Content } from '#/components/farsi-rich-text-editor/content.tsx'
import { FRTE_Footer } from '#/components/farsi-rich-text-editor/footer.tsx'
import { FRTE_Toolbar } from '#/components/farsi-rich-text-editor/toolbar/index.tsx'
import { useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'

export const FarsiRichTextEditor = ({
  autofocus = false,
}: {
  autofocus?: boolean
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    autofocus,
    immediatelyRender: false,
  })

  if (!editor) return null

  return (
    <>
      <FRTE_Toolbar editor={editor} />
      <FRTE_Content editor={editor} />
      <FRTE_Footer />
    </>
  )
}
