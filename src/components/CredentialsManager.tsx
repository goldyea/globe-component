import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  ArrowLeft,
  Key,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Edit,
  Trash2,
  Shield,
  User,
  Database,
  Server,
  Globe,
  Download
} from "lucide-react";

interface Credential {
  id: string;
  name: string;
  type: "ssh" | "database" | "api" | "ftp" | "web";
  username: string;
  password?: string;
  host?: string;
  port?: number;
  description?: string;
  created: string;
  lastUsed?: string;
}

export function CredentialsManager() {
  const navigate = useNavigate();
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [isCreating, setIsCreating] = useState(false);
  
  const [newCredential, setNewCredential] = useState({
    name: "",
    type: "ssh" as const,
    username: "",
    password: "",
    host: "",
    port: "",
    description: ""
  });

  const [credentials, setCredentials] = useState<Credential[]>([
    {
      id: "1",
      name: "Main SSH Access",
      type: "ssh",
      username: "admin",
      password: "SecurePassword123!",
      host: "192.168.1.100",
      port: 22,
      description: "Primary SSH access to web server",
      created: "2024-01-15",
      lastUsed: "2024-01-16 17:30"
    },
    {
      id: "2", 
      name: "Database Connection",
      type: "database",
      username: "dbadmin",
      password: "DbPass456#",
      host: "192.168.1.101",
      port: 3306,
      description: "MySQL database access",
      created: "2024-01-14",
      lastUsed: "2024-01-16 16:45"
    },
    {
      id: "3",
      name: "API Service Key",
      type: "api",
      username: "api_user",
      password: "sk-1234567890abcdef",
      description: "External API service authentication",
      created: "2024-01-10",
      lastUsed: "2024-01-16 14:20"
    },
    {
      id: "4",
      name: "FTP Upload Access",
      type: "ftp",
      username: "ftpuser",
      password: "FtpSecure789$",
      host: "192.168.1.102",
      port: 21,
      description: "FTP server for file uploads",
      created: "2024-01-12"
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ssh": return <Shield className="h-4 w-4" />;
      case "database": return <Database className="h-4 w-4" />;
      case "api": return <Key className="h-4 w-4" />;
      case "ftp": return <Server className="h-4 w-4" />;
      case "web": return <Globe className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ssh": return "bg-primary";
      case "database": return "bg-blue-500";
      case "api": return "bg-yellow-500";
      case "ftp": return "bg-green-500";
      case "web": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handleCreateCredential = () => {
    if (!newCredential.name || !newCredential.username) {
      toast.error("Name and username are required");
      return;
    }

    const credential: Credential = {
      id: Date.now().toString(),
      name: newCredential.name,
      type: newCredential.type,
      username: newCredential.username,
      password: newCredential.password,
      host: newCredential.host || undefined,
      port: newCredential.port ? parseInt(newCredential.port) : undefined,
      description: newCredential.description || undefined,
      created: new Date().toISOString().split('T')[0]
    };

    setCredentials(prev => [credential, ...prev]);
    setNewCredential({
      name: "",
      type: "ssh",
      username: "",
      password: "",
      host: "",
      port: "",
      description: ""
    });
    setIsCreating(false);
    toast.success("Credential created successfully");
  };

  const deleteCredential = (id: string) => {
    setCredentials(prev => prev.filter(cred => cred.id !== id));
    toast.success("Credential deleted successfully");
  };

  const exportCredentials = () => {
    const exportData = credentials.map(cred => ({
      ...cred,
      password: "***REDACTED***" // Don't export actual passwords
    }));
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `credentials-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Credentials exported (passwords redacted)");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="h-6 w-px bg-border" />
            <Key className="h-5 w-5" />
            <h1 className="text-xl font-bold">Credentials Manager</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportCredentials}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Credential
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Create New Credential */}
        {isCreating && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Credential</CardTitle>
              <CardDescription>Add a new set of credentials for VPS access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Credential Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Production SSH"
                    value={newCredential.name}
                    onChange={(e) => setNewCredential(prev => ({...prev, name: e.target.value}))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select 
                    value={newCredential.type} 
                    onValueChange={(value: any) => setNewCredential(prev => ({...prev, type: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ssh">SSH Access</SelectItem>
                      <SelectItem value="database">Database</SelectItem>
                      <SelectItem value="api">API Key</SelectItem>
                      <SelectItem value="ftp">FTP</SelectItem>
                      <SelectItem value="web">Web Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Username"
                    value={newCredential.username}
                    onChange={(e) => setNewCredential(prev => ({...prev, username: e.target.value}))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password/Key</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password or API key"
                    value={newCredential.password}
                    onChange={(e) => setNewCredential(prev => ({...prev, password: e.target.value}))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="host">Host (Optional)</Label>
                  <Input
                    id="host"
                    placeholder="192.168.1.100 or domain.com"
                    value={newCredential.host}
                    onChange={(e) => setNewCredential(prev => ({...prev, host: e.target.value}))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="port">Port (Optional)</Label>
                  <Input
                    id="port"
                    type="number"
                    placeholder="22, 3306, 21, etc."
                    value={newCredential.port}
                    onChange={(e) => setNewCredential(prev => ({...prev, port: e.target.value}))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of this credential's purpose"
                  value={newCredential.description}
                  onChange={(e) => setNewCredential(prev => ({...prev, description: e.target.value}))}
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleCreateCredential}>Create Credential</Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Credentials List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Saved Credentials</h2>
            <Badge variant="secondary">{credentials.length} total</Badge>
          </div>
          
          <div className="grid gap-4">
            {credentials.map((credential) => (
              <Card key={credential.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(credential.type)} text-white`}>
                        {getTypeIcon(credential.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{credential.name}</CardTitle>
                        <CardDescription>{credential.description || "No description"}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {credential.type}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteCredential(credential.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Username</Label>
                      <div className="flex items-center gap-2">
                        <Input value={credential.username} readOnly className="font-mono" />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyToClipboard(credential.username, "Username")}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    {credential.password && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Password</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            type={showPasswords[credential.id] ? "text" : "password"}
                            value={credential.password} 
                            readOnly 
                            className="font-mono"
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => togglePasswordVisibility(credential.id)}
                          >
                            {showPasswords[credential.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => copyToClipboard(credential.password!, "Password")}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {credential.host && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Host</Label>
                        <div className="flex items-center gap-2">
                          <Input value={credential.host} readOnly className="font-mono" />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => copyToClipboard(credential.host!, "Host")}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {credential.port && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Port</Label>
                        <Input value={credential.port.toString()} readOnly className="font-mono" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                    <span>Created: {credential.created}</span>
                    {credential.lastUsed && <span>Last used: {credential.lastUsed}</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}