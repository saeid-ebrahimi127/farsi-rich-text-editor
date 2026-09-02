import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu.tsx'
import { VideoIFrameDialog } from '#/farsi-rich-text-editor/components/video-iframe-dialog.tsx'
import { ToolbarCreateButton } from '#/farsi-rich-text-editor/toolbar/create-button.tsx'
import type { Editor } from '@tiptap/react'
import { ChevronLeftIcon, VideoIcon } from 'lucide-react'
import { useState } from 'react'

export const ToolbarAddVideo = ({ editor }: { editor: Editor }) => {
  const [openVideoIFrameDialog, setOpenVideoIFrameDialog] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ToolbarCreateButton icon={<VideoIcon />} tooltip="افزودن ویدئو" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          onCloseAutoFocus={(e) => {
            e.preventDefault()
          }}
          className="max-h-48 w-48 scrollbar-thin overflow-auto"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setOpenVideoIFrameDialog(true)}>
              <ChevronLeftIcon />
              افزودن کد IFrame
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <VideoIFrameDialog
        openDialog={openVideoIFrameDialog}
        setOpenDialog={setOpenVideoIFrameDialog}
        editor={editor}
      />
    </>
  )
}
