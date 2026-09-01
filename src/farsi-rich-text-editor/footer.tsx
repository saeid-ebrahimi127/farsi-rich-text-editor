import { getReadingTime } from '#/farsi-rich-text-editor/utils/index.ts'
import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'

export const FRTE_Footer = ({ editor }: { editor: Editor }) => {
  const { wordsCount, charactersCount, readTime } = useEditorState({
    editor,
    selector: ({ editor }) => {
      const words = editor.storage.characterCount.words()
      return {
        wordsCount: words,
        charactersCount: editor.storage.characterCount.characters(),
        readTime: getReadingTime(words),
      }
    },
  })

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl rounded-t-none border border-t-0 bg-white p-2 text-xs">
      <span>
        کلمات: <strong>{Intl.NumberFormat('fa-IR').format(wordsCount)}</strong>
      </span>
      <span>
        کاراکتر:{' '}
        <strong>{Intl.NumberFormat('fa-IR').format(charactersCount)}</strong>
      </span>
      <span>
        مطالعه: <strong>{readTime} دقیقه</strong>
      </span>
    </div>
  )
}
