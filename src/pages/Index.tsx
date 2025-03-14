
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
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-github-dark text-github-text">
      <Header />
      <main className="pt-24">
        <Hero />
        <Features />
        <Installation />
      </main>
      <Footer />
    </div>
  );
}
