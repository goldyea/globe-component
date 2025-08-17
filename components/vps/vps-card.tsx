import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Server, Cpu, HardDrive, Zap, Play, Square, RotateCcw, Settings } from "lucide-react"
import Link from "next/link"

interface VPSCardProps {
  vps: {
    id: string
    name: string
    status: "running" | "stopped" | "starting" | "stopping"
    cpu: number
    memory: number
    disk: number
    ip: string
    os: string
  }
}

const statusColors = {
  running: "bg-green-500/20 text-green-400 border-green-500/30",
  stopped: "bg-red-500/20 text-red-400 border-red-500/30",
  starting: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  stopping: "bg-orange-500/20 text-orange-400 border-orange-500/30",
}

export function VPSCard({ vps }: VPSCardProps) {
  return (
    <div className="glass-card p-6 hover:bg-slate-900/40 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Server className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100">{vps.name}</h3>
            <p className="text-sm text-slate-400">ID: {vps.id}</p>
          </div>
        </div>
        <Badge className={statusColors[vps.status]}>{vps.status}</Badge>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            CPU
          </span>
          <span className="text-slate-200">{vps.cpu}% usage</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Memory
          </span>
          <span className="text-slate-200">{vps.memory}GB / 8GB</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            Disk
          </span>
          <span className="text-slate-200">{vps.disk}GB / 100GB</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">IP Address</span>
          <span className="text-slate-200 font-mono">{vps.ip}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">OS</span>
          <span className="text-slate-200">{vps.os}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm" variant="ghost" className="text-green-400 hover:text-green-300 hover:bg-green-500/10">
          <Play className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
          <Square className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Link href={`/vps/${vps.id}`} className="ml-auto">
          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-slate-200">
            <Settings className="h-4 w-4 mr-1" />
            Manage
          </Button>
        </Link>
      </div>
    </div>
  )
}
