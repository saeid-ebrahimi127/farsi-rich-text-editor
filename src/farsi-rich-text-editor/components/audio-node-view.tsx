import { TooltipButton } from '#/components/tooltip-button.tsx'
import type { NodeViewProps } from '@tiptap/react'
import { NodeViewWrapper } from '@tiptap/react'
import { Trash2Icon } from 'lucide-react'

export const AudioNodeView = ({ node, deleteNode }: NodeViewProps) => {
  return (
    <NodeViewWrapper
      as="div"
      className="audio-wrapper relative mx-auto mb-[2em] max-w-xl"
    >
      <audio src={node.attrs.src} controls className="w-full" />
      <TooltipButton
        tooltip="حذف صدا"
        icon={<Trash2Icon />}
        className={
          'text-destructive! absolute -bottom-4 left-[50%] translate-x-[-50%] border bg-white shadow'
        }
        onClick={deleteNode}
      />
    </NodeViewWrapper>
  )
}
