import { CheckboxInput } from '#/components/checkbox.tsx'
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
import { TableBubbleMenu } from '#/farsi-rich-text-editor/components/table-bubble-menu.tsx'
import { ToolbarCreateButton } from '#/farsi-rich-text-editor/toolbar/create-button.tsx'
import { booleanZodSchema } from '#/zod-schema/boolean.ts'
import {
  tableColumnsZodSchema,
  tableRowsZodSchema,
} from '#/zod-schema/table.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Editor } from '@tiptap/react'
import { TableIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const title = 'افزودن جدول'

export const ToolbarAddTable = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(
      z.object({
        rows: tableRowsZodSchema,
        columns: tableColumnsZodSchema,
        withHeaderRow: booleanZodSchema,
      }),
    ),
    defaultValues: {
      rows: '1',
      columns: '1',
      withHeaderRow: false,
    },
  })

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <ToolbarCreateButton icon={<TableIcon />} tooltip={title} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              برای افزودن جدول از فرم زیر استفاده نمایید.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(({ rows, columns, withHeaderRow }) => {
              editor
                .chain()
                .insertTable({ rows, cols: columns, withHeaderRow })
                .run()

              form.reset()

              setOpen(false)
            })}
          >
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
              <CheckboxInput
                control={form.control}
                name="withHeaderRow"
                label="اولین سطر به عنوان سرستون؟"
              />
              <DialogFooter>
                <Button type="submit">افزودن</Button>
              </DialogFooter>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
      <TableBubbleMenu editor={editor} />
    </>
  )
}
