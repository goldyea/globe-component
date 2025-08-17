"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, ChevronRight } from "lucide-react"

interface DocContentProps {
  title: string
  description: string
  content: React.ReactNode
  readTime?: string
  difficulty?: "Beginner" | "Intermediate" | "Advanced"
  lastUpdated?: string
}

export function DocContent({
  title,
  description,
  content,
  readTime = "5 min",
  difficulty = "Beginner",
  lastUpdated = "2024-01-15",
}: DocContentProps) {
  const difficultyColors = {
    Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
          <span>Documentation</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-200">{title}</span>
        </div>

        <h1 className="text-4xl font-bold text-slate-100 mb-4">{title}</h1>
        <p className="text-xl text-slate-300 mb-6">{description}</p>

        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readTime} read</span>
          </div>
          <Badge className={difficultyColors[difficulty]}>{difficulty}</Badge>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>Updated {lastUpdated}</span>
          </div>
        </div>
      </div>

      <Card className="glass-card">
        <CardContent className="p-8 prose prose-invert prose-slate max-w-none">{content}</CardContent>
      </Card>
    </div>
  )
}
