
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Star, GitFork, Windows } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-github-accent/5 to-transparent pointer-events-none"></div>
      
      {/* Animated floating dots */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full bg-github-accent/80",
              "animate-pulse-slow",
              i % 3 === 0 ? "w-1.5 h-1.5" : "",
              i % 5 === 0 ? "w-2 h-2" : ""
            )}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div ref={heroRef} className="container mx-auto px-4 text-center transition-all duration-700 ease-out opacity-0 translate-y-10">
        <div className="inline-flex items-center mb-4 px-3 py-1 rounded-full bg-github-card border border-github-border text-xs font-medium text-github-accent">
          <Windows className="w-3.5 h-3.5 mr-1.5" />
          <span>Windows Command-Line Tool</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-github-text/90 tracking-tight">
          ShotCap
        </h1>
        
        <p className="text-xl md:text-2xl text-github-text/80 mb-8 max-w-3xl mx-auto">
          Versatile Windows screenshot utility with precise capture controls, directly from your command line.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link to="/installation" className="btn-primary w-full sm:w-auto">
            Download for Windows
          </Link>
          <div className="flex items-center gap-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <Star className="w-4 h-4 mr-1.5" />
              <span>Star</span>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <GitFork className="w-4 h-4 mr-1.5" />
              <span>Fork</span>
            </a>
          </div>
        </div>
        
        <div className="animate-bounce mt-16 opacity-50 hover:opacity-100 transition-opacity">
          <Link to="/features" className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-github-border">
            <ArrowDown className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
