"use client"

import { useState, useEffect } from "react"

interface DashboardStats {
  activeVPS: number
  containers: number
  cpuUsage: string
  storageUsed: string
  uptime: string
  avgResponse: string
  activeAlerts: number
}

interface UseDashboardStatsReturn {
  stats: DashboardStats | null
  loading: boolean
  error: string | null
  refetch: () => void
}

const mockStats: DashboardStats = {
  activeVPS: 3,
  containers: 12,
  cpuUsage: "45%",
  storageUsed: "127GB",
  uptime: "99.9%",
  avgResponse: "24ms",
  activeAlerts: 0,
}

export function useDashboardStats(): UseDashboardStatsReturn {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Simulate occasional errors
      if (Math.random() < 0.05) {
        throw new Error("Failed to fetch dashboard statistics")
      }

      setStats(mockStats)
    } catch (err) {
      console.error("Error fetching dashboard stats:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
}
