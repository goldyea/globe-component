"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"

const docSections = [
  {
    title: "Getting Started",
    items: [
      { title: "Quick Start Guide", href: "/docs/quick-start" },
      { title: "First VPS Setup", href: "/docs/first-setup" },
      { title: "SSH Connection", href: "/docs/ssh-connection" },
    ],
  },
  {
    title: "Server Management",
    items: [
      { title: "Control Panel Overview", href: "/docs/control-panel" },
      { title: "Resource Monitoring", href: "/docs/monitoring" },
      { title: "Backup & Snapshots", href: "/docs/backups" },
      { title: "Scaling Resources", href: "/docs/scaling" },
    ],
  },
  {
    title: "Security & Hardening",
    items: [
      { title: "Security Best Practices", href: "/docs/security" },
      { title: "Firewall Configuration", href: "/docs/firewall" },
      { title: "SSL/TLS Setup", href: "/docs/ssl" },
      { title: "User Management", href: "/docs/users" },
    ],
  },
  {
    title: "Web Servers",
    items: [
      { title: "Apache Setup", href: "/docs/apache" },
      { title: "Nginx Configuration", href: "/docs/nginx" },
      { title: "Node.js Applications", href: "/docs/nodejs" },
      { title: "PHP & WordPress", href: "/docs/php" },
    ],
  },
  {
    title: "Databases",
    items: [
      { title: "MySQL Installation", href: "/docs/mysql" },
      { title: "PostgreSQL Setup", href: "/docs/postgresql" },
      { title: "MongoDB Configuration", href: "/docs/mongodb" },
      { title: "Redis Cache", href: "/docs/redis" },
    ],
  },
  {
    title: "Game Servers",
    items: [
      { title: "Minecraft Server", href: "/docs/minecraft" },
      { title: "CS2 Server Setup", href: "/docs/cs2" },
      { title: "Rust Server", href: "/docs/rust" },
      { title: "Valheim Server", href: "/docs/valheim" },
    ],
  },
  {
    title: "Performance & Optimization",
    items: [
      { title: "System Optimization", href: "/docs/optimization" },
      { title: "Memory Management", href: "/docs/memory" },
      { title: "Disk Performance", href: "/docs/disk" },
      { title: "Network Tuning", href: "/docs/network" },
    ],
  },
  {
    title: "Troubleshooting",
    items: [
      { title: "Common Issues", href: "/docs/common-issues" },
      { title: "Performance Problems", href: "/docs/performance-issues" },
      { title: "Network Connectivity", href: "/docs/network-issues" },
      { title: "System Recovery", href: "/docs/recovery" },
    ],
  },
]

export function DocSidebar() {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<string[]>(["Getting Started"])

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => (prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]))
  }

  return (
    <div className="w-64 glass-sidebar p-6 overflow-y-auto fixed left-64 top-16 bottom-0 z-20">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-100">Documentation</h2>
        <p className="text-sm text-slate-400">VPS Management Guide</p>
      </div>

      <nav className="space-y-2">
        {docSections.map((section) => {
          const isExpanded = expandedSections.includes(section.title)
          return (
            <div key={section.title}>
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <span>{section.title}</span>
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>

              {isExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "block px-3 py-2 text-sm rounded-lg transition-colors",
                          isActive
                            ? "bg-blue-600/20 text-blue-400 border-l-2 border-blue-500"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30",
                        )}
                      >
                        {item.title}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
