import { AparatIcon } from '#/components/aparat-icon.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu.tsx'
import { AparatDialog } from '#/farsi-rich-text-editor/components/aparat-dialog.tsx'
import { ToolbarCreateButton } from '#/farsi-rich-text-editor/toolbar/create-button.tsx'
import type { Editor } from '@tiptap/react'
import { VideoIcon } from 'lucide-react'
import { useState } from 'react'

export const ToolbarAddVideo = ({ editor }: { editor: Editor }) => {
  const [openAparatDialog, setOpenAparatDialog] = useState(false)

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
            <DropdownMenuItem onSelect={() => setOpenAparatDialog(true)}>
              <AparatIcon />
              افزودن ویدئوی آپاراتی
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AparatDialog
        openDialog={openAparatDialog}
        setOpenDialog={setOpenAparatDialog}
        editor={editor}
      />
    </>
  )
}
