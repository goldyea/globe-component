"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface StatusChartProps {
  data: Array<{
    time: string
    value: number
    status?: "up" | "down" | "degraded"
  }>
  title: string
  color: string
  unit?: string
  type?: "line" | "area"
}

export function StatusChart({ data, title, color, unit = "", type = "line" }: StatusChartProps) {
  const chartConfig = {
    value: {
      label: title,
      color: `hsl(${color})`,
    },
  }

  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        {type === "area" ? (
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="time"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}${unit}`}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              labelFormatter={(value) => `Time: ${value}`}
              formatter={(value) => [`${value}${unit}`, title]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={`var(--color-value)`}
              fill={`var(--color-value)`}
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        ) : (
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="time"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}${unit}`}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              labelFormatter={(value) => `Time: ${value}`}
              formatter={(value) => [`${value}${unit}`, title]}
            />
            <Line type="monotone" dataKey="value" stroke={`var(--color-value)`} strokeWidth={2} dot={false} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </ChartContainer>
  )
}
