"use client"

import { TicketForm } from "@/components/support/ticket-form"
import { TicketList } from "@/components/support/ticket-list"
import { LiveChat } from "@/components/support/live-chat"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MessageSquare, HelpCircle, ExternalLink } from "lucide-react"
import { MainLayout } from "@/components/layout/main-layout"

const supportStats = [
  { label: "Avg. Response Time", value: "< 2 hours", icon: Clock, color: "text-green-400" },
  { label: "Active Tickets", value: "3", icon: MessageSquare, color: "text-blue-400" },
]

export default function SupportPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">Support Center</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Get help when you need it. We support you through Discord and support tickets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
          {supportStats.map((stat) => (
            <Card key={stat.label} className="glass-card">
              <CardContent className="p-4 text-center">
                <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-slate-100 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Discord Support */}
          <Card className="glass-card border-purple-500/30 bg-purple-900/10">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 rounded-full bg-purple-500/20 w-fit">
                <MessageSquare className="h-8 w-8 text-purple-400" />
              </div>
              <CardTitle className="text-2xl text-slate-100">Discord Support</CardTitle>
              <CardDescription className="text-slate-300">
                Join our Discord community for real-time help and discussions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Status:</span>
                  <Badge className="bg-green-500/20 text-green-400">Online 24/7</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Response Time:</span>
                  <span className="text-slate-200">Usually &lt; 30 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Community:</span>
                  <span className="text-slate-200">1,200+ members</span>
                </div>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                <ExternalLink className="h-4 w-4 mr-2" />
                Join Discord Server
              </Button>
            </CardContent>
          </Card>

          {/* Support Tickets */}
          <Card className="glass-card border-blue-500/30 bg-blue-900/10">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 rounded-full bg-blue-500/20 w-fit">
                <HelpCircle className="h-8 w-8 text-blue-400" />
              </div>
              <CardTitle className="text-2xl text-slate-100">Support Tickets</CardTitle>
              <CardDescription className="text-slate-300">
                Submit detailed issues for formal tracking and resolution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Status:</span>
                  <Badge className="bg-blue-500/20 text-blue-400">Always Available</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Response Time:</span>
                  <span className="text-slate-200">&lt; 4 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Priority Support:</span>
                  <span className="text-slate-200">Available</span>
                </div>
              </div>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  document.getElementById("ticket-form")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Create Support Ticket
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card border-slate-500/30 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-slate-100 text-center">Quick Actions</CardTitle>
            <CardDescription className="text-slate-400 text-center">
              Common support tasks and helpful resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/docs"
                className="p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors group text-center"
              >
                <h3 className="font-semibold text-slate-200 group-hover:text-slate-100 mb-2">Documentation</h3>
                <p className="text-sm text-slate-400">Browse our comprehensive guides and tutorials</p>
              </a>
              <a
                href="/docs/troubleshooting"
                className="p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors group text-center"
              >
                <h3 className="font-semibold text-slate-200 group-hover:text-slate-100 mb-2">Troubleshooting</h3>
                <p className="text-sm text-slate-400">Find solutions to common VPS issues</p>
              </a>
              <a
                href="/status"
                className="p-4 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors group text-center"
              >
                <h3 className="font-semibold text-slate-200 group-hover:text-slate-100 mb-2">System Status</h3>
                <p className="text-sm text-slate-400">Check service uptime and performance</p>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Create Ticket */}
        <div id="ticket-form">
          <TicketForm />
        </div>

        {/* Existing Tickets */}
        <TicketList />

        {/* Live Chat Component */}
        <LiveChat />
      </div>
    </MainLayout>
  )
}
