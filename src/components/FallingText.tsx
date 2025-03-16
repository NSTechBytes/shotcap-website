
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FallingTextProps {
  text: string;
  className?: string;
}

const FallingText = ({ text, className }: FallingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing content
    container.innerHTML = '';

    // Create each character with a random animation
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.className = 'inline-block';
      
      // Add random animation parameters
      const delay = Math.random() * 0.5;
      const duration = 0.5 + Math.random() * 0.5;
      
      // Apply animation styles
      span.style.animation = `falling-char ${duration}s ease-out forwards`;
      span.style.animationDelay = `${delay}s`;
      span.style.opacity = '0';
      span.style.transform = 'translateY(-20px)';
      
      // Add to container
      container.appendChild(span);
    });

    // Add falling character animation keyframes if not already present
    if (!document.getElementById('falling-text-keyframes')) {
      const style = document.createElement('style');
      style.id = 'falling-text-keyframes';
      style.textContent = `
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
      document.head.appendChild(style);
    }
  }, [text]);

  return (
    <div 
      ref={containerRef} 
      className={cn("inline-flex", className)}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <span key={i} className="opacity-0">{char}</span>
      ))}
    </div>
  );
};

export default FallingText;
