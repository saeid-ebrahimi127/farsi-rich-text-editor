import { Button } from '#/components/ui/button.tsx'
import { Separator } from '#/components/ui/separator.tsx'
import {
  addHeaderRow,
  hasHeaderRow,
  removeHeaderRow,
} from '#/farsi-rich-text-editor/utils/index.ts'
import { cn } from '#/lib/utils.ts'
import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'
import { BubbleMenu as BubbleMenuComponent } from '@tiptap/react/menus'
import { Columns2Icon, Heading, Rows2Icon, Trash2Icon } from 'lucide-react'
import type { ComponentType } from 'react'

type ActionItem = {
  key: string
  label: string
  icon: ComponentType<{ className?: string }>
  onClick: (editor: Editor) => void
  enabled: boolean
  destructive?: boolean
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

  const columnActions: ActionItem[] = [
    {
      key: 'add-column-before',
      label: 'افزودن ستون قبلی',
      icon: Columns2Icon,
      onClick: (e) => e.chain().focus().addColumnBefore().run(),
      enabled: canAddColumnBefore,
    },
    {
      key: 'add-column-after',
      label: 'افزودن ستون بعدی',
      icon: Columns2Icon,
      onClick: (e) => e.chain().focus().addColumnAfter().run(),
      enabled: canAddColumnAfter,
    },
    {
      key: 'delete-column',
      label: 'حذف ستون فعلی',
      icon: Trash2Icon,
      onClick: (e) => e.chain().focus().deleteColumn().run(),
      enabled: canDeleteColumn,
      destructive: true,
    },
  ]

  const rowActions: ActionItem[] = [
    {
      key: 'add-row-before',
      label: 'افزودن سطر قبلی',
      icon: Rows2Icon,
      onClick: (e) => e.chain().focus().addRowBefore().run(),
      enabled: canAddRowBefore,
    },
    {
      key: 'add-row-after',
      label: 'افزودن سطر بعدی',
      icon: Rows2Icon,
      onClick: (e) => e.chain().focus().addRowAfter().run(),
      enabled: canAddRowAfter,
    },
    {
      key: 'delete-row',
      label: 'حذف سطر فعلی',
      icon: Trash2Icon,
      onClick: (e) => e.chain().focus().deleteRow().run(),
      enabled: canDeleteRow,
      destructive: true,
    },
  ]

  const renderAction = ({
    key,
    label,
    icon: Icon,
    onClick,
    enabled,
    destructive,
  }: ActionItem) => (
    <Button
      key={key}
      type="button"
      className={cn('justify-start', { 'text-destructive!': destructive })}
      variant={'outline'}
      onClick={() => onClick(editor)}
      disabled={!enabled}
    >
      <Icon />
      {label}
    </Button>
  )

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
      <div className="w-54 rounded-2xl border bg-white p-1 shadow">
        <div className="flex max-h-54 scrollbar-thin flex-col gap-1 overflow-auto p-1">
          <Button
            type="button"
            variant={'outline'}
            onClick={() =>
              tableHasHeaderRow ? removeHeaderRow(editor) : addHeaderRow(editor)
            }
            className="justify-start"
          >
            <Heading />
            {tableHasHeaderRow ? 'حذف سرستون' : 'افزودن سرستون'}
          </Button>

          <Separator className="my-1" />
          {columnActions.map(renderAction)}

          <Separator className="my-1" />
          {rowActions.map(renderAction)}

          <Separator className="my-1" />
          <Button
            type="button"
            variant={'outline'}
            onClick={() => editor.chain().focus().deleteTable().run()}
            disabled={!canDeleteTable}
            className="text-destructive! justify-start"
          >
            <Trash2Icon />
            حذف جدول
          </Button>
        </div>
      </div>
    </BubbleMenuComponent>
  )
}
