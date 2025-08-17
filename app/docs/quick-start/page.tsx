import { DocContent } from "@/components/docs/doc-content"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Terminal, Server, Shield, CheckCircle } from "lucide-react"

const quickStartContent = (
  <div className="space-y-8">
    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle className="h-5 w-5 text-green-400" />
        <h3 className="text-lg font-semibold text-slate-100">What you'll learn</h3>
      </div>
      <ul className="space-y-2 text-slate-300">
        <li>• How to create your first VPS</li>
        <li>• Connect via SSH securely</li>
        <li>• Basic server configuration</li>
        <li>• Install essential software</li>
        <li>• Set up basic security</li>
      </ul>
    </div>

    <section>
      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
        <Server className="h-6 w-6 text-blue-400" />
        Step 1: Create Your VPS
      </h2>
      <p className="text-slate-300 mb-4">
        Start by creating a new VPS from the control panel. Choose your preferred operating system and server
        specifications.
      </p>
      <Card className="glass-card bg-slate-900/50">
        <CardContent className="p-4">
          <ol className="space-y-2 text-slate-300">
            <li>
              1. Navigate to <Badge variant="secondary">VPS → Create VPS</Badge>
            </li>
            <li>
              2. Choose <strong>Ubuntu 22.04 LTS</strong> for beginners
            </li>
            <li>
              3. Select at least <strong>2 CPU cores</strong> and <strong>4GB RAM</strong>
            </li>
            <li>4. Pick a datacenter close to your location</li>
            <li>
              5. Click <strong>"Create VPS"</strong>
            </li>
          </ol>
        </CardContent>
      </Card>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
        <Terminal className="h-6 w-6 text-green-400" />
        Step 2: Connect via SSH
      </h2>
      <p className="text-slate-300 mb-4">
        Once your VPS is ready, you'll receive connection details. Use SSH to connect to your server.
      </p>
      <Card className="glass-card bg-slate-900/50">
        <CardContent className="p-4">
          <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
            <div className="text-green-400 mb-2"># Connect to your VPS</div>
            <div className="text-slate-300">ssh root@your-server-ip</div>
            <div className="text-slate-500 mt-2"># Enter your password when prompted</div>
          </div>
        </CardContent>
      </Card>
    </section>

    <section>
      <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
        <Shield className="h-6 w-6 text-yellow-400" />
        Step 3: Basic Security Setup
      </h2>
      <p className="text-slate-300 mb-4">Secure your server with these essential first steps.</p>
      <Card className="glass-card bg-slate-900/50">
        <CardContent className="p-4">
          <div className="bg-black/50 rounded-lg p-4 font-mono text-sm space-y-2">
            <div className="text-green-400"># Update system packages</div>
            <div className="text-slate-300">apt update && apt upgrade -y</div>

            <div className="text-green-400 mt-4"># Create a new user</div>
            <div className="text-slate-300">adduser yourusername</div>
            <div className="text-slate-300">usermod -aG sudo yourusername</div>

            <div className="text-green-400 mt-4"># Configure firewall</div>
            <div className="text-slate-300">ufw allow ssh</div>
            <div className="text-slate-300">ufw enable</div>
          </div>
        </CardContent>
      </Card>
    </section>

    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-100 mb-3">🎉 Congratulations!</h3>
      <p className="text-slate-300 mb-4">
        You've successfully set up your first VPS! Your server is now ready for hosting applications, websites, or any
        other services you need.
      </p>
      <div className="space-y-2">
        <p className="text-sm text-slate-400">
          <strong>Next steps:</strong>
        </p>
        <ul className="text-sm text-slate-400 space-y-1">
          <li>
            •{" "}
            <a href="/docs/nginx" className="text-blue-400 hover:underline">
              Set up a web server
            </a>
          </li>
          <li>
            •{" "}
            <a href="/docs/security" className="text-blue-400 hover:underline">
              Advanced security hardening
            </a>
          </li>
          <li>
            •{" "}
            <a href="/docs/monitoring" className="text-blue-400 hover:underline">
              Monitor your server resources
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

export default function QuickStartPage() {
  return (
    <DocContent
      title="Quick Start Guide"
      description="Get your first VPS up and running in just a few minutes with this step-by-step guide."
      content={quickStartContent}
      readTime="10 min"
      difficulty="Beginner"
      lastUpdated="2024-01-15"
    />
  )
}
