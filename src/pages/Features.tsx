
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturesComponent from '@/components/Features';

const Features = () => {
  useEffect(() => {
    // Change page title
    document.title = 'Features - ShotCap';
  }, []);

  return (
    <div className="min-h-screen bg-github-dark text-github-text">
      <Header />
      <main className="pt-20">
        <FeaturesComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Features;
