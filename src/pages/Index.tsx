
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
      {/* Add the stylish background that extends to the top of the page */}
      <div className="absolute top-0 left-0 right-0 w-full">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-github-accent/10 to-transparent pointer-events-none"></div>
        
        {/* Animated glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-github-accent/20 rounded-full blur-[120px] opacity-50 animate-pulse-slow pointer-events-none"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMzMDM2M2QiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDYwaDYwVjBoLTYweiIvPjwvZz48L3N2Zz4=')] opacity-10 pointer-events-none"></div>
      </div>

      <Header />
      <main className="pt-24 relative z-10">
        <Hero />
        <Features />
        <Installation />
      </main>
      <Footer />
    </div>
  );
}
