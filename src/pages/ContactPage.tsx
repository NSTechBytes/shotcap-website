
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Contact from '@/components/Contact';

const ContactPage = () => {
  useEffect(() => {
    // Change page title
    document.title = 'Contact - ShotCap';
  }, []);

  return (
    <div className="min-h-screen bg-github-dark text-github-text">
      <Header />
      <main className="pt-20">
        <Contact />
      </main>
    </div>
  );
};

export default ContactPage;
