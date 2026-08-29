import {
  emojis,
  getUnified,
} from '#/components/farsi-rich-text-editor/helpers/emoji.ts'
import { ToolbarCreateButton } from '#/components/farsi-rich-text-editor/toolbar/create-button.tsx'
import { Button } from '#/components/ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu.tsx'
import type { Editor } from '@tiptap/react'
import { Emoji, EmojiStyle } from 'emoji-picker-react'
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
        className="h-64 w-64 scrollbar-thin scrollbar-gutter-stable overflow-y-auto"
        align="center"
        onCloseAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <DropdownMenuGroup className="grid grid-cols-8 gap-1 p-2">
          {emojis.map((emoji, index) => (
            <Button
              key={index}
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                editor
                  .chain()
                  .insertContent({
                    type: 'emoji',
                    attrs: {
                      emoji,
                    },
                  })
                  .run()
              }}
            >
              <Emoji
                unified={getUnified(emoji)}
                emojiStyle={EmojiStyle.APPLE}
                size={22}
              />
            </Button>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
