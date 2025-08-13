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
      {/* Outer ring with rotation */}
      <circle 
        cx="35" 
        cy="35" 
        r="30" 
        fill="none" 
        stroke="url(#bodifyGradient)" 
        strokeWidth="2"
        opacity="0.3"
      />
      
      {/* Inner fitness symbol - Strong 'B' for Bodify */}
      <g transform="translate(25, 20)">
        {/* Main B structure */}
        <path 
          d="M5 5 L5 25 M5 5 L15 5 Q18 5 18 10 Q18 15 15 15 L5 15 M5 15 L16 15 Q20 15 20 20 Q20 25 16 25 L5 25" 
          stroke="url(#bodifyGradient)" 
          strokeWidth="3" 
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Muscle definition lines */}
        <path 
          d="M7 8 L13 8 M7 12 L13 12 M7 18 L14 18 M7 22 L14 22" 
          stroke="url(#bodifyGradient)" 
          strokeWidth="1" 
          opacity="0.6"
          strokeLinecap="round"
        />
      </g>
      
      {/* Energy rings */}
      <circle cx="35" cy="35" r="25" fill="none" stroke="url(#bodifyGradient)" strokeWidth="1" opacity="0.4">
        <animate attributeName="r" values="25;27;25" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
      
      <circle cx="35" cy="35" r="35" fill="none" stroke="url(#bodifyGradient)" strokeWidth="1" opacity="0.2">
        <animate attributeName="r" values="35;38;35" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="4s" repeatCount="indefinite" />
      </circle>
      
      {/* Power dots */}
      <circle cx="50" cy="25" r="1.5" fill="url(#bodifyGradient)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="20" cy="45" r="1.5" fill="url(#bodifyGradient)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.7s" />
      </circle>
      <circle cx="50" cy="45" r="1.5" fill="url(#bodifyGradient)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1.4s" />
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
          <stop offset="50%" stopColor="hsl(var(--secondary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>

      {(variant === 'full' || variant === 'circle') && <CircleMark />}
      {(variant === 'full' || variant === 'wordmark') && <Wordmark />}
    </svg>
  );
};

export default BodifyLogo;
