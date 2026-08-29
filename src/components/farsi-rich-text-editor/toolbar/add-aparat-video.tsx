import { AparatIcon } from '#/components/aparat-icon.tsx'
import { ToolbarCreateButton } from '#/components/farsi-rich-text-editor/toolbar/create-button.tsx'
import { TextareaInput } from '#/components/textarea-input.tsx'
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
import { aparatIframeEmbedZodSchema } from '#/zod-schema/aparat-iframe-embed.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Editor } from '@tiptap/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const title = 'افزودن ویدئوی آپاراتی'

export const ToolbarAddAparatVideo = ({ editor }: { editor: Editor }) => {
  const [openDialog, setOpenDialog] = useState(false)

  const form = useForm({
    resolver: zodResolver(
      z.object({
        aparatIframeEmbed: aparatIframeEmbedZodSchema,
      }),
    ),
    defaultValues: {
      aparatIframeEmbed: '',
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    editor
      .chain()
      .insertContent({
        type: 'aparatVideo',
        attrs: {
          src: data.aparatIframeEmbed,
        },
      })
      .run()

    form.reset()

    setOpenDialog(false)
  })

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(value) => {
        if (!value) {
          form.reset()
        }

        setOpenDialog(value)
      }}
    >
      <DialogTrigger asChild>
        <ToolbarCreateButton icon={<AparatIcon />} tooltip={title} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            کد iframe مربوط به ویدئوی آپاراتی مورد نظر را وارد کنید.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <TextareaInput
              control={form.control}
              name="aparatIframeEmbed"
              label="کد iframe"
              inputProps={{
                className: 'h-72 max-h-72 scrollbar-thin',
                style: { direction: 'ltr' },
                autoComplete: 'on',
                onKeyDown(e) {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()

                    onSubmit()
                  }
                },
              }}
              autoFocus
            />
            <DialogFooter>
              <Button type="submit">افزودن</Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
