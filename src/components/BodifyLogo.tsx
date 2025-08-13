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
        opacity="0.4"
      >
        <animateTransform 
          attributeName="transform" 
          type="rotate" 
          values="0 35 35;360 35 35" 
          dur="20s" 
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Fitness transformation symbol - human figure evolving */}
      <g transform="translate(22, 15)">
        {/* Body transformation - weak to strong */}
        <g>
          {/* Head */}
          <circle cx="13" cy="8" r="3" fill="url(#bodifyGradient)" opacity="0.8" />
          
          {/* Body core - expanding with strength */}
          <rect x="11" y="12" width="4" height="12" rx="2" fill="url(#bodifyGradient)" opacity="0.7">
            <animate attributeName="width" values="4;5;4" dur="3s" repeatCount="indefinite" />
            <animate attributeName="x" values="11;10.5;11" dur="3s" repeatCount="indefinite" />
          </rect>
          
          {/* Arms - getting stronger */}
          <rect x="7" y="14" width="3" height="8" rx="1.5" fill="url(#bodifyGradient)" opacity="0.8">
            <animate attributeName="width" values="3;4;3" dur="3s" repeatCount="indefinite" />
            <animate attributeName="x" values="7;6.5;7" dur="3s" repeatCount="indefinite" />
          </rect>
          <rect x="16" y="14" width="3" height="8" rx="1.5" fill="url(#bodifyGradient)" opacity="0.8">
            <animate attributeName="width" values="3;4;3" dur="3s" repeatCount="indefinite" />
          </rect>
          
          {/* Legs - building strength */}
          <rect x="9" y="25" width="3" height="10" rx="1.5" fill="url(#bodifyGradient)" opacity="0.7">
            <animate attributeName="width" values="3;4;3" dur="3s" repeatCount="indefinite" />
            <animate attributeName="x" values="9;8.5;9" dur="3s" repeatCount="indefinite" />
          </rect>
          <rect x="14" y="25" width="3" height="10" rx="1.5" fill="url(#bodifyGradient)" opacity="0.7">
            <animate attributeName="width" values="3;4;3" dur="3s" repeatCount="indefinite" />
          </rect>
          
          {/* Muscle definition lines */}
          <path 
            d="M12 16 L14 16 M12 18 L14 18 M8 17 L9 17 M17 17 L18 17" 
            stroke="url(#bodifyGradient)" 
            strokeWidth="0.5" 
            opacity="0.9"
            strokeLinecap="round"
          >
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </path>
        </g>
      </g>
      
      {/* Energy pulse rings */}
      <circle cx="35" cy="35" r="25" fill="none" stroke="url(#bodifyGradient)" strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="25;28;25" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
      </circle>
      
      <circle cx="35" cy="35" r="35" fill="none" stroke="url(#bodifyGradient)" strokeWidth="1" opacity="0.2">
        <animate attributeName="r" values="35;39;35" dur="5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="5s" repeatCount="indefinite" />
      </circle>
      
      {/* Power energy dots */}
      <circle cx="52" cy="23" r="1.5" fill="url(#bodifyGradient)">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="18" cy="47" r="1.5" fill="url(#bodifyGradient)">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" begin="0.8s" />
      </circle>
      <circle cx="52" cy="47" r="1.5" fill="url(#bodifyGradient)">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" begin="1.6s" />
      </circle>
      <circle cx="18" cy="23" r="1.5" fill="url(#bodifyGradient)">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" begin="2.4s" />
      </circle>
    </g>
  );

  const Wordmark = () => (
    <g>
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
      {/* Underline accent */}
      <rect 
        x={variant === 'full' ? "85" : "0"} 
        y="48" 
        width="140" 
        height="2" 
        fill="url(#bodifyGradient)" 
        opacity="0.6"
      >
        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
      </rect>
    </g>
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
