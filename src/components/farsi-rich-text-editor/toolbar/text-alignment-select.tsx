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
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from 'lucide-react'

const items = [
  { label: 'راست چین', icon: <AlignRightIcon />, value: 'right' },
  { label: 'چپ چین', icon: <AlignLeftIcon />, value: 'left' },
  { label: 'وسط چین', icon: <AlignCenterIcon />, value: 'center' },
  { label: 'بلوکی', icon: <AlignJustifyIcon />, value: 'justify' },
]

export const ToolbarTextAlignmentSelect = ({ editor }: { editor: Editor }) => {
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
          <TooltipContent>تراز متن</TooltipContent>
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
