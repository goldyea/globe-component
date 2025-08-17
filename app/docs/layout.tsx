import type React from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { DocSidebar } from "@/components/docs/doc-sidebar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainLayout>
      <div className="flex min-h-full -m-6">
        <DocSidebar />
        <main className="flex-1 p-8 ml-64 mt-16">{children}</main>
      </div>
    </MainLayout>
  )
}
