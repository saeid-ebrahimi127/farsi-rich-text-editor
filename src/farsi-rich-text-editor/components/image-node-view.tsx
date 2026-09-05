import { TooltipButton } from '#/components/tooltip-button.tsx'
import { cn } from '#/lib/utils.ts'
import type { NodeViewProps } from '@tiptap/react'
import { NodeViewWrapper } from '@tiptap/react'
import {
  FoldHorizontalIcon,
  Trash2Icon,
  UnfoldHorizontalIcon,
} from 'lucide-react'

export const ImageNodeView = ({
  node,
  deleteNode,
  updateAttributes,
}: NodeViewProps) => {
  const { fullWidth } = node.attrs

  const toggleFullWidth = () => {
    updateAttributes({ fullWidth: !fullWidth })
  }

  return (
    <NodeViewWrapper
      as="div"
      className={cn(
        'image-wrapper relative mb-[2em]',
        fullWidth ? 'w-full' : 'mx-auto w-fit max-w-full',
      )}
    >
      <img
        src={node.attrs.src}
        alt={node.attrs.alt}
        className={fullWidth ? 'w-full' : 'max-w-full'}
      />
      <div className="absolute top-4 right-4 flex gap-2">
        <TooltipButton
          tooltip={fullWidth ? 'اندازه ی پیش‌ فرض' : 'عرض کامل'}
          icon={fullWidth ? <FoldHorizontalIcon /> : <UnfoldHorizontalIcon />}
          className={'border bg-white shadow'}
          onClick={toggleFullWidth}
        />

        <TooltipButton
          tooltip="حذف عکس"
          icon={<Trash2Icon />}
          className="text-destructive! border bg-white shadow"
          onClick={deleteNode}
        />
      </div>
    </NodeViewWrapper>
  )
}
