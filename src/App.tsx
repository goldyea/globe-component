import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginForm } from "@/components/LoginForm";
import { Settings } from "@/components/Settings";
import { VPSDetail } from "@/components/VPSDetail";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppSidebar } from "@/components/AppSidebar";
import { AuthProvider } from "@/components/AuthProvider";
import { VPSListPage } from "@/pages/VPSListPage";
import { CreateVPSPage } from "@/pages/CreateVPSPage";
import { StorePage } from "@/pages/StorePage";
import { TermsPage } from "@/pages/TermsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route 
              path="/*" 
              element={
                <ProtectedRoute>
                  <SidebarProvider>
                    <div className="flex min-h-screen w-full">
                      <AppSidebar />
                      <div className="flex-1 flex flex-col">
                        <header className="glass-card border-b border-sidebar-border h-12 flex items-center">
                          <SidebarTrigger className="ml-4" />
                        </header>
                        <main className="flex-1">
                          <Routes>
                            <Route path="/vps" element={<VPSListPage />} />
                            <Route path="/vps/create" element={<CreateVPSPage />} />
                            <Route path="/vps/:vpsId" element={<VPSDetail />} />
                            <Route path="/store" element={<StorePage />} />
                            <Route path="/terms" element={<TermsPage />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/dashboard" element={<Navigate to="/vps" replace />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </main>
                      </div>
                    </div>
                  </SidebarProvider>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
