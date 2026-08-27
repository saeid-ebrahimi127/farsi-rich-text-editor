import { useEditorState } from '@tiptap/react'
import type { Editor } from '@tiptap/react'

export const FRTE_Footer = ({ editor }: { editor: Editor }) => {
  const { words } = useEditorState({
    editor,
    selector: ({ editor }) => ({
      words: editor.storage.characterCount.words(),
    }),
  })

  return (
    <div className="rounded-xl rounded-t-none border border-t-0 bg-white p-2 text-sm">
      تعداد کلمات: {words}
    </div>
  )
}
