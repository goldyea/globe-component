"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { useUser } from "@/hooks/use-user" // Import useUser

interface VPS {
  id: string
  name: string
  status: "running" | "stopped" | "starting" | "stopping" | "creating"
  cpu_cores: number
  ram_gb: number
  storage_gb: number
  ip_address: string | null
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

export function useVPSData(): UseVPSDataReturn {
  const [vpsInstances, setVpsInstances] = useState<VPS[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const { user, isLoading: isUserLoading } = useUser()

  const fetchVPSData = useCallback(async () => {
    setLoading(true)
    setError(null)

    if (!user) {
      setLoading(false)
      setVpsInstances([]); // Clear instances if no user
      return;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('vps_instances')
        .select('*')
        .eq('user_id', user.id) // Fetch only current user's VPS instances
        .order('created_at', { ascending: false })

      if (fetchError) {
        throw fetchError
      }

      setVpsInstances(data as VPS[])
    } catch (err) {
      console.error("Error fetching VPS data:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    if (!isUserLoading) {
      fetchVPSData()
    }
  }, [isUserLoading, fetchVPSData])

  return {
    vpsInstances,
    loading,
    error,
    refetch: fetchVPSData,
  }
}