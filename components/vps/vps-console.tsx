"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Terminal, X } from "lucide-react"

interface VPSConsoleProps {
  vpsId: string
  isOpen: boolean
  onClose: () => void
}

export function VPSConsole({ vpsId, isOpen, onClose }: VPSConsoleProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([
    `Connected to VPS ${vpsId}`,
    "Ubuntu 22.04.3 LTS",
    "Last login: Wed Jan 10 14:30:22 2024",
    "user@vps-001:~$ ",
  ])
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const command = input.trim()
      if (command) {
        setHistory((prev) => [...prev, `user@${vpsId}:~$ ${command}`, simulateCommand(command)])
      }
      setInput("")
    }
  }

  const simulateCommand = (command: string): string => {
    switch (command.toLowerCase()) {
      case "ls":
        return "Documents  Downloads  Pictures  Videos  projects"
      case "pwd":
        return "/home/user"
      case "whoami":
        return "user"
      case "date":
        return new Date().toString()
      case "clear":
        setHistory([`Connected to VPS ${vpsId}`, "user@vps-001:~$ "])
        return ""
      default:
        return `bash: ${command}: command not found`
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-4xl h-96 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-green-400" />
            <span className="font-medium text-slate-100">Console - {vpsId}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div ref={terminalRef} className="flex-1 p-4 bg-black/20 font-mono text-sm text-green-400 overflow-y-auto">
          {history.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}
          <div className="flex items-center">
            <span>user@{vpsId}:~$ </span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent border-none outline-none text-green-400 ml-1"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  )
}
