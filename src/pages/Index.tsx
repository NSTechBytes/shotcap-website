
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Index() {
  useEffect(() => {
    document.title = "ShotCap - Windows Screenshot Command Line Tool";
  }, []);

  return (
    <div className="min-h-screen bg-github-dark text-github-text">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}
