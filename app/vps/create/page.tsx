"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { CreateVPSForm } from "@/components/vps/create-vps-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Server, Zap, Shield, Globe } from "lucide-react"

const features = [
  {
    icon: Server,
    title: "High Performance",
    description: "Latest generation CPUs and NVMe SSD storage",
    color: "text-blue-400",
  },
  {
    icon: Zap,
    title: "Instant Deployment",
    description: "Your VPS will be ready in under 60 seconds",
    color: "text-yellow-400",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "DDoS protection and firewall included",
    color: "text-green-400",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Multiple datacenters worldwide",
    color: "text-purple-400",
  },
]

export default function CreateVPSPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">Create New VPS</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Deploy a powerful virtual private server in minutes. Choose your configuration and get started.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <Card key={feature.title} className="glass-card text-center">
              <CardContent className="p-4">
                <feature.icon className={`h-8 w-8 ${feature.color} mx-auto mb-3`} />
                <h3 className="font-semibold text-slate-100 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* VPS Configuration Form */}
          <div className="lg:col-span-2">
            <CreateVPSForm />
          </div>

          {/* Pricing Summary */}
          <div className="space-y-6">
            <Card className="glass-card border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-slate-100 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-400" />
                  Pricing Summary
                </CardTitle>
                <CardDescription className="text-slate-400">Transparent pricing with no hidden fees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Base Configuration</span>
                  <span className="text-slate-200">$12.00/mo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Additional Storage</span>
                  <span className="text-slate-200">$0.00/mo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Backup Service</span>
                  <span className="text-slate-200">$3.00/mo</span>
                </div>
                <hr className="border-slate-700" />
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="text-slate-100">Total</span>
                  <span className="text-blue-400">$15.00/mo</span>
                </div>
                <Badge className="w-full justify-center bg-green-500/20 text-green-400 border-green-500/30">
                  7-day money-back guarantee
                </Badge>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-slate-100">What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    Full root access
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    99.9% uptime SLA
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    24/7 technical support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    DDoS protection
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    Free SSL certificates
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    Automated backups
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
