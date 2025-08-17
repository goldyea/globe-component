"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumb() {
  const pathname = usePathname()

  // Generate breadcrumb items based on current path
  const pathSegments = pathname.split("/").filter(Boolean)

  const breadcrumbItems = [{ name: "Home", href: "/", icon: Home }]

  // Build breadcrumb trail
  let currentPath = ""
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`

    // Convert segment to readable name
    let name = segment.charAt(0).toUpperCase() + segment.slice(1)
    if (segment === "docs") name = "Documentation"
    if (segment === "vps") name = "VPS"
    if (segment === "quick-start") name = "Quick Start"
    if (segment === "first-setup") name = "First Setup"
    if (segment === "ssh-connection") name = "SSH Connection"

    breadcrumbItems.push({
      name,
      href: currentPath,
      icon: null,
    })
  })

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-400">
      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}

          {index === breadcrumbItems.length - 1 ? (
            // Current page - not clickable
            <span className="text-slate-200 font-medium flex items-center gap-1">
              {item.icon && <item.icon className="h-4 w-4" />}
              {item.name}
            </span>
          ) : (
            // Clickable breadcrumb link
            <Link href={item.href} className="hover:text-slate-200 transition-colors flex items-center gap-1">
              {item.icon && <item.icon className="h-4 w-4" />}
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
