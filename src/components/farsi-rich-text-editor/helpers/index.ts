import type { Editor } from '@tiptap/react'
import { getMarkRange } from '@tiptap/react'

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
