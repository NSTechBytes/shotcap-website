
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface FallingTextProps {
  text: string;
  className?: string;
}

const FallingText = ({ text, className }: FallingTextProps) => {
  const [characters, setCharacters] = useState<{char: string; delay: number; duration: number}[]>([]);
  
  useEffect(() => {
    // Generate animation parameters for each character
    const chars = text.split('').map(char => ({
      char,
      delay: Math.random() * 0.5,
      duration: 0.5 + Math.random() * 0.5
    }));
    
    setCharacters(chars);
  }, [text]);

  // Create keyframes style for the animation
  useEffect(() => {
    // Check if the style already exists
    if (!document.getElementById('falling-char-keyframes')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'falling-char-keyframes';
      styleElement.textContent = `
        @keyframes falling-char {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `;
      document.head.appendChild(styleElement);
    }
    
    // Cleanup on unmount
    return () => {
      const styleElement = document.getElementById('falling-char-keyframes');
      if (styleElement && document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <div 
      className={cn("inline-flex", className)}
      aria-label={text}
    >
      {characters.map((item, i) => (
        <span 
          key={`${item.char}-${i}`} 
          className="inline-block"
          style={{
            animation: `falling-char ${item.duration}s ease-out forwards`,
            animationDelay: `${item.delay}s`,
            opacity: 0,
            transform: 'translateY(-20px)'
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
};

export default FallingText;
