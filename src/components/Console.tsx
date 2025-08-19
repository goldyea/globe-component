import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  ArrowLeft,
  Terminal,
  Send,
  Trash2,
  Copy,
  Download,
  Settings,
  Power,
  Maximize2,
  Minimize2
} from "lucide-react";

interface ConsoleEntry {
  type: "command" | "output" | "error";
  content: string;
  timestamp: string;
}

export function Console() {
  const navigate = useNavigate();
  const [command, setCommand] = useState("");
  const [isConnected, setIsConnected] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const [consoleEntries, setConsoleEntries] = useState<ConsoleEntry[]>([
    {
      type: "output",
      content: "Welcome to VPS Console - Ubuntu 22.04.3 LTS",
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: "output", 
      content: "admin@vps-server:~$ Connected successfully",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const mockCommands: Record<string, string[]> = {
    "ls": [
      "documents  scripts  logs  config.json  server.log  backup.tar.gz",
      "index.html  app.js  screenshot.png"
    ],
    "ls -la": [
      "total 48",
      "drwxr-xr-x 5 admin admin 4096 Jan 16 17:30 .",
      "drwxr-xr-x 3 root  root  4096 Jan 15 10:00 ..",
      "drwxr-xr-x 2 admin admin 4096 Jan 15 14:30 documents",
      "drwxr-xr-x 2 admin admin 4096 Jan 14 09:15 scripts",
      "drwxr-xr-x 2 admin admin 4096 Jan 16 11:22 logs",
      "-rw-r--r-- 1 admin admin 2458 Jan 16 16:45 config.json",
      "-rw-r--r-- 1 admin admin 15925248 Jan 16 17:30 server.log",
      "-rw-r--r-- 1 admin admin 1288490240 Jan 15 02:00 backup.tar.gz"
    ],
    "pwd": ["/home/admin"],
    "whoami": ["admin"],
    "date": [new Date().toString()],
    "uptime": ["17:32:15 up 15 days,  4:23,  2 users,  load average: 0.45, 0.32, 0.28"],
    "df -h": [
      "Filesystem      Size  Used Avail Use% Mounted on",
      "/dev/vda1        50G   32G   16G  67% /",
      "tmpfs           2.0G     0  2.0G   0% /dev/shm",
      "/dev/vda2       100G   45G   50G  48% /home"
    ],
    "free -h": [
      "               total        used        free      shared  buff/cache   available",
      "Mem:           4.0Gi       2.1Gi       0.8Gi       256Mi       1.1Gi       1.5Gi",
      "Swap:          2.0Gi       512Mi       1.5Gi"
    ],
    "ps aux": [
      "USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND",
      "root           1  0.0  0.1 169404  8932 ?        Ss   Jan15   0:04 /sbin/init",
      "admin       1234  0.5  2.1 998844 86420 ?        Sl   16:30   0:12 node server.js",
      "admin       5678  0.0  0.3  21532  3984 pts/0    Ss   17:15   0:00 -bash"
    ],
    "clear": [],
    "help": [
      "Available commands:",
      "  ls, ls -la    - List directory contents",
      "  pwd           - Print working directory", 
      "  whoami        - Display current user",
      "  date          - Display current date and time",
      "  uptime        - Show system uptime",
      "  df -h         - Display disk usage",
      "  free -h       - Display memory usage",
      "  ps aux        - List running processes",
      "  clear         - Clear terminal",
      "  help          - Show this help message"
    ]
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [consoleEntries]);

  const executeCommand = (cmd: string) => {
    const timestamp = new Date().toLocaleTimeString();
    
    // Add command to history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    
    // Add command entry
    const newEntries: ConsoleEntry[] = [
      ...consoleEntries,
      {
        type: "command",
        content: `admin@vps-server:~$ ${cmd}`,
        timestamp
      }
    ];

    // Process command
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === "clear") {
      setConsoleEntries([]);
      return;
    }
    
    if (mockCommands[trimmedCmd]) {
      const output = mockCommands[trimmedCmd];
      output.forEach(line => {
        newEntries.push({
          type: "output",
          content: line,
          timestamp
        });
      });
    } else if (trimmedCmd === "") {
      // Empty command, just show prompt
    } else {
      newEntries.push({
        type: "error",
        content: `bash: ${cmd}: command not found`,
        timestamp
      });
    }
    
    setConsoleEntries(newEntries);
    toast.success(`Command executed: ${cmd}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      executeCommand(command);
      setCommand("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCommand(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCommand("");
        } else {
          setHistoryIndex(newIndex);
          setCommand(commandHistory[newIndex]);
        }
      }
    }
  };

  const clearConsole = () => {
    setConsoleEntries([]);
    toast.success("Console cleared");
  };

  const copyConsole = () => {
    const text = consoleEntries.map(entry => entry.content).join("\n");
    navigator.clipboard.writeText(text);
    toast.success("Console output copied to clipboard");
  };

  const downloadLog = () => {
    const text = consoleEntries.map(entry => 
      `[${entry.timestamp}] ${entry.content}`
    ).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `console-log-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Console log downloaded");
  };

  return (
    <div className={`bg-background ${isFullscreen ? "fixed inset-0 z-50" : "min-h-screen"}`}>
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="h-6 w-px bg-border" />
            <Terminal className="h-5 w-5" />
            <h1 className="text-xl font-bold">VPS Console</h1>
            <Badge className={isConnected ? "bg-success" : "bg-destructive"}>
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={clearConsole}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
            <Button variant="outline" size="sm" onClick={copyConsole}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={downloadLog}>
              <Download className="h-4 w-4 mr-2" />
              Download Log
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setIsConnected(!isConnected);
                toast.success(isConnected ? "Disconnected from server" : "Connected to server");
              }}
            >
              <Power className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Console */}
      <div className="flex-1 p-6">
        <Card className="h-[calc(100vh-8rem)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              Terminal Session - admin@vps-server
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full flex flex-col">
            {/* Terminal Output */}
            <div 
              ref={terminalRef}
              className="flex-1 bg-black text-green-400 p-4 rounded-lg font-mono text-sm overflow-y-auto space-y-1"
            >
              {consoleEntries.map((entry, index) => (
                <div 
                  key={index} 
                  className={`${
                    entry.type === "command" ? "text-cyan-400" : 
                    entry.type === "error" ? "text-red-400" : 
                    "text-green-400"
                  }`}
                >
                  {entry.content}
                </div>
              ))}
              
              {/* Current prompt */}
              <div className="flex items-center gap-2 text-cyan-400">
                <span>admin@vps-server:~$</span>
                <form onSubmit={handleSubmit} className="flex-1">
                  <Input
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none text-green-400 p-0 h-auto focus-visible:ring-0 font-mono"
                    placeholder="Enter command..."
                    disabled={!isConnected}
                    autoFocus
                  />
                </form>
              </div>
            </div>
            
            {/* Command Input */}
            <div className="mt-4 flex items-center gap-2">
              <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
                <Input
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command (try 'help' for available commands)..."
                  disabled={!isConnected}
                  className="font-mono"
                />
                <Button type="submit" disabled={!isConnected || !command.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
            
            {!isConnected && (
              <div className="mt-2 text-center text-destructive text-sm">
                Console is disconnected. Click the power button to reconnect.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}