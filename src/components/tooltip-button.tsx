import { Button } from '#/components/ui/button.tsx'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/ui/tooltip.tsx'
import type { ComponentProps, ReactNode } from 'react'

export const TooltipButton = ({
  icon,
  tooltip,
  ...props
}: {
  icon: ReactNode
  tooltip: string
} & ComponentProps<typeof Button>) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button type="button" variant={'ghost'} size={'icon'} {...props}>
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  )
}
