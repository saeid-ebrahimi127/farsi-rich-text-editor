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
import { useEditorState } from '@tiptap/react'
import type { Editor } from '@tiptap/react'
import { Baseline, SubscriptIcon, SuperscriptIcon } from 'lucide-react'

const items = [
  { label: 'معمولی', icon: <Baseline />, value: 'baseline' },
  { label: 'بالا نویس', icon: <SuperscriptIcon />, value: 'superscript' },
  { label: 'پایین نویس', icon: <SubscriptIcon />, value: 'subscript' },
]

export const ToolbarTextPositionSelect = ({ editor }: { editor: Editor }) => {
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
          <TooltipContent>موقعیت متن</TooltipContent>
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
