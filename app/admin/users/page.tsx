"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, User, Plus, Minus, Ban, CheckCircle, Loader2, X } from "lucide-react" // Added X for non-admin icon
import { createClient } from "@/lib/supabase/client"
import { useUser } from "@/hooks/use-user"
import { Skeleton } from "@/components/ui/loading-skeleton"
import { InlineError } from "@/components/ui/error-state"
import { toast } from "sonner"

interface UserProfile {
  id: string
  user_id: string
  username: string | null
  full_name: string | null
  company: string | null
  isAdmin: boolean
  credits: number // Changed to a single credits field
  created_at: string
  updated_at: string
}

export default function AdminUsersPage() {
  const { user, isAdmin, isLoading: isAuthLoading } = useUser()
  const supabase = createClient()

  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingCredits, setEditingCredits] = useState<string | null>(null)
  const [creditChangeValue, setCreditChangeValue] = useState(0) // Single value for credits
  const [isUpdatingCredits, setIsUpdatingCredits] = useState(false)
  const [suspendingUserId, setSuspendingUserId] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchError } = await supabase
        .from("user_profiles")
        .select("*")
        .order("created_at", { ascending: false })

      if (fetchError) {
        throw fetchError
      }
      setUsers(data)
    } catch (err: any) {
      console.error("Error fetching users:", err)
      setError(err.message || "Failed to load users.")
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    if (!isAuthLoading && isAdmin) {
      fetchUsers()
    }
  }, [isAuthLoading, isAdmin, fetchUsers])

  const handleEditCredits = (user: UserProfile) => {
    setEditingCredits(user.id)
    setCreditChangeValue(user.credits) // Set initial value to current credits
  }

  const handleSaveCredits = async (userId: string) => {
    setIsUpdatingCredits(true)
    try {
      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({
          credits: creditChangeValue, // Update single credits field
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)

      if (updateError) {
        throw updateError
      }
      toast.success("Credits updated successfully!")
      setEditingCredits(null)
      fetchUsers() // Re-fetch users to show updated credits
    } catch (err: any) {
      console.error("Error updating credits:", err)
      toast.error(`Failed to update credits: ${err.message || "An unexpected error occurred."}`)
    } finally {
      setIsUpdatingCredits(false)
    }
  }

  const handleSuspendServer = async (userId: string, currentStatus: string) => {
    setSuspendingUserId(userId)
    try {
      // In a real application, this would interact with a backend service
      // to suspend/unsuspend the user's VPS instances.
      // For now, we'll simulate it and update a mock status.
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

      // Example: Update a 'suspended' flag on user_profiles or vps_instances
      // For this example, we'll just show a toast.
      const newStatus = currentStatus === "active" ? "suspended" : "active";
      toast.success(`User ${userId} servers ${newStatus} successfully! (Simulated)`);
      // You would ideally update the user's profile or related server records here
      // For now, just refetch to clear the loading state.
      fetchUsers();

    } catch (err: any) {
      console.error("Error suspending/unsuspending server:", err)
      toast.error(`Failed to change server status: ${err.message || "An unexpected error occurred."}`)
    } finally {
      setSuspendingUserId(null)
    }
  }

  const filteredUsers = users.filter((u) =>
    u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isAuthLoading || loading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-10 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!isAdmin) {
    return (
      <Card className="glass-card p-8 text-center">
        <p className="text-red-400">Access Denied: You do not have administrative privileges.</p>
      </Card>
    )
  }

  if (error) {
    return <InlineError message={error} onRetry={fetchUsers} />
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center gap-2">
          <User className="h-5 w-5 text-blue-400" />
          User Management
        </CardTitle>
        <CardDescription className="text-slate-400">View and manage all user accounts and their resources.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search users by username or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="glass-input pl-10"
          />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-800/50">
                <TableHead className="text-slate-300">User ID</TableHead>
                <TableHead className="text-slate-300">Username</TableHead>
                <TableHead className="text-slate-300">Email</TableHead>
                <TableHead className="text-slate-300">Admin</TableHead>
                <TableHead className="text-slate-300">Credits</TableHead> {/* Changed to Credits */}
                <TableHead className="text-slate-300 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-slate-400 py-8"> {/* Adjusted colspan */}
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((u) => (
                  <TableRow key={u.id} className="border-slate-700/50">
                    <TableCell className="font-mono text-xs text-slate-300">{u.id.substring(0, 8)}...</TableCell>
                    <TableCell className="text-slate-200">{u.username || u.full_name || "N/A"}</TableCell>
                    <TableCell className="text-slate-400">{u.user_id}</TableCell>
                    <TableCell>
                      {u.isAdmin ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <X className="h-4 w-4 text-red-400" />
                      )}
                    </TableCell>
                    <TableCell>
                      {editingCredits === u.id ? (
                        <Input
                          type="number"
                          value={creditChangeValue}
                          onChange={(e) => setCreditChangeValue(parseInt(e.target.value) || 0)}
                          className="glass-input w-20 h-8 text-center"
                        />
                      ) : (
                        u.credits // Display single credits
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {editingCredits === u.id ? (
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            onClick={() => handleSaveCredits(u.id)}
                            disabled={isUpdatingCredits}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            {isUpdatingCredits ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingCredits(null)}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline" onClick={() => handleEditCredits(u)}>
                            Edit Credits
                          </Button>
                          <Button
                            size="sm"
                            variant={u.isAdmin ? "destructive" : "secondary"} // Assuming isAdmin means active server for this mock
                            onClick={() => handleSuspendServer(u.id, u.isAdmin ? "active" : "suspended")}
                            disabled={suspendingUserId === u.id}
                          >
                            {suspendingUserId === u.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : u.isAdmin ? ( // This is a placeholder, ideally you'd have a separate 'isSuspended' flag
                              <>
                                <Ban className="h-4 w-4 mr-1" /> Suspend
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 mr-1" /> Unsuspend
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}