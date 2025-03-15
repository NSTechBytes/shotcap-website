
import React from 'react';
import { Github, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-github-card border-t border-github-border py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/26e373c8-66d4-41af-9c66-fde4e5bce6b1.png" 
                alt="ShotCap Logo" 
                className="h-6 mr-2" 
              />
              <span className="text-xl font-semibold tracking-tight text-white">ShotCap</span>
            </div>
            <p className="text-github-text/70 text-sm max-w-md mb-6">
              A powerful, flexible command-line screenshot tool for developers, designers, and content creators.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-github-text/70 hover:text-github-accent transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-github-text/70 hover:text-github-accent transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-github-text mb-4">Documentation</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-sm text-github-text/70 hover:text-github-accent transition-colors">Features</a>
              </li>
              <li>
                <a href="#usage" className="text-sm text-github-text/70 hover:text-github-accent transition-colors">Usage Examples</a>
              </li>
              <li>
                <a href="#installation" className="text-sm text-github-text/70 hover:text-github-accent transition-colors">Installation</a>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-github-text/70 hover:text-github-accent transition-colors"
                >
                  Full Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-github-text mb-4">Project</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://github.com/issues" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-github-text/70 hover:text-github-accent transition-colors"
                >
                  Issue Tracker
                </a>
              </li>
              <li>
                <a href="#contribute" className="text-sm text-github-text/70 hover:text-github-accent transition-colors">Contribute</a>
              </li>
              <li>
                <a 
                  href="https://github.com/releases" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-github-text/70 hover:text-github-accent transition-colors"
                >
                  Releases
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/license" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-github-text/70 hover:text-github-accent transition-colors"
                >
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-github-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-github-text/50 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ShotCap. All rights reserved.
          </p>
          <p className="text-sm text-github-text/50 flex items-center">
            Made with <Heart className="w-4 h-4 text-github-accent mx-1" /> by ShotCap Contributors
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
