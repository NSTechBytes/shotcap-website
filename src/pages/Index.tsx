
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

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
      </main>
    </div>
  );
}
