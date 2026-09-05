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
import { imageAltZodSchema, imageURLZodSchema } from '#/zod-schema/image.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Editor } from '@tiptap/react'
import { ImageIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

const title = 'افزودن عکس'

const formSchema = z.object({
  src: imageURLZodSchema,
  alt: imageAltZodSchema,
})

type FormValues = z.infer<typeof formSchema>

export const ToolbarAddImage = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      src: '',
      alt: '',
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
      .insertContent({ type: 'image', attrs: { src: data.src, alt: data.alt } })
      .run()

    closeDialog()

    editor.chain().focus().run()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ToolbarCreateButton icon={<ImageIcon />} tooltip={title} />
      </DialogTrigger>

      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>
            برای افزودن عکس از فرم زیر استفاده نمایید.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <TextInput
              control={form.control}
              name="src"
              label="آدرس (URL) عکس"
              inputProps={{
                type: 'url',
                autoComplete: 'on',
                dir: 'ltr',
              }}
              autoFocus
            />

            <TextInput
              control={form.control}
              name="alt"
              label="متن جایگزین عکس"
              inputProps={{
                type: 'text',
                autoComplete: 'on',
              }}
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
