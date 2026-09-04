import { TooltipButton } from '#/components/tooltip-button.tsx'
import {
  addHeaderRow,
  hasHeaderRow,
  removeHeaderRow,
} from '#/farsi-rich-text-editor/utils/index.ts'
import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'
import { BubbleMenu as BubbleMenuComponent } from '@tiptap/react/menus'
import { Columns2Icon, Heading, Rows2Icon, Trash2Icon } from 'lucide-react'

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
      <div className="rounded-2xl border bg-white p-1 shadow">
        <div className="flex items-center gap-1.5 p-1">
          <TooltipButton
            tooltip={tableHasHeaderRow ? 'حذف سرستون' : 'افزودن سرستون'}
            icon={<Heading />}
            variant={'outline'}
            onClick={() =>
              tableHasHeaderRow ? removeHeaderRow(editor) : addHeaderRow(editor)
            }
          />

          <span className="mx-2">-</span>

          <TooltipButton
            tooltip={'افزودن سطر قبلی'}
            icon={<Rows2Icon />}
            variant={'outline'}
            onClick={() => editor.chain().focus().addRowBefore().run()}
            disabled={!canAddRowBefore}
          />
          <TooltipButton
            tooltip={'افزودن سطر بعدی'}
            icon={<Rows2Icon />}
            variant={'outline'}
            onClick={() => editor.chain().focus().addRowAfter().run()}
            disabled={!canAddRowAfter}
          />
          <TooltipButton
            tooltip={'حذف سطر فعلی'}
            icon={<Trash2Icon />}
            variant={'outline'}
            className="text-destructive!"
            onClick={() => editor.chain().focus().deleteRow().run()}
            disabled={!canDeleteRow}
          />

          <span className="mx-2">-</span>

          <TooltipButton
            tooltip={'افزودن ستون قبلی'}
            icon={<Columns2Icon />}
            variant={'outline'}
            onClick={() => editor.chain().focus().addColumnBefore().run()}
            disabled={!canAddColumnBefore}
          />
          <TooltipButton
            tooltip={'افزودن ستون بعدی'}
            icon={<Columns2Icon />}
            variant={'outline'}
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            disabled={!canAddColumnAfter}
          />
          <TooltipButton
            tooltip={'حذف ستون فعلی'}
            icon={<Trash2Icon />}
            variant={'outline'}
            className="text-destructive!"
            onClick={() => editor.chain().focus().deleteColumn().run()}
            disabled={!canDeleteColumn}
          />

          <span className="mx-2">-</span>

          <TooltipButton
            icon={<Trash2Icon />}
            tooltip="حذف جدول"
            variant={'outline'}
            className="text-destructive!"
            onClick={() => editor.chain().focus().deleteTable().run()}
            disabled={!canDeleteTable}
          />
        </div>
      </div>
    </BubbleMenuComponent>
  )
}
