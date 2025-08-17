"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Server, Cpu, Zap, Globe, Loader2 } from "lucide-react"
import { useUser } from "@/hooks/use-user"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

const operatingSystems = [
  { id: "ubuntu-22.04", name: "Ubuntu 22.04 LTS", icon: "🐧", popular: true },
  { id: "ubuntu-20.04", name: "Ubuntu 20.04 LTS", icon: "🐧", popular: false },
  { id: "debian-12", name: "Debian 12", icon: "🌀", popular: false },
  { id: "centos-9", name: "CentOS Stream 9", icon: "🔴", popular: false },
  { id: "fedora-39", name: "Fedora 39", icon: "🎩", popular: false },
  { id: "windows-2022", name: "Windows Server 2022", icon: "🪟", popular: false },
]

const datacenters = [
  { id: "us-east-1", name: "New York, USA", flag: "🇺🇸", ping: "12ms" },
  { id: "us-west-2", name: "Los Angeles, USA", flag: "🇺🇸", ping: "8ms" },
  { id: "eu-west-1", name: "London, UK", flag: "🇬🇧", ping: "15ms" },
  { id: "eu-central-1", name: "Frankfurt, Germany", flag: "🇩🇪", ping: "18ms" },
  { id: "ap-southeast-1", name: "Singapore", flag: "🇸🇬", ping: "22ms" },
]

