import { EditorContent } from '@tiptap/react'
import type { Editor } from '@tiptap/react'

export const FRTE_Content = ({ editor }: { editor: Editor }) => {
  return (
    <div className="border bg-white p-2">
      <EditorContent
        editor={editor}
        className="prose prose-black prose-h2:first:mt-0 prose-h3:first:mt-0 prose-h4:first:mt-0 prose-p:first:mt-0 h-96 max-h-96 max-w-full scrollbar-thin overflow-auto text-sm [&_.ProseMirror]:outline-none"
      />
    </div>
  )
}
