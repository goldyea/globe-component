import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ShoppingCart, Cpu, HardDrive, Coins, Package } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  type: 'ram' | 'disk';
  amount: number;
  price: number;
  unit: string;
  icon: React.ReactNode;
}

const products: Product[] = [
  { id: '1', name: '1GB RAM', type: 'ram', amount: 1, price: 100, unit: 'GB', icon: <Cpu className="h-6 w-6" /> },
  { id: '2', name: '2GB RAM', type: 'ram', amount: 2, price: 180, unit: 'GB', icon: <Cpu className="h-6 w-6" /> },
  { id: '3', name: '4GB RAM', type: 'ram', amount: 4, price: 320, unit: 'GB', icon: <Cpu className="h-6 w-6" /> },
  { id: '4', name: '10GB Disk', type: 'disk', amount: 10, price: 50, unit: 'GB', icon: <HardDrive className="h-6 w-6" /> },
  { id: '5', name: '25GB Disk', type: 'disk', amount: 25, price: 100, unit: 'GB', icon: <HardDrive className="h-6 w-6" /> },
  { id: '6', name: '50GB Disk', type: 'disk', amount: 50, price: 180, unit: 'GB', icon: <HardDrive className="h-6 w-6" /> },
];

export function StorePage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [customType, setCustomType] = useState<'ram' | 'disk'>('ram');
  
  const { user, refreshUser } = useAuth();

  const handlePurchase = async (product: Product) => {
    if (!user || user.credits < product.price) {
      toast.error('Insufficient credits');
      return;
    }

    setLoading(product.id);

    try {
      const newCredits = user.credits - product.price;
      const updateData = {
        credits: newCredits,
        ...(product.type === 'ram' 
          ? { ram_gb: user.ram_gb + product.amount }
          : { disk_gb: user.disk_gb + product.amount }
        )
      };

      const { error } = await supabase
        .from('user_profiles')
        .update(updateData)
        .eq('id', user.id);

      if (error) throw error;

      await refreshUser();
      toast.success(`Successfully purchased ${product.name}!`);
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Purchase failed');
    } finally {
      setLoading(null);
    }
  };

  const handleCustomPurchase = async () => {
    if (!user || !customAmount) return;

    const amount = parseInt(customAmount);
    const price = customType === 'ram' ? amount * 100 : amount * 5;
    
    if (user.credits < price) {
      toast.error('Insufficient credits');
      return;
    }

    const product: Product = {
      id: 'custom',
      name: `${amount}GB ${customType.toUpperCase()}`,
      type: customType,
      amount,
      price,
      unit: 'GB',
      icon: customType === 'ram' ? <Cpu className="h-6 w-6" /> : <HardDrive className="h-6 w-6" />
    };

    await handlePurchase(product);
    setCustomAmount('');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Resource Store</h1>
          <p className="text-muted-foreground mt-2">
            Purchase additional RAM and disk space for your VPS instances
          </p>
        </div>
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              <span className="font-semibold">{user?.credits || 0} Credits</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Pre-built Packages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {products.map((product) => (
                <Card key={product.id} className="border border-border/50 hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {product.icon}
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {product.price}
                      </span>
                      <Button
                        onClick={() => handlePurchase(product)}
                        disabled={loading === product.id || !user || user.credits < product.price}
                        size="sm"
                        className="gap-1"
                      >
                        {loading === product.id ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b border-current" />
                        ) : (
                          <ShoppingCart className="h-3 w-3" />
                        )}
                        Buy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Custom Purchase
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Resource Type</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={customType === 'ram' ? 'default' : 'outline'}
                  onClick={() => setCustomType('ram')}
                  className="flex-1"
                >
                  <Cpu className="h-4 w-4 mr-2" />
                  RAM
                </Button>
                <Button
                  type="button"
                  variant={customType === 'disk' ? 'default' : 'outline'}
                  onClick={() => setCustomType('disk')}
                  className="flex-1"
                >
                  <HardDrive className="h-4 w-4 mr-2" />
                  Disk
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (GB)</Label>
              <Input
                id="amount"
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Enter amount in GB"
                min="1"
              />
            </div>

            {customAmount && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Total Cost:</span>
                  <span className="font-bold text-primary">
                    {(parseInt(customAmount) * (customType === 'ram' ? 100 : 5))} Credits
                  </span>
                </div>
              </div>
            )}

            <Button
              onClick={handleCustomPurchase}
              disabled={!customAmount || loading === 'custom' || !user || user.credits < (parseInt(customAmount || '0') * (customType === 'ram' ? 100 : 5))}
              className="w-full gap-2"
            >
              {loading === 'custom' ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b border-current" />
              ) : (
                <ShoppingCart className="h-4 w-4" />
              )}
              Purchase Custom Amount
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Your Current Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Coins className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Credits</p>
                <p className="text-xl font-semibold">{user?.credits || 0}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Cpu className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Available RAM</p>
                <p className="text-xl font-semibold">{user?.ram_gb || 0} GB</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <HardDrive className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Available Disk</p>
                <p className="text-xl font-semibold">{user?.disk_gb || 0} GB</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}