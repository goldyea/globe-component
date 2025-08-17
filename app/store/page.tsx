"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { ResourceCard } from "@/components/store/resource-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@/hooks/use-user"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2, DollarSign } from "lucide-react" // Added DollarSign for display

export default function StorePage() {
  const { user, profile, isLoading: isUserLoading, refetchProfile } = useUser()
  const supabase = createClient()
  const [isPurchasing, setIsPurchasing] = useState(false)

  const handlePurchase = async (amount: number, price: number) => { // Simplified parameters
    if (!user) {
      toast.error("You must be logged in to purchase resources.")
      return
    }
    setIsPurchasing(true)

    try {
      const { error } = await supabase
        .from("user_profiles")
        .update({
          credits: (profile?.credits || 0) + amount, // Update single credits field
        })
        .eq("id", user.id)

      if (error) {
        throw error
      }

      toast.success(`Successfully purchased ${amount} credits! Your balance has been updated.`)
      refetchProfile() // Re-fetch user profile to update displayed credits
    } catch (error: any) {
      console.error("Error purchasing credits:", error)
      toast.error(`Failed to purchase credits: ${error.message || "An unexpected error occurred."}`)
    } finally {
      setIsPurchasing(false)
    }
  }

  const resourcePackages = [
    {
      title: "Small Credit Pack",
      description: "Add a small amount of credits to your balance.",
      price: 5.00,
      amount: 100,
      unit: "Credits",
      features: ["100 Credits", "Instant credit", "One-time purchase"],
    },
    {
      title: "Medium Credit Pack",
      description: "Boost your balance with a medium credit pack.",
      price: 20.00,
      amount: 500,
      unit: "Credits",
      features: ["500 Credits", "Instant credit", "Best value"],
    },
    {
      title: "Large Credit Pack",
      description: "Maximize your resources with a large credit pack.",
      price: 40.00,
      amount: 1200,
      unit: "Credits",
      features: ["1200 Credits", "Instant credit", "Great for large projects"],
    },
  ]

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">Resource Store</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Purchase additional credits for your account to create and manage VPS instances.
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
              <div className="flex justify-center items-center gap-4">
                <DollarSign className="h-8 w-8 text-green-400" />
                <p className="text-4xl font-bold text-slate-100">{profile?.credits ?? 0}</p>
                <p className="text-xl text-slate-400">Credits</p>
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