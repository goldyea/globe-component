import { Button } from "@/components/ui/button"
import { Plus, Container, Server } from "lucide-react"

export function QuickActions() {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <Button className="w-full justify-start bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30">
          <Server className="h-4 w-4 mr-2" />
          Create VPS Instance
        </Button>
        <Button className="w-full justify-start bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-500/30">
          <Container className="h-4 w-4 mr-2" />
          Deploy Container
        </Button>
        <Button className="w-full justify-start bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/30">
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </div>
    </div>
  )
}
