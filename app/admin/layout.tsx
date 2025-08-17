import type React from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile, error } = await supabase
    .from("user_profiles")
    .select("isAdmin")
    .eq("id", user.id)
    .single()

  if (error || !profile?.isAdmin) {
    redirect("/dashboard") // Redirect non-admins
  }

  return (
    <MainLayout>
      {children}
    </MainLayout>
  )
}