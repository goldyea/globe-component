"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { VPSConsole } from "@/components/vps/vps-console"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, Square, RotateCcw, Terminal, Settings, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"

export default function VPSDetailPage() {
  const params = useParams()
  const vpsId = params.vpsId as string
  const [consoleOpen, setConsoleOpen] = useState(false)

  // Mock VPS data - in real app this would come from API
  const vps = {
    id: vpsId,
    name: "Web Server",
    status: "running" as const,
    cpu: 45,
    memory: 3.2,
    disk: 25,
    ip: "192.168.1.100",
    os: "Ubuntu 22.04",
    uptime: "15 days, 3 hours",
    created: "2024-01-01",
  }

  const statusColors = {
    running: "bg-green-500/20 text-green-400 border-green-500/30",
    stopped: "bg-red-500/20 text-red-400 border-red-500/30",
    starting: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    stopping: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/vps">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to VPS List
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">{vps.name}</h1>
            <p className="text-slate-400">VPS ID: {vps.id}</p>
          </div>
          <Badge className={statusColors[vps.status]}>{vps.status}</Badge>
        </div>

        {/* Control Panel */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-4">Control Panel</h2>
          <div className="flex items-center gap-3">
            <Button className="bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-500/30">
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
            <Button className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30">
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
            <Button className="bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 border border-yellow-500/30">
              <RotateCcw className="h-4 w-4 mr-2" />
              Restart
            </Button>
            <Button
              onClick={() => setConsoleOpen(true)}
              className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30"
            >
              <Terminal className="h-4 w-4 mr-2" />
              Console
            </Button>
            <Button className="bg-slate-600/20 hover:bg-slate-600/30 text-slate-400 border border-slate-500/30">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 ml-auto">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        {/* System Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">System Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Operating System</span>
                <span className="text-slate-200">{vps.os}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">IP Address</span>
                <span className="text-slate-200 font-mono">{vps.ip}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Uptime</span>
                <span className="text-slate-200">{vps.uptime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Created</span>
                <span className="text-slate-200">{vps.created}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Resource Usage</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">CPU Usage</span>
                  <span className="text-slate-200">{vps.cpu}%</span>
                </div>
                <Progress value={vps.cpu} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Memory Usage</span>
                  <span className="text-slate-200">{vps.memory}GB / 8GB</span>
                </div>
                <Progress value={(vps.memory / 8) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Disk Usage</span>
                  <span className="text-slate-200">{vps.disk}GB / 100GB</span>
                </div>
                <Progress value={vps.disk} className="h-2" />
              </div>
            </div>
          </div>
        </div>

        <VPSConsole vpsId={vpsId} isOpen={consoleOpen} onClose={() => setConsoleOpen(false)} />
      </div>
    </MainLayout>
  )
}
