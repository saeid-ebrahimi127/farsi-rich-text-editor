import { TooltipButton } from '#/components/tooltip-button.tsx'
import { NodeViewWrapper } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import { Trash2Icon } from 'lucide-react'
import { useState } from 'react'

export const VideoIFrameNodeView = ({ node, deleteNode }: NodeViewProps) => {
  const [hovered, setHovered] = useState(false)

  return (
    <NodeViewWrapper
      as="div"
      className="video-wrapper relative mx-auto my-[2em] aspect-video w-full max-w-3xl"
      data-provider={node.attrs.provider}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <iframe
          src={node.attrs.src}
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
        />
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
