import type React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-slate-700/50", className)} {...props} />
}

export function StatsCardSkeleton() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-5 rounded" />
      </div>
      <Skeleton className="h-8 w-16 mb-2" />
      <Skeleton className="h-3 w-24" />
    </div>
  )
}

export function VPSCardSkeleton() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Skeleton className="h-5 w-24 mb-2" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-8" />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-600/50">
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="glass-card p-6">
      <Skeleton className="h-6 w-32 mb-6" />
      <Skeleton className="h-64 w-full" />
    </div>
  )
}
