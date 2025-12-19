import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg 
    className={`${className} filter drop-shadow-sm`} 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="montraa_gradient_main" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4F46E5" /> {/* Indigo 600 */}
        <stop offset="100%" stopColor="#0EA5E9" /> {/* Sky 500 */}
      </linearGradient>
      <linearGradient id="montraa_gradient_accent" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.4" />
        <stop offset="100%" stopColor="white" stopOpacity="0.05" />
      </linearGradient>
      <filter id="logo_inner_glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* Background Base */}
    <rect 
      width="40" 
      height="40" 
      rx="10" 
      fill="url(#montraa_gradient_main)" 
    />
    
    {/* Stylized 'M' Geometric Shape */}
    <path 
      d="M10 28V12L16 22L20 15L24 22L30 12V28" 
      stroke="white" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="opacity-90"
    />
    
    {/* Glass Overlay Detail */}
    <path 
      d="M10 12L16 22L20 15L24 22L30 12" 
      stroke="url(#montraa_gradient_accent)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    
    {/* Abstract Dot Accent */}
    <circle 
      cx="20" 
      cy="28" 
      r="2" 
      fill="white" 
      className="animate-pulse"
    />
  </svg>
);