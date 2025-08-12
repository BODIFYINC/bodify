import React from 'react';
import bodifyLogo from '@/assets/bodify-logo-primary.webp';

interface LogoProps {
  className?: string;
  alt?: string;
}

const BodifyLogo: React.FC<LogoProps> = ({ className = "h-8 w-auto", alt = "Bodify logo" }) => {
  return (
    <img
      src={bodifyLogo}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
};

export default BodifyLogo;
