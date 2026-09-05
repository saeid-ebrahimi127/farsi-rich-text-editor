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
import { audioURLZodSchema } from '#/zod-schema/audio.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Editor } from '@tiptap/react'
import { Music2Icon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const title = 'افزودن صدا'

const formSchema = z.object({
  src: audioURLZodSchema,
})

type FormValues = z.infer<typeof formSchema>

export const ToolbarAddAudio = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      src: '',
    },
  })

  const closeDialog = () => {
    form.reset()

    setOpen(false)
  }

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      closeDialog()
      return
    }

    setOpen(true)
  }

  const handleSubmit = (data: FormValues) => {
    editor
      .chain()
      .insertContent({ type: 'audio', attrs: { src: data.src } })
      .run()

    closeDialog()

    editor.chain().focus().run()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ToolbarCreateButton icon={<Music2Icon />} tooltip={title} />
      </DialogTrigger>

      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>
            برای افزودن صدا از فرم زیر استفاده نمایید.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <TextInput
              control={form.control}
              name="src"
              label="آدرس (URL) صدا"
              inputProps={{
                type: 'url',
                autoComplete: 'on',
                dir: 'ltr',
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
