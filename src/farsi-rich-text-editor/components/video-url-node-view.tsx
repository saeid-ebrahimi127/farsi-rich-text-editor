import { TooltipButton } from '#/components/tooltip-button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu.tsx'
import { cn } from '#/lib/utils.ts'
import type { NodeViewProps } from '@tiptap/react'
import { NodeViewWrapper } from '@tiptap/react'
import { MenuIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'

export const VideoURLNodeView = ({ node, deleteNode }: NodeViewProps) => {
  const [hovered, setHovered] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <NodeViewWrapper
      as="div"
      className="video-wrapper relative mx-auto mb-[2em] aspect-video w-full max-w-3xl"
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <video src={node.attrs.src} controls playsInline />
        <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
          <DropdownMenuTrigger asChild>
            <TooltipButton
              tooltip="منو"
              icon={<MenuIcon />}
              className={cn(
                'absolute -top-4 left-[50%] translate-x-[-50%] border bg-white shadow transition-all',
                hovered || openMenu
                  ? 'visible opacity-100'
                  : 'invisible opacity-0',
              )}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-40"
            onCloseAutoFocus={(e) => {
              e.preventDefault()
            }}
          >
            <DropdownMenuGroup className="max-h-40 scrollbar-thin overflow-auto">
              <DropdownMenuItem variant="destructive" onSelect={deleteNode}>
                <Trash2Icon />
                حذف ویدئو
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </NodeViewWrapper>
  )
}
