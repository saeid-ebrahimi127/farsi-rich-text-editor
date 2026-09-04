import { Button } from '#/components/ui/button.tsx'
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
      <div className="w-40 rounded-2xl border bg-white p-1 shadow">
        <div className="flex max-h-40 scrollbar-thin flex-col gap-1 overflow-auto p-1">
          <Button
            type="button"
            variant="outline"
            className="justify-start"
            onClick={openEditLinkDialog}
          >
            <Edit3Icon />
            ویرایش لینک
          </Button>
          <Button
            type="button"
            variant="outline"
            className="text-destructive! justify-start"
            onClick={() => handleRemoveLink({ editor, range })}
          >
            <Trash2Icon />
            حذف لینک
          </Button>
        </div>
      </div>
    </BubbleMenu>
  )
}
