
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Camera, Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Close mobile menu when window is resized to desktop size
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
    window.scrollTo(0, 0);
  };

  const isHomePage = location.pathname === '/';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out',
        isScrolled
          ? 'py-2 sm:py-3 bg-github-dark/90 backdrop-blur-md border border-github-border/50 mx-2 sm:mx-4 mt-2 rounded-xl shadow-lg'
          : isHomePage 
            ? 'py-3 sm:py-5 bg-transparent' 
            : 'py-3 sm:py-5 bg-github-dark/90 backdrop-blur-md'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-github-accent to-github-accent/70 flex items-center justify-center transition-all duration-300 group-hover:rotate-6 shadow-md group-hover:shadow-github-accent/20">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-github-accent">ShotCap</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/" className={cn("nav-link", isActive('/') && "text-github-accent font-medium")}>Home</Link>
          <Link to="/features" className={cn("nav-link", isActive('/features') && "text-github-accent font-medium")}>Features</Link>
          <Link to="/usage" className={cn("nav-link", isActive('/usage') && "text-github-accent font-medium")}>Usage</Link>
          <Link to="/installation" className={cn("nav-link", isActive('/installation') && "text-github-accent font-medium")}>Installation</Link>
          <Link to="/contribute" className={cn("nav-link", isActive('/contribute') && "text-github-accent font-medium")}>Contribute</Link>
          <Link to="/contact" className={cn("nav-link", isActive('/contact') && "text-github-accent font-medium")}>Contact</Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="ml-2 inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 text-white hover:bg-github-card hover:text-github-accent hover:scale-105"
          >
            <Github className="w-4 h-4 mr-1" />
            GitHub
            <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
          </a>
        </nav>

        <button 
          className="md:hidden text-github-text bg-github-card/80 p-2 rounded-lg hover:bg-github-card transition-colors duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu - improved for better responsiveness */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-github-dark/95 backdrop-blur-md animate-fade-in">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-github-border/20">
              <Link 
                to="/" 
                className="flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-github-accent to-github-accent/70 flex items-center justify-center shadow-md">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold tracking-tight text-white">ShotCap</span>
              </Link>
              <button 
                className="text-github-text p-2 bg-github-card/80 rounded-full"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/" 
                  className={cn("py-3 px-4 text-white hover:text-github-accent rounded-lg bg-github-card/50 hover:bg-github-card/80 border border-github-border/20 flex items-center justify-between text-base font-medium transition-all duration-300", 
                    isActive('/') && "text-github-accent font-medium bg-github-card/80 border-github-accent/20")}
                  onClick={() => handleNavigation('/')}
                >
                  Home
                  <span className="w-1.5 h-1.5 rounded-full bg-github-accent/70"></span>
                </Link>
                <Link 
                  to="/features" 
                  className={cn("py-3 px-4 text-white hover:text-github-accent rounded-lg bg-github-card/50 hover:bg-github-card/80 border border-github-border/20 flex items-center justify-between text-base font-medium transition-all duration-300",
                    isActive('/features') && "text-github-accent font-medium bg-github-card/80 border-github-accent/20")}
                  onClick={() => handleNavigation('/features')}
                >
                  Features
                  <span className="w-1.5 h-1.5 rounded-full bg-github-accent/70"></span>
                </Link>
                <Link 
                  to="/usage" 
                  className={cn("py-3 px-4 text-white hover:text-github-accent rounded-lg bg-github-card/50 hover:bg-github-card/80 border border-github-border/20 flex items-center justify-between text-base font-medium transition-all duration-300",
                    isActive('/usage') && "text-github-accent font-medium bg-github-card/80 border-github-accent/20")}
                  onClick={() => handleNavigation('/usage')}
                >
                  Usage
                  <span className="w-1.5 h-1.5 rounded-full bg-github-accent/70"></span>
                </Link>
                <Link 
                  to="/installation" 
                  className={cn("py-3 px-4 text-white hover:text-github-accent rounded-lg bg-github-card/50 hover:bg-github-card/80 border border-github-border/20 flex items-center justify-between text-base font-medium transition-all duration-300",
                    isActive('/installation') && "text-github-accent font-medium bg-github-card/80 border-github-accent/20")}
                  onClick={() => handleNavigation('/installation')}
                >
                  Installation
                  <span className="w-1.5 h-1.5 rounded-full bg-github-accent/70"></span>
                </Link>
                <Link 
                  to="/contribute" 
                  className={cn("py-3 px-4 text-white hover:text-github-accent rounded-lg bg-github-card/50 hover:bg-github-card/80 border border-github-border/20 flex items-center justify-between text-base font-medium transition-all duration-300",
                    isActive('/contribute') && "text-github-accent font-medium bg-github-card/80 border-github-accent/20")}
                  onClick={() => handleNavigation('/contribute')}
                >
                  Contribute
                  <span className="w-1.5 h-1.5 rounded-full bg-github-accent/70"></span>
                </Link>
                <Link 
                  to="/contact" 
                  className={cn("py-3 px-4 text-white hover:text-github-accent rounded-lg bg-github-card/50 hover:bg-github-card/80 border border-github-border/20 flex items-center justify-between text-base font-medium transition-all duration-300",
                    isActive('/contact') && "text-github-accent font-medium bg-github-card/80 border-github-accent/20")}
                  onClick={() => handleNavigation('/contact')}
                >
                  Contact
                  <span className="w-1.5 h-1.5 rounded-full bg-github-accent/70"></span>
                </Link>
              </div>
            </nav>
            
            <div className="p-4 border-t border-github-border/20">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full py-3 px-4 flex items-center justify-center text-white bg-github-accent/20 hover:bg-github-accent/30 border border-github-accent/30 rounded-lg text-base font-medium transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
                <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
