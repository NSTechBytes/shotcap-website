
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Installation from "@/components/Installation";
import Footer from "@/components/Footer";

export default function Index() {
  useEffect(() => {
    document.title = "ShotCap - Windows Screenshot Command Line Tool";
    // Ensure we start at the top of the page when it loads
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="min-h-screen bg-github-dark text-github-text">
      <Header />
      <main className="pt-24 relative">
        {/* Add a subtle gradient overlay at the top of the page */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-github-dark via-github-dark/90 to-transparent z-0"></div>
        <div className="relative z-10">
          <Hero />
          <Features />
          <Installation />
        </div>
      </main>
      <Footer />
    </div>
  );
}
