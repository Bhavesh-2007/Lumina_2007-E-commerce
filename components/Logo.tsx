import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <div className={`${className} flex items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/5 p-1`}>
    <img 
      src="https://i.ibb.co/68WvH0F/snapcart-logo.png" 
      alt="SnapCart Shop Logo" 
      className="w-full h-full object-contain"
      style={{ filter: 'contrast(1.1) saturate(1.1)' }}
      onError={(e) => {
        // Fallback to a stylistically similar representation if the primary link fails
        e.currentTarget.src = "https://raw.githubusercontent.com/ai-gen-images/logos/main/snapcart_logo_v2.png";
      }}
    />
  </div>
);