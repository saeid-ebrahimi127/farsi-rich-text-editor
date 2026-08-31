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
  CheckIcon,
  ChevronLeftIcon,
  PilcrowLeftIcon,
  PilcrowRightIcon,
} from 'lucide-react'
import { useState } from 'react'
import { flushSync } from 'react-dom'

const items = [
  {
    label: 'راست به چپ',
    icon: <PilcrowLeftIcon />,
    value: 'rtl',
  },
  {
    label: 'چپ به راست',
    icon: <PilcrowRightIcon />,
    value: 'ltr',
  },
]

export const ToolbarTextDirectionSelect = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false)

  const value = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (editor.isActive({ dir: 'rtl' })) return 'rtl'
      return 'ltr'
    },
  })

  const isCodeBlock = useEditorState({
    editor,
    selector: ({ editor }) => editor.isActive('codeBlock'),
  })

  const handleValueChange = (newValue: string) => {
    editor
      .chain()
      .setTextDirection(newValue as 'rtl' | 'ltr')
      .run()

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
          tooltip="جهت متن"
          disabled={isCodeBlock}
          variant="ghost"
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
