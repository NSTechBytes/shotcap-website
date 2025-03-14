
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Camera, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled
          ? 'py-3 bg-github-dark/90 backdrop-blur-md border border-github-border/50 mx-4 mt-2 rounded-xl shadow-lg'
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Camera className="w-6 h-6 text-github-accent" />
          <span className="text-xl font-semibold tracking-tight text-white">ShotCap</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className={cn("nav-link", isActive('/') && "text-github-accent font-medium")}>Home</Link>
        </nav>

        <button 
          className="md:hidden text-github-text"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-github-dark/95 backdrop-blur-md pt-20 px-4 animate-fade-in">
          <div className="flex justify-end mb-4">
            <button 
              className="text-github-text p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 px-2">
            <Link 
              to="/" 
              className={cn("py-3 px-2 text-github-text hover:text-github-accent border-b border-github-border/20", 
                isActive('/') && "text-github-accent font-medium")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="py-3 px-2 flex items-center text-github-text hover:text-github-accent"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
