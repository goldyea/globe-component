"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MessageSquare, User, Bot, Send, CheckCircle, ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useUser } from "@/hooks/use-user"
import { Skeleton } from "@/components/ui/loading-skeleton"
import { InlineError } from "@/components/ui/error-state"
import { toast } from "sonner"
import Link from "next/link"

interface SupportTicket {
  id: string
  user_id: string
  subject: string
  description: string
  category: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "open" | "in-progress" | "pending" | "resolved" | "closed"
  created_at: string
  updated_at: string
  user_profiles: {
    username: string | null
    full_name: string | null
  } | null
}

interface TicketMessage {
  id: string
  ticket_id: string
  user_id: string | null
  sender_type: "user" | "admin"
  content: string
  created_at: string
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

export function TicketDetail() {
  const params = useParams()
  const ticketId = params.ticketId as string
  const { user, isAdmin, isLoading: isUserLoading, isError: isUserError, error: userError } = useUser()
  const supabase = createClient()

  const [ticket, setTicket] = useState<SupportTicket | null>(null)
  const [messages, setMessages] = useState<TicketMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newMessageContent, setNewMessageContent] = useState("")
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const fetchTicketAndMessages = useCallback(async () => {
    setLoading(true)
    setError(null)

    if (!user) {
      setLoading(false)
      return
    }

    try {
      // Fetch ticket details
      let ticketQuery = supabase
        .from("support_tickets")
        .select(`*, user_profiles(username, full_name)`)
        .eq("id", ticketId)
        .single()

      if (!isAdmin) {
        ticketQuery = ticketQuery.eq("user_id", user.id)
      }

      const { data: ticketData, error: ticketError } = await ticketQuery

      if (ticketError) {
        throw ticketError
      }

      setTicket(ticketData)

      // Fetch messages for the ticket
      const { data: messagesData, error: messagesError } = await supabase
        .from("ticket_messages")
        .select(`*, user_profiles(username, full_name)`)
        .eq("ticket_id", ticketId)
        .order("created_at", { ascending: true })

      if (messagesError) {
        throw messagesError
      }

      setMessages(messagesData)
    } catch (err: any) {
      console.error("Error fetching ticket or messages:", err)
      setError(err.message || "Failed to load ticket details.")
    } finally {
      setLoading(false)
    }
  }, [ticketId, user, isAdmin, supabase])

  useEffect(() => {
    if (!isUserLoading && user) {
      fetchTicketAndMessages()
    }
  }, [isUserLoading, user, fetchTicketAndMessages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessageContent.trim() || !user || !ticket) return

    setIsSendingMessage(true)
    try {
      const { error: insertError } = await supabase.from("ticket_messages").insert({
        ticket_id: ticket.id,
        user_id: user.id,
        sender_type: isAdmin ? "admin" : "user",
        content: newMessageContent,
      })

      if (insertError) {
        throw insertError
      }

      setNewMessageContent("")
      toast.success("Message sent!")
      fetchTicketAndMessages() // Re-fetch to get the new message
    } catch (err: any) {
      console.error("Error sending message:", err)
      toast.error(`Failed to send message: ${err.message || "An unexpected error occurred."}`)
    } finally {
      setIsSendingMessage(false)
    }
  }

  const handleStatusChange = async (newStatus: string) => {
    if (!isAdmin || !ticket) return

    try {
      const { error: updateError } = await supabase
        .from("support_tickets")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", ticket.id)

      if (updateError) {
        throw updateError
      }

      toast.success(`Ticket status updated to ${newStatus}!`)
      fetchTicketAndMessages() // Re-fetch to update status
    } catch (err: any) {
      console.error("Error updating status:", err)
      toast.error(`Failed to update status: ${err.message || "An unexpected error occurred."}`)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isUserLoading || loading) {
    return (
      <Card className="glass-card">
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (isUserError || error) {
    return <InlineError message={userError || error || "Failed to load ticket details."} onRetry={fetchTicketAndMessages} />
  }

  if (!user) {
    return (
      <Card className="glass-card p-8 text-center">
        <p className="text-slate-400">Please log in to view this support ticket.</p>
      </Card>
    )
  }

  if (!ticket) {
    return (
      <Card className="glass-card p-8 text-center">
        <p className="text-slate-400">Ticket not found or you do not have permission to view it.</p>
        <Link href="/support">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Support
          </Button>
        </Link>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/support">
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tickets
          </Button>
        </Link>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-slate-100">{ticket.subject}</CardTitle>
              <CardDescription className="text-slate-400">Ticket ID: {ticket.id}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={statusColors[ticket.status]}>{ticket.status.replace("-", " ")}</Badge>
              <Badge className={priorityColors[ticket.priority]}>{ticket.priority}</Badge>
            </div>
          </div>
          <div className="text-sm text-slate-400 flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{ticket.user_profiles?.username || ticket.user_profiles?.full_name || "Unknown User"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Created {formatDate(ticket.created_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Updated {formatDate(ticket.updated_at)}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300">{ticket.description}</p>
        </CardContent>
      </Card>

      {isAdmin && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-slate-100">Admin Actions</CardTitle>
            <CardDescription className="text-slate-400">Manage ticket status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Select value={ticket.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="glass-input w-[180px]">
                  <SelectValue placeholder="Change Status" />
                </SelectTrigger>
                <SelectContent className="glass-dropdown">
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => handleStatusChange("resolved")}
                disabled={ticket.status === "resolved"}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Resolved
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-400" />
            Messages
          </CardTitle>
          <CardDescription className="text-slate-400">Conversation history for this ticket</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-slate-400">No messages yet.</div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender_type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] ${
                    message.sender_type === "user" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200 border border-slate-700"
                  } rounded-lg p-3`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender_type === "admin" ? (
                      <Bot className="h-3 w-3 text-green-400" />
                    ) : (
                      <User className="h-3 w-3 text-blue-200" />
                    )}
                    <span className="text-xs font-medium">
                      {message.sender_type === "admin" ? "Admin" : message.user_profiles?.username || message.user_profiles?.full_name || "User"}
                    </span>
                    <span className="text-xs text-slate-400">{formatDate(message.created_at)}</span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </CardContent>
        <div className="p-6 border-t border-slate-700">
          <div className="flex gap-2">
            <Input
              value={newMessageContent}
              onChange={(e) => setNewMessageContent(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              placeholder="Type your message..."
              className="glass-input flex-1"
            />
            <Button onClick={handleSendMessage} disabled={isSendingMessage || !newMessageContent.trim()} className="bg-blue-600 hover:bg-blue-700">
              {isSendingMessage ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}