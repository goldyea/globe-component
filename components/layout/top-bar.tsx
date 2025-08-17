"use client"

import { Bell, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"
import { Breadcrumb } from "./breadcrumb"
import { usePathname } from "next/navigation"
import { useUser } from "@/hooks/use-user"

export function TopBar() {
  const { logout } = useAuth()
  const { user, profile, isLoading: isUserLoading } = useUser()
  const pathname = usePathname()

  const showBreadcrumb = pathname.startsWith("/docs") || pathname.startsWith("/admin") || pathname.startsWith("/store") || pathname.startsWith("/vps/")
  const pageTitle =
    pathname === "/dashboard"
      ? "Dashboard"
      : pathname === "/vps"
        ? "VPS Management"
        : pathname === "/vps/create"
          ? "Create VPS"
          : pathname === "/support"
            ? "Support"
            : pathname === "/settings"
              ? "Settings"
              : pathname === "/account"
                ? "Account"
                : pathname === "/terms"
                  ? "Terms of Service"
                  : pathname === "/privacy"
                    ? "Privacy Policy"
                    : pathname === "/store"
                      ? "Resource Store"
                      : pathname.startsWith("/admin")
                        ? "Admin Panel"
                        : "Dashboard"

  return (
    <div className="glass h-16 px-6 flex items-center justify-between border-b border-slate-700/50 fixed top-0 right-0 left-64 z-30">
      <div className="flex items-center gap-4">
        {showBreadcrumb ? <Breadcrumb /> : <h2 className="text-lg font-semibold text-slate-100">{pageTitle}</h2>}
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative text-slate-300 hover:text-slate-100">
          <Bell className="h-5 w-5" />
          {/* Placeholder for notification count */}
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
        </Button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-slate-300 hover:text-slate-100">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {isUserLoading ? "" : profile?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              <span className="text-sm font-medium">
                {isUserLoading ? "Loading..." : profile?.username || user?.email || "Guest"}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-card">
            <DropdownMenuItem className="text-slate-300 hover:text-slate-100">Profile Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 hover:text-slate-100">API Keys</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700/50" />
            <DropdownMenuItem onClick={logout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}