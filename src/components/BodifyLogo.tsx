import React from 'react';

interface LogoProps {
  className?: string;
  alt?: string;
  variant?: 'full' | 'icon' | 'wordmark';
}

// Bodify Logo: AI fitness brand with neural network + body icon
const BodifyLogo: React.FC<LogoProps> = ({ 
  className = "h-8 w-auto", 
  alt = "Bodify - AI Fitness Platform",
  variant = 'full'
}) => {
  const IconMark = () => (
    <g>
      {/* AI Neural Network Body Icon */}
      <circle cx="40" cy="25" r="3" fill="url(#bodifyGradient)" />
      <circle cx="40" cy="45" r="3" fill="url(#bodifyGradient)" />
      <circle cx="40" cy="65" r="3" fill="url(#bodifyGradient)" />
      
      {/* Neural connections */}
      <path d="M43 25 L57 35" stroke="url(#bodifyGradient)" strokeWidth="2" opacity="0.7" />
      <path d="M43 45 L57 35" stroke="url(#bodifyGradient)" strokeWidth="2" opacity="0.7" />
      <path d="M43 45 L57 55" stroke="url(#bodifyGradient)" strokeWidth="2" opacity="0.7" />
      <path d="M43 65 L57 55" stroke="url(#bodifyGradient)" strokeWidth="2" opacity="0.7" />
      
      {/* Body silhouette made of nodes */}
      <circle cx="60" cy="35" r="4" fill="url(#bodifyGradient)" />
      <circle cx="60" cy="55" r="4" fill="url(#bodifyGradient)" />
      
      {/* Final connections to output */}
      <path d="M64 35 L75 45" stroke="url(#bodifyGradient)" strokeWidth="2" opacity="0.7" />
      <path d="M64 55 L75 45" stroke="url(#bodifyGradient)" strokeWidth="2" opacity="0.7" />
      
      {/* Final node representing optimized body */}
      <circle cx="78" cy="45" r="5" fill="url(#bodifyGradient)" />
      
      {/* Pulse effect */}
      <circle cx="78" cy="45" r="8" fill="none" stroke="url(#bodifyGradient)" strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="5;12;5" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
    </g>
  );

  const Wordmark = () => (
    <text
      x={variant === 'full' ? "100" : "0"}
      y="60"
      fontSize="48"
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
      viewBox={variant === 'icon' ? "0 0 120 90" : variant === 'wordmark' ? "0 0 240 80" : "0 0 340 90"}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <title>{alt}</title>
      <defs>
        <linearGradient id="bodifyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
