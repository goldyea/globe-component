"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, Calendar } from "lucide-react"

export function BillingInfo() {
  const billingData = {
    plan: "Pro",
    status: "Active",
    nextBilling: "2024-02-01",
    amount: "$29.99",
    paymentMethod: "**** **** **** 4242",
  }

  const invoices = [
    { id: "INV-001", date: "2024-01-01", amount: "$29.99", status: "Paid" },
    { id: "INV-002", date: "2023-12-01", amount: "$29.99", status: "Paid" },
    { id: "INV-003", date: "2023-11-01", amount: "$29.99", status: "Paid" },
  ]

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Current Plan</h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-bold text-slate-100">{billingData.plan}</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{billingData.status}</Badge>
            </div>
            <p className="text-slate-400">Next billing: {billingData.nextBilling}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-100">{billingData.amount}</p>
            <p className="text-sm text-slate-400">per month</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 bg-transparent">
            Change Plan
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 bg-transparent">
            Cancel Subscription
          </Button>
        </div>
      </div>

      {/* Payment Method */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Payment Method</h3>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <CreditCard className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="font-medium text-slate-100">{billingData.paymentMethod}</p>
            <p className="text-sm text-slate-400">Expires 12/2027</p>
          </div>
        </div>
        <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800 bg-transparent">
          Update Payment Method
        </Button>
      </div>

      {/* Billing History */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Billing History</h3>
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between py-3 border-b border-slate-700/50 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="font-medium text-slate-100">{invoice.id}</p>
                  <p className="text-sm text-slate-400">{invoice.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-slate-100">{invoice.amount}</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{invoice.status}</Badge>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-200">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
