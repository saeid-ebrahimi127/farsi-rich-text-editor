import { TooltipButton } from '#/components/tooltip-button.tsx'
import type { NodeViewProps } from '@tiptap/react'
import { NodeViewWrapper } from '@tiptap/react'
import { Trash2Icon } from 'lucide-react'

export const VideoIFrameNodeView = ({ node, deleteNode }: NodeViewProps) => {
  return (
    <NodeViewWrapper
      as="div"
      className="video-wrapper relative mx-auto mb-[2em] aspect-video w-full max-w-3xl"
      data-provider={node.attrs.provider}
    >
      <iframe
        src={node.attrs.src}
        className="absolute inset-0 h-full w-full border-0"
        allowFullScreen
      />
      <TooltipButton
        tooltip="حذف ویدئو"
        icon={<Trash2Icon />}
        className={
          'text-destructive! absolute top-4 -right-4 border bg-white shadow'
        }
        onClick={deleteNode}
      />
    </NodeViewWrapper>
  )
}
