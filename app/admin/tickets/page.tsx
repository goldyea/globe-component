"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MessageSquare, Search, Filter, Eye, Ticket } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useUser } from "@/hooks/use-user"
import Link from "next/link"
import { Skeleton } from "@/components/ui/loading-skeleton"
import { InlineError } from "@/components/ui/error-state"

interface SupportTicket {
  id: string
  user_id: string
  subject: string
  category: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "open" | "in-progress" | "pending" | "resolved" | "closed"
  created_at: string
  updated_at: string
  messages: number // This will be a count from a join or separate query
  user_profiles: {
    username: string | null
    full_name: string | null
  } | null
}

const statusColors = {
  open: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "in-progress": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  pending: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  resolved: "bg-green-500/20 text-green-400 border-green-500/30",
  closed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
}

const priorityColors = {
  low: "bg-green-500/20 text-green-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  high: "bg-orange-500/20 text-orange-400",
  urgent: "bg-red-500/20 text-red-400",
}

export default function AdminTicketsPage() {
  const { user, isAdmin, isLoading: isAuthLoading, isError: isAuthError, error: authError } = useUser()
  const supabase = createClient()

  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const fetchTickets = useCallback(async () => {
    setLoading(true)
    setError(null)

    if (!user || !isAdmin) {
      setLoading(false)
      return;
    }

    try {
      let query = supabase
        .from("support_tickets")
        .select(`
          id,
          user_id,
          subject,
          category,
          priority,
          status,
          created_at,
          updated_at,
          user_profiles(username, full_name),
          ticket_messages(count)
        `)
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      if (priorityFilter !== "all") {
        query = query.eq("priority", priorityFilter);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      const formattedTickets: SupportTicket[] = data.map((ticket: any) => ({
        ...ticket,
        messages: ticket.ticket_messages[0]?.count || 0,
      }));

      setTickets(formattedTickets);
    } catch (err: any) {
      console.error("Error fetching tickets:", err);
      setError(err.message || "Failed to load tickets.");
    } finally {
      setLoading(false);
    }
  }, [user, isAdmin, statusFilter, priorityFilter, supabase]);

  useEffect(() => {
    if (!isAuthLoading && isAdmin) {
      fetchTickets();
    }
  }, [isAuthLoading, isAdmin, fetchTickets]);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user_profiles?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user_profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isAuthLoading || loading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-[140px]" />
            <Skeleton className="h-10 w-[140px]" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isAdmin) {
    return (
      <Card className="glass-card p-8 text-center">
        <p className="text-red-400">Access Denied: You do not have administrative privileges.</p>
      </Card>
    )
  }

  if (isAuthError || error) {
    return <InlineError message={authError || error || "Failed to load tickets."} onRetry={fetchTickets} />;
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center gap-2">
          <Ticket className="h-5 w-5 text-green-400" />
          All Support Tickets
        </CardTitle>
        <CardDescription className="text-slate-400">Manage all support requests across the platform</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input pl-10"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="glass-input w-[140px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="glass-dropdown">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="glass-input w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="glass-dropdown">
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tickets List */}
        {filteredTickets.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-300 mb-2">No tickets found</h3>
            <p className="text-slate-400">
              {searchTerm || statusFilter !== "all" || priorityFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No support tickets available."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="glass-card border-slate-700 hover:border-slate-600 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-100">{ticket.subject}</h3>
                        <Badge className={statusColors[ticket.status]}>
                          {ticket.status.replace("-", " ")}
                        </Badge>
                        <Badge className={priorityColors[ticket.priority]}>
                          {ticket.priority}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                        <span className="font-mono">{ticket.id}</span>
                        <span>{ticket.category}</span>
                        <span className="text-slate-300">by {ticket.user_profiles?.username || ticket.user_profiles?.full_name || "Unknown User"}</span>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{ticket.messages} messages</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Created {formatDate(ticket.created_at)}</span>
                        </div>
                        <span>Updated {formatDate(ticket.updated_at)}</span>
                      </div>
                    </div>

                    <Link href={`/support/${ticket.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600 hover:border-slate-500 bg-transparent"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}