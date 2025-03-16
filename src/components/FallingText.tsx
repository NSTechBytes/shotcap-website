
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
      
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default FallingText;
