
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './card';

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  onClick?: () => void;
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glowEffect = false,
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hoverEffect ? { 
        scale: 1.02, 
        y: -5,
        boxShadow: glowEffect 
          ? '0 20px 40px rgba(156, 77, 204, 0.3), 0 0 20px rgba(247, 156, 66, 0.2)'
          : '0 20px 40px rgba(0, 0, 0, 0.3)'
      } : {}}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Card className={`glassmorphism border-0 overflow-hidden backdrop-blur-lg ${
        glowEffect ? 'border border-white/20 shadow-2xl' : ''
      }`}>
        {children}
      </Card>
    </motion.div>
  );
};

export { CardContent };
