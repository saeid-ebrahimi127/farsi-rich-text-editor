import type { LinkRange } from '#/farsi-rich-text-editor/types.ts'
import type { Editor } from '@tiptap/react'
import { findParentNode, getMarkRange } from '@tiptap/react'

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

const getTableParent = (editor: Editor) =>
  findParentNode((node) => node.type.name === 'table')(editor.state.selection)

export const hasHeaderRow = (editor: Editor) => {
  const tableParent = getTableParent(editor)

  if (!tableParent) return false

  const firstRow = tableParent.node.firstChild
  const firstCell = firstRow?.firstChild

  return firstCell?.type.name === 'tableHeader'
}

export const addHeaderRow = (editor: Editor) => {
  const tableParent = getTableParent(editor)

  if (!tableParent) return

  const firstRowPos = tableParent.pos + 2

  editor
    .chain()
    .focus()
    .setTextSelection(firstRowPos)
    .addRowBefore()
    .toggleHeaderRow()
    .run()
}

export const removeHeaderRow = (editor: Editor) => {
  const tableParent = getTableParent(editor)

  if (!tableParent) return

  const firstRowPos = tableParent.pos + 2

  editor.chain().focus().setTextSelection(firstRowPos).deleteRow().run()
}
