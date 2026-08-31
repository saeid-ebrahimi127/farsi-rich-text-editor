import { ToolbarCreateButton } from '#/components/farsi-rich-text-editor/toolbar/create-button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu.tsx'
import type { Editor } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import { CheckIcon, ChevronLeftIcon, Code2Icon } from 'lucide-react'
import { useState } from 'react'
import { flushSync } from 'react-dom'

const items = [
  { label: 'کد ساده', value: 'plaintext' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'PHP', value: 'php' },
  { label: 'Python', value: 'python' },
  { label: 'JSON', value: 'json' },
  { label: 'Bash', value: 'bash' },
  { label: 'SQL', value: 'sql' },
  { label: 'Markdown', value: 'markdown' },
]

export const ToolbarAddModifyCodeBlock = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false)

  const { isCodeBlock, codeBlockLanguage } = useEditorState({
    editor,
    selector: ({ editor }) => {
      const { $from } = editor.state.selection
      const node = $from.parent

      return {
        isCodeBlock: editor.isActive('codeBlock'),
        codeBlockLanguage: (node.type.name === 'codeBlock'
          ? (node.attrs.language ?? null)
          : null) as string | null,
      }
    },
  })

  const handleCodeBlock = (language: string | null) => {
    const chain = editor.chain()

    if (!isCodeBlock) {
      chain.setCodeBlock(language ? { language } : undefined).run()
    } else {
      chain
        .updateAttributes('codeBlock', {
          language: language ?? null,
        })
        .run()
    }

    flushSync(() => {
      setOpen(false)
    })

    editor.chain().focus().run()
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <ToolbarCreateButton
          icon={<Code2Icon />}
          tooltip="کد"
          variant={isCodeBlock ? 'default' : 'ghost'}
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

                handleCodeBlock(item.value)
              }}
            >
              <ChevronLeftIcon />
              {item.label}
              {isCodeBlock && codeBlockLanguage === item.value && (
                <CheckIcon className="mr-auto" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
