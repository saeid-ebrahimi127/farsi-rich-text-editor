import { Select, SelectContent, SelectGroup } from '#/components/ui/select.tsx'
import type { ReactNode } from 'react'

export const ToolbarCreateSelect = ({
  value,
  onValueChange,
  trigger,
  children,
}: {
  value: string
  onValueChange: (value: string) => void
  trigger: ReactNode
  children: ReactNode
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      {trigger}
      <SelectContent
        onCloseAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <SelectGroup>{children}</SelectGroup>
      </SelectContent>
    </Select>
  )
}
