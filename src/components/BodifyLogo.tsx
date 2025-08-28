import React from 'react';
import { motion } from 'framer-motion';
import bodifyLogo from '@/assets/bodify-logo-clean.png';

interface LogoProps {
  className?: string;
  alt?: string;
  variant?: 'full' | 'circle' | 'wordmark';
}

const BodifyLogo: React.FC<LogoProps> = ({ 
  className = "h-8 w-auto", 
  alt = "Bodify - AI Fitness Platform",
  variant = 'full'
}) => {
  return (
    <motion.img
      src={bodifyLogo}
      alt={alt}
      className={`${className} transition-all duration-500 filter drop-shadow-[0_10px_30px_hsl(var(--primary)/0.35)] saturate-125`}
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{
        opacity: 1,
        y: [0, -4, 0],
        scale: [1, 1.02, 1],
        filter: [
          'drop-shadow(0 8px 24px hsl(var(--primary) / 0.35))',
          'drop-shadow(0 12px 32px hsl(var(--secondary) / 0.4))',
          'drop-shadow(0 8px 24px hsl(var(--primary) / 0.35))'
        ]
      }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.06 }}
    />
  );
};

export default BodifyLogo;