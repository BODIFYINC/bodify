import React from 'react';

interface LogoProps {
  className?: string;
  alt?: string;
}

// Bodify Logo: AI fitness brand mark + wordmark, fully themable via CSS variables
// Uses gradient tied to design tokens: --primary and --accent
const BodifyLogo: React.FC<LogoProps> = ({ className = "h-8 w-auto", alt = "Bodify logo" }) => {
  return (
    <svg
      role="img"
      aria-label={alt}
      className={className}
      viewBox="0 0 640 160"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <title>{alt}</title>
      <defs>
        <linearGradient id="bodifyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
        <linearGradient id="bodifyStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Icon mark (dynamic "B" + pulse) */}
      <g transform="translate(12,12)">
        <rect x="0" y="0" rx="20" ry="20" width="136" height="136" fill="url(#bodifyGradient)" opacity="0.12" />
        {/* Outer ring */}
        <circle cx="68" cy="68" r="58" fill="none" stroke="url(#bodifyStroke)" strokeWidth="6" opacity="0.75" />
        {/* Inner pulse line */}
        <path
          d="M18 68 H40 L50 48 L62 88 L74 60 L86 68 H118"
          fill="none"
          stroke="url(#bodifyStroke)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#softGlow)"
        />
        {/* Stylized B */}
        <path
          d="M44 36 V100 H72 C90 100 98 92 98 82 C98 74 94 68 86 66 C94 64 98 58 98 50 C98 40 90 36 74 36 H44 Z"
          fill="none"
          stroke="url(#bodifyStroke)"
          strokeWidth="8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>

      {/* Wordmark */}
      <g transform="translate(176,28)">
        <text
          x="0"
          y="92"
          fontSize="88"
          fontWeight="700"
          letterSpacing="-1.5"
          fill="url(#bodifyGradient)"
        >
          Bodify
        </text>
        {/* Subline descriptor for accessibility/branding context (not always visible) */}
        <text x="2" y="120" fontSize="18" fill="hsl(var(--foreground) / 0.6)">
          AI Fitness • Coaching • Nutrition
        </text>
      </g>
    </svg>
  );
};

export default BodifyLogo;
