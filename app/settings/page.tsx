"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { ThemeSwitcher } from "@/components/settings/theme-switcher"
import { APIKeys } from "@/components/settings/api-keys"
import { BillingInfo } from "@/components/settings/billing-info"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Settings</h1>
          <p className="text-slate-400">Manage your account preferences and configuration</p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-slate-900/50 border border-slate-700/50">
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-slate-100"
            >
              General
            </TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-slate-800 data-[state=active]:text-slate-100">
              API Keys
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-slate-100"
            >
              Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <ThemeSwitcher />

            {/* Additional General Settings */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-200">Email Notifications</p>
                    <p className="text-sm text-slate-400">Receive email alerts for system events</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-200">SMS Alerts</p>
                    <p className="text-sm text-slate-400">Get SMS notifications for critical issues</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="api">
            <APIKeys />
          </TabsContent>

          <TabsContent value="billing">
            <BillingInfo />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
