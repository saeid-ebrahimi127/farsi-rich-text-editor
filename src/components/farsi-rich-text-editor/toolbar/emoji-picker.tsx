import { emojis } from '#/components/farsi-rich-text-editor/helpers/emoji.ts'
import { ToolbarCreateButton } from '#/components/farsi-rich-text-editor/toolbar/create-button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu.tsx'
import type { Editor } from '@tiptap/react'
import { FaceSlightlySmilingIcon } from 'lucide-react'
import { useState } from 'react'

export const ToolbarEmojiPicker = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <ToolbarCreateButton
          tooltip="ایموجی"
          icon={<FaceSlightlySmilingIcon className="text-primary" />}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="h-64 w-64 scrollbar-thin overflow-auto"
        onCloseAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <DropdownMenuGroup className="grid grid-cols-6 gap-1 p-2">
          {emojis.map((emoji, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                editor.chain().insertContent(emoji).run()
              }}
            >
              {emoji}
            </button>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
