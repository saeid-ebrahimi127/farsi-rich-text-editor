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

  const { empty } = editor.state.selection

  if (empty && editor.isActive('link')) {
    return getMarkRange(editor.state.selection.$from, link) ?? range
  }

  const start = getMarkRange(editor.state.doc.resolve(range.from), link)

  const end = getMarkRange(editor.state.doc.resolve(range.to), link)

  return {
    from: start?.from ?? range.from,
    to: end?.to ?? range.to,
  }
}
