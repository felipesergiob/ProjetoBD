import { Skeleton } from './ui/skeleton'

export function ProductSkeleton() {
  return (
    <div className="border border-border rounded-md overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 flex flex-col gap-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-16 w-full" />

        <Skeleton className="h-6 w-full" />

        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  )
}
