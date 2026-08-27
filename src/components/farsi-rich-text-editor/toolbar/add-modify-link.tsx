import { getLinkRange } from '#/components/farsi-rich-text-editor/helpers/index.ts'
import { ToolbarCreateButton } from '#/components/farsi-rich-text-editor/toolbar/create-button.tsx'
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
import { urlHrefZodSchema, urlTextZodSchema } from '#/zod-schema/url.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEditorState } from '@tiptap/react'
import type { Editor } from '@tiptap/react'
import { LinkIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { useForm } from 'react-hook-form'
import z from 'zod'

const title = 'افزودن / ویرایش لینک'

export const ToolbarAddModifyLink = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false)

  const rangeRef = useRef<{ from: number; to: number } | null>(null)

  const form = useForm({
    resolver: zodResolver(
      z.object({
        text: urlTextZodSchema,
        href: urlHrefZodSchema,
      }),
    ),
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

    flushSync(() => {
      setOpen(false)
    })

    editor.chain().focus().run()
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

  const handleSubmit = (data: { text: string; href: string }) => {
    const range = rangeRef.current

    if (!range) return

    editor
      .chain()
      .insertContentAt(range, {
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
      })
      .setTextSelection(range.from + data.text.length)
      .unsetMark('link')
      .run()

    closeDialog()
  }

  const handleRemove = () => {
    const range = rangeRef.current

    if (!range) return

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
                <Button type="button" variant="outline" onClick={handleRemove}>
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
