
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Camera, Github } from 'lucide-react';
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

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
    window.scrollTo(0, 0);
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
          <Link to="/features" className={cn("nav-link", isActive('/features') && "text-github-accent font-medium")}>Features</Link>
          <Link to="/usage" className={cn("nav-link", isActive('/usage') && "text-github-accent font-medium")}>Usage</Link>
          <Link to="/installation" className={cn("nav-link", isActive('/installation') && "text-github-accent font-medium")}>Installation</Link>
          <Link to="/contribute" className={cn("nav-link", isActive('/contribute') && "text-github-accent font-medium")}>Contribute</Link>
          <Link to="/contact" className={cn("nav-link", isActive('/contact') && "text-github-accent font-medium")}>Contact</Link>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="ml-2 inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors text-white hover:bg-github-card hover:text-github-accent"
          >
            <Github className="w-4 h-4 mr-1" />
            GitHub
          </a>
        </nav>

        <button 
          className="md:hidden text-github-text"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu - improved visibility and interaction */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-github-dark/95 backdrop-blur-md pt-20 px-4 animate-fade-in">
          <div className="flex justify-end mb-4">
            <button 
              className="text-github-text p-2"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 px-2">
            <Link 
              to="/" 
              className={cn("py-3 px-4 text-white hover:text-github-accent border-b border-github-border/20 flex items-center justify-center text-base font-medium", 
                isActive('/') && "text-github-accent font-medium")}
              onClick={() => handleNavigation('/')}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className={cn("py-3 px-4 text-white hover:text-github-accent border-b border-github-border/20 flex items-center justify-center text-base font-medium",
                isActive('/features') && "text-github-accent font-medium")}
              onClick={() => handleNavigation('/features')}
            >
              Features
            </Link>
            <Link 
              to="/usage" 
              className={cn("py-3 px-4 text-white hover:text-github-accent border-b border-github-border/20 flex items-center justify-center text-base font-medium",
                isActive('/usage') && "text-github-accent font-medium")}
              onClick={() => handleNavigation('/usage')}
            >
              Usage
            </Link>
            <Link 
              to="/installation" 
              className={cn("py-3 px-4 text-white hover:text-github-accent border-b border-github-border/20 flex items-center justify-center text-base font-medium",
                isActive('/installation') && "text-github-accent font-medium")}
              onClick={() => handleNavigation('/installation')}
            >
              Installation
            </Link>
            <Link 
              to="/contribute" 
              className={cn("py-3 px-4 text-white hover:text-github-accent border-b border-github-border/20 flex items-center justify-center text-base font-medium",
                isActive('/contribute') && "text-github-accent font-medium")}
              onClick={() => handleNavigation('/contribute')}
            >
              Contribute
            </Link>
            <Link 
              to="/contact" 
              className={cn("py-3 px-4 text-white hover:text-github-accent border-b border-github-border/20 flex items-center justify-center text-base font-medium",
                isActive('/contact') && "text-github-accent font-medium")}
              onClick={() => handleNavigation('/contact')}
            >
              Contact
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="py-3 px-4 flex items-center justify-center text-white hover:text-github-accent text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
