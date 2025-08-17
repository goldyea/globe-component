"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Moon, Sun, Monitor } from "lucide-react"

export function ThemeSwitcher() {
  const [theme, setTheme] = useState("dark")

  const themes = [
    { id: "light", name: "Light", icon: Sun },
    { id: "dark", name: "Dark", icon: Moon },
    { id: "system", name: "System", icon: Monitor },
  ]

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">Theme Preference</h3>
      <div className="space-y-3">
        {themes.map((themeOption) => (
          <div key={themeOption.id} className="flex items-center space-x-3">
            <input
              type="radio"
              id={themeOption.id}
              name="theme"
              value={themeOption.id}
              checked={theme === themeOption.id}
              onChange={(e) => setTheme(e.target.value)}
              className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 focus:ring-blue-500"
            />
            <Label htmlFor={themeOption.id} className="flex items-center gap-2 text-slate-200 cursor-pointer">
              <themeOption.icon className="h-4 w-4" />
              {themeOption.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
