import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Utensils, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AnimatedButton } from './ui/animated-button';
import { Badge } from './ui/badge';
import { toast } from '@/hooks/use-toast';
import { MealRecommendationEngine, type UserPreferences, type RecommendationContext } from '@/services/mealRecommendationEngine';
import { Meal } from '@/services/enhancedMealService';
import { generateMealImage, getFallbackImage } from '../services/imageService';

interface SmartMealSuggestionsProps {
  onMealSelected?: (meal: Meal) => void;
  currentMealPlan?: any;
}

export const SmartMealSuggestions: React.FC<SmartMealSuggestionsProps> = ({
  onMealSelected,
  currentMealPlan
}) => {
  const [recommendations, setRecommendations] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('lunch');

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      // Get user preferences with fallbacks
      const userPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
      const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
      
      const preferences: UserPreferences = {
        cuisineTypes: userPrefs.cuisineTypes || ['american'],
        allergens: userPrefs.allergies || [],
        dislikes: userPrefs.dislikedFoods || [],
        favorites: userPrefs.favoriteIngredients || [],
        dietaryRestrictions: userPrefs.dietaryRestrictions || [],
        cookingTime: userPrefs.cookingTime || 'moderate',
        skillLevel: userPrefs.skillLevel || 'intermediate'
      };

      // Calculate realistic remaining nutrition needs
      const weight = userSettings.weight || 70;
      const goal = userSettings.goal || 'weight_loss';
      
      // Realistic daily targets
      const targetCalories = goal === 'weight_loss' ? 1600 : 2200;
      const targetProtein = Math.min(weight * 1.6, 120); // Reasonable protein
      
      let remainingCalories = targetCalories;
      let remainingProtein = targetProtein;
      
      if (currentMealPlan) {
        const consumedCalories = (currentMealPlan.breakfast?.calories || 0) +
                               (currentMealPlan.lunch?.calories || 0) +
                               (currentMealPlan.dinner?.calories || 0) +
                               (currentMealPlan.snacks?.reduce((sum: number, snack: any) => sum + snack.calories, 0) || 0);
        
        const consumedProtein = (currentMealPlan.breakfast?.protein || 0) +
                              (currentMealPlan.lunch?.protein || 0) +
                              (currentMealPlan.dinner?.protein || 0) +
                              (currentMealPlan.snacks?.reduce((sum: number, snack: any) => sum + snack.protein, 0) || 0);
        
        remainingCalories = Math.max(0, targetCalories - consumedCalories);
        remainingProtein = Math.max(0, targetProtein - consumedProtein);
      }

      // Realistic meal targets
      const mealCalories = {
        breakfast: 300,
        lunch: 400,
        dinner: 450,
        snacks: 150
      };

      const context: RecommendationContext = {
        timeOfDay: getTimeOfDay(),
        remainingCalories: mealCalories[selectedCategory],
        remainingProtein: targetProtein * 0.25,
        lastMeals: getRecentMeals(),
        weatherCondition: 'mild',
        mood: 'energetic'
      };

      const suggestedMeals = MealRecommendationEngine.getPersonalizedRecommendations(
        preferences,
        context,
        goal as 'weight_loss' | 'muscle_gain'
      );

      // Ensure each meal has the required properties for image generation
      const enhancedMeals = suggestedMeals.map(meal => ({
        ...meal,
        name: meal.title, // Add name property
        type: selectedCategory, // Add type property
        image: undefined // Clear any existing image to force regeneration
      }));

      setRecommendations(enhancedMeals);
      
      toast({
        title: "Smart recommendations generated! 🧠",
        description: `Found ${suggestedMeals.length} personalized meal suggestions for you.`
      });
    } catch (error) {
      console.error('Error generating recommendations:', error);
      toast({
        title: "Error generating recommendations",
        description: "Please try again in a moment."
      });
    } finally {
      setLoading(false);
    }
  };

  const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  const getRecentMeals = (): Meal[] => {
    // This would typically come from a meal history service
    return [];
  };

  const handleMealSelect = (meal: Meal) => {
    if (onMealSelected) {
      onMealSelected(meal);
    }
    toast({
      title: "Meal selected! 🍽️",
      description: `${meal.title} has been added to your plan.`
    });
  };

  useEffect(() => {
    generateRecommendations();
  }, [selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'breakfast': return '🌅';
      case 'lunch': return '☀️';
      case 'dinner': return '🌙';
      case 'snacks': return '🍎';
      default: return '🍽️';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-bodify-orange to-bodify-purple bg-clip-text text-transparent">
          AI-Powered Meal Suggestions
        </h3>
        <p className="text-white/70">
          Personalized recommendations with realistic nutrition
        </p>
      </motion.div>

      {/* Category Selection */}
      <div className="flex flex-wrap gap-2 justify-center">
        {(['breakfast', 'lunch', 'dinner', 'snacks'] as const).map((category) => (
          <AnimatedButton
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? 
              "bg-gradient-to-r from-[#4f8cff] to-[#a259ff] text-white" : 
              "border-[#4f8cff] hover:bg-[#232946] text-white"
            }
          >
            <span className="mr-2">{getCategoryIcon(category)}</span>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </AnimatedButton>
        ))}
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <AnimatedButton
          onClick={generateRecommendations}
          loading={loading}
          className="bg-bodify-gradient hover:opacity-90"
          glowEffect={true}
        >
          <Sparkles className="mr-2" size={20} />
          Generate Smart Suggestions
        </AnimatedButton>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h4 className="text-lg font-semibold text-white text-center">
            Recommended for you
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.slice(0, 6).map((meal, index) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glassmorphism border-0 group hover:scale-105 transition-transform duration-300">
                  <div className="relative">
                    <img 
                      src={generateMealImage(meal)}
                      alt={meal.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                      onError={(e) => {
                        e.currentTarget.src = getFallbackImage(meal.type || 'lunch');
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-t-lg" />
                    
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-bodify-orange/90 text-white">
                        {meal.calories} cal
                      </Badge>
                    </div>
                    
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-bodify-purple/90 text-white">
                        {meal.protein}g protein
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h5 className="font-semibold text-white mb-2 line-clamp-1">
                      {meal.title}
                    </h5>
                    
                    <div className="flex items-center justify-between text-sm text-white/70 mb-3">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{Math.round(meal.instructions.length * 3)} min</span>
                      </div>
                      <div className="flex items-center">
                        <Utensils className="w-3 h-3 mr-1" />
                        <span>{meal.ingredients.length} ingredients</span>
                      </div>
                    </div>
                    
                    <AnimatedButton
                      onClick={() => handleMealSelect(meal)}
                      size="sm"
                      className="w-full bg-bodify-gradient hover:opacity-90"
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Select This Meal
                    </AnimatedButton>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
