"use client"

import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  showRetry?: boolean
}

export function ErrorState({
  title = "Something went wrong",
  message = "We encountered an error while loading this content.",
  onRetry,
  showRetry = true,
}: ErrorStateProps) {
  return (
    <div className="glass-card p-8 text-center">
      <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-400 mb-6">{message}</p>
      {showRetry && onRetry && (
        <Button onClick={onRetry} variant="outline" className="glass-button bg-transparent">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  )
}

export function InlineError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg glass-card flex items-center justify-between">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        <span className="text-sm">{message}</span>
      </div>
      {onRetry && (
        <Button onClick={onRetry} size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
          <RefreshCw className="h-3 w-3" />
        </Button>
      )}
    </div>
  )
}
