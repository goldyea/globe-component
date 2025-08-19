import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Server } from 'lucide-react';
import { toast } from 'sonner';

export function CreateVPSPage() {
  const [name, setName] = useState('');
  const [ramGb, setRamGb] = useState('1');
  const [storageGb, setStorageGb] = useState('20');
  const [cpuCores, setCpuCores] = useState('1');
  const [os, setOs] = useState('ubuntu-22.04');
  const [datacenter, setDatacenter] = useState('us-east-1');
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('vps_instances')
        .insert({
          name,
          user_id: user.id,
          cpu_cores: parseInt(cpuCores),
          ram_gb: parseInt(ramGb),
          storage_gb: parseInt(storageGb),
          os,
          datacenter,
          status: 'creating'
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('VPS instance created successfully!');
      navigate(`/vps/${data.id}`);
    } catch (error) {
      console.error('Error creating VPS:', error);
      toast.error('Failed to create VPS instance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/vps')}
          className="gap-2 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to VPS List
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Create New VPS</h1>
        <p className="text-muted-foreground mt-2">
          Configure your new virtual private server
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            VPS Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">VPS Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter VPS name"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ram">RAM (GB) *</Label>
                <Select value={ramGb} onValueChange={setRamGb}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 GB</SelectItem>
                    <SelectItem value="2">2 GB</SelectItem>
                    <SelectItem value="4">4 GB</SelectItem>
                    <SelectItem value="8">8 GB</SelectItem>
                    <SelectItem value="16">16 GB</SelectItem>
                    <SelectItem value="32">32 GB</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storage">Storage (GB) *</Label>
                <Select value={storageGb} onValueChange={setStorageGb}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20 GB</SelectItem>
                    <SelectItem value="40">40 GB</SelectItem>
                    <SelectItem value="80">80 GB</SelectItem>
                    <SelectItem value="160">160 GB</SelectItem>
                    <SelectItem value="320">320 GB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpu">CPU Cores</Label>
                <Select value={cpuCores} onValueChange={setCpuCores}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Core</SelectItem>
                    <SelectItem value="2">2 Cores</SelectItem>
                    <SelectItem value="4">4 Cores</SelectItem>
                    <SelectItem value="8">8 Cores</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="datacenter">Datacenter</Label>
                <Select value={datacenter} onValueChange={setDatacenter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us-east-1">US East (Virginia)</SelectItem>
                    <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                    <SelectItem value="eu-west-1">EU West (Ireland)</SelectItem>
                    <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="os">Operating System</Label>
              <Select value={os} onValueChange={setOs}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ubuntu-22.04">Ubuntu 22.04 LTS</SelectItem>
                  <SelectItem value="ubuntu-20.04">Ubuntu 20.04 LTS</SelectItem>
                  <SelectItem value="debian-11">Debian 11</SelectItem>
                  <SelectItem value="centos-8">CentOS 8</SelectItem>
                  <SelectItem value="fedora-37">Fedora 37</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/vps')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || !name}
                className="flex-1"
              >
                {loading ? 'Creating...' : 'Create VPS'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}