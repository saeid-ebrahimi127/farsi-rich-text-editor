import { FarsiRichTextEditor } from '#/components/farsi-rich-text-editor/index.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="mx-auto max-w-360 p-8">
      <FarsiRichTextEditor autofocus />
    </div>
  )
}
