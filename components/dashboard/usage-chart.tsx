"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { time: "00:00", cpu: 30, memory: 45, network: 20 },
  { time: "04:00", cpu: 25, memory: 42, network: 18 },
  { time: "08:00", cpu: 45, memory: 55, network: 35 },
  { time: "12:00", cpu: 65, memory: 70, network: 50 },
  { time: "16:00", cpu: 55, memory: 65, network: 45 },
  { time: "20:00", cpu: 40, memory: 50, network: 30 },
]

export function UsageChart() {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">Resource Usage (24h)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(71, 85, 105, 0.5)",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
            />
            <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="memory" stroke="#10b981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="network" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-slate-400">CPU</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-slate-400">Memory</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-slate-400">Network</span>
        </div>
      </div>
    </div>
  )
}
