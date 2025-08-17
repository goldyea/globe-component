"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Ticket, DollarSign, Server } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Admin Dashboard</h1>
        <p className="text-slate-400">Manage users, tickets, and system resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/users">
          <Card className="glass-card hover:bg-slate-900/40 transition-all duration-200">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-slate-100">User Management</CardTitle>
                <CardDescription className="text-slate-400">View and manage all user accounts</CardDescription>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/tickets">
          <Card className="glass-card hover:bg-slate-900/40 transition-all duration-200">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-green-600/20 rounded-lg">
                <Ticket className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <CardTitle className="text-slate-100">Support Tickets</CardTitle>
                <CardDescription className="text-slate-400">View and respond to all support tickets</CardDescription>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="glass-card hover:bg-slate-900/40 transition-all duration-200">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-purple-600/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-slate-100">Credit Management</CardTitle>
              <CardDescription className="text-slate-400">Adjust user resource credits</CardDescription>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover:bg-slate-900/40 transition-all duration-200">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-yellow-600/20 rounded-lg">
              <Server className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <CardTitle className="text-slate-100">Server Management</CardTitle>
              <CardDescription className="text-slate-400">Suspend/unsuspend user servers</CardDescription>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}