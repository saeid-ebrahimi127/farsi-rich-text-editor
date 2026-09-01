import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'

function getReadingTime(wordCount: number) {
  const wordsPerMinute = 200

  if (wordCount === 0) return 0

  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

export const FRTE_Footer = ({ editor }: { editor: Editor }) => {
  const { wordsCount, charactersCount, readTime } = useEditorState({
    editor,
    selector: ({ editor }) => {
      const wordsCount = editor.storage.characterCount.words()
      return {
        wordsCount,
        charactersCount: editor.storage.characterCount.characters(),
        readTime: getReadingTime(wordsCount),
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
