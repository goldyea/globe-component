"use client"

import type React from "react"

import { Sidebar } from "./sidebar"
import { TopBar } from "./top-bar"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <TopBar />
        <main className="flex-1 p-6 overflow-auto mt-16">{children}</main>
      </div>
    </div>
  )
}
