-- Insert sample VPS instances for demonstration
INSERT INTO vps_instances (user_id, name, status, cpu_cores, ram_gb, storage_gb, os, datacenter, ip_address) VALUES
  (auth.uid(), 'Web Server', 'running', 2, 4, 40, 'ubuntu-22.04', 'us-east-1', '192.168.1.10'),
  (auth.uid(), 'Database Server', 'running', 4, 8, 80, 'ubuntu-22.04', 'us-west-2', '192.168.1.11'),
  (auth.uid(), 'Game Server', 'stopped', 2, 4, 60, 'ubuntu-22.04', 'eu-west-1', '192.168.1.12')
ON CONFLICT DO NOTHING;

-- Insert sample metrics data
INSERT INTO vps_metrics (vps_id, cpu_usage, memory_usage, disk_usage, network_in_mbps, network_out_mbps, recorded_at)
SELECT 
  v.id,
  (RANDOM() * 80 + 10)::DECIMAL(5,2),
  (RANDOM() * 70 + 20)::DECIMAL(5,2),
  (RANDOM() * 30 + 40)::DECIMAL(5,2),
  (RANDOM() * 100 + 50)::DECIMAL(10,2),
  (RANDOM() * 80 + 20)::DECIMAL(10,2),
  NOW() - (INTERVAL '1 hour' * generate_series(0, 23))
FROM vps_instances v
CROSS JOIN generate_series(0, 23)
WHERE v.user_id = auth.uid()
ON CONFLICT DO NOTHING;

-- Insert sample support tickets
INSERT INTO support_tickets (user_id, subject, description, priority, status) VALUES
  (auth.uid(), 'VPS Performance Issue', 'My web server VPS is running slower than usual. Can you help investigate?', 'medium', 'open'),
  (auth.uid(), 'Backup Configuration', 'I need help setting up automated backups for my database server.', 'low', 'resolved'),
  (auth.uid(), 'Network Connectivity', 'Having intermittent connection issues with my game server.', 'high', 'in-progress')
ON CONFLICT DO NOTHING;

-- Create user profile if it doesn't exist
INSERT INTO user_profiles (user_id, username, full_name)
SELECT auth.uid(), 'user_' || substr(auth.uid()::text, 1, 8), 'VPS User'
WHERE NOT EXISTS (SELECT 1 FROM user_profiles WHERE user_id = auth.uid());
