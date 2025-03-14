
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Camera } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Change page title
    document.title = 'Page Not Found - ShotCap';
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-github-dark p-4">
      <div className="text-center max-w-md animate-fade-in">
        <Camera className="w-16 h-16 text-github-accent mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4 text-white">404 - Not Found</h1>
        <p className="text-github-text/80 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="btn-primary inline-flex items-center"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
