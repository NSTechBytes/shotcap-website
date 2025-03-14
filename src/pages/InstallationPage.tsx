
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Installation from '@/components/Installation';

const InstallationPage = () => {
  useEffect(() => {
    // Change page title
    document.title = 'Installation - ShotCap';
  }, []);

  return (
    <div className="min-h-screen bg-github-dark text-github-text">
      <Header />
      <main className="pt-20">
        <Installation />
      </main>
      <Footer />
    </div>
  );
};

export default InstallationPage;
