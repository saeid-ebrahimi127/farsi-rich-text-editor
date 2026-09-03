import { TooltipButton } from '#/components/tooltip-button.tsx'
import { NodeViewWrapper } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'

export const VideoURLNodeView = ({ node, deleteNode }: NodeViewProps) => {
  const [hovered, setHovered] = useState(false)

  return (
    <NodeViewWrapper
      as="div"
      className="video-wrapper relative mx-auto aspect-video w-full max-w-3xl"
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <video src={node.attrs.src} controls playsInline />
        {hovered && (
          <TooltipButton
            tooltip="حذف ویدئو"
            icon={<Trash2Icon />}
            className="text-destructive! absolute -top-4 left-[50%] translate-x-[-50%] border bg-white shadow"
            onClick={deleteNode}
          />
        )}
      </div>
    </NodeViewWrapper>
  )
}
