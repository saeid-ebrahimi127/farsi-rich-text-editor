import { TooltipButton } from '#/components/tooltip-button.tsx'
import type { ComponentProps } from 'react'

export const ToolbarCreateButton = (
  props: ComponentProps<typeof TooltipButton>,
) => {
  return <TooltipButton {...props} />
}
