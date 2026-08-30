import { Separator } from '#/components/ui/separator.tsx'
import { Skeleton } from '#/components/ui/skeleton.tsx'

export const EditorLoading = () => {
  return (
    <>
      <div className="flex flex-wrap items-center gap-x-1 gap-y-2 rounded-xl rounded-b-none border border-b-0 bg-white p-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />

        <Separator orientation="vertical" />

        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-8 w-28" />

        <Separator orientation="vertical" />

        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />

        <Separator orientation="vertical" />

        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />

        <Separator orientation="vertical" />

        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />

        <Separator orientation="vertical" />

        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-8 w-28" />

        <Separator orientation="vertical" />

        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />

        <Separator orientation="vertical" />

        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />

        <Separator orientation="vertical" />

        <Skeleton className="h-8 w-8" />
      </div>
      <div className="h-96 max-h-96 scrollbar-thin space-y-1 overflow-auto border bg-white p-4">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />

        <Skeleton className="mt-6 h-3 w-2/3" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      <div className="rounded-xl rounded-t-none border border-t-0 bg-white p-2">
        <Skeleton className="h-3 w-24" />
      </div>
    </>
  )
}
