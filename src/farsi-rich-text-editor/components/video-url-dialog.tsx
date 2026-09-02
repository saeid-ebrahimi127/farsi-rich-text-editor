import { TextInput } from '#/components/text-input.tsx'
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
import { urlZodSchema } from '#/zod-schema/url.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Editor } from '@tiptap/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const title = 'افزودن آدرس ویدئو (URL)'

export const VideoURLDialog = ({
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
        videoURL: urlZodSchema,
      }),
    ),
    defaultValues: {
      videoURL: '',
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    editor
      .chain()
      .insertContent({
        type: 'videoURL',
        attrs: {
          src: data.videoURL,
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
            آدرس (URL) ویدئوی مورد نظر را وارد کنید.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <FieldGroup>
            <TextInput
              control={form.control}
              name="videoURL"
              label="آدرس (URL)"
              inputProps={{
                type: 'url',
                style: {
                  direction: 'ltr',
                },
                autoComplete: 'on',
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
