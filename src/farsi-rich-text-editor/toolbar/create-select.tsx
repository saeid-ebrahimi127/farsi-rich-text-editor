import { Select, SelectContent, SelectGroup } from '#/components/ui/select.tsx'
import type { ReactNode } from 'react'

export const ToolbarCreateSelect = ({
  value,
  onValueChange,
  trigger,
  children,
  disabled = false,
}: {
  value: string
  onValueChange: (value: string) => void
  trigger: ReactNode
  children: ReactNode
  disabled?: boolean
}) => {
  return (
    <Select disabled={disabled} value={value} onValueChange={onValueChange}>
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
