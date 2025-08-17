"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, HardDrive, Cpu, Zap } from "lucide-react"

interface ResourceCardProps {
  title: string
  description: string
  price: number
  amount: number
  unit: string
  type: "ram" | "disk" | "cpu"
  features: string[]
  onPurchase: (type: "ram" | "disk" | "cpu", amount: number, price: number) => void
  isPurchasing: boolean
}

const typeIcons = {
  ram: <Zap className="h-6 w-6 text-blue-400" />,
  disk: <HardDrive className="h-6 w-6 text-green-400" />,
  cpu: <Cpu className="h-6 w-6 text-purple-400" />,
}

const typeColors = {
  ram: "bg-blue-600/20 text-blue-400 border-blue-500/30",
  disk: "bg-green-600/20 text-green-400 border-green-500/30",
  cpu: "bg-purple-600/20 text-purple-400 border-purple-500/30",
}

export function ResourceCard({
  title,
  description,
  price,
  amount,
  unit,
  type,
  features,
  onPurchase,
  isPurchasing,
}: ResourceCardProps) {
  return (
    <Card className={`glass-card ${typeColors[type]}`}>
      <CardHeader className="text-center">
        <div className="mx-auto mb-3 p-3 rounded-full bg-slate-800/50 w-fit">
          {typeIcons[type]}
        </div>
        <CardTitle className="text-slate-100 text-2xl">{title}</CardTitle>
        <CardDescription className="text-slate-400">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <span className="text-4xl font-bold text-slate-100">${price.toFixed(2)}</span>
          <span className="text-slate-400"> / one-time</span>
        </div>
        <ul className="space-y-2 text-sm text-slate-300">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4 text-green-400" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full ${typeColors[type].replace("/20", "").replace("border-", "")} text-white`}
          onClick={() => onPurchase(type, amount, price)}
          disabled={isPurchasing}
        >
          {isPurchasing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Purchasing...
            </>
          ) : (
            `Purchase ${amount}${unit}`
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}