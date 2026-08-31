import { Loader2Icon } from 'lucide-react'

export const SimpleLoading = ({
  message = 'در حال بارگذاری...',
}: {
  message?: string
}) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <Loader2Icon className="size-4 animate-spin" />
      <span className="text-sm">{message}</span>
    </div>
  )
}
