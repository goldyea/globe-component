"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Minimize2, X, User, Bot } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "agent" | "bot"
  timestamp: Date
  senderName?: string
}

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm here to help you with any questions about your VPS hosting. How can I assist you today?",
    sender: "bot",
    timestamp: new Date(Date.now() - 300000),
  },
]

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [agentStatus, setAgentStatus] = useState<"online" | "away" | "offline">("online")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Thank you for your message. I'm looking into this for you. Can you provide more details about the specific issue you're experiencing?",
        sender: "agent",
        senderName: "Sarah",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const statusColors = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    offline: "bg-red-500",
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`glass-card w-80 ${isMinimized ? "h-16" : "h-96"} transition-all duration-300`}>
        <CardHeader className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 ${statusColors[agentStatus]} rounded-full border-2 border-slate-800`}
                />
              </div>
              <div>
                <CardTitle className="text-sm text-slate-100">Live Support</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {agentStatus === "online" ? "Online" : agentStatus === "away" ? "Away" : "Offline"}
                  </Badge>
                  {agentStatus === "online" && <span className="text-xs text-slate-400">Avg. response: 2 min</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} className="h-8 w-8 p-0">
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] ${message.sender === "user" ? "order-2" : "order-1"}`}>
                    {message.sender !== "user" && (
                      <div className="flex items-center gap-2 mb-1">
                        {message.sender === "bot" ? (
                          <Bot className="h-3 w-3 text-blue-400" />
                        ) : (
                          <User className="h-3 w-3 text-green-400" />
                        )}
                        <span className="text-xs text-slate-400">
                          {message.senderName || (message.sender === "bot" ? "Bot" : "Agent")}
                        </span>
                        <span className="text-xs text-slate-500">{formatTime(message.timestamp)}</span>
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-3 text-sm ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-800 text-slate-200 border border-slate-700"
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.sender === "user" && (
                      <div className="text-xs text-slate-500 mt-1 text-right">{formatTime(message.timestamp)}</div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 border border-slate-700 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="glass-input flex-1"
                  disabled={agentStatus === "offline"}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || agentStatus === "offline"}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {agentStatus === "offline" && (
                <p className="text-xs text-slate-400 mt-2">
                  Support is currently offline. Please create a ticket for assistance.
                </p>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
