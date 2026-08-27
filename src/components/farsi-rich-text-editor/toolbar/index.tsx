import { ToolbarCreateButton } from '#/components/farsi-rich-text-editor/toolbar/create-button.tsx'
import { ToolbarSelectStyle } from '#/components/farsi-rich-text-editor/toolbar/select-style.tsx'
import { Separator } from '#/components/ui/separator.tsx'
import { useEditorState } from '@tiptap/react'
import type { Editor } from '@tiptap/react'
import {
  BoldIcon,
  ItalicIcon,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
} from 'lucide-react'

export const FRTE_Toolbar = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector({ editor }) {
      return {
        isBold: editor.isActive('bold'),
        isItalic: editor.isActive('italic'),
        isUnderline: editor.isActive('underline'),
        isStrikethrough: editor.isActive('strikethrough'),
        canUndo: editor.can().undo(),
        canRedo: editor.can().redo(),
      }
    },
  })

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-xl rounded-b-none border border-b-0 bg-white p-2">
      <ToolbarCreateButton
        icon={<UndoIcon />}
        tooltip="برگرداندن"
        onClick={() => {
          editor.chain().focus().undo().run()
        }}
        disabled={!editorState.canUndo}
      />
      <ToolbarCreateButton
        icon={<RedoIcon />}
        tooltip="بازگرداندن"
        onClick={() => {
          editor.chain().focus().redo().run()
        }}
        disabled={!editorState.canRedo}
      />
      <Separator orientation="vertical" />
      <ToolbarSelectStyle editor={editor} />
      <Separator orientation="vertical" />
      <ToolbarCreateButton
        icon={<BoldIcon />}
        tooltip="درشت"
        onClick={() => {
          editor.chain().focus().toggleBold().run()
        }}
        variant={editorState.isBold ? 'default' : 'ghost'}
      />
      <ToolbarCreateButton
        icon={<ItalicIcon />}
        tooltip="مورب"
        onClick={() => {
          editor.chain().focus().toggleItalic().run()
        }}
        variant={editorState.isItalic ? 'default' : 'ghost'}
      />
      <ToolbarCreateButton
        icon={<UnderlineIcon />}
        tooltip="زیرخط"
        onClick={() => {
          editor.chain().focus().toggleUnderline().run()
        }}
        variant={editorState.isUnderline ? 'default' : 'ghost'}
      />
      <ToolbarCreateButton
        icon={<StrikethroughIcon />}
        tooltip="خط زده"
        onClick={() => {
          editor.chain().focus().toggleStrike().run()
        }}
        variant={editorState.isStrikethrough ? 'default' : 'ghost'}
      />
    </div>
  )
}
