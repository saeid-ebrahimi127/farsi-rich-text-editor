import { ToolbarCreateSelect } from '#/components/farsi-rich-text-editor/toolbar/create-select.tsx'
import {
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip.tsx'
import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'
import {
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  PilcrowIcon,
} from 'lucide-react'

const items = [
  { label: 'پاراگراف', icon: <PilcrowIcon />, value: 'paragraph' },
  { label: 'عنوان 2', icon: <Heading2Icon />, value: 'heading-2' },
  { label: 'عنوان 3', icon: <Heading3Icon />, value: 'heading-3' },
  { label: 'عنوان 4', icon: <Heading4Icon />, value: 'heading-4' },
  { label: 'عنوان 5', icon: <Heading5Icon />, value: 'heading-5' },
  { label: 'عنوان 6', icon: <Heading6Icon />, value: 'heading-6' },
]

export const ToolbarTextStyleSelect = ({ editor }: { editor: Editor }) => {
  const value = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (editor.isActive('heading', { level: 2 })) return 'heading-2'
      if (editor.isActive('heading', { level: 3 })) return 'heading-3'
      if (editor.isActive('heading', { level: 4 })) return 'heading-4'
      if (editor.isActive('heading', { level: 5 })) return 'heading-5'
      if (editor.isActive('heading', { level: 6 })) return 'heading-6'

      return 'paragraph'
    },
  })

  const handleValueChange = (newValue: string) => {
    const chain = editor.chain()

    if (newValue === 'paragraph') {
      chain.setParagraph().run()
    } else {
      const level = Number(newValue.split('-')[1]) as 2 | 3 | 4 | 5 | 6

      chain.toggleHeading({ level }).run()
    }

    editor.chain().focus().run()
  }

  const current = items.find((item) => item.value === value) ?? items[0]!

  return (
    <ToolbarCreateSelect
      value={value}
      onValueChange={handleValueChange}
      trigger={
        <Tooltip>
          <TooltipTrigger asChild>
            <SelectTrigger className="mx-1 w-45">
              <SelectValue>
                {current.icon}
                {current.label}
              </SelectValue>
            </SelectTrigger>
          </TooltipTrigger>
          <TooltipContent>سبک متن</TooltipContent>
        </Tooltip>
      }
    >
      {items.map((item) => {
        return (
          <SelectItem key={item.value} value={item.value}>
            {item.icon}
            {item.label}
          </SelectItem>
        )
      })}
    </ToolbarCreateSelect>
  )
}
