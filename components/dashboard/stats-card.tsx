import type React from "react"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  color: "blue" | "green" | "yellow" | "purple" | "red"
  icon: React.ReactNode
}

const colorClasses = {
  blue: "text-blue-400",
  green: "text-green-400",
  yellow: "text-yellow-400",
  purple: "text-purple-400",
  red: "text-red-400",
}

export function StatsCard({ title, value, subtitle, color, icon }: StatsCardProps) {
  return (
    <div className="glass-card p-6 hover:bg-slate-900/40 transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide">{title}</h3>
        <div className={`${colorClasses[color]} opacity-80`}>{icon}</div>
      </div>
      <div className="space-y-1">
        <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
    </div>
  )
}
