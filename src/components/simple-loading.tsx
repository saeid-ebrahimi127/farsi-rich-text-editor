import { Loader2Icon } from 'lucide-react'

export const SimpleLoading = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      <Loader2Icon className="size-4 animate-spin" />
      <span className="text-sm">در حال بارگذاری...</span>
    </div>
  )
}
