
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Usage from '@/components/Usage';

const UsagePage = () => {
  useEffect(() => {
    // Change page title
    document.title = 'Usage - ShotCap';
  }, []);

  return (
    <div className="min-h-screen bg-github-dark text-github-text">
      <Header />
      <main className="pt-20">
        <Usage />
      </main>
    </div>
  );
};

export default UsagePage;
