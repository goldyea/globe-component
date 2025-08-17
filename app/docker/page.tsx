"use client"

import { MainLayout } from "@/components/layout/main-layout"

export default function DockerPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Docker Containers</h1>
          <p className="text-slate-400">Manage your containerized applications</p>
        </div>
        <div className="glass-card p-8 text-center">
          <p className="text-slate-400">Docker management interface coming soon...</p>
        </div>
      </div>
    </MainLayout>
  )
}
