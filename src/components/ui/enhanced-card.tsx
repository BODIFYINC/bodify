
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './card';

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  onClick?: () => void;
  premium?: boolean;
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glowEffect = false,
  onClick,
  premium = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverEffect ? { 
        scale: 1.03, 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      } : {}}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Card className={`
        ${premium ? 'card-premium' : 'glassmorphism'} 
        border-0 overflow-hidden 
        ${glowEffect ? 'glow-premium' : ''} 
        ${hoverEffect ? 'hover:shadow-glow-hover' : ''}
        transition-all duration-500 ease-out
      `}>
        {children}
      </Card>
    </motion.div>
  );
};

export { Card };
