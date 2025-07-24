
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EnhancedCard, CardContent } from './ui/enhanced-card';
import { AnimatedButton } from './ui/animated-button';
import { Meal } from '@/services/enhancedMealService';

interface SnackCardProps {
  snack: Meal;
  index: number;
  isCompleted: boolean;
  onMarkComplete: () => void;
}

export const SnackCard: React.FC<SnackCardProps> = ({
  snack,
  index,
  isCompleted,
  onMarkComplete
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        delay: 0.2 + index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }}
    >
      <EnhancedCard className="group">
        <div className="flex">
          <div 
            className="relative cursor-pointer group w-32 h-32 overflow-hidden" 
            onClick={() => navigate(`/meal/${snack.id}`)}
          >
            <motion.img 
              src={snack.image} 
              alt={snack.title} 
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
          </div>
          
          <CardContent className="flex-1 p-4">
            <div className="flex items-center justify-between mb-2">
              <motion.h4 
                className="font-semibold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {snack.title}
              </motion.h4>
              <AnimatedButton
                variant={isCompleted ? "default" : "outline"}
                size="sm"
                className={isCompleted
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "border-white/20 hover:bg-white/10"}
                onClick={onMarkComplete}
              >
                {isCompleted ? (
                  <>
                    <Check size={12} className="mr-1" />
                    Done
                  </>
                ) : (
                  'Mark'
                )}
              </AnimatedButton>
            </div>
            
            <motion.div 
              className="flex justify-between text-sm text-white/70"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="bg-bodify-orange/20 px-2 py-1 rounded-full text-xs">
                {snack.calories} cal
              </span>
              <span className="bg-bodify-purple/20 px-2 py-1 rounded-full text-xs">
                {snack.protein}g protein
              </span>
            </motion.div>
          </CardContent>
        </div>
      </EnhancedCard>
    </motion.div>
  );
};
