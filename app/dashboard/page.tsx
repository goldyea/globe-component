"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { StatsCard } from "@/components/dashboard/stats-card"
import { UsageChart } from "@/components/dashboard/usage-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { StatsCardSkeleton, ChartSkeleton } from "@/components/ui/loading-skeleton"
import { InlineError } from "@/components/ui/error-state"
import { useDashboardStats } from "@/hooks/use-dashboard-stats"
import { Server, Container, Cpu, HardDrive, Activity } from "lucide-react"

export default function DashboardPage() {
  const { stats, loading, error, refetch } = useDashboardStats()

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
          <p className="text-slate-400">Overview of your VPS infrastructure</p>
        </div>

        {error && <InlineError message={error} onRetry={refetch} />}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <>
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
            </>
          ) : stats ? (
            <>
              <StatsCard
                title="Active VPS"
                value={stats.activeVPS}
                subtitle="2 running, 1 stopped"
                color="blue"
                icon={<Server className="h-5 w-5" />}
              />
              <StatsCard
                title="Containers"
                value={stats.containers}
                subtitle="8 running, 4 stopped"
                color="green"
                icon={<Container className="h-5 w-5" />}
              />
              <StatsCard
                title="CPU Usage"
                value={stats.cpuUsage}
                subtitle="Average across all VPS"
                color="yellow"
                icon={<Cpu className="h-5 w-5" />}
              />
              <StatsCard
                title="Storage Used"
                value={stats.storageUsed}
                subtitle="of 500GB total"
                color="purple"
                icon={<HardDrive className="h-5 w-5" />}
              />
            </>
          ) : null}
        </div>

        {/* Charts and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">{loading ? <ChartSkeleton /> : <UsageChart />}</div>
          <div className="space-y-6">
            <QuickActions />
            <RecentActivity />
          </div>
        </div>

        {/* System Health */}
        {!loading && stats && (
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-400" />
              System Health
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">{stats.uptime}</div>
                <div className="text-sm text-slate-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">{stats.avgResponse}</div>
                <div className="text-sm text-slate-400">Avg Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">{stats.activeAlerts}</div>
                <div className="text-sm text-slate-400">Active Alerts</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
