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
  Baseline,
  CheckIcon,
  ChevronLeftIcon,
  SubscriptIcon,
  SuperscriptIcon,
} from 'lucide-react'
import { useState } from 'react'
import { flushSync } from 'react-dom'

const items = [
  { label: 'معمولی', icon: <Baseline />, value: 'baseline' },
  { label: 'بالا نویس', icon: <SuperscriptIcon />, value: 'superscript' },
  { label: 'پایین نویس', icon: <SubscriptIcon />, value: 'subscript' },
]

export const ToolbarTextPositionSelect = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false)

  const value = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (editor.isActive('superscript')) return 'superscript'
      if (editor.isActive('subscript')) return 'subscript'

      return 'baseline'
    },
  })

  const handleValueChange = (newValue: string) => {
    const chain = editor.chain()

    if (newValue === 'superscript') {
      chain.unsetSubscript().setSuperscript().run()
    } else if (newValue === 'subscript') {
      chain.unsetSuperscript().setSubscript().run()
    } else {
      chain.unsetSuperscript().unsetSubscript().run()
    }

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
          tooltip="موقعیت متن"
          variant={value !== 'baseline' ? 'default' : 'ghost'}
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
