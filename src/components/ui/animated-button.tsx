
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { Loader } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'lg' | 'default';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  glowEffect?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant = 'default',
  size = 'default',
  className = '',
  disabled = false,
  loading = false,
  glowEffect = false
}) => {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        onClick={onClick}
        variant={variant}
        size={size}
        disabled={disabled || loading}
        className={`relative overflow-hidden transition-all duration-300 ${
          glowEffect && !disabled 
            ? 'shadow-lg hover:shadow-2xl hover:shadow-bodify-orange/30' 
            : ''
        } ${className}`}
      >
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20"
          >
            <Loader className="animate-spin" size={16} />
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: loading ? 0.5 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </Button>
    </motion.div>
  );
};
