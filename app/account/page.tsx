"use client"

import { MainLayout } from "@/components/layout/main-layout"

export default function AccountPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Account</h1>
          <p className="text-slate-400">Manage your account settings and profile</p>
        </div>
        <div className="glass-card p-8 text-center">
          <p className="text-slate-400">Account management interface coming soon...</p>
        </div>
      </div>
    </MainLayout>
  )
}
