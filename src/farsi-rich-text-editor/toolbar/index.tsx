import { Separator } from '#/components/ui/separator.tsx'
import { ToolbarAddModifyCodeBlock } from '#/farsi-rich-text-editor/toolbar/add-modify-code-block.tsx'
import { ToolbarAddModifyLink } from '#/farsi-rich-text-editor/toolbar/add-modify-link.tsx'
import { ToolbarAddTable } from '#/farsi-rich-text-editor/toolbar/add-table.tsx'
import { ToolbarAddVideo } from '#/farsi-rich-text-editor/toolbar/add-video.tsx'
import {
  ToolbarHighlightColorPicker,
  ToolbarTextColorPicker,
} from '#/farsi-rich-text-editor/toolbar/color-picker.tsx'
import { ToolbarCreateButton } from '#/farsi-rich-text-editor/toolbar/create-button.tsx'
import { ToolbarEmojiPicker } from '#/farsi-rich-text-editor/toolbar/emoji-picker.tsx'
import { ToolbarFontSizeSelect } from '#/farsi-rich-text-editor/toolbar/font-size-select.tsx'
import { ToolbarTextAlignmentSelect } from '#/farsi-rich-text-editor/toolbar/text-alignment-select.tsx'
import { ToolbarTextDirectionSelect } from '#/farsi-rich-text-editor/toolbar/text-direction-select.tsx'
import { ToolbarTextPositionSelect } from '#/farsi-rich-text-editor/toolbar/text-position-select.tsx'
import { ToolbarTextStyleSelect } from '#/farsi-rich-text-editor/toolbar/text-style-select.tsx'
import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  QuoteIcon,
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
        isStrikethrough: editor.isActive('strike'),
        canUndo: editor.can().undo(),
        canRedo: editor.can().redo(),
        isBlockquote: editor.isActive('blockquote'),
        isBulletList: editor.isActive('bulletList'),
        isOrderedList: editor.isActive('orderedList'),
      }
    },
  })

  return (
    <div className="flex flex-wrap items-center gap-x-1 gap-y-2 rounded-xl rounded-b-none border border-b-0 bg-white p-2">
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
      <ToolbarTextDirectionSelect editor={editor} />
      <ToolbarTextStyleSelect editor={editor} />
      <Separator orientation="vertical" />
      <ToolbarFontSizeSelect editor={editor} />
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
      <ToolbarTextColorPicker editor={editor} />
      <ToolbarHighlightColorPicker editor={editor} />
      <Separator orientation="vertical" />
      <ToolbarCreateButton
        icon={<ListIcon />}
        tooltip="لیست نقطه ای"
        onClick={() => {
          editor.chain().focus().toggleBulletList().run()
        }}
        variant={editorState.isBulletList ? 'default' : 'ghost'}
      />
      <ToolbarCreateButton
        icon={<ListOrderedIcon />}
        tooltip="لیست نشانه دار"
        onClick={() => {
          editor.chain().focus().toggleOrderedList().run()
        }}
        variant={editorState.isOrderedList ? 'default' : 'ghost'}
      />
      <Separator orientation="vertical" />
      <ToolbarTextAlignmentSelect editor={editor} />
      <ToolbarTextPositionSelect editor={editor} />
      <Separator orientation="vertical" />
      <ToolbarAddModifyCodeBlock editor={editor} />
      <ToolbarCreateButton
        icon={<QuoteIcon />}
        tooltip="نقل قول"
        onClick={() => {
          editor.chain().focus().toggleBlockquote().run()
        }}
        variant={editorState.isBlockquote ? 'default' : 'ghost'}
      />
      <ToolbarCreateButton
        icon={<MinusIcon />}
        tooltip="خط افقی"
        onClick={() => {
          editor.chain().focus().setHorizontalRule().run()
        }}
      />
      <Separator orientation="vertical" />
      <ToolbarAddTable editor={editor} />
      <ToolbarAddModifyLink editor={editor} />
      <ToolbarAddVideo editor={editor} />
      <ToolbarEmojiPicker editor={editor} />
    </div>
  )
}
