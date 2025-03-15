
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Github, ExternalLink, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
    setIsOpen(false);
  };

  const isHomePage = location.pathname === '/';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out font-varela',
        isScrolled
          ? 'py-2 sm:py-3 bg-github-dark/90 backdrop-blur-md border border-github-border/50 mx-2 sm:mx-4 mt-2 rounded-xl shadow-lg'
          : isHomePage 
            ? 'py-3 sm:py-5 bg-transparent' 
            : 'py-3 sm:py-5 bg-github-dark/90 backdrop-blur-md'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="h-8 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <img 
                src="/lovable-uploads/26e373c8-66d4-41af-9c66-fde4e5bce6b1.png" 
                alt="ShotCap Logo" 
                className="h-8 object-contain" 
              />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-github-accent">ShotCap</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-wrap gap-1">
            <Link to="/" className={cn("nav-link text-sm px-3", isActive('/') && "text-github-accent font-medium")}>Home</Link>
            <Link to="/features" className={cn("nav-link text-sm px-3", isActive('/features') && "text-github-accent font-medium")}>Features</Link>
            <Link to="/usage" className={cn("nav-link text-sm px-3", isActive('/usage') && "text-github-accent font-medium")}>Usage</Link>
            <Link to="/installation" className={cn("nav-link text-sm px-3", isActive('/installation') && "text-github-accent font-medium")}>Install</Link>
            <Link to="/contribute" className={cn("nav-link text-sm px-3", isActive('/contribute') && "text-github-accent font-medium")}>Contribute</Link>
            <Link to="/contact" className={cn("nav-link text-sm px-3", isActive('/contact') && "text-github-accent font-medium")}>Contact</Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ml-2 inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 text-white hover:bg-github-card hover:text-github-accent hover:scale-105"
            >
              <Github className="w-4 h-4 mr-1" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
            </a>
          </nav>
          
          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-github-card">
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-github-dark border-t border-github-border">
                <div className="px-4 py-6 max-h-[85dvh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">Menu</h2>
                    <DrawerClose asChild>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-github-card">
                        <X className="h-5 w-5" />
                      </Button>
                    </DrawerClose>
                  </div>
                  <nav className="flex flex-col space-y-3">
                    <Link to="/" className={cn("mobile-menu-item", isActive('/') && "active")}>
                      Home
                    </Link>
                    <Link to="/features" className={cn("mobile-menu-item", isActive('/features') && "active")}>
                      Features
                    </Link>
                    <Link to="/usage" className={cn("mobile-menu-item", isActive('/usage') && "active")}>
                      Usage
                    </Link>
                    <Link to="/installation" className={cn("mobile-menu-item", isActive('/installation') && "active")}>
                      Installation
                    </Link>
                    <Link to="/contribute" className={cn("mobile-menu-item", isActive('/contribute') && "active")}>
                      Contribute
                    </Link>
                    <Link to="/contact" className={cn("mobile-menu-item", isActive('/contact') && "active")}>
                      Contact
                    </Link>
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mobile-menu-item"
                    >
                      GitHub <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </nav>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
