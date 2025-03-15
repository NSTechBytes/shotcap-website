
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Camera, Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const isHomePage = location.pathname === '/';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out font-poppins',
        isScrolled
          ? 'py-2 sm:py-3 bg-github-dark/90 backdrop-blur-md border border-github-border/50 mx-2 sm:mx-4 mt-2 rounded-xl shadow-lg'
          : isHomePage 
            ? 'py-3 sm:py-5 bg-transparent' 
            : 'py-3 sm:py-5 bg-github-dark/90 backdrop-blur-md'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="flex justify-between w-full sm:w-auto">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-github-accent to-github-accent/70 flex items-center justify-center transition-all duration-300 group-hover:rotate-6 shadow-md group-hover:shadow-github-accent/20">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-github-accent">ShotCap</span>
            </Link>
          </div>
          
          <nav className="flex items-center justify-center flex-wrap gap-1 mt-3 sm:mt-0 sm:ml-auto">
            <Link to="/" className={cn("nav-link text-xs sm:text-sm px-2 sm:px-3", isActive('/') && "text-github-accent font-medium")}>Home</Link>
            <Link to="/features" className={cn("nav-link text-xs sm:text-sm px-2 sm:px-3", isActive('/features') && "text-github-accent font-medium")}>Features</Link>
            <Link to="/usage" className={cn("nav-link text-xs sm:text-sm px-2 sm:px-3", isActive('/usage') && "text-github-accent font-medium")}>Usage</Link>
            <Link to="/installation" className={cn("nav-link text-xs sm:text-sm px-2 sm:px-3", isActive('/installation') && "text-github-accent font-medium")}>Install</Link>
            <Link to="/contribute" className={cn("nav-link text-xs sm:text-sm px-2 sm:px-3", isActive('/contribute') && "text-github-accent font-medium")}>Contribute</Link>
            <Link to="/contact" className={cn("nav-link text-xs sm:text-sm px-2 sm:px-3", isActive('/contact') && "text-github-accent font-medium")}>Contact</Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ml-2 inline-flex items-center justify-center px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 text-white hover:bg-github-card hover:text-github-accent hover:scale-105"
            >
              <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="sm:block">GitHub</span>
              <ExternalLink className="w-2 h-2 sm:w-3 sm:h-3 ml-1 opacity-70" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
