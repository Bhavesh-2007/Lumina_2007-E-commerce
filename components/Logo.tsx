import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logo_gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#A855F7" />
      </linearGradient>
      <filter id="glow" x="-10" y="-10" width="60" height="60" filterUnits="userSpaceOnUse">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="40" height="40" rx="12" fill="url(#logo_gradient)" />
    <path d="M12 14V22C12 25.3137 14.6863 28 18 28H28" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="28" cy="12" r="3" fill="white" fillOpacity="0.5" />
  </svg>
);