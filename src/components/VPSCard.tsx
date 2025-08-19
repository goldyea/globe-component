import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Server, 
  Play, 
  Square, 
  RotateCcw, 
  Terminal,
  Activity
} from "lucide-react";

interface VPS {
  id: string;
  name: string;
  status: "running" | "stopped" | "restarting";
  ip: string;
  os: string;
  uptime: string;
}

interface VPSCardProps {
  vps: VPS;
  onAction: (action: string, vpsName: string) => void;
  onConsole: () => void;
  onClick?: () => void;
}

export function VPSCard({ vps, onAction, onConsole, onClick }: VPSCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-success text-success-foreground";
      case "stopped": return "bg-destructive text-destructive-foreground";
      case "restarting": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running": return <Activity className="h-3 w-3" />;
      case "stopped": return <Square className="h-3 w-3" />;
      case "restarting": return <RotateCcw className="h-3 w-3 animate-spin" />;
      default: return <Server className="h-3 w-3" />;
    }
  };

  return (
    <Card 
      className="glass-card hover:shadow-glow transition-all duration-300 cursor-pointer" 
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Server className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">{vps.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{vps.os} • {vps.ip}</p>
            </div>
          </div>
          <Badge className={`${getStatusColor(vps.status)} gap-1 text-xs`}>
            {getStatusIcon(vps.status)}
            {vps.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Activity className="h-3 w-3" />
            <span>Uptime: {vps.uptime}</span>
          </div>
          
          <div className="flex gap-1">
            {vps.status === "stopped" ? (
              <Button 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  onAction("Started", vps.name);
                }}
                className="h-7 px-2 text-xs"
              >
                <Play className="h-3 w-3 mr-1" />
                Start
              </Button>
            ) : (
              <Button 
                size="sm" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onAction("Stopped", vps.name);
                }}
                className="h-7 px-2 text-xs"
              >
                <Square className="h-3 w-3 mr-1" />
                Stop
              </Button>
            )}
            
            <Button 
              size="sm" 
              variant="outline" 
              onClick={(e) => {
                e.stopPropagation();
                onConsole();
              }}
              className="h-7 px-2 text-xs"
            >
              <Terminal className="h-3 w-3 mr-1" />
              Console
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}