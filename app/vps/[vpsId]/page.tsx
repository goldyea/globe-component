"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { VPSConsole } from "@/components/vps/vps-console"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, Square, RotateCcw, Terminal, Settings, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useUser } from "@/hooks/use-user"
import { Skeleton } from "@/components/ui/loading-skeleton"
import { InlineError } from "@/components/ui/error-state"
import { toast } from "sonner"

interface VPS {
  id: string
  name: string
  status: "running" | "stopped" | "starting" | "stopping" | "creating"
  cpu_cores: number
  ram_gb: number
  storage_gb: number
  ip_address: string | null
  os: string
  created_at: string
  updated_at: string
  user_id: string
}

export default function VPSDetailPage() {
  const params = useParams()
  const router = useRouter()
  const vpsId = params.vpsId as string
  const supabase = createClient()
  const { user, isLoading: isUserLoading, isError: isUserError, error: userError } = useUser()

  const [vps, setVps] = useState<VPS | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [consoleOpen, setConsoleOpen] = useState(false)

  const fetchVpsDetails = useCallback(async () => {
    setLoading(true)
    setError(null)

    if (!user) {
      setLoading(false)
      return
    }

    try {
      const { data, error: fetchError } = await supabase
        .from('vps_instances')
        .select('*')
        .eq('id', vpsId)
        .eq('user_id', user.id) // Ensure user owns this VPS
        .single()

      if (fetchError) {
        throw fetchError
      }
      setVps(data as VPS)
    } catch (err: any) {
      console.error("Error fetching VPS details:", err)
      setError(err.message || "Failed to load VPS details.")
    } finally {
      setLoading(false)
    }
  }, [vpsId, user, supabase])

  useEffect(() => {
    if (!isUserLoading && user) {
      fetchVpsDetails()
    }
  }, [isUserLoading, user, fetchVpsDetails])

  const handleAction = async (action: "start" | "stop" | "restart" | "delete") => {
    if (!vps || !user) return;

    // Simulate API call for VPS actions
    toast.loading(`Attempting to ${action} VPS...`);
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // In a real application, this would call an Edge Function or external API
      // to interact with the actual VPS provider.
      // For now, we'll just update the status locally and show a toast.
      let newStatus: VPS['status'] = vps.status;
      if (action === "start") newStatus = "running";
      if (action === "stop") newStatus = "stopped";
      if (action === "restart") newStatus = "running"; // Or 'starting' then 'running'

      if (action === "delete") {
        const { error: deleteError } = await supabase
          .from('vps_instances')
          .delete()
          .eq('id', vps.id)
          .eq('user_id', user.id);

        if (deleteError) throw deleteError;
        toast.success("VPS deleted successfully!");
        router.push("/vps"); // Redirect after deletion
        return;
      }

      const { error: updateError } = await supabase
        .from('vps_instances')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', vps.id)
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      toast.success(`VPS ${action}ed successfully!`);
      fetchVpsDetails(); // Re-fetch to update status
    } catch (err: any) {
      console.error(`Error ${action}ing VPS:`, err);
      toast.error(`Failed to ${action} VPS: ${err.message || "An unexpected error occurred."}`);
    } finally {
      toast.dismiss(); // Dismiss loading toast
    }
  };

  const statusColors = {
    running: "bg-green-500/20 text-green-400 border-green-500/30",
    stopped: "bg-red-500/20 text-red-400 border-red-500/30",
    starting: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    stopping: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    creating: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  }

  if (isUserLoading || loading) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-24 w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </MainLayout>
    )
  }

  if (isUserError || error) {
    return (
      <MainLayout>
        <InlineError message={userError || error || "Failed to load VPS details."} onRetry={fetchVpsDetails} />
      </MainLayout>
    )
  }

  if (!user) {
    return (
      <MainLayout>
        <Card className="glass-card p-8 text-center">
          <p className="text-slate-400">Please log in to view this VPS instance.</p>
        </Card>
      </MainLayout>
    )
  }

  if (!vps) {
    return (
      <MainLayout>
        <Card className="glass-card p-8 text-center">
          <p className="text-slate-400">VPS instance not found or you do not have permission to view it.</p>
          <Link href="/vps">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to VPS List
            </Button>
          </Link>
        </Card>
      </MainLayout>
    )
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
            <Button
              onClick={() => handleAction("start")}
              disabled={vps.status === "running" || vps.status === "starting"}
              className="bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-500/30"
            >
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
            <Button
              onClick={() => handleAction("stop")}
              disabled={vps.status === "stopped" || vps.status === "stopping"}
              className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30"
            >
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
            <Button
              onClick={() => handleAction("restart")}
              disabled={vps.status === "starting" || vps.status === "stopping"}
              className="bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 border border-yellow-500/30"
            >
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
            <Button
              onClick={() => handleAction("delete")}
              className="bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 ml-auto"
            >
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
                <span className="text-slate-200 font-mono">{vps.ip_address || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Created At</span>
                <span className="text-slate-200">{new Date(vps.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Last Updated</span>
                <span className="text-slate-200">{new Date(vps.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Resource Usage</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">CPU Cores</span>
                  <span className="text-slate-200">{vps.cpu_cores} Cores</span>
                </div>
                <Progress value={(vps.cpu_cores / 8) * 100} className="h-2" /> {/* Assuming max 8 cores for progress bar */}
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Memory Usage</span>
                  <span className="text-slate-200">{vps.ram_gb}GB</span>
                </div>
                <Progress value={(vps.ram_gb / 32) * 100} className="h-2" /> {/* Assuming max 32GB RAM for progress bar */}
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Disk Usage</span>
                  <span className="text-slate-200">{vps.storage_gb}GB</span>
                </div>
                <Progress value={(vps.storage_gb / 500) * 100} className="h-2" /> {/* Assuming max 500GB disk for progress bar */}
              </div>
            </div>
          </div>
        </div>

        <VPSConsole vpsId={vps.id} isOpen={consoleOpen} onClose={() => setConsoleOpen(false)} />
      </div>
    </MainLayout>
  )
}