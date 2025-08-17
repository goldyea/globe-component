"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react"

interface UptimeData {
  date: string
  status: "up" | "down" | "degraded"
  uptime: number
}

interface UptimeIndicatorProps {
  data: UptimeData[]
  currentStatus: "up" | "down" | "degraded"
  overallUptime: number
}

export function UptimeIndicator({ data, currentStatus, overallUptime }: UptimeIndicatorProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "up":
        return "bg-green-500"
      case "down":
        return "bg-red-500"
      case "degraded":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "up":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "down":
        return <XCircle className="h-4 w-4 text-red-400" />
      case "degraded":
        return <AlertCircle className="h-4 w-4 text-yellow-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "up":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Operational</Badge>
      case "down":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Down</Badge>
      case "degraded":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Degraded</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Unknown</Badge>
    }
  }

  return (
    <Card className="glass-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {getStatusIcon(currentStatus)}
            <div>
              <h3 className="text-lg font-semibold text-slate-100">System Status</h3>
              <p className="text-sm text-slate-400">Current operational status</p>
            </div>
          </div>
          <div className="text-right">
            {getStatusBadge(currentStatus)}
            <div className="text-2xl font-bold text-slate-100 mt-1">{overallUptime.toFixed(2)}%</div>
            <div className="text-xs text-slate-400">30-day uptime</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Last 30 days</span>
            <span className="text-slate-400">Today</span>
          </div>

          <div className="flex gap-1">
            {data.map((day, index) => (
              <div
                key={index}
                className={`h-8 flex-1 rounded-sm ${getStatusColor(day.status)} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                title={`${day.date}: ${day.uptime.toFixed(1)}% uptime`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-sm" />
                <span>Operational</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-sm" />
                <span>Degraded</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-sm" />
                <span>Down</span>
              </div>
            </div>
            <span>90 days ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
