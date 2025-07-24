import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shuffle, Check, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EnhancedCard, CardContent } from './ui/enhanced-card';
import { AnimatedButton } from './ui/animated-button';
import { MealRecommendationEngine } from '@/services/mealRecommendationEngine';
import { AccurateNutritionTracker } from '@/services/accurateNutritionTracker';
import { generateMealImage, getFallbackImage } from '../services/imageService';
import { toast } from '@/hooks/use-toast';
import { Meal, MealType } from '@/services/enhancedMealService';

interface MealCardProps {
  meal: Meal;
  mealType: MealType;
  isCompleted: boolean;
  onMarkComplete: () => void;
  onMealUpdate?: (newMeal: Meal) => void;
  index?: number;
}

export const MealCard: React.FC<MealCardProps> = ({
  meal,
  mealType,
  isCompleted,
  onMarkComplete,
  onMealUpdate,
  index = 0
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log(`MealCard [${meal?.title || 'Loading'}]: Meal data updated, resetting state.`);
    setIsLoading(true);
    setImageError(false);
    if (meal?.image) {
      const imageUrl = generateMealImage(meal);
      console.log(`MealCard [${meal.title}]: Setting image URL: ${imageUrl}`);
      setCurrentImageUrl(imageUrl);
    } else {
      const fallback = getFallbackImage(mealType);
      console.warn(`MealCard [${meal?.title || 'Unknown'}]: No image URL in meal data, setting fallback: ${fallback}`);
      setCurrentImageUrl(fallback);
      setIsLoading(false);
      setImageError(true);
    }
    return () => {
      console.log(`MealCard [${meal?.title || 'Unknown'}]: Cleaning up image URL.`);
      setCurrentImageUrl(undefined);
    };
  }, [meal, mealType]);

  const handleGenerateNew = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
      const userPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
      const goal = userSettings.goal || 'weight_loss';
      
      console.log('Generating new meal with preferences:', userPrefs);
      
      const newMeal = MealRecommendationEngine.generateNewMealForType(
        mealType,
        goal as 'weight_loss' | 'muscle_gain',
        userPrefs,
        [meal.id]
      );
      
      if (newMeal && onMealUpdate) {
        onMealUpdate(newMeal as Meal);
        toast({
          title: "New meal generated! ✨",
          description: `Switched to "${newMeal.title}" with ${newMeal.calories} calories.`
        });
      } else {
        toast({
          title: "No alternatives found",
          description: "Try adjusting your preferences or dietary restrictions."
        });
      }
    } catch (error) {
      console.error('Error generating new meal:', error);
      toast({
        title: "Error generating meal",
        description: "Please try again in a moment."
      });
    }
  };

  const handleMarkComplete = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Call the parent's onMarkComplete to update the UI
    onMarkComplete();
    
    // Show toast message based on current state
    if (isCompleted) {
      toast({
        title: "Meal unmarked",
        description: `${meal.title} removed from completed meals.`
      });
    } else {
      toast({
        title: "Meal completed! 🎉",
        description: `${meal.title} added to your nutrition tracking.`
      });
    }
  };

  if (!meal) {
    return (
      <div className="animate-pulse">
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <div className="w-full h-48 bg-white/10 rounded mb-4"></div>
          <div className="h-4 bg-white/10 rounded mb-2"></div>
          <div className="h-3 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      <EnhancedCard 
        glowEffect={true}
        className="group relative overflow-hidden hover:shadow-2xl hover:shadow-bodify-orange/20 transition-all duration-300"
      >
        <div className="relative cursor-pointer" onClick={() => navigate(`/meal/${meal.id}`)}>
          <div className="relative overflow-hidden bg-bodify-dark/50 flex items-center justify-center h-48">
            {isLoading && (
               <div className="absolute inset-0 flex items-center justify-center bg-bodify-dark/50 z-10">
                 <Loader2 className="w-8 h-8 text-bodify-orange animate-spin" />
               </div>
             )}
            {currentImageUrl && (
              <motion.img 
                key={currentImageUrl}
                src={currentImageUrl} 
                alt={meal.title} 
                className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onLoad={() => {
                  console.log('MealCard [${meal.title}]: Image loaded successfully:', currentImageUrl);
                  setIsLoading(false);
                  setImageError(false);
                }}
                onError={() => {
                  console.log('MealCard [${meal.title}]: Image failed to load:', currentImageUrl, 'Attempting fallback...');
                  setImageError(true);
                  setCurrentImageUrl(getFallbackImage(mealType));
                  setIsLoading(false);
                }}
              />
            )}
            {imageError && !isLoading && getFallbackImage(mealType) && (
                <img 
                    src={getFallbackImage(mealType)} 
                    alt={`${meal.title} - Fallback Image`}
                    className="w-full h-full object-cover"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute top-3 right-3 flex space-x-2">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <AnimatedButton
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                  onClick={handleGenerateNew}
                >
                  <Shuffle size={14} className="mr-1" />
                  New
                </AnimatedButton>
              </motion.div>
            </div>
            
            <motion.div 
              className="absolute bottom-3 right-3"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight size={20} className="text-white/70 group-hover:text-white transition-colors" />
            </motion.div>
          </div>
        </div>
        
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <motion.h3 
              className="text-lg font-medium capitalize bg-gradient-to-r from-bodify-orange to-bodify-purple bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {mealType}
            </motion.h3>
            <AnimatedButton
              variant={isCompleted ? "default" : "outline"}
              size="sm"
              className={isCompleted
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "border-white/20 hover:bg-white/10 text-white"}
              onClick={handleMarkComplete}
              glowEffect={!isCompleted}
            >
              {isCompleted ? (
                <>
                  <Check size={14} className="mr-1" />
                  Eaten
                </>
              ) : (
                'Mark as Eaten'
              )}
            </AnimatedButton>
          </div>
          
          <motion.p 
            className="font-semibold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {meal.title}
          </motion.p>
          
          <motion.div 
            className="flex justify-between text-sm text-white/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="bg-bodify-orange/20 px-3 py-1 rounded-full border border-bodify-orange/30">
              {meal.calories} cal
            </span>
            <span className="bg-bodify-purple/20 px-3 py-1 rounded-full border border-bodify-purple/30">
              {meal.protein}g protein
            </span>
          </motion.div>
          
          <motion.div 
            className="flex justify-between text-xs text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="bg-white/10 px-2 py-1 rounded-full">Carbs: {meal.carbs}g</span>
            <span className="bg-white/10 px-2 py-1 rounded-full">Fat: {meal.fat}g</span>
          </motion.div>
        </CardContent>
      </EnhancedCard>
    </motion.div>
  );
};
