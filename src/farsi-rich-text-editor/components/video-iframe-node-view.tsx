import { TooltipButton } from '#/components/tooltip-button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu.tsx'
import type { NodeViewProps } from '@tiptap/react'
import { NodeViewWrapper } from '@tiptap/react'
import { MenuIcon, Trash2Icon } from 'lucide-react'

export const VideoIFrameNodeView = ({ node, deleteNode }: NodeViewProps) => {
  return (
    <NodeViewWrapper
      as="div"
      className="video-wrapper relative mx-auto mb-[2em] aspect-video w-full max-w-3xl"
      data-provider={node.attrs.provider}
    >
      <iframe
        src={node.attrs.src}
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TooltipButton
            tooltip="منو"
            icon={<MenuIcon />}
            className={'absolute top-4 -right-4 border bg-white shadow'}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="left"
          className="w-40"
          onCloseAutoFocus={(e) => {
            e.preventDefault()
          }}
        >
          <DropdownMenuGroup className="max-h-40 scrollbar-thin overflow-auto">
            <DropdownMenuItem
              variant="default"
              className="text-destructive! not-data-[variant=destructive]:focus:**:text-destructive!"
              onSelect={deleteNode}
            >
              <Trash2Icon />
              حذف ویدئو
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </NodeViewWrapper>
  )
}
