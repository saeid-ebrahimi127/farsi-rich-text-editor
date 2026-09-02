import { TextareaInput } from '#/components/textarea-input.tsx'
import { Button } from '#/components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog.tsx'
import { FieldGroup } from '#/components/ui/field.tsx'
import {
  findVideoIFrameProvider,
  videoIFrameZodSchema,
} from '#/zod-schema/video-iframe.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Editor } from '@tiptap/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const title = 'افزودن ویدئو با کد IFrame'

export const VideoIFrameDialog = ({
  openDialog,
  setOpenDialog,
  editor,
}: {
  openDialog: boolean
  setOpenDialog: (value: boolean) => void
  editor: Editor
}) => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        videoIFrame: videoIFrameZodSchema,
      }),
    ),
    defaultValues: {
      videoIFrame: '',
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    const provider = findVideoIFrameProvider(data.videoIFrame)

    if (!provider) {
      return
    }

    editor
      .chain()
      .insertContent({
        type: 'videoIFrame',
        attrs: {
          src: data.videoIFrame,
          provider: provider.name,
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>
            کد IFrame مربوط به ویدئوی مورد نظر را وارد کنید.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <FieldGroup>
            <TextareaInput
              control={form.control}
              name="videoIFrame"
              label="کد IFrame"
              inputProps={{
                className: 'h-72 max-h-72 scrollbar-thin',
                style: {
                  direction: 'ltr',
                },
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
