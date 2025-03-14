
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Installation from '@/components/Installation';

const InstallationPage = () => {
  useEffect(() => {
    // Change page title
    document.title = 'Installation - ShotCap';
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-github-dark text-github-text flex flex-col w-full">
      <Header />
      <main className="pt-20 flex-1">
        <Installation />
      </main>
    </div>
  );
};

export default InstallationPage;
