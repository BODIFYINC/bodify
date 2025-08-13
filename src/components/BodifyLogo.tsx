import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  alt?: string;
  variant?: 'full' | 'icon' | 'wordmark';
}

// Bodify Logo: Body transformation through AI
const BodifyLogo: React.FC<LogoProps> = ({ 
  className = "h-8 w-auto", 
  alt = "Bodify - Transform Your Body",
  variant = 'full'
}) => {
  const IconMark = () => (
    <g>
      {/* Human silhouette transforming - "before" body */}
      <path 
        d="M15 25 Q15 20 20 20 Q25 20 25 25 L25 35 Q25 45 20 50 L15 50 Q10 45 10 35 Z" 
        fill="hsl(var(--muted-foreground))" 
        opacity="0.4"
      />
      
      {/* Transformation arrow/energy */}
      <motion.path 
        d="M30 35 L45 35" 
        stroke="url(#bodifyGradient)" 
        strokeWidth="3" 
        strokeLinecap="round"
        animate={{
          strokeDasharray: ["0,20", "10,10", "20,0"],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <polygon 
        points="43,30 50,35 43,40" 
        fill="url(#bodifyGradient)"
      />
      
      {/* "After" body - stronger, more defined */}
      <path 
        d="M55 22 Q55 18 60 18 Q65 18 65 22 L67 32 Q67 38 65 42 L67 48 Q65 52 60 52 Q55 52 53 48 L55 42 Q53 38 53 32 Z" 
        fill="url(#bodifyGradient)"
      />
      
      {/* AI enhancement particles */}
      <circle cx="35" cy="30" r="1.5" fill="url(#bodifyGradient)">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0s"/>
      </circle>
      <circle cx="40" cy="40" r="1.5" fill="url(#bodifyGradient)">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="0.5s"/>
      </circle>
      <circle cx="35" cy="40" r="1.5" fill="url(#bodifyGradient)">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin="1s"/>
      </circle>
    </g>
  );

  const Wordmark = () => (
    <g>
      <text
        x={variant === 'full' ? "85" : "0"}
        y="45"
        fontSize="36"
        fontWeight="800"
        letterSpacing="-0.5"
        fill="url(#bodifyGradient)"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        BOD
      </text>
      <text
        x={variant === 'full' ? "155" : "70"}
        y="45"
        fontSize="36"
        fontWeight="300"
        letterSpacing="-0.5"
        fill="url(#bodifyGradient)"
        fontFamily="system-ui, -apple-system, sans-serif"
        style={{ fontStyle: 'italic' }}
      >
        IFY
      </text>
      {/* Subtle underline suggesting transformation */}
      <motion.line
        x1={variant === 'full' ? "85" : "0"}
        y1="52"
        x2={variant === 'full' ? "205" : "120"}
        y2="52"
        stroke="url(#bodifyGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        animate={{
          x2: [
            variant === 'full' ? "85" : "0",
            variant === 'full' ? "205" : "120",
            variant === 'full' ? "85" : "0"
          ]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </g>
  );

  return (
    <svg
      role="img"
      aria-label={alt}
      className={className}
      viewBox={variant === 'icon' ? "0 0 80 70" : variant === 'wordmark' ? "0 0 220 60" : "0 0 220 70"}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <title>{alt}</title>
      <defs>
        <linearGradient id="bodifyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="50%" stopColor="hsl(var(--accent))" />
          <stop offset="100%" stopColor="hsl(var(--primary))" />
        </linearGradient>
      </defs>

      {(variant === 'full' || variant === 'icon') && <IconMark />}
      {(variant === 'full' || variant === 'wordmark') && <Wordmark />}
    </svg>
  );
};

export default BodifyLogo;
