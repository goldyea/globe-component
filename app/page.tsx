"use client"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="glass-card p-8 max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">VPS Management Panel</h1>
          <p className="text-slate-400 mb-6">Secure, modern infrastructure management</p>
          <button
            onClick={() => router.push("/auth/login")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            Access Panel
          </button>
        </div>
      </div>
    )
  }

  return null
}
