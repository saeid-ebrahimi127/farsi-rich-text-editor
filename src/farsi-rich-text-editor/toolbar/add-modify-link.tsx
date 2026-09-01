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
import { getRange } from '#/farsi-rich-text-editor/utils/index.ts'
import { urlHrefZodSchema, urlTextZodSchema } from '#/zod-schema/url.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Editor } from '@tiptap/react'
import { getMarkRange, useEditorState } from '@tiptap/react'
import { LinkIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const getLinkRange = (editor: Editor) => {
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

const title = 'افزودن / ویرایش لینک'

const formSchema = z.object({
  text: urlTextZodSchema,
  href: urlHrefZodSchema,
})

type FormValues = z.infer<typeof formSchema>

export const ToolbarAddModifyLink = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false)

  const rangeRef = useRef<{
    from: number
    to: number
  } | null>(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      href: '',
    },
  })

  const isActive = useEditorState({
    editor,
    selector: ({ editor }) => editor.isActive('link'),
  })

  const closeDialog = () => {
    rangeRef.current = null
    form.reset()

    setOpen(false)
  }

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      closeDialog()
      return
    }

    const range = getLinkRange(editor)

    rangeRef.current = range

    form.reset({
      text: editor.state.doc.textBetween(range.from, range.to, ' '),
      href: editor.getAttributes('link').href ?? '',
    })

    setOpen(true)
  }

  const handleSubmit = (data: FormValues) => {
    const range = rangeRef.current

    if (!range) {
      return
    }

    const { doc, schema } = editor.state
    const link = schema.marks.link

    if (!link) {
      return
    }

    const linkAtStart = getMarkRange(doc.resolve(range.from), link)

    const linkAtEnd = getMarkRange(doc.resolve(range.to), link)

    const chain = editor.chain()

    if (linkAtStart && linkAtStart.from < range.from) {
      chain
        .setTextSelection({
          from: linkAtStart.from,
          to: range.from,
        })
        .unsetLink()
    }

    if (linkAtEnd && range.to < linkAtEnd.to) {
      chain
        .setTextSelection({
          from: range.to,
          to: linkAtEnd.to,
        })
        .unsetLink()
    }

    chain
      .insertContentAt(range, [
        {
          type: 'text',
          text: data.text,
          marks: [
            {
              type: 'link',
              attrs: {
                href: data.href,
                target: '_blank',
                rel: 'noopener noreferrer',
              },
            },
          ],
        },
        {
          type: 'text',
          text: '\u200B',
        },
      ])
      .setTextSelection({
        from: range.from,
        to: range.from + data.text.length,
      })
      .run()

    closeDialog()
  }

  const handleRemove = () => {
    const range = rangeRef.current

    if (!range) {
      return
    }

    editor.chain().setTextSelection(range).unsetLink().run()

    closeDialog()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ToolbarCreateButton
          icon={<LinkIcon />}
          tooltip={title}
          variant={isActive ? 'default' : 'ghost'}
        />
      </DialogTrigger>

      <DialogContent
        onCloseAutoFocus={(event) => {
          event.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>
            برای افزودن یا ویرایش لینک از فرم زیر استفاده نمایید.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <TextInput
              control={form.control}
              name="text"
              label="متن"
              inputProps={{
                type: 'text',
                autoComplete: 'on',
              }}
              autoFocus
            />

            <TextInput
              control={form.control}
              name="href"
              label="آدرس"
              inputProps={{
                type: 'url',
                autoComplete: 'on',
                dir: 'ltr',
              }}
            />

            <DialogFooter>
              {isActive && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleRemove}
                >
                  حذف لینک
                </Button>
              )}

              <Button type="submit">{isActive ? 'ذخیره' : 'افزودن'}</Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
