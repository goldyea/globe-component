-- Create VPS instances table
CREATE TABLE IF NOT EXISTS vps_instances (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'creating' CHECK (status IN ('creating', 'running', 'stopped', 'error', 'maintenance')),
  cpu_cores INTEGER NOT NULL DEFAULT 1,
  ram_gb INTEGER NOT NULL DEFAULT 1,
  storage_gb INTEGER NOT NULL DEFAULT 20,
  os VARCHAR(100) NOT NULL DEFAULT 'ubuntu-22.04',
  datacenter VARCHAR(100) NOT NULL DEFAULT 'us-east-1',
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create VPS metrics table for monitoring data
CREATE TABLE IF NOT EXISTS vps_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vps_id UUID REFERENCES vps_instances(id) ON DELETE CASCADE,
  cpu_usage DECIMAL(5,2) DEFAULT 0,
  memory_usage DECIMAL(5,2) DEFAULT 0,
  disk_usage DECIMAL(5,2) DEFAULT 0,
  network_in_mbps DECIMAL(10,2) DEFAULT 0,
  network_out_mbps DECIMAL(10,2) DEFAULT 0,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create support tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'resolved', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user profiles table for additional user data
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  username VARCHAR(50) UNIQUE,
  full_name VARCHAR(255),
  company VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vps_instances_user_id ON vps_instances(user_id);
CREATE INDEX IF NOT EXISTS idx_vps_metrics_vps_id ON vps_metrics(vps_id);
CREATE INDEX IF NOT EXISTS idx_vps_metrics_recorded_at ON vps_metrics(recorded_at);
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Enable Row Level Security
ALTER TABLE vps_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE vps_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own VPS instances" ON vps_instances
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own VPS instances" ON vps_instances
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own VPS instances" ON vps_instances
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view metrics for their VPS instances" ON vps_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM vps_instances 
      WHERE vps_instances.id = vps_metrics.vps_id 
      AND vps_instances.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their own support tickets" ON support_tickets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own support tickets" ON support_tickets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own support tickets" ON support_tickets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);
