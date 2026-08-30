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

import { PilcrowLeftIcon, PilcrowRightIcon } from 'lucide-react'

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
      .focus()
      .setTextDirection(newValue as 'rtl' | 'ltr')
      .run()
  }

  const current = items.find((item) => item.value === value) ?? items[0]!

  return (
    <ToolbarCreateSelect
      value={value}
      disabled={isCodeBlock}
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

          <TooltipContent>جهت متن</TooltipContent>
        </Tooltip>
      }
    >
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.icon}
          {item.label}
        </SelectItem>
      ))}
    </ToolbarCreateSelect>
  )
}
