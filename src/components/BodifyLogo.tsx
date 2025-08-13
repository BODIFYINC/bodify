import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  alt?: string;
  variant?: 'full' | 'circle' | 'wordmark';
}

// Bodify Logo: Clean, professional fitness transformation brand
const BodifyLogo: React.FC<LogoProps> = ({ 
  className = "h-8 w-auto", 
  alt = "Bodify - AI Fitness Platform",
  variant = 'full'
}) => {
  const CircleMark = () => (
    <g>
      {/* Outer circle */}
      <circle 
        cx="35" 
        cy="35" 
        r="30" 
        fill="none" 
        stroke="url(#bodifyGradient)" 
        strokeWidth="3"
      />
      
      {/* Inner fitness icon - stylized strong person */}
      <g transform="translate(25, 22)">
        {/* Head */}
        <circle cx="10" cy="6" r="4" fill="url(#bodifyGradient)" />
        
        {/* Body - strong shoulders */}
        <path 
          d="M6 12 Q10 10 14 12 L16 20 Q10 18 4 20 Z" 
          fill="url(#bodifyGradient)"
        />
        
        {/* Arms - flexed */}
        <ellipse cx="3" cy="16" rx="2" ry="4" fill="url(#bodifyGradient)" />
        <ellipse cx="17" cy="16" rx="2" ry="4" fill="url(#bodifyGradient)" />
        
        {/* Legs */}
        <rect x="8" y="20" width="1.5" height="6" fill="url(#bodifyGradient)" />
        <rect x="10.5" y="20" width="1.5" height="6" fill="url(#bodifyGradient)" />
      </g>
      
      {/* AI enhancement dots */}
      <circle cx="50" cy="25" r="1.5" fill="url(#bodifyGradient)" opacity="0.8">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="20" cy="45" r="1.5" fill="url(#bodifyGradient)" opacity="0.8">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.7s" />
      </circle>
      <circle cx="50" cy="45" r="1.5" fill="url(#bodifyGradient)" opacity="0.8">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="1.4s" />
      </circle>
    </g>
  );

  const Wordmark = () => (
    <text
      x={variant === 'full' ? "85" : "0"}
      y="44"
      fontSize="32"
      fontWeight="700"
      letterSpacing="-1"
      fill="url(#bodifyGradient)"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      BODIFY
    </text>
  );

  return (
    <svg
      role="img"
      aria-label={alt}
      className={className}
      viewBox={variant === 'circle' ? "0 0 70 70" : variant === 'wordmark' ? "0 0 180 60" : "0 0 240 70"}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <title>{alt}</title>
      <defs>
        <linearGradient id="bodifyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>

      {(variant === 'full' || variant === 'circle') && <CircleMark />}
      {(variant === 'full' || variant === 'wordmark') && <Wordmark />}
    </svg>
  );
};

export default BodifyLogo;
