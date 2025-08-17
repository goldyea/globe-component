"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, AlertTriangle, Info, CheckCircle, X, Clock } from "lucide-react"

interface Alert {
  id: string
  type: "critical" | "warning" | "info" | "resolved"
  title: string
  message: string
  timestamp: Date
  vpsId?: string
  acknowledged: boolean
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "High CPU Usage",
    message: "VPS-001 CPU usage has exceeded 90% for the last 15 minutes",
    timestamp: new Date(Date.now() - 300000),
    vpsId: "VPS-001",
    acknowledged: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Low Disk Space",
    message: "VPS-002 has less than 10% disk space remaining",
    timestamp: new Date(Date.now() - 600000),
    vpsId: "VPS-002",
    acknowledged: false,
  },
  {
    id: "3",
    type: "info",
    title: "Scheduled Maintenance",
    message: "Network maintenance scheduled for tonight 2:00 AM - 4:00 AM EST",
    timestamp: new Date(Date.now() - 3600000),
    acknowledged: true,
  },
  {
    id: "4",
    type: "resolved",
    title: "Network Connectivity Restored",
    message: "Network issues affecting EU-West datacenter have been resolved",
    timestamp: new Date(Date.now() - 7200000),
    acknowledged: true,
  },
]

export function AlertPanel() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [filter, setFilter] = useState<"all" | "unacknowledged">("unacknowledged")

  const acknowledgeAlert = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert)))
  }

  const dismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
  }

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "unacknowledged") {
      return !alert.acknowledged && alert.type !== "resolved"
    }
    return true
  })

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case "info":
        return <Info className="h-4 w-4 text-blue-400" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      default:
        return <Bell className="h-4 w-4 text-gray-400" />
    }
  }

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Critical</Badge>
      case "warning":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Warning</Badge>
      case "info":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Info</Badge>
      case "resolved":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Resolved</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Unknown</Badge>
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "Just now"
  }

  const unacknowledgedCount = alerts.filter((alert) => !alert.acknowledged && alert.type !== "resolved").length

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-400" />
              System Alerts
              {unacknowledgedCount > 0 && (
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">{unacknowledgedCount}</Badge>
              )}
            </CardTitle>
            <CardDescription className="text-slate-400">Monitor system health and notifications</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "unacknowledged" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("unacknowledged")}
              className="text-xs"
            >
              Unacknowledged
            </Button>
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className="text-xs"
            >
              All Alerts
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">All Clear!</h3>
              <p className="text-slate-400">No active alerts at this time.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <Card key={alert.id} className="glass-card border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-slate-100">{alert.title}</h4>
                          {getAlertBadge(alert.type)}
                          {alert.vpsId && (
                            <Badge variant="outline" className="text-xs">
                              {alert.vpsId}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-300 mb-2">{alert.message}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="h-3 w-3" />
                          <span>{formatTime(alert.timestamp)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {!alert.acknowledged && alert.type !== "resolved" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="text-xs"
                        >
                          Acknowledge
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => dismissAlert(alert.id)} className="h-8 w-8 p-0">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
