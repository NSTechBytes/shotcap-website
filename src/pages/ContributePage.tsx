
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Contribute from '@/components/Contribute';

const ContributePage = () => {
  useEffect(() => {
    // Change page title
    document.title = 'Contribute - ShotCap';
  }, []);

  return (
    <div className="min-h-screen bg-github-dark text-github-text">
      <Header />
      <main className="pt-20">
        <Contribute />
      </main>
    </div>
  );
};

export default ContributePage;
