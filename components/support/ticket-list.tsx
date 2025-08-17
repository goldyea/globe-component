"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MessageSquare, Search, Filter, Eye } from "lucide-react"

const mockTickets = [
  {
    id: "TKT-001",
    subject: "Server not responding",
    category: "Technical Support",
    priority: "high",
    status: "open",
    created: "2024-01-15T10:30:00Z",
    updated: "2024-01-15T14:20:00Z",
    messages: 3,
  },
  {
    id: "TKT-002",
    subject: "Billing question about upgrade",
    category: "Billing & Account",
    priority: "medium",
    status: "pending",
    created: "2024-01-14T16:45:00Z",
    updated: "2024-01-15T09:15:00Z",
    messages: 2,
  },
  {
    id: "TKT-003",
    subject: "Request for additional IP address",
    category: "Feature Request",
    priority: "low",
    status: "resolved",
    created: "2024-01-12T11:20:00Z",
    updated: "2024-01-13T15:30:00Z",
    messages: 5,
  },
  {
    id: "TKT-004",
    subject: "High CPU usage investigation",
    category: "Server Performance",
    priority: "medium",
    status: "in-progress",
    created: "2024-01-10T08:15:00Z",
    updated: "2024-01-15T12:45:00Z",
    messages: 7,
  },
]

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

export function TicketList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-slate-100">Your Support Tickets</CardTitle>
        <CardDescription className="text-slate-400">Track and manage your support requests</CardDescription>
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
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-dropdown">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="glass-input w-[140px]">
                <SelectValue />
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
        <div className="space-y-4">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">No tickets found</h3>
              <p className="text-slate-400">
                {searchTerm || statusFilter !== "all" || priorityFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "You haven't created any support tickets yet"}
              </p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="glass-card border-slate-700 hover:border-slate-600 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-100">{ticket.subject}</h3>
                        <Badge className={statusColors[ticket.status as keyof typeof statusColors]}>
                          {ticket.status.replace("-", " ")}
                        </Badge>
                        <Badge className={priorityColors[ticket.priority as keyof typeof priorityColors]}>
                          {ticket.priority}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                        <span className="font-mono">{ticket.id}</span>
                        <span>{ticket.category}</span>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{ticket.messages} messages</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Created {formatDate(ticket.created)}</span>
                        </div>
                        <span>Updated {formatDate(ticket.updated)}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-600 hover:border-slate-500 bg-transparent"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
