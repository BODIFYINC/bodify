import React from 'react';
import { motion } from 'framer-motion';
import bodifyLogo from '@/assets/bodify-logo-static.png';

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
      className={`${className} transition-all duration-300 filter drop-shadow-lg bg-transparent`}
      whileHover={{
        scale: 1.05,
        filter: "drop-shadow(0 10px 30px hsl(var(--primary) / 0.5)) brightness(1.1)",
        transition: { duration: 0.3 }
      }}
      animate={{
        filter: [
          "drop-shadow(0 5px 15px hsl(var(--primary) / 0.3))",
          "drop-shadow(0 8px 25px hsl(var(--secondary) / 0.4))",
          "drop-shadow(0 5px 15px hsl(var(--primary) / 0.3))"
        ]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

export default BodifyLogo;