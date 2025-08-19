import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  ArrowLeft,
  Folder,
  File,
  Upload,
  Download,
  Trash2,
  Edit,
  Plus,
  Search,
  RefreshCw,
  Home,
  ChevronRight,
  FileText,
  Image,
  Archive,
  Code
} from "lucide-react";

interface FileItem {
  name: string;
  type: "file" | "folder";
  size?: string;
  modified: string;
  permissions: string;
  extension?: string;
}

export function FileManager() {
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState("/home/admin");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  
  const [files] = useState<FileItem[]>([
    { name: "..", type: "folder", modified: "", permissions: "drwxr-xr-x" },
    { name: "documents", type: "folder", modified: "2024-01-15 14:30", permissions: "drwxr-xr-x" },
    { name: "scripts", type: "folder", modified: "2024-01-14 09:15", permissions: "drwxr-xr-x" },
    { name: "logs", type: "folder", modified: "2024-01-16 11:22", permissions: "drwxr-xr-x" },
    { name: "config.json", type: "file", size: "2.4 KB", modified: "2024-01-16 16:45", permissions: "-rw-r--r--", extension: "json" },
    { name: "server.log", type: "file", size: "15.2 MB", modified: "2024-01-16 17:30", permissions: "-rw-r--r--", extension: "log" },
    { name: "backup.tar.gz", type: "file", size: "1.2 GB", modified: "2024-01-15 02:00", permissions: "-rw-r--r--", extension: "tar.gz" },
    { name: "index.html", type: "file", size: "5.1 KB", modified: "2024-01-16 14:20", permissions: "-rw-r--r--", extension: "html" },
    { name: "app.js", type: "file", size: "12.8 KB", modified: "2024-01-16 15:10", permissions: "-rw-r--r--", extension: "js" },
    { name: "screenshot.png", type: "file", size: "890 KB", modified: "2024-01-14 10:30", permissions: "-rw-r--r--", extension: "png" }
  ]);

  const getFileIcon = (item: FileItem) => {
    if (item.type === "folder") return <Folder className="h-4 w-4 text-primary" />;
    
    const ext = item.extension?.toLowerCase();
    if (ext === "png" || ext === "jpg" || ext === "jpeg" || ext === "gif") {
      return <Image className="h-4 w-4 text-blue-500" />;
    }
    if (ext === "js" || ext === "ts" || ext === "html" || ext === "css" || ext === "json") {
      return <Code className="h-4 w-4 text-green-500" />;
    }
    if (ext === "tar.gz" || ext === "zip" || ext === "rar") {
      return <Archive className="h-4 w-4 text-orange-500" />;
    }
    if (ext === "log" || ext === "txt") {
      return <FileText className="h-4 w-4 text-gray-500" />;
    }
    return <File className="h-4 w-4 text-muted-foreground" />;
  };

  const handleFileSelect = (fileName: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileName) 
        ? prev.filter(f => f !== fileName)
        : [...prev, fileName]
    );
  };

  const handleFileAction = (action: string, files?: string[]) => {
    const fileList = files || selectedFiles;
    if (fileList.length === 0) {
      toast.error("No files selected");
      return;
    }
    toast.success(`${action} ${fileList.length} file(s) successfully`);
    setSelectedFiles([]);
  };

  const pathSegments = currentPath.split("/").filter(Boolean);

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-xl font-bold">File Manager</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Folder
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 border-r border-border bg-card p-4">
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => setCurrentPath("/home/admin")}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Folder className="h-4 w-4 mr-2" />
              Documents
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Code className="h-4 w-4 mr-2" />
              Scripts
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Logs
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Breadcrumb */}
          <div className="border-b border-border bg-card px-6 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Home className="h-4 w-4" />
              {pathSegments.map((segment, index) => (
                <div key={index} className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{segment}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Search and Actions */}
          <div className="border-b border-border bg-card px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {selectedFiles.length > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{selectedFiles.length} selected</Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileAction("Downloaded")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFileAction("Deleted")}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* File List */}
          <div className="flex-1 p-6">
            <Card>
              <CardHeader>
                <CardTitle>Files and Folders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredFiles.map((file, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedFiles.includes(file.name)
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => handleFileSelect(file.name)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.name)}
                        onChange={() => handleFileSelect(file.name)}
                        className="rounded"
                      />
                      
                      {getFileIcon(file)}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">{file.name}</span>
                          {file.type === "folder" && (
                            <Badge variant="outline" className="text-xs">Folder</Badge>
                          )}
                        </div>
                      </div>
                      
                      {file.size && (
                        <div className="text-sm text-muted-foreground w-20 text-right">
                          {file.size}
                        </div>
                      )}
                      
                      <div className="text-sm text-muted-foreground w-32 text-right">
                        {file.modified}
                      </div>
                      
                      <div className="text-sm text-muted-foreground w-24 text-right font-mono">
                        {file.permissions}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFileAction("Downloaded", [file.name]);
                          }}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}