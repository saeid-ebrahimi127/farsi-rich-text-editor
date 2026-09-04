import { cn } from '#/lib/utils.ts'
import type { Editor } from '@tiptap/react'
import { EditorContent } from '@tiptap/react'
import { useEffect } from 'react'

export const FRTE_Content = ({
  editor,
  showPreview,
}: {
  editor: Editor
  showPreview: boolean
}) => {
  const onEditorClick = () => {
    if (!editor.isFocused && !showPreview) {
      editor.chain().focus('end').run()
    }
  }

  useEffect(() => {
    onEditorClick()
  }, [showPreview])

  return (
    <div
      className={cn('border bg-white p-4', {
        'rounded-xl': showPreview,
        'cursor-text': !showPreview,
      })}
      onClick={onEditorClick}
    >
      {showPreview ? (
        <div
          className="prose text-sm"
          dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
        />
      ) : (
        <EditorContent
          editor={editor}
          className="prose min-h-96 [&_.ProseMirror]:outline-none"
        />
      )}
    </div>
  )
}
