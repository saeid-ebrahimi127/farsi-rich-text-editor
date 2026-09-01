import { Button } from '#/components/ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu.tsx'
import { ToolbarCreateButton } from '#/farsi-rich-text-editor/toolbar/create-button.tsx'
import { cn } from '#/lib/utils.ts'
import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'
import type { LucideIcon } from 'lucide-react'
import { HighlighterIcon, SquareIcon, TypeIcon } from 'lucide-react'
import { DropdownMenuGroup } from 'radix-ui/dropdown-menu'
import { useState } from 'react'

const colorGrid: string[][] = [
  [
    '#000000',
    '#262626',
    '#404040',
    '#595959',
    '#737373',
    '#8c8c8c',
    '#a6a6a6',
    '#bfbfbf',
    '#d9d9d9',
    '#ffffff',
  ],
  [
    '#7f1d1d',
    '#991b1b',
    '#b91c1c',
    '#dc2626',
    '#ef4444',
    '#f87171',
    '#fca5a5',
    '#fecaca',
    '#fee2e2',
    '#fef2f2',
  ],
  [
    '#7c2d12',
    '#9a3412',
    '#c2410c',
    '#ea580c',
    '#f97316',
    '#fb923c',
    '#fdba74',
    '#fed7aa',
    '#ffedd5',
    '#fff7ed',
  ],
  [
    '#14532d',
    '#166534',
    '#15803d',
    '#16a34a',
    '#22c55e',
    '#4ade80',
    '#86efac',
    '#bbf7d0',
    '#dcfce7',
    '#f0fdf4',
  ],
  [
    '#1e3a8a',
    '#1e40af',
    '#1d4ed8',
    '#2563eb',
    '#3b82f6',
    '#60a5fa',
    '#93c5fd',
    '#bfdbfe',
    '#dbeafe',
    '#eff6ff',
  ],
  [
    '#581c87',
    '#6b21a8',
    '#7e22ce',
    '#9333ea',
    '#a855f7',
    '#c084fc',
    '#d8b4fe',
    '#e9d5ff',
    '#f3e8ff',
    '#fdf4ff',
  ],
]

const ToolbarColorPicker = ({
  editor,
  icon: Icon,
  tooltip,
  defaultUnderlineColor,
  getColor,
  setColor,
  unsetColor,
}: {
  editor: Editor
  icon: LucideIcon
  tooltip: string
  defaultUnderlineColor: string
  getColor: (editor: Editor) => string | undefined
  setColor: (editor: Editor, color: string) => void
  unsetColor: (editor: Editor) => void
}) => {
  const [open, setOpen] = useState(false)

  const currentColor = useEditorState({
    editor,
    selector: ({ editor }) => getColor(editor),
  })

  const closeAndFocus = () => {
    setOpen(false)

    editor.chain().focus().run()
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <ToolbarCreateButton
          icon={
            <span className="flex flex-col items-center justify-center gap-0.5">
              <Icon />
              <span
                className="h-0.5 w-full"
                style={{
                  backgroundColor: currentColor ?? defaultUnderlineColor,
                }}
              />
            </span>
          }
          tooltip={tooltip}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64"
        onCloseAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="justify-center!"
            onSelect={(e) => {
              e.preventDefault()

              unsetColor(editor)

              closeAndFocus()
            }}
          >
            <div className="relative size-4">
              <SquareIcon />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-destructive h-full w-0.5 rotate-45" />
              </div>
            </div>
            پیش فرض
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="grid grid-cols-10 gap-1 p-2">
          {colorGrid.flat().map((color) => (
            <Button
              key={color}
              title={color}
              onClick={() => {
                setColor(editor, color)

                closeAndFocus()
              }}
              size={'icon'}
              className={cn(
                'size-5! rounded hover:ring-2 hover:ring-black hover:ring-offset-1',
                currentColor === color && 'ring-2 ring-black ring-offset-1',
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const ToolbarTextColorPicker = ({ editor }: { editor: Editor }) => (
  <ToolbarColorPicker
    editor={editor}
    icon={TypeIcon}
    tooltip="رنگ متن"
    defaultUnderlineColor="black"
    getColor={(editor) =>
      editor.getAttributes('textStyle').color as string | undefined
    }
    setColor={(editor, color) => {
      editor.chain().setColor(color).run()
    }}
    unsetColor={(editor) => {
      editor.chain().unsetColor().run()
    }}
  />
)

export const ToolbarHighlightColorPicker = ({ editor }: { editor: Editor }) => (
  <ToolbarColorPicker
    editor={editor}
    icon={HighlighterIcon}
    tooltip="رنگ پس زمینه"
    defaultUnderlineColor="#fef08a"
    getColor={(editor) =>
      editor.getAttributes('highlight').color as string | undefined
    }
    setColor={(editor, color) => {
      editor.chain().setHighlight({ color }).run()
    }}
    unsetColor={(editor) => {
      editor.chain().unsetHighlight().run()
    }}
  />
)
