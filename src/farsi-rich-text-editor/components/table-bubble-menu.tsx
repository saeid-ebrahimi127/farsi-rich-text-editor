import { TooltipButton } from '#/components/tooltip-button.tsx'
import { Separator } from '#/components/ui/separator.tsx'
import type { Editor } from '@tiptap/react'
import { findParentNode, useEditorState } from '@tiptap/react'
import { BubbleMenu as BubbleMenuComponent } from '@tiptap/react/menus'
import { Columns2Icon, Heading, Rows2Icon, Trash2Icon } from 'lucide-react'

const getTableParent = (editor: Editor) =>
  findParentNode((node) => node.type.name === 'table')(editor.state.selection)

const hasHeaderRow = (editor: Editor) => {
  const tableParent = getTableParent(editor)

  if (!tableParent) return false

  const firstRow = tableParent.node.firstChild
  const firstCell = firstRow?.firstChild

  return firstCell?.type.name === 'tableHeader'
}

const addHeaderRow = (editor: Editor) => {
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

const removeHeaderRow = (editor: Editor) => {
  const tableParent = getTableParent(editor)

  if (!tableParent) return

  const firstRowPos = tableParent.pos + 2

  editor.chain().focus().setTextSelection(firstRowPos).deleteRow().run()
}

export const TableBubbleMenu = ({ editor }: { editor: Editor }) => {
  const {
    canAddColumnBefore,
    canAddColumnAfter,
    canDeleteColumn,
    canAddRowBefore,
    canAddRowAfter,
    canDeleteRow,
    canDeleteTable,
    tableHasHeaderRow,
  } = useEditorState({
    editor,
    selector: ({ editor }) => ({
      canAddColumnBefore: editor.can().addColumnBefore(),
      canAddColumnAfter: editor.can().addColumnAfter(),
      canDeleteColumn: editor.can().deleteColumn(),
      canAddRowBefore: editor.can().addRowBefore(),
      canAddRowAfter: editor.can().addRowAfter(),
      canDeleteRow: editor.can().deleteRow(),
      canDeleteTable: editor.can().deleteTable(),
      tableHasHeaderRow: hasHeaderRow(editor),
    }),
  })

  return (
    <BubbleMenuComponent
      editor={editor}
      pluginKey="tableBubbleMenu"
      updateDelay={0}
      shouldShow={({ editor }) => editor.isActive('table')}
      options={{
        placement: 'bottom',
      }}
    >
      <div className="bg-background flex items-center gap-1 rounded-md border p-1 shadow-md">
        <TooltipButton
          tooltip={tableHasHeaderRow ? 'حذف سرستون' : 'افزودن سرستون'}
          icon={<Heading />}
          onClick={() =>
            tableHasHeaderRow ? removeHeaderRow(editor) : addHeaderRow(editor)
          }
        />
        <Separator orientation="vertical" className="mx-1" />
        <TooltipButton
          tooltip="افزودن ستون قبلی"
          icon={<Columns2Icon />}
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          disabled={!canAddColumnBefore}
        />
        <TooltipButton
          tooltip="افزودن ستون بعدی"
          icon={<Columns2Icon />}
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          disabled={!canAddColumnAfter}
        />
        <TooltipButton
          tooltip="حذف ستون"
          icon={<Trash2Icon />}
          onClick={() => editor.chain().focus().deleteColumn().run()}
          disabled={!canDeleteColumn}
          className="text-destructive!"
        />
        <Separator orientation="vertical" className="mx-1" />
        <TooltipButton
          tooltip="افزودن سطر قبلی"
          icon={<Rows2Icon />}
          onClick={() => editor.chain().focus().addRowBefore().run()}
          disabled={!canAddRowBefore}
        />
        <TooltipButton
          tooltip="افزودن سطر بعدی"
          icon={<Rows2Icon />}
          onClick={() => editor.chain().focus().addRowAfter().run()}
          disabled={!canAddRowAfter}
        />
        <TooltipButton
          tooltip="حذف سطر"
          icon={<Trash2Icon />}
          onClick={() => editor.chain().focus().deleteRow().run()}
          disabled={!canDeleteRow}
          className="text-destructive!"
        />
        <Separator orientation="vertical" className="mx-1" />
        <TooltipButton
          tooltip="حذف جدول"
          icon={<Trash2Icon />}
          onClick={() => editor.chain().focus().deleteTable().run()}
          disabled={!canDeleteTable}
          className="text-destructive!"
        />
      </div>
    </BubbleMenuComponent>
  )
}
