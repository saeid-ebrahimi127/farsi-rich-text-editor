import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu.tsx'
import { ToolbarCreateButton } from '#/farsi-rich-text-editor/toolbar/create-button.tsx'
import type { Editor } from '@tiptap/react'
import { FaceSlightlySmilingIcon } from 'lucide-react'
import { useState } from 'react'

export const emojis = [
  // Faces
  '😀',
  '😂',
  '🤣',
  '😊',
  '😍',
  '🥰',
  '😘',
  '😎',
  '🤩',
  '🥳',
  '🤔',
  '🙄',
  '😢',
  '😭',
  '😡',
  '🤯',
  '😱',
  '😴',

  // Gestures & reactions
  '👍',
  '👎',
  '👌',
  '✌️',
  '🤞',
  '🤟',
  '🤘',
  '👏',
  '🙌',
  '🙏',
  '💪',
  '👀',
  '👋',
  '❤️',
  '🧡',
  '💛',
  '💚',
  '💙',
  '💜',
  '🖤',
  '🤍',
  '💔',
  '💕',
  '💯',

  // Celebration
  '🎉',
  '🎊',
  '🥳',
  '🎂',
  '🎁',
  '🏆',
  '🥇',
  '✨',
  '🎈',
  '🔥',
  '⭐',
  '🌟',
  '💫',

  // Common objects
  '🚀',
  '💻',
  '📱',
  '💡',
  '🔔',
  '📌',
  '📎',
  '✏️',
  '📝',
  '📷',
  '🎵',
  '🎶',

  // Food & drink
  '🍕',
  '🍔',
  '🍟',
  '🌭',
  '🍎',
  '🍓',
  '🍉',
  '🍌',
  '☕',
  '🍺',
  '🍻',
  '🍷',

  // Nature & animals
  '🐶',
  '🐱',
  '🐭',
  '🐰',
  '🦊',
  '🐻',
  '🐼',
  '🐨',
  '🐯',
  '🦁',
  '🐸',
  '🐵',
  '🌸',
  '🌹',
  '🌈',
  '☀️',
  '🌙',
]

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
        className="w-64"
        onCloseAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <DropdownMenuGroup className="grid max-h-64 scrollbar-thin grid-cols-6 gap-1 overflow-auto p-2">
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
