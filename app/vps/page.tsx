"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { VPSCard } from "@/components/vps/vps-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { VPSCardSkeleton } from "@/components/ui/loading-skeleton"
import { ErrorState, InlineError } from "@/components/ui/error-state"
import { useVPSData } from "@/hooks/use-vps-data"
import { Plus, Search } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function VPSPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { vpsInstances, loading, error, refetch } = useVPSData()

  const filteredVPS = vpsInstances.filter(
    (vps) =>
      vps.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vps.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">VPS Instances</h1>
            <p className="text-slate-400">Manage your virtual private servers</p>
          </div>
          <Link href="/vps/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create VPS
            </Button>
          </Link>
        </div>

        {error && <InlineError message={error} onRetry={refetch} />}

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search VPS instances..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-600/50 text-slate-100 focus:border-blue-500/50"
            />
          </div>
        </div>

        {/* VPS Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <VPSCardSkeleton />
            <VPSCardSkeleton />
            <VPSCardSkeleton />
          </div>
        ) : error && !vpsInstances.length ? (
          <ErrorState
            title="Failed to load VPS instances"
            message="We couldn't fetch your VPS data. Please try again."
            onRetry={refetch}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVPS.map((vps) => (
              <VPSCard key={vps.id} vps={vps} />
            ))}
          </div>
        )}

        {!loading && !error && filteredVPS.length === 0 && vpsInstances.length > 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No VPS instances found matching your search.</p>
          </div>
        )}

        {!loading && !error && vpsInstances.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 mb-4">You don't have any VPS instances yet.</p>
            <Link href="/vps/create">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First VPS
              </Button>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
