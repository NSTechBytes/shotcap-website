
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Change page title
    document.title = 'ShotCap - Command-Line Screenshot Tool';
  }, []);

  return (
    <div className="min-h-screen bg-github-dark text-github-text">
      <Header />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
