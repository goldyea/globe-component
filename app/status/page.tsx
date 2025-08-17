import { StatusChart } from "@/components/monitoring/status-chart"
import { UptimeIndicator } from "@/components/monitoring/uptime-indicator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, Globe, Database, Shield, Activity, Clock } from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"

// Mock data for global status
const generateGlobalData = () => {
  const data = []
  const now = new Date()

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      time: time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      value: 95 + Math.random() * 5,
    })
  }

  return data
}

const generateUptimeData = () => {
  const data = []
  const now = new Date()

  for (let i = 89; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const uptime = 98 + Math.random() * 2
    const status = uptime > 99.5 ? "up" : uptime > 98 ? "degraded" : "down"

    data.push({
      date: date.toLocaleDateString(),
      status: status as "up" | "down" | "degraded",
      uptime,
    })
  }

  return data
}

const services = [
  {
    name: "VPS Infrastructure",
    status: "operational",
    uptime: 99.98,
    description: "Virtual private server hosting platform",
    icon: Server,
  },
  {
    name: "Control Panel",
    status: "operational",
    uptime: 99.95,
    description: "Web-based management interface",
    icon: Globe,
  },
  {
    name: "Database Services",
    status: "degraded",
    uptime: 99.12,
    description: "MySQL, PostgreSQL, and MongoDB hosting",
    icon: Database,
  },
  {
    name: "Security Services",
    status: "operational",
    uptime: 99.99,
    description: "DDoS protection and firewall services",
    icon: Shield,
  },
]

const datacenters = [
  { name: "US East (New York)", status: "operational", latency: 12, flag: "🇺🇸" },
  { name: "US West (Los Angeles)", status: "operational", latency: 8, flag: "🇺🇸" },
  { name: "EU West (London)", status: "operational", latency: 15, flag: "🇬🇧" },
  { name: "EU Central (Frankfurt)", status: "degraded", latency: 45, flag: "🇩🇪" },
  { name: "Asia Pacific (Singapore)", status: "operational", latency: 22, flag: "🇸🇬" },
]

const globalUptimeData = generateGlobalData()
const uptimeHistoryData = generateUptimeData()

export default function GlobalStatusPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Operational</Badge>
      case "degraded":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Degraded</Badge>
      case "down":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Down</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500"
      case "degraded":
        return "bg-yellow-500"
      case "down":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const overallStatus = services.every((s) => s.status === "operational")
    ? "operational"
    : services.some((s) => s.status === "down")
      ? "down"
      : "degraded"

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">System Status</h1>
          <p className="text-xl text-slate-300 mb-6">Real-time status and performance metrics for all our services</p>
          <div className="flex items-center justify-center gap-2">
            {getStatusBadge(overallStatus)}
            <span className="text-slate-400">•</span>
            <div className="flex items-center gap-1 text-slate-400">
              <Clock className="h-4 w-4" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Overall Uptime */}
        <UptimeIndicator data={uptimeHistoryData} currentStatus={overallStatus as any} overallUptime={99.2} />

        {/* Global Performance */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-400" />
              Global Performance
            </CardTitle>
            <CardDescription className="text-slate-400">Average response time across all datacenters</CardDescription>
          </CardHeader>
          <CardContent>
            <StatusChart data={globalUptimeData} title="Response Time" color="var(--chart-1)" unit="ms" type="area" />
          </CardContent>
        </Card>

        {/* Services Status */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-slate-100">Service Status</CardTitle>
            <CardDescription className="text-slate-400">Current status of all platform services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between p-4 rounded-lg border border-slate-700"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <service.icon className="h-6 w-6 text-slate-300" />
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusIcon(service.status)} rounded-full border-2 border-slate-800`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-100">{service.name}</h3>
                      <p className="text-sm text-slate-400">{service.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(service.status)}
                    <div className="text-sm text-slate-400 mt-1">{service.uptime}% uptime</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Datacenter Status */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-slate-100">Datacenter Status</CardTitle>
            <CardDescription className="text-slate-400">Network latency and availability by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {datacenters.map((dc) => (
                <Card key={dc.name} className="glass-card border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{dc.flag}</span>
                        <h3 className="font-semibold text-slate-100 text-sm">{dc.name}</h3>
                      </div>
                      {getStatusBadge(dc.status)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Latency:</span>
                      <span className={`font-mono ${dc.latency > 30 ? "text-yellow-400" : "text-green-400"}`}>
                        {dc.latency}ms
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Incident History */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-slate-100">Recent Incidents</CardTitle>
            <CardDescription className="text-slate-400">Past 30 days incident history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div>
                    <h3 className="font-semibold text-slate-100">Database Performance Degradation</h3>
                    <p className="text-sm text-slate-400">Resolved • Jan 14, 2024 • Duration: 2h 15m</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Resolved</Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div>
                    <h3 className="font-semibold text-slate-100">Network Connectivity Issues - EU Central</h3>
                    <p className="text-sm text-slate-400">Resolved • Jan 10, 2024 • Duration: 45m</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Resolved</Badge>
              </div>

              <div className="text-center py-4">
                <p className="text-slate-400 text-sm">No other incidents in the past 30 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
