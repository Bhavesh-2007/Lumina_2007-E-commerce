import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg 
    className={className} 
    viewBox="0 0 40 40" 
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    {/* Stylized Shopping Cart / 'M' Geometric Hybrid */}
    <path 
      d="M6 14H11L18 28L24 17L30 28L37 14" 
      stroke="currentColor" 
      strokeWidth="3.2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    
    {/* Wheels positioned precisely below the lower vertices */}
    <circle 
      cx="18" 
      cy="35" 
      r="2.5" 
      fill="currentColor" 
    />
    <circle 
      cx="30" 
      cy="35" 
      r="2.5" 
      fill="currentColor" 
    />
  </svg>
);