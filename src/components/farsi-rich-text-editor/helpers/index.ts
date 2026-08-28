import { findParentNode } from '@tiptap/core'
import { CellSelection, TableMap } from '@tiptap/pm/tables'
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

export const getTableSize = (editor: Editor) => {
  const table = findParentNode((node) => node.type.name === 'table')(
    editor.state.selection,
  )

  if (!table) {
    return null
  }

  const rows = table.node.childCount
  const columns = table.node.firstChild?.childCount ?? 0

  return {
    table: table.node,
    pos: table.pos,
    rows,
    columns,
  }
}

export const selectLastTableCell = (editor: Editor) => {
  const tableSize = getTableSize(editor)

  if (!tableSize) {
    return
  }

  const { table, pos } = tableSize

  const map = TableMap.get(table)

  const lastCellStart = map.positionAt(map.height - 1, map.width - 1, table)

  editor.view.dispatch(
    editor.state.tr.setSelection(
      CellSelection.create(editor.state.doc, pos + 1 + lastCellStart),
    ),
  )
}
