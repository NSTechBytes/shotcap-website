
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Usage from '@/components/Usage';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';

const UsagePage = () => {
  useEffect(() => {
    // Change page title
    document.title = 'Usage - ShotCap';
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-github-dark text-github-text w-full">
        <AppSidebar />
        <div className="flex flex-col w-full">
          <Header />
          <main className="pt-20">
            <Usage />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UsagePage;
