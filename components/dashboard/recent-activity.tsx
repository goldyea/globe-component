import { Clock, Server, Container, Settings } from "lucide-react"

const activities = [
  {
    id: 1,
    action: "VPS-001 started",
    time: "2 minutes ago",
    icon: Server,
    color: "text-green-400",
  },
  {
    id: 2,
    action: "Container nginx-proxy deployed",
    time: "15 minutes ago",
    icon: Container,
    color: "text-blue-400",
  },
  {
    id: 3,
    action: "VPS-003 configuration updated",
    time: "1 hour ago",
    icon: Settings,
    color: "text-yellow-400",
  },
  {
    id: 4,
    action: "VPS-002 stopped",
    time: "2 hours ago",
    icon: Server,
    color: "text-red-400",
  },
]

export function RecentActivity() {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3">
            <div className={`${activity.color} opacity-80`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-200">{activity.action}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
