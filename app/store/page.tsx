"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { ResourceCard } from "@/components/store/resource-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@/hooks/use-user"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export default function StorePage() {
  const { user, profile, isLoading: isUserLoading, refetchProfile } = useUser()
  const supabase = createClient()
  const [isPurchasing, setIsPurchasing] = useState(false)

  const handlePurchase = async (type: "ram" | "disk" | "cpu", amount: number, price: number) => {
    if (!user) {
      toast.error("You must be logged in to purchase resources.")
      return
    }
    setIsPurchasing(true)

    try {
      let updateData: { [key: string]: number } = {}
      if (type === "ram") {
        updateData.credits_ram_gb = (profile?.credits_ram_gb || 0) + amount
      } else if (type === "disk") {
        updateData.credits_disk_gb = (profile?.credits_disk_gb || 0) + amount
      } else if (type === "cpu") {
        updateData.credits_cpu_cores = (profile?.credits_cpu_cores || 0) + amount
      }

      const { error } = await supabase
        .from("user_profiles")
        .update(updateData)
        .eq("id", user.id)

      if (error) {
        throw error
      }

      toast.success(`Successfully purchased ${amount}${type.toUpperCase()}! Credits updated.`)
      refetchProfile() // Re-fetch user profile to update displayed credits
    } catch (error: any) {
      console.error("Error purchasing resource:", error)
      toast.error(`Failed to purchase resource: ${error.message || "An unexpected error occurred."}`)
    } finally {
      setIsPurchasing(false)
    }
  }

  const resourcePackages = [
    {
      title: "RAM Boost",
      description: "Add more memory to your account for powerful applications.",
      price: 5.00,
      amount: 4,
      unit: "GB",
      type: "ram" as const,
      features: ["4 GB additional RAM", "Instant credit", "One-time purchase"],
    },
    {
      title: "Disk Expansion",
      description: "Expand your storage capacity for large files and databases.",
      price: 10.00,
      amount: 50,
      unit: "GB",
      type: "disk" as const,
      features: ["50 GB additional SSD storage", "Instant credit", "One-time purchase"],
    },
    {
      title: "CPU Upgrade",
      description: "Boost your processing power for demanding tasks.",
      price: 8.00,
      amount: 2,
      unit: "Cores",
      type: "cpu" as const,
      features: ["2 additional CPU cores", "Instant credit", "One-time purchase"],
    },
  ]

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">Resource Store</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Purchase additional RAM, Disk, and CPU credits for your account.
          </p>
        </div>

        <Card className="glass-card border-blue-500/30 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-slate-100 text-center">Your Current Credits</CardTitle>
            <CardDescription className="text-slate-400 text-center">
              These credits are used when creating or upgrading VPS instances.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isUserLoading ? (
              <div className="flex justify-center items-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
                <span className="ml-2 text-slate-400">Loading credits...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-blue-400">{profile?.credits_ram_gb ?? 0} GB</p>
                  <p className="text-sm text-slate-400">Available RAM</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-400">{profile?.credits_disk_gb ?? 0} GB</p>
                  <p className="text-sm text-slate-400">Available Disk</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-400">{profile?.credits_cpu_cores ?? 0} Cores</p>
                  <p className="text-sm text-slate-400">Available CPU</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resourcePackages.map((pkg) => (
            <ResourceCard
              key={pkg.title}
              {...pkg}
              onPurchase={handlePurchase}
              isPurchasing={isPurchasing}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}