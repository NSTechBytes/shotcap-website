
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Usage from '@/components/Usage';

const UsagePage = () => {
  useEffect(() => {
    // Change page title
    document.title = 'Usage - ShotCap';
  }, []);

  return (
    <div className="min-h-screen bg-github-dark text-github-text flex flex-col w-full">
      <Header />
      <main className="pt-20 flex-1">
        <Usage />
      </main>
    </div>
  );
};

export default UsagePage;
