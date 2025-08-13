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
      
      {/* AI Brain/Neural Network Center with Fitness Elements */}
      <g transform="translate(35, 35)">
        {/* Central fitness muscle core */}
        <g>
          {/* Muscle/bicep shape */}
          <path
            d="M-6,-4 Q-8,-6 -4,-8 Q0,-9 4,-8 Q8,-6 6,-4 Q4,-2 0,-2 Q-4,-2 -6,-4 Z"
            fill="url(#bodifyGradient)"
            opacity="0.9"
          >
            <animateTransform 
              attributeName="transform" 
              type="scale" 
              values="1;1.1;1" 
              dur="2.5s" 
              repeatCount="indefinite"
            />
          </path>
          
          {/* Secondary muscle definition */}
          <path
            d="M-4,2 Q-6,4 -2,6 Q2,7 6,6 Q8,4 6,2 Q4,4 0,4 Q-4,4 -4,2 Z"
            fill="url(#bodifyGradient)"
            opacity="0.8"
          >
            <animateTransform 
              attributeName="transform" 
              type="scale" 
              values="1;1.05;1" 
              dur="2.5s" 
              repeatCount="indefinite"
              begin="0.5s"
            />
          </path>
        </g>
        
        {/* AI Neural network around fitness core */}
        <g opacity="0.7">
          {/* Connection nodes */}
          <circle cx="-12" cy="-8" r="2" fill="url(#bodifyGradient)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="12" cy="-8" r="2" fill="url(#bodifyGradient)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </circle>
          <circle cx="-12" cy="8" r="2" fill="url(#bodifyGradient)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1s" />
          </circle>
          <circle cx="12" cy="8" r="2" fill="url(#bodifyGradient)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1.5s" />
          </circle>
          
          {/* Connecting lines to fitness core */}
          <path d="M-10,-6 L-6,-4 M10,-6 L6,-4 M-10,6 L-6,4 M10,6 L6,4" 
                stroke="url(#bodifyGradient)" 
                strokeWidth="1.5" 
                strokeLinecap="round"
                opacity="0.6">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
          </path>
        </g>
        
        {/* Fitness progress indicator */}
        <g transform="translate(0, 10)">
          <rect x="-8" y="0" width="16" height="2" rx="1" fill="url(#bodifyGradient)" opacity="0.3" />
          <rect x="-8" y="0" width="12" height="2" rx="1" fill="url(#bodifyGradient)">
            <animate attributeName="width" values="4;16;4" dur="3s" repeatCount="indefinite" />
          </rect>
        </g>
        
        {/* Heart rate pulse */}
        <g transform="translate(0, -12)">
          <path d="M-6,0 L-4,-2 L-2,2 L0,-3 L2,3 L4,-2 L6,0" 
                stroke="url(#bodifyGradient)" 
                strokeWidth="1.5" 
                fill="none" 
                strokeLinecap="round"
                opacity="0.8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
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
