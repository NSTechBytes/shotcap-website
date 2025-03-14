import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Star, GitFork, Monitor, Command, Download, ChevronRight } from 'lucide-react';
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
      {/* Remove background elements as they're now in the Index.tsx */}
      
      {/* Animated floating dots */}
      <div className="absolute inset-0 overflow-hidden opacity-25 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-full",
              "animate-pulse-slow",
              i % 3 === 0 ? "w-1.5 h-1.5 bg-github-accent/90" : "",
              i % 5 === 0 ? "w-2 h-2 bg-github-accent/80" : "",
              i % 7 === 0 ? "w-3 h-3 bg-white/30" : "w-1 h-1 bg-white/50"
            )}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      <div ref={heroRef} className="container mx-auto px-4 text-center transition-all duration-1000 ease-out opacity-0 translate-y-10">
        <div className="inline-flex items-center mb-6 px-3 py-1 rounded-full bg-github-card/80 border border-github-border text-xs font-medium text-github-accent animate-slide-up">
          <Command className="w-3.5 h-3.5 mr-1.5" />
          <span>Windows Screenshot Utility</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-github-text/70 tracking-tight leading-tight max-w-4xl mx-auto animate-slide-up" style={{animationDelay: '150ms'}}>
          Screenshot with <span className="text-github-accent">Precision</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-github-text/80 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '300ms'}}>
          Versatile Windows screenshot utility with precise capture controls,
          <br className="hidden md:block" /> directly from your command line.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{animationDelay: '450ms'}}>
          <Link to="/installation" className="group relative w-full sm:w-auto overflow-hidden rounded-xl bg-github-accent px-6 py-3 text-white transition-all duration-300 hover:bg-github-accent/90 hover:scale-105 active:scale-100">
            <div className="relative flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              <span className="font-medium">Download for Windows</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
            <div className="absolute inset-0 -translate-y-full bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"></div>
          </Link>

          <div className="flex items-center gap-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-github-border bg-github-card hover:bg-github-card/80 transition-all duration-300">
              <Star className="w-5 h-5" />
              <span>Star</span>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-github-border bg-github-card hover:bg-github-card/80 transition-all duration-300">
              <GitFork className="w-5 h-5" />
              <span>Fork</span>
            </a>
          </div>
        </div>
        
        <Link 
          to="/features" 
          className="inline-flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity animate-bounce"
        >
          <span className="text-sm text-github-text/80">Learn More</span>
          <div className="w-10 h-10 rounded-full border border-github-border flex items-center justify-center bg-github-card/50 backdrop-blur-sm">
            <ArrowDown className="w-5 h-5" />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
