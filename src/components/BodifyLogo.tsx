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
      {/* Outer AI neural network ring */}
      <circle 
        cx="35" 
        cy="35" 
        r="30" 
        fill="none" 
        stroke="url(#bodifyGradient)" 
        strokeWidth="2"
        opacity="0.6"
        strokeDasharray="4 4"
      >
        <animateTransform 
          attributeName="transform" 
          type="rotate" 
          values="0 35 35;360 35 35" 
          dur="20s" 
          repeatCount="indefinite"
        />
      </circle>
      
      {/* AI Brain/Neural Network Center */}
      <g transform="translate(35, 35)">
        {/* Central AI core */}
        <circle cx="0" cy="0" r="8" fill="url(#bodifyGradient)" opacity="0.8">
          <animate attributeName="r" values="8;9;8" dur="3s" repeatCount="indefinite" />
        </circle>
        
        {/* Neural connections */}
        <g opacity="0.7">
          {/* Connection nodes */}
          <circle cx="-12" cy="-8" r="2.5" fill="url(#bodifyGradient)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="12" cy="-8" r="2.5" fill="url(#bodifyGradient)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle cx="-12" cy="8" r="2.5" fill="url(#bodifyGradient)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1s" />
          </circle>
          <circle cx="12" cy="8" r="2.5" fill="url(#bodifyGradient)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1.5s" />
          </circle>
          
          {/* Connecting lines */}
          <path d="M-8,-5 L-2,-2 M8,-5 L2,-2 M-8,5 L-2,2 M8,5 L2,2" 
                stroke="url(#bodifyGradient)" 
                strokeWidth="1.5" 
                strokeLinecap="round"
                opacity="0.6">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
          </path>
        </g>
        
        {/* Fitness tracking elements */}
        <g transform="translate(0, 0)">
          {/* Heart rate pulse */}
          <path d="M-3,-1 L-1,1 L1,-1 L3,1" 
                stroke="url(#bodifyGradient)" 
                strokeWidth="1.5" 
                fill="none" 
                strokeLinecap="round"
                opacity="0.8">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
          </path>
        </g>
      </g>
      
      {/* Progress tracking arcs */}
      <g opacity="0.6">
        <path d="M 15 35 A 20 20 0 0 1 35 15" 
              fill="none" 
              stroke="url(#bodifyGradient)" 
              strokeWidth="2" 
              strokeLinecap="round">
          <animate attributeName="stroke-dasharray" values="0 31.4;31.4 0;0 31.4" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M 35 55 A 20 20 0 0 1 55 35" 
              fill="none" 
              stroke="url(#bodifyGradient)" 
              strokeWidth="2" 
              strokeLinecap="round">
          <animate attributeName="stroke-dasharray" values="0 31.4;31.4 0;0 31.4" dur="4s" repeatCount="indefinite" begin="1s" />
        </path>
        <path d="M 55 35 A 20 20 0 0 1 35 55" 
              fill="none" 
              stroke="url(#bodifyGradient)" 
              strokeWidth="2" 
              strokeLinecap="round">
          <animate attributeName="stroke-dasharray" values="0 31.4;31.4 0;0 31.4" dur="4s" repeatCount="indefinite" begin="2s" />
        </path>
        <path d="M 35 15 A 20 20 0 0 1 15 35" 
              fill="none" 
              stroke="url(#bodifyGradient)" 
              strokeWidth="2" 
              strokeLinecap="round">
          <animate attributeName="stroke-dasharray" values="0 31.4;31.4 0;0 31.4" dur="4s" repeatCount="indefinite" begin="3s" />
        </path>
      </g>
      
      {/* Diet/Nutrition indicators */}
      <g opacity="0.5">
        <circle cx="20" cy="20" r="1.5" fill="url(#bodifyGradient)">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="20" r="1.5" fill="url(#bodifyGradient)">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="1s" />
        </circle>
        <circle cx="50" cy="50" r="1.5" fill="url(#bodifyGradient)">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="2s" />
        </circle>
        <circle cx="20" cy="50" r="1.5" fill="url(#bodifyGradient)">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="3s" />
        </circle>
      </g>
      
      {/* Data flow particles */}
      <g>
        <circle cx="25" cy="15" r="1" fill="url(#bodifyGradient)">
          <animateMotion dur="6s" repeatCount="indefinite" path="M0,0 Q10,10 20,0 Q10,-10 0,0" />
          <animate attributeName="opacity" values="0;1;0" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="45" cy="25" r="1" fill="url(#bodifyGradient)">
          <animateMotion dur="6s" repeatCount="indefinite" path="M0,0 Q-10,10 -20,0 Q-10,-10 0,0" begin="2s" />
          <animate attributeName="opacity" values="0;1;0" dur="6s" repeatCount="indefinite" begin="2s" />
        </circle>
        <circle cx="45" cy="45" r="1" fill="url(#bodifyGradient)">
          <animateMotion dur="6s" repeatCount="indefinite" path="M0,0 Q-10,-10 -20,0 Q-10,10 0,0" begin="4s" />
          <animate attributeName="opacity" values="0;1;0" dur="6s" repeatCount="indefinite" begin="4s" />
        </circle>
      </g>
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
        <animate attributeName="fill" values="url(#bodifyGradient);url(#bodifyGradientAlt);url(#bodifyGradient)" dur="4s" repeatCount="indefinite" />
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
        <animate attributeName="width" values="140;150;140" dur="4s" repeatCount="indefinite" />
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
        <linearGradient id="bodifyGradientAlt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--secondary))" />
          <stop offset="50%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>

      {(variant === 'full' || variant === 'circle') && <CircleMark />}
      {(variant === 'full' || variant === 'wordmark') && <Wordmark />}
    </svg>
  );
};

export default BodifyLogo;
