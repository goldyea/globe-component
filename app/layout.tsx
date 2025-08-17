import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { AuthProvider } from "@/hooks/use-auth"

export const metadata: Metadata = {
  title: "VPS Management Panel",
  description: "Modern VPS and container management dashboard",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* The style tag for Geist fonts is no longer needed here as variables are applied via className */}
      </head>
      <body className="bg-slate-950 text-slate-100" suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}