import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './card';

interface EnhancedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  onClick?: () => void;
  premium?: boolean;
  variant?: 'default' | 'meal' | 'nutrition' | 'glass';
  animation?: 'slide' | 'scale' | 'fade' | 'none';
  delay?: number;
}

export const EnhancedCard: React.FC<EnhancedCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glowEffect = false,
  onClick,
  premium = true,
  variant = 'default',
  animation = 'scale',
  delay = 0
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'meal':
        return 'meal-card-premium';
      case 'nutrition':
        return 'nutrition-card-premium';
      case 'glass':
        return 'glassmorphism';
      default:
        return premium ? 'card-premium' : 'glassmorphism';
    }
  };

  const getAnimationProps = () => {
    switch (animation) {
      case 'slide':
        return {
          initial: { opacity: 0, x: -30 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6, delay }
        };
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.8, delay }
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5, delay }
        };
      case 'none':
        return {};
      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay }
        };
    }
  };

  const getHoverProps = () => {
    if (!hoverEffect) return {};
    
    return {
      whileHover: { 
        scale: 1.02, 
        y: -4,
        transition: { duration: 0.3 }
      },
      whileTap: { scale: 0.98 }
    };
  };

  return (
    <motion.div
      {...getAnimationProps()}
      {...getHoverProps()}
      className={`cursor-pointer ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <Card className={`
        ${getVariantClasses()}
        border-0 overflow-hidden 
        ${glowEffect ? 'pulse-glow' : ''} 
        transition-all duration-500 ease-out
        ${className}
      `}>
        {children}
      </Card>
    </motion.div>
  );
};

export { Card, CardContent };

// Additional card variants for specific use cases
export const MealCard: React.FC<Omit<EnhancedCardProps, 'variant'>> = (props) => (
  <EnhancedCard {...props} variant="meal" />
);

export const NutritionCard: React.FC<Omit<EnhancedCardProps, 'variant'>> = (props) => (
  <EnhancedCard {...props} variant="nutrition" />
);

export const GlassCard: React.FC<Omit<EnhancedCardProps, 'variant'>> = (props) => (
  <EnhancedCard {...props} variant="glass" />
);