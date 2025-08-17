"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Clock, Send } from "lucide-react"

const priorityLevels = [
  { value: "low", label: "Low - General inquiry", color: "bg-green-500/20 text-green-400" },
  { value: "medium", label: "Medium - Service issue", color: "bg-yellow-500/20 text-yellow-400" },
  { value: "high", label: "High - Server down", color: "bg-orange-500/20 text-orange-400" },
  { value: "urgent", label: "Urgent - Security breach", color: "bg-red-500/20 text-red-400" },
]

const categories = [
  "Technical Support",
  "Billing & Account",
  "Server Performance",
  "Network Issues",
  "Security Concerns",
  "Feature Request",
  "General Inquiry",
]

export function TicketForm() {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
    vpsId: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    console.log("[v0] Submitting support ticket:", formData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    // Reset form or show success message
  }

  const selectedPriority = priorityLevels.find((p) => p.value === formData.priority)

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center gap-2">
          <Send className="h-5 w-5 text-blue-400" />
          Create Support Ticket
        </CardTitle>
        <CardDescription className="text-slate-400">
          Describe your issue and we'll get back to you as soon as possible
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subject" className="text-slate-200">
                Subject *
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Brief description of your issue"
                className="glass-input"
                required
              />
            </div>

            <div>
              <Label className="text-slate-200">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="glass-input">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="glass-dropdown">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-200">Priority *</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="glass-input">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="glass-dropdown">
                  {priorityLevels.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      <div className="flex items-center gap-2">
                        <Badge className={priority.color}>{priority.value.toUpperCase()}</Badge>
                        <span>{priority.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="vpsId" className="text-slate-200">
                VPS ID (Optional)
              </Label>
              <Input
                id="vpsId"
                value={formData.vpsId}
                onChange={(e) => setFormData({ ...formData, vpsId: e.target.value })}
                placeholder="e.g., vps-12345"
                className="glass-input"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-slate-200">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Please provide detailed information about your issue, including any error messages, steps to reproduce, and what you've already tried..."
              className="glass-input min-h-[120px]"
              required
            />
          </div>

          {selectedPriority && (
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-slate-200">Expected Response Time</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={selectedPriority.color}>{selectedPriority.value.toUpperCase()}</Badge>
                <span className="text-sm text-slate-400">
                  {selectedPriority.value === "urgent" && "Within 1 hour"}
                  {selectedPriority.value === "high" && "Within 4 hours"}
                  {selectedPriority.value === "medium" && "Within 24 hours"}
                  {selectedPriority.value === "low" && "Within 48 hours"}
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={
                isSubmitting || !formData.subject || !formData.category || !formData.priority || !formData.description
              }
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Ticket
                </>
              )}
            </Button>

            <div className="flex items-center gap-1 text-xs text-slate-400">
              <AlertCircle className="h-3 w-3" />
              <span>All fields marked with * are required</span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
