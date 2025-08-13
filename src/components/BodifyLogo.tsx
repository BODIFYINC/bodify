import React from 'react';
import bodifyLogoRefined from '@/assets/bodify-logo-refined.png';

interface LogoProps {
  className?: string;
  alt?: string;
}

// Bodify Logo: Premium AI fitness brand
const BodifyLogo: React.FC<LogoProps> = ({ className = "h-8 w-auto", alt = "Bodify - AI Fitness Platform" }) => {
  return (
    <img
      src={bodifyLogoRefined}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
};

export default BodifyLogo;
