import { TooltipButton } from '#/components/tooltip-button.tsx'
import type { LinkRange } from '#/farsi-rich-text-editor/types.ts'
import { handleRemoveLink } from '#/farsi-rich-text-editor/utils/index.ts'
import type { Editor } from '@tiptap/core'
import { BubbleMenu } from '@tiptap/react/menus'
import { Edit3Icon, Trash2Icon } from 'lucide-react'

export const LinkBubbleMenu = ({
  editor,
  range,
  openEditLinkDialog,
}: {
  editor: Editor
  range: LinkRange | null
  openEditLinkDialog: () => void
}) => {
  return (
    <BubbleMenu
      editor={editor}
      pluginKey="linkBubbleMenu"
      updateDelay={0}
      shouldShow={({ editor }) => {
        return editor.isActive('link')
      }}
      options={{
        placement: 'bottom',
      }}
    >
      <div className="rounded-2xl border bg-white p-1 shadow">
        <div className="flex items-center gap-1.5 p-1">
          <TooltipButton
            tooltip="ویرایش لینک"
            icon={<Edit3Icon />}
            variant={'outline'}
            onClick={openEditLinkDialog}
          />
          <TooltipButton
            tooltip="حذف لینک"
            icon={<Trash2Icon />}
            variant={'outline'}
            className="text-destructive!"
            onClick={() => {
              handleRemoveLink({ editor, range })
            }}
          />
        </div>
      </div>
    </BubbleMenu>
  )
}
