
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Usage from "@/components/Usage";
import Installation from "@/components/Installation";
import Contribute from "@/components/Contribute";

export default function Index() {
  useEffect(() => {
    document.title = "ShotCap - Windows Screenshot Command Line Tool";
  }, []);

  return (
    <div className="min-h-screen bg-github-dark text-github-text">
      <Header />
      <main>
        <Hero />
        <Features />
        <Usage />
        <Installation />
        <Contribute />
      </main>
    </div>
  );
}
