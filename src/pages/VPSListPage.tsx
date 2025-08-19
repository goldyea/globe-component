import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Server, Plus, Cpu, HardDrive, Activity } from 'lucide-react';
import { toast } from 'sonner';

interface VPSInstance {
  id: string;
  name: string;
  status: string;
  cpu_cores: number;
  ram_gb: number;
  storage_gb: number;
  os: string;
  datacenter: string;
  ip_address?: string | null;
  created_at: string;
}

export function VPSListPage() {
  const [vpsList, setVpsList] = useState<VPSInstance[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchVPSInstances();
  }, [user]);

  const fetchVPSInstances = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('vps_instances')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVpsList((data || []).map(vps => ({
        ...vps,
        ip_address: vps.ip_address as string | null
      })));
    } catch (error) {
      console.error('Error fetching VPS instances:', error);
      toast.error('Failed to load VPS instances');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'stopped': return 'bg-red-500';
      case 'creating': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your VPS Instances</h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor your virtual private servers
          </p>
        </div>
        <Link to="/vps/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create VPS
          </Button>
        </Link>
      </div>

      {vpsList.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Server className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No VPS instances yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Create your first VPS instance to get started
            </p>
            <Link to="/vps/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First VPS
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vpsList.map((vps) => (
            <Link key={vps.id} to={`/vps/${vps.id}`}>
              <Card className="glass-card hover:shadow-glow transition-all cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">{vps.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(vps.status)}`} />
                    <Badge variant={vps.status === 'running' ? 'default' : 'secondary'}>
                      {vps.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Cpu className="h-3 w-3 text-muted-foreground" />
                        <span>{vps.cpu_cores} CPU</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="h-3 w-3 text-muted-foreground" />
                        <span>{vps.ram_gb}GB RAM</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <HardDrive className="h-3 w-3 text-muted-foreground" />
                        <span>{vps.storage_gb}GB Storage</span>
                      </div>
                      <div className="text-muted-foreground">
                        {vps.datacenter}
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-xs text-muted-foreground">
                        OS: {vps.os}
                      </p>
                      {vps.ip_address && (
                        <p className="text-xs text-muted-foreground">
                          IP: {vps.ip_address}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}