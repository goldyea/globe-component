import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  ArrowLeft,
  Server, 
  Play, 
  Square, 
  RotateCcw, 
  Terminal,
  Activity,
  HardDrive,
  Cpu,
  MemoryStick,
  Network
} from "lucide-react";

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

export function VPSDetail() {
  const navigate = useNavigate();
  const { vpsId } = useParams();
  
  // Mock data - in real app, fetch by vpsId
  const [vps] = useState<VPS>({
    id: vpsId || "vps-1",
    name: "Web Server 01",
    status: "running",
    ip: "192.168.1.100",
    os: "Ubuntu 22.04",
    cpu: 45,
    ram: 68,
    storage: 32,
    uptime: "15d 4h 23m"
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-success text-success-foreground";
      case "stopped": return "bg-destructive text-destructive-foreground";
      case "restarting": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleAction = (action: string) => {
    toast.success(`${action} ${vps.name} successfully`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-card border-b border-border mb-6">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="h-6 w-px bg-border" />
            <Server className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold">{vps.name}</h1>
            <Badge className={`${getStatusColor(vps.status)} ml-2`}>
              {vps.status}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            {vps.status === "stopped" ? (
              <Button onClick={() => handleAction("Started")}>
                <Play className="h-4 w-4 mr-2" />
                Start Server
              </Button>
            ) : (
              <Button variant="outline" onClick={() => handleAction("Stopped")}>
                <Square className="h-4 w-4 mr-2" />
                Stop Server
              </Button>
            )}
            
            <Button variant="outline" onClick={() => navigate("/console")}>
              <Terminal className="h-4 w-4 mr-2" />
              Console
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Server Info */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Server Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">IP Address</p>
              <p className="font-mono">{vps.ip}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Operating System</p>
              <p>{vps.os}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Uptime</p>
              <p className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                {vps.uptime}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Resource Usage */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Cpu className="h-4 w-4 text-primary" />
                CPU Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Usage</span>
                  <span className="font-mono">{vps.cpu}%</span>
                </div>
                <Progress value={vps.cpu} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MemoryStick className="h-4 w-4 text-primary" />
                Memory Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Usage</span>
                  <span className="font-mono">{vps.ram}%</span>
                </div>
                <Progress value={vps.ram} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <HardDrive className="h-4 w-4 text-primary" />
                Storage Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Usage</span>
                  <span className="font-mono">{vps.storage}%</span>
                </div>
                <Progress value={vps.storage} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="h-12">
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart
              </Button>
              <Button variant="outline" className="h-12">
                <Terminal className="h-4 w-4 mr-2" />
                Console
              </Button>
              <Button variant="outline" className="h-12">
                <Network className="h-4 w-4 mr-2" />
                Network
              </Button>
              <Button variant="outline" className="h-12">
                <HardDrive className="h-4 w-4 mr-2" />
                Backup
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}