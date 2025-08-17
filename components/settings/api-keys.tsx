"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Copy, Plus, Trash2 } from "lucide-react"

interface APIKey {
  id: string
  name: string
  key: string
  created: string
  lastUsed: string
}

export function APIKeys() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: "1",
      name: "Production API",
      key: "vps_prod_1234567890abcdef",
      created: "2024-01-01",
      lastUsed: "2024-01-10",
    },
    {
      id: "2",
      name: "Development API",
      key: "vps_dev_abcdef1234567890",
      created: "2024-01-05",
      lastUsed: "Never",
    },
  ])

  const toggleKeyVisibility = (id: string) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key)
    // In a real app, you'd show a toast notification here
  }

  const deleteKey = (id: string) => {
    setApiKeys((prev) => prev.filter((key) => key.id !== id))
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-100">API Keys</h3>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Generate Key
        </Button>
      </div>

      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <div key={apiKey.id} className="border border-slate-700/50 rounded-lg p-4 bg-slate-900/20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-slate-100">{apiKey.name}</h4>
                <p className="text-sm text-slate-400">Created: {apiKey.created}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteKey(apiKey.id)}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  type={showKeys[apiKey.id] ? "text" : "password"}
                  value={apiKey.key}
                  readOnly
                  className="bg-slate-800/50 border-slate-600/50 text-slate-100 font-mono text-sm"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleKeyVisibility(apiKey.id)}
                className="text-slate-400 hover:text-slate-200"
              >
                {showKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(apiKey.key)}
                className="text-slate-400 hover:text-slate-200"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-xs text-slate-500 mt-2">Last used: {apiKey.lastUsed}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
