import type { LinkRange } from '#/farsi-rich-text-editor/types.ts'
import { getMarkRange } from '@tiptap/react'
import type { Editor } from '@tiptap/react'

export const getRange = (editor: Editor) => {
  const { from, to } = editor.state.selection

  return { from, to }
}

export const getLinkRange = (editor: Editor) => {
  const range = getRange(editor)
  const link = editor.state.schema.marks.link

  if (!link) {
    return range
  }

  const { selection } = editor.state

  if (selection.empty && editor.isActive('link')) {
    return getMarkRange(selection.$from, link) ?? range
  }

  return range
}

export const handleRemoveLink = ({
  editor,
  range,
  onSuccess,
}: {
  editor: Editor
  range: LinkRange | null
  onSuccess?: () => void
}) => {
  if (!range) {
    return
  }

  editor.chain().setTextSelection(range).unsetLink().run()

  onSuccess?.()
}
