
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface FallingTextProps {
  text: string;
  className?: string;
}

const FallingText = ({ text, className }: FallingTextProps) => {
  // Simply display the text without animation
  return (
    <span 
      className={cn("inline-flex", className)}
      aria-label={text}
    >
      {text}
    </span>
  );
};

export default FallingText;
