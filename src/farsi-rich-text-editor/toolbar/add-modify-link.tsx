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
import { LinkBubbleMenu } from '#/farsi-rich-text-editor/components/link-bubble-menu.tsx'
import { ToolbarCreateButton } from '#/farsi-rich-text-editor/toolbar/create-button.tsx'
import type { LinkRange } from '#/farsi-rich-text-editor/types.ts'
import {
  getLinkRange,
  handleRemoveLink,
} from '#/farsi-rich-text-editor/utils/index.ts'
import { urlTextZodSchema, urlZodSchema } from '#/zod-schema/url.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Editor } from '@tiptap/react'
import { getMarkRange, useEditorState } from '@tiptap/react'
import { LinkIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const title = 'افزودن / ویرایش لینک'

const formSchema = z.object({
  text: urlTextZodSchema,
  href: urlZodSchema,
})

type FormValues = z.infer<typeof formSchema>

export const ToolbarAddModifyLink = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false)

  const rangeRef = useRef<LinkRange | null>(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
      href: '',
    },
  })

  const { isActive, currentLinkRange } = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isActive: editor.isActive('link'),
      currentLinkRange: getLinkRange(editor),
    }),
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

    rangeRef.current = currentLinkRange

    form.reset({
      text: editor.state.doc.textBetween(
        currentLinkRange.from,
        currentLinkRange.to,
        ' ',
      ),
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

    const unsetOverflow = (overflow: LinkRange | null) => {
      if (overflow) {
        chain.setTextSelection(overflow).unsetLink()
      }
    }

    unsetOverflow(
      linkAtStart && linkAtStart.from < range.from
        ? { from: linkAtStart.from, to: range.from }
        : null,
    )

    unsetOverflow(
      linkAtEnd && range.to < linkAtEnd.to
        ? { from: range.to, to: linkAtEnd.to }
        : null,
    )

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

  return (
    <>
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
                label="آدرس (URL)"
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
                    onClick={() =>
                      handleRemoveLink({
                        editor,
                        range: rangeRef.current,
                        onSuccess() {
                          closeDialog()
                        },
                      })
                    }
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
      <LinkBubbleMenu
        editor={editor}
        range={currentLinkRange}
        openEditLinkDialog={() => handleOpenChange(true)}
      />
    </>
  )
}
