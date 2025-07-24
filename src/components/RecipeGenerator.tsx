import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, Clock, Users, Flame, Shuffle, Star, Loader2, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedButton } from './ui/animated-button';
import { Badge } from './ui/badge';
import { toast } from './ui/use-toast';
import { generateMealImage, getFallbackImage } from '../services/imageService';
import { Meal } from '../services/enhancedMealService';
import { getAllRealisticMeals } from '../services/realMealDatabase';

interface Recipe extends Omit<Meal, 'id' | 'difficulty'> {
  id: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export const RecipeGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [generatingRecipe, setGeneratingRecipe] = useState(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [allMeals, setAllMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const meals = getAllRealisticMeals();
    setAllMeals(meals);
  }, []);

  const generateRandomRecipe = () => {
    setGeneratingRecipe(true);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * allMeals.length);
      const selectedMeal = allMeals[randomIndex];
      
      // Convert Meal to Recipe format
      const recipe: Recipe = {
        ...selectedMeal,
        id: selectedMeal.id,
        prepTime: 15,
        cookTime: 30,
        servings: 2,
        difficulty: 'medium',
        tags: ['high-protein', 'healthy']
      };
      
      setCurrentRecipe(recipe);
      setGeneratingRecipe(false);
      
      toast({
        title: "New Recipe Generated! 👨‍🍳",
        description: `Try this delicious ${recipe.title}!`
      });
    }, 1000);
  };

  const toggleFavorite = (recipeId: string) => {
    setFavorites(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
    
    toast({
      title: favorites.includes(recipeId) ? "Removed from favorites" : "Added to favorites! ⭐",
      description: favorites.includes(recipeId) ? "" : "You can find this recipe in your favorites list."
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Update image and reset loading/error states when recipe changes
  useEffect(() => {
    setIsLoading(true);
    setImageError(false);
    setCurrentImage(generateMealImage(currentRecipe as any));
  }, [currentRecipe]);

  const handleMealClick = (meal: Recipe) => {
    navigate(`/meal/${meal.id}`);
  };

  const handleBack = () => {
    setShowDetails(false);
  };

  if (showDetails && currentRecipe) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-bodify-dark border-bodify-purple">
        <CardHeader className="border-b border-bodify-purple/20">
          <div className="flex items-center justify-between">
            <AnimatedButton
              onClick={handleBack}
              variant="ghost"
              className="text-white hover:text-bodify-orange"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to Recipes
            </AnimatedButton>
            <CardTitle className="text-2xl font-bold text-white">{currentRecipe.title}</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Recipe Image */}
          <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden bg-bodify-dark/50">
            <img
              src={currentRecipe.image}
              alt={currentRecipe.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Macros and Nutrition */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-bodify-dark/50 p-4 rounded-lg">
              <h3 className="text-bodify-orange font-semibold mb-2">Calories</h3>
              <p className="text-2xl font-bold text-white">{currentRecipe.calories}</p>
            </div>
            <div className="bg-bodify-dark/50 p-4 rounded-lg">
              <h3 className="text-bodify-purple font-semibold mb-2">Protein</h3>
              <p className="text-2xl font-bold text-white">{currentRecipe.protein}g</p>
            </div>
            <div className="bg-bodify-dark/50 p-4 rounded-lg">
              <h3 className="text-green-400 font-semibold mb-2">Carbs</h3>
              <p className="text-2xl font-bold text-white">{currentRecipe.carbs}g</p>
            </div>
            <div className="bg-bodify-dark/50 p-4 rounded-lg">
              <h3 className="text-red-400 font-semibold mb-2">Fat</h3>
              <p className="text-2xl font-bold text-white">{currentRecipe.fat}g</p>
            </div>
          </div>

          {/* Recipe Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-bodify-orange">Ingredients</h4>
              <ul className="space-y-2">
                {currentRecipe.ingredients.map((ingredient, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-3 p-2 rounded-lg bg-white/5"
                  >
                    <div className="w-2 h-2 bg-bodify-purple rounded-full" />
                    <span className="text-sm text-white">{ingredient}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3 text-bodify-purple">Instructions</h4>
              <ol className="space-y-3">
                {currentRecipe.instructions.map((instruction, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex space-x-3 p-3 rounded-lg bg-white/5"
                  >
                    <div className="w-6 h-6 bg-bodify-gradient rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm text-white">{instruction}</span>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>

          {/* Additional Nutrition Info */}
          {currentRecipe.micros && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-3 text-bodify-orange">Additional Nutrition</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(currentRecipe.micros).map(([key, value]) => (
                  <div key={key} className="bg-bodify-dark/50 p-3 rounded-lg">
                    <h5 className="text-sm font-medium text-white/70 capitalize">{key}</h5>
                    <p className="text-lg font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-bodify-dark border-bodify-purple">
      <CardHeader className="border-b border-bodify-purple/20">
        <CardTitle className="text-2xl font-bold text-white">Recipe Generator</CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Recipe Image */}
        <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden bg-bodify-dark/50 flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-bodify-dark/50 z-10">
              <Loader2 className="w-8 h-8 text-bodify-orange animate-spin" />
            </div>
          )}
          <img
            src={imageError ? getFallbackImage(currentRecipe?.type || 'lunch') : currentImage}
            alt={currentRecipe?.title || 'Recipe'}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setImageError(true);
              setCurrentImage(getFallbackImage(currentRecipe?.type || 'lunch'));
              setIsLoading(false);
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-bodify-orange to-bodify-purple bg-clip-text text-transparent">
            AI Recipe Generator 👨‍🍳
          </h2>
          <p className="text-white/70 text-lg">
            Discover personalized recipes based on your goals and preferences
          </p>
        </motion.div>

        <div className="flex justify-center">
          <AnimatedButton
            onClick={generateRandomRecipe}
            loading={generatingRecipe}
            className="bg-bodify-gradient hover:opacity-90 px-8 py-3"
            glowEffect={true}
          >
            <Shuffle className="mr-2" size={20} />
            Generate New Recipe
          </AnimatedButton>
        </div>

        <motion.div
          key={currentRecipe?.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glassmorphism border-0 overflow-hidden">
            <div className="relative">
              <img 
                src={currentRecipe?.image} 
                alt={currentRecipe?.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              <div className="absolute top-4 right-4 flex space-x-2">
                <AnimatedButton
                  onClick={() => toggleFavorite(currentRecipe?.id || '')}
                  variant="outline"
                  size="sm"
                  className={`backdrop-blur-sm ${
                    favorites.includes(currentRecipe?.id || '') 
                      ? 'bg-bodify-orange text-white border-bodify-orange' 
                      : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                  }`}
                >
                  <Star size={16} className={favorites.includes(currentRecipe?.id || '') ? 'fill-current' : ''} />
                </AnimatedButton>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold text-white mb-2">{currentRecipe?.title}</h3>
                <p className="text-white/90">{currentRecipe?.type}</p>
              </div>
            </div>

            <CardContent className="p-6">
              {/* Recipe Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-bodify-orange" />
                  <div>
                    <p className="text-sm text-white/70">Prep Time</p>
                    <p className="font-medium">{currentRecipe?.prepTime}m</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <ChefHat className="w-5 h-5 text-bodify-purple" />
                  <div>
                    <p className="text-sm text-white/70">Cook Time</p>
                    <p className="font-medium">{currentRecipe?.cookTime}m</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm text-white/70">Servings</p>
                    <p className="font-medium">{currentRecipe?.servings}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-sm text-white/70">Calories</p>
                    <p className="font-medium">{currentRecipe?.calories}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center text-xs font-bold">P</div>
                  <div>
                    <p className="text-sm text-white/70">Protein</p>
                    <p className="font-medium">{currentRecipe?.protein}g</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className={getDifficultyColor(currentRecipe?.difficulty || 'easy')}>
                  {currentRecipe?.difficulty}
                </Badge>
                {currentRecipe?.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-white/20">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* View Details Button */}
              <div className="flex justify-center">
                <AnimatedButton
                  onClick={() => handleMealClick(currentRecipe as Recipe)}
                  className="bg-bodify-gradient hover:opacity-90 px-8 py-3"
                >
                  View Details
                </AnimatedButton>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </CardContent>
    </Card>
  );
};
