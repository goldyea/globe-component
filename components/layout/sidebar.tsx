"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Server, Plus, BookOpen, Settings, User, HelpCircle, FileText } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "VPS", href: "/vps", icon: Server },
  { name: "Create VPS", href: "/vps/create", icon: Plus },
  { name: "Documentation", href: "/docs", icon: BookOpen },
  { name: "Support", href: "/support", icon: HelpCircle },
  { name: "Terms", href: "/terms", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Account", href: "/account", icon: User },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="glass-sidebar w-64 min-h-screen p-6 fixed left-0 top-0 z-40">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-100">VPS Panel</h1>
        <p className="text-sm text-slate-400">Management Dashboard</p>
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-slate-300 hover:text-slate-100 hover:bg-slate-800/50",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