export function CreateVPSForm() {
  const router = useRouter()
  const supabase = createClient()
  const { user, profile, isLoading: isUserLoading, refetchProfile } = useUser()

  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    cpu: [1], // Default to 1 core
    ram: [1], // Default to 1 GB
    storage: [20], // Default to 20 GB
    os: "ubuntu-22.04",
    datacenter: "us-east-1",
    backups: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    if (!user || !profile) {
      toast.error("You must be logged in and have a profile to create a VPS.")
      setIsCreating(false)
      return
    }

    const requiredCpu = formData.cpu[0]
    const requiredRam = formData.ram[0]
    const requiredStorage = formData.storage[0]

    if (profile.credits_cpu_cores < requiredCpu || profile.credits_ram_gb < requiredRam || profile.credits_disk_gb < requiredStorage) {
      toast.error("Insufficient credits for the selected configuration. Please purchase more resources.")
      setIsCreating(false)
      return
    }

    try {
      // 1. Create VPS instance
      const { data: vpsData, error: vpsError } = await supabase
        .from("vps_instances")
        .insert({
          user_id: user.id,
          name: formData.name,
          cpu_cores: requiredCpu,
          ram_gb: requiredRam,
          storage_gb: requiredStorage,
          os: formData.os,
          datacenter: formData.datacenter,
          status: "creating", // Initial status
          // ip_address will be assigned by a backend service in a real app
        })
        .select()
        .single()

      if (vpsError) {
        throw vpsError
      }

      // 2. Deduct credits from user profile
      const { error: creditError } = await supabase
        .from("user_profiles")
        .update({
          credits_cpu_cores: profile.credits_cpu_cores - requiredCpu,
          credits_ram_gb: profile.credits_ram_gb - requiredRam,
          credits_disk_gb: profile.credits_disk_gb - requiredStorage,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (creditError) {
        // If credit deduction fails, you might want to roll back VPS creation
        // For simplicity, we'll just log an error and let the user know.
        console.error("Failed to deduct credits:", creditError)
        toast.error("VPS created, but failed to deduct credits. Please contact support.")
      } else {
        toast.success("VPS instance created successfully! Credits deducted.")
        refetchProfile() // Update displayed credits
      }

      router.push("/vps") // Redirect to VPS list
    } catch (error: any) {
      console.error("Error creating VPS:", error)
      toast.error(`Failed to create VPS: ${error.message || "An unexpected error occurred."}`)
    } finally {
      setIsCreating(false)
    }
  }

  const calculatePrice = () => {
    // This is a mock price calculation, actual price would depend on credit system
    const basePrice = 8 + (formData.cpu[0] - 1) * 2 + (formData.ram[0] - 1) * 1.5
    const storagePrice = Math.max(0, formData.storage[0] - 20) * 0.1
    const backupPrice = formData.backups ? 3 : 0
    return (basePrice + storagePrice + backupPrice).toFixed(2)
  }

  const currentRamCredits = profile?.credits_ram_gb ?? 0;
  const currentDiskCredits = profile?.credits_disk_gb ?? 0;
  const currentCpuCredits = profile?.credits_cpu_cores ?? 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* VPS Name */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Server className="h-5 w-5 text-blue-400" />
            VPS Configuration
          </CardTitle>
          <CardDescription className="text-slate-400">Configure your virtual private server settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vps-name" className="text-slate-200">
              VPS Name
            </Label>
            <Input
              id="vps-name"
              placeholder="My Web Server"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="glass-input"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Resource Configuration */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-green-400" />
            Resources
          </CardTitle>
          <CardDescription className="text-slate-400">Choose your CPU, RAM, and storage configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* CPU Cores */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-slate-200">CPU Cores</Label>
              <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                {formData.cpu[0]} {formData.cpu[0] === 1 ? "Core" : "Cores"} (Available: {currentCpuCredits})
              </Badge>
            </div>
            <Slider
              value={formData.cpu}
              onValueChange={(value) => setFormData({ ...formData, cpu: value })}
              max={currentCpuCredits > 8 ? currentCpuCredits : 8} // Max slider value is 8 or current credits if higher
              min={1}
              step={1}
              className="slider-blue"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>1 Core</span>
              <span>{currentCpuCredits > 8 ? currentCpuCredits : 8} Cores</span>
            </div>
          </div>

          {/* RAM */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-slate-200">RAM</Label>
              <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                {formData.ram[0]} GB (Available: {currentRamCredits})
              </Badge>
            </div>
            <Slider
              value={formData.ram}
              onValueChange={(value) => setFormData({ ...formData, ram: value })}
              max={currentRamCredits > 32 ? currentRamCredits : 32} // Max slider value is 32 or current credits if higher
              min={1}
              step={1}
              className="slider-green"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>1 GB</span>
              <span>{currentRamCredits > 32 ? currentRamCredits : 32} GB</span>
            </div>
          </div>

          {/* Storage */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-slate-200">SSD Storage</Label>
              <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                {formData.storage[0]} GB (Available: {currentDiskCredits})
              </Badge>
            </div>
            <Slider
              value={formData.storage}
              onValueChange={(value) => setFormData({ ...formData, storage: value })}
              max={currentDiskCredits > 500 ? currentDiskCredits : 500} // Max slider value is 500 or current credits if higher
              min={20}
              step={10}
              className="slider-purple"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>20 GB</span>
              <span>{currentDiskCredits > 500 ? currentDiskCredits : 500} GB</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operating System */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-slate-100">Operating System</CardTitle>
          <CardDescription className="text-slate-400">Select your preferred operating system</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.os}
            onValueChange={(value) => setFormData({ ...formData, os: value })}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {operatingSystems.map((os) => (
              <div key={os.id} className="flex items-center space-x-2">
                <RadioGroupItem value={os.id} id={os.id} />
                <Label
                  htmlFor={os.id}
                  className="flex items-center gap-3 cursor-pointer flex-1 p-3 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <span className="text-lg">{os.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-200">{os.name}</span>
                      {os.popular && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Popular</Badge>
                      )}
                    </div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Datacenter */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Globe className="h-5 w-5 text-purple-400" />
            Datacenter Location
          </CardTitle>
          <CardDescription className="text-slate-400">Choose the datacenter closest to your users</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={formData.datacenter}
            onValueChange={(value) => setFormData({ ...formData, datacenter: value })}
            className="space-y-3"
          >
            {datacenters.map((dc) => (
              <div key={dc.id} className="flex items-center space-x-2">
                <RadioGroupItem value={dc.id} id={dc.id} />
                <Label
                  htmlFor={dc.id}
                  className="flex items-center justify-between cursor-pointer flex-1 p-3 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{dc.flag}</span>
                    <span className="text-slate-200">{dc.name}</span>
                  </div>
                  <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                    {dc.ping}
                  </Badge>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Additional Options */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-slate-100">Additional Options</CardTitle>
          <CardDescription className="text-slate-400">Optional services to enhance your VPS</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="backups"
              checked={formData.backups}
              onCheckedChange={(checked) => setFormData({ ...formData, backups: !!checked })}
            />
            <Label htmlFor="backups" className="text-slate-200 cursor-pointer">
              Enable automated daily backups (+$3.00/month)
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Card className="glass-card border-blue-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-100">Ready to Deploy</h3>
              <p className="text-slate-400">Your VPS will be ready in under 60 seconds</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400">${calculatePrice()}/mo</div>
              <div className="text-sm text-slate-400">Billed monthly</div>
            </div>
          </div>
          <Button
            type="submit"
            disabled={isCreating || !formData.name.trim() || isUserLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
          >
            {isCreating ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Creating VPS...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-2" />
                Create VPS Instance
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}