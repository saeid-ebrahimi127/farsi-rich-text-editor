import { ToolbarCreateButton } from '#/components/farsi-rich-text-editor/toolbar/create-button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu.tsx'
import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  CheckIcon,
  ChevronLeftIcon,
} from 'lucide-react'
import { useState } from 'react'
import { flushSync } from 'react-dom'

const items = [
  { label: 'راست چین', icon: <AlignRightIcon />, value: 'right' },
  { label: 'چپ چین', icon: <AlignLeftIcon />, value: 'left' },
  { label: 'وسط چین', icon: <AlignCenterIcon />, value: 'center' },
  { label: 'بلوکی', icon: <AlignJustifyIcon />, value: 'justify' },
]

export const ToolbarTextAlignmentSelect = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false)

  const value = useEditorState({
    editor,
    selector({ editor }) {
      if (editor.isActive('heading')) {
        return editor.getAttributes('heading').textAlign ?? 'right'
      }

      return editor.getAttributes('paragraph').textAlign ?? 'right'
    },
  })

  const handleValueChange = (newValue: string) => {
    editor.chain().setTextAlign(newValue).run()

    flushSync(() => {
      setOpen(false)
    })

    editor.chain().focus().run()
  }

  const current = items.find((item) => item.value === value) ?? items[0]!

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <ToolbarCreateButton
          icon={current.icon}
          tooltip="تراز متن"
          variant={value !== 'right' ? 'default' : 'ghost'}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(e) => {
          e.preventDefault()
        }}
        className="max-h-48 w-48 scrollbar-thin overflow-auto"
      >
        <DropdownMenuGroup>
          {items.map((item) => (
            <DropdownMenuItem
              key={item.value}
              onSelect={(e) => {
                e.preventDefault()

                handleValueChange(item.value)
              }}
            >
              <ChevronLeftIcon />
              {item.icon}
              {item.label}
              {value === item.value && <CheckIcon className="mr-auto" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
