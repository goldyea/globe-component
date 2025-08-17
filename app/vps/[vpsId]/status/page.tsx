import { StatusChart } from "@/components/monitoring/status-chart"
import { UptimeIndicator } from "@/components/monitoring/uptime-indicator"
import { AlertPanel } from "@/components/monitoring/alert-panel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Cpu, HardDrive, Network, MemoryStick, Zap } from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"

// Mock data for demonstration
const generateTimeSeriesData = (hours: number, baseValue: number, variance: number) => {
  const data = []
  const now = new Date()

  for (let i = hours; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    const value = baseValue + (Math.random() - 0.5) * variance
    data.push({
      time: time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      value: Math.max(0, Math.min(100, value)),
    })
  }

  return data
}

const generateUptimeData = () => {
  const data = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const uptime = 95 + Math.random() * 5
    const status = uptime > 99 ? "up" : uptime > 95 ? "degraded" : "down"

    data.push({
      date: date.toLocaleDateString(),
      status: status as "up" | "down" | "degraded",
      uptime,
    })
  }

  return data
}

const cpuData = generateTimeSeriesData(24, 45, 30)
const memoryData = generateTimeSeriesData(24, 60, 25)
const diskData = generateTimeSeriesData(24, 75, 15)
const networkData = generateTimeSeriesData(24, 120, 80)
const uptimeData = generateUptimeData()

const currentMetrics = [
  { label: "CPU Usage", value: "42%", icon: Cpu, color: "text-blue-400", trend: "down" },
  { label: "Memory Usage", value: "68%", icon: MemoryStick, color: "text-green-400", trend: "up" },
  { label: "Disk Usage", value: "73%", icon: HardDrive, color: "text-purple-400", trend: "stable" },
  { label: "Network I/O", value: "156 MB/s", icon: Network, color: "text-yellow-400", trend: "up" },
]

export default function VPSStatusPage({ params }: { params: { vpsId: string } }) {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100 mb-2">VPS Status & Monitoring</h1>
            <p className="text-slate-400">Real-time performance metrics for {params.vpsId}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Activity className="h-3 w-3 mr-1" />
              Online
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Zap className="h-3 w-3 mr-1" />
              High Performance
            </Badge>
          </div>
        </div>

        {/* Current Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {currentMetrics.map((metric) => (
            <Card key={metric.label} className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  <Badge
                    className={
                      metric.trend === "up"
                        ? "bg-green-500/20 text-green-400"
                        : metric.trend === "down"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-gray-500/20 text-gray-400"
                    }
                  >
                    {metric.trend === "up" ? "↗" : metric.trend === "down" ? "↘" : "→"}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-slate-100 mb-1">{metric.value}</div>
                <div className="text-sm text-slate-400">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Uptime Indicator */}
        <UptimeIndicator data={uptimeData} currentStatus="up" overallUptime={99.2} />

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-blue-400" />
                CPU Usage
              </CardTitle>
              <CardDescription className="text-slate-400">Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <StatusChart data={cpuData} title="CPU Usage" color="var(--chart-1)" unit="%" />
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <MemoryStick className="h-5 w-5 text-green-400" />
                Memory Usage
              </CardTitle>
              <CardDescription className="text-slate-400">Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <StatusChart data={memoryData} title="Memory Usage" color="var(--chart-2)" unit="%" />
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-purple-400" />
                Disk Usage
              </CardTitle>
              <CardDescription className="text-slate-400">Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <StatusChart data={diskData} title="Disk Usage" color="var(--chart-3)" unit="%" />
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <Network className="h-5 w-5 text-yellow-400" />
                Network I/O
              </CardTitle>
              <CardDescription className="text-slate-400">Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <StatusChart data={networkData} title="Network I/O" color="var(--chart-4)" unit=" MB/s" type="area" />
            </CardContent>
          </Card>
        </div>

        {/* Alerts Panel */}
        <AlertPanel />
      </div>
    </MainLayout>
  )
}
