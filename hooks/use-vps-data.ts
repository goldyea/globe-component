"use client"

import { useState, useEffect } from "react"

interface VPS {
  id: string
  name: string
  status: "running" | "stopped" | "starting" | "stopping"
  cpu: number
  memory: number
  disk: number
  ip: string
  os: string
  created_at?: string
  user_id?: string
}

interface UseVPSDataReturn {
  vpsInstances: VPS[]
  loading: boolean
  error: string | null
  refetch: () => void
}

// Mock data for demonstration
const mockVPSData: VPS[] = [
  {
    id: "vps-001",
    name: "Web Server",
    status: "running",
    cpu: 45,
    memory: 3.2,
    disk: 25,
    ip: "192.168.1.100",
    os: "Ubuntu 22.04",
  },
  {
    id: "vps-002",
    name: "Database Server",
    status: "running",
    cpu: 78,
    memory: 6.1,
    disk: 67,
    ip: "192.168.1.101",
    os: "CentOS 8",
  },
  {
    id: "vps-003",
    name: "Development",
    status: "stopped",
    cpu: 0,
    memory: 0,
    disk: 12,
    ip: "192.168.1.102",
    os: "Ubuntu 20.04",
  },
]

export function useVPSData(): UseVPSDataReturn {
  const [vpsInstances, setVpsInstances] = useState<VPS[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVPSData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For now, use mock data since we don't have VPS tables set up yet
      // In a real app, this would fetch from Supabase:
      // const supabase = createClient()
      // const { data, error } = await supabase
      //   .from('vps_instances')
      //   .select('*')
      //   .order('created_at', { ascending: false })

      // Simulate occasional errors for demonstration
      if (Math.random() < 0.1) {
        throw new Error("Failed to fetch VPS data")
      }

      setVpsInstances(mockVPSData)
    } catch (err) {
      console.error("Error fetching VPS data:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVPSData()
  }, [])

  return {
    vpsInstances,
    loading,
    error,
    refetch: fetchVPSData,
  }
}
