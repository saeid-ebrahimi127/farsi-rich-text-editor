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

const items = [
  {
    label: '14px',
    value: 'sm',
    fontSize: 'var(--text-sm)',
    lineHeight: 'var(--text-sm--line-height)',
  },
  {
    label: '16px',
    value: 'base',
    fontSize: 'var(--text-base)',
    lineHeight: 'var(--text-base--line-height)',
  },
  {
    label: '18px',
    value: 'lg',
    fontSize: 'var(--text-lg)',
    lineHeight: 'var(--text-lg--line-height)',
  },
  {
    label: '20px',
    value: 'xl',
    fontSize: 'var(--text-xl)',
    lineHeight: 'var(--text-xl--line-height)',
  },
  {
    label: '24px',
    value: '2xl',
    fontSize: 'var(--text-2xl)',
    lineHeight: 'var(--text-2xl--line-height)',
  },
] as const

export const ToolbarFontSizeSelect = ({ editor }: { editor: Editor }) => {
  const value = useEditorState({
    editor,
    selector: ({ editor }) => {
      const { fontSize } = editor.getAttributes('textStyle')

      return items.find((item) => item.fontSize === fontSize)?.value ?? 'sm'
    },
  })

  const handleValueChange = (newValue: string) => {
    const item = items.find((item) => item.value === newValue)

    if (!item) return

    editor
      .chain()
      .focus()
      .setFontSize(item.fontSize)
      .setLineHeight(item.lineHeight)
      .run()
  }

  const current = items.find((item) => item.value === value) ?? items[0]

  return (
    <ToolbarCreateSelect
      value={value}
      onValueChange={handleValueChange}
      trigger={
        <Tooltip>
          <TooltipTrigger asChild>
            <SelectTrigger className="mx-1 w-20">
              <SelectValue>{current.label}</SelectValue>
            </SelectTrigger>
          </TooltipTrigger>

          <TooltipContent>اندازه ی متن</TooltipContent>
        </Tooltip>
      }
    >
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </ToolbarCreateSelect>
  )
}
