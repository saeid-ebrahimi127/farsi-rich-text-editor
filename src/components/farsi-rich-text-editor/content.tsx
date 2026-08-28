import type { Editor } from '@tiptap/react'
import { EditorContent } from '@tiptap/react'

export const FRTE_Content = ({ editor }: { editor: Editor }) => {
  return (
    <div className="border bg-white p-4">
      <EditorContent
        editor={editor}
        className="prose h-96 max-h-96 scrollbar-thin overflow-auto [&_.ProseMirror]:outline-none"
      />
    </div>
  )
}
