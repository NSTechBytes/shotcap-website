
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Usage from '@/components/Usage';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Home, Book, Download, Code, Mail, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const UsagePage = () => {
  useEffect(() => {
    // Change page title
    document.title = 'Usage - ShotCap';
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-github-dark text-github-text flex w-full">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-github-accent to-github-accent/70 flex items-center justify-center shadow-md">
                <Book className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">Documentation</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/">
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive>
                      <Link to="/usage">
                        <Book className="h-4 w-4" />
                        <span>Usage</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/installation">
                        <Download className="h-4 w-4" />
                        <span>Installation</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/contribute">
                        <Code className="h-4 w-4" />
                        <span>Contribute</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/contact">
                        <Mail className="h-4 w-4" />
                        <span>Contact</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <div className="text-xs text-github-muted">
              ShotCap Documentation v1.0.0
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex flex-col w-full">
          <Header />
          <main className="pt-20 flex-1">
            <Usage />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UsagePage;
