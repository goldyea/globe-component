import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Server, Activity, Shield } from "lucide-react";
import { VPSCard } from "./VPSCard";

interface VPS {
  id: string;
  name: string;
  status: "running" | "stopped" | "restarting";
  ip: string;
  os: string;
  cpu: number;
  ram: number;
  storage: number;
  uptime: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [vpsServers] = useState<VPS[]>([
    {
      id: "vps-1",
      name: "Web Server 01",
      status: "running",
      ip: "192.168.1.100",
      os: "Ubuntu 22.04",
      cpu: 45,
      ram: 68,
      storage: 32,
      uptime: "15d 4h 23m"
    },
    {
      id: "vps-2", 
      name: "Database Server",
      status: "running",
      ip: "192.168.1.101",
      os: "CentOS 8",
      cpu: 78,
      ram: 84,
      storage: 67,
      uptime: "8d 12h 45m"
    },
    {
      id: "vps-3",
      name: "Dev Environment",
      status: "stopped",
      ip: "192.168.1.102", 
      os: "Debian 11",
      cpu: 0,
      ram: 0,
      storage: 15,
      uptime: "0d 0h 0m"
    }
  ]);

  const handleVPSAction = (action: string, vpsName: string) => {
    toast.success(`${action} ${vpsName} successfully`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Simple Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Server className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Servers</p>
                <p className="text-xl font-bold">{vpsServers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Activity className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Running</p>
                <p className="text-xl font-bold text-success">
                  {vpsServers.filter(vps => vps.status === "running").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Uptime</p>
                <p className="text-xl font-bold">99.9%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* VPS Servers List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Your Servers</h2>
        
        <div className="grid gap-3">
          {vpsServers.map((vps) => (
            <VPSCard 
              key={vps.id}
              vps={vps}
              onAction={handleVPSAction}
              onConsole={() => navigate("/console")}
              onClick={() => navigate(`/vps/${vps.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}