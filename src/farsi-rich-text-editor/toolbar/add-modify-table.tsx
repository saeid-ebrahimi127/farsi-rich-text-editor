import { TextInput } from '#/components/text-input.tsx'
import { Button } from '#/components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog.tsx'
import { FieldGroup } from '#/components/ui/field.tsx'
import { ToolbarCreateButton } from '#/farsi-rich-text-editor/toolbar/create-button.tsx'
import {
  getTableSize,
  selectLastTableCell,
} from '#/farsi-rich-text-editor/utils/index.ts'
import {
  tableColumnsZodSchema,
  tableRowsZodSchema,
} from '#/zod-schema/table.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'
import { TableIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const title = 'افزودن / ویرایش جدول'

const formSchema = z.object({
  rows: tableRowsZodSchema,
  columns: tableColumnsZodSchema,
})

type FormValues = z.infer<typeof formSchema>

export const ToolbarAddModifyTable = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false)

  const closeDialog = () => {
    setOpen(false)
  }

  const isTableActive = useEditorState({
    editor,
    selector({ editor }) {
      return editor.isActive('table')
    },
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rows: '1',
      columns: '1',
    },
  })

  const handleOpenChange = (value: boolean) => {
    if (value) {
      const tableSize = getTableSize(editor)

      form.reset({
        rows: String(tableSize?.rows ?? 1),
        columns: String(tableSize?.columns ?? 1),
      })
    }

    setOpen(value)
  }

  const onSubmit = (data: FormValues) => {
    const rows = Number(data.rows)
    const columns = Number(data.columns)

    const tableSize = getTableSize(editor)

    if (!tableSize) {
      editor
        .chain()
        .insertTable({ rows, cols: columns, withHeaderRow: true })
        .run()
    } else {
      const currentRows = tableSize.rows
      const currentColumns = tableSize.columns

      if (rows > currentRows) {
        for (let i = currentRows; i < rows; i++) {
          editor.chain().addRowAfter().run()
        }
      }

      if (rows < currentRows) {
        for (let i = currentRows; i > rows; i--) {
          selectLastTableCell(editor)

          editor.chain().deleteRow().run()
        }
      }

      if (columns > currentColumns) {
        for (let i = currentColumns; i < columns; i++) {
          editor.chain().addColumnAfter().run()
        }
      }

      if (columns < currentColumns) {
        for (let i = currentColumns; i > columns; i--) {
          selectLastTableCell(editor)

          editor.chain().deleteColumn().run()
        }
      }
    }

    closeDialog()
  }

  const deleteTable = () => {
    editor.chain().deleteTable().run()

    closeDialog()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ToolbarCreateButton
          icon={<TableIcon />}
          tooltip={title}
          variant={isTableActive ? 'default' : 'ghost'}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            برای افزودن یا ویرایش جدول از فرم زیر استفاده نمایید.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <TextInput
              control={form.control}
              name="rows"
              label="تعداد سطرها"
              inputProps={{
                type: 'number',
                autoComplete: 'on',
              }}
              autoFocus
            />
            <TextInput
              control={form.control}
              name="columns"
              label="تعداد ستون ها"
              inputProps={{
                type: 'number',
                autoComplete: 'on',
              }}
            />
            <DialogFooter>
              {isTableActive && (
                <Button
                  type="button"
                  variant={'destructive'}
                  onClick={deleteTable}
                >
                  حذف جدول
                </Button>
              )}
              <Button type="submit">
                {isTableActive ? 'ذخیره' : 'افزودن'}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
