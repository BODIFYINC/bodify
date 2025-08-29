import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Clock, Users, ChefHat, Star, Eye, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllRealisticMeals } from '@/services/realMealDatabase';
import { generateMealImage, getFallbackImage } from '@/services/imageService';
import { Meal } from '@/services/enhancedMealService';

interface RecipeFilters {
  category: string;
  maxCalories: number;
  minProtein: number;
  cookingTime: string;
  difficulty: string;
}

export const RecipesTab: React.FC = () => {
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Meal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Meal | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<RecipeFilters>({
    category: 'all',
    maxCalories: 2000,
    minProtein: 0,
    cookingTime: 'all',
    difficulty: 'all'
  });

  useEffect(() => {
    loadRecipes();
    loadFavorites();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, filters, recipes]);

  const loadRecipes = () => {
    const allMeals = getAllRealisticMeals();
    setRecipes(allMeals);
  };

  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavorites(new Set(savedFavorites));
  };

  const toggleFavorite = (recipeId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(recipeId)) {
      newFavorites.delete(recipeId);
    } else {
      newFavorites.add(recipeId);
    }
    setFavorites(newFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...newFavorites]));
  };

  const filterRecipes = () => {
    let filtered = recipes;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(recipe => recipe.type === filters.category);
    }

    // Calorie filter
    filtered = filtered.filter(recipe => recipe.calories <= filters.maxCalories);

    // Protein filter
    filtered = filtered.filter(recipe => recipe.protein >= filters.minProtein);

    // Cooking time filter
    if (filters.cookingTime !== 'all') {
      const timeLimit = parseInt(filters.cookingTime);
      filtered = filtered.filter(recipe => recipe.instructions.length * 3 <= timeLimit);
    }

    setFilteredRecipes(filtered);
  };

  const getCookingTime = (recipe: Meal) => {
    return recipe.instructions.length * 3; // Rough estimate: 3 min per instruction
  };

  const getDifficulty = (recipe: Meal) => {
    const ingredientCount = recipe.ingredients.length;
    const instructionCount = recipe.instructions.length;
    
    if (ingredientCount <= 5 && instructionCount <= 4) return 'Easy';
    if (ingredientCount <= 10 && instructionCount <= 8) return 'Medium';
    return 'Hard';
  };

  const getServings = (recipe: Meal) => {
    // Estimate servings based on calories
    if (recipe.calories < 300) return 1;
    if (recipe.calories < 600) return 2;
    if (recipe.calories < 900) return 3;
    return 4;
  };

  const categories = ['all', 'breakfast', 'lunch', 'dinner', 'snacks', 'dessert'];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
          Recipe Library
        </h2>
        <p className="text-white/70">Discover 700+ healthy recipes with full instructions</p>
      </motion.div>

      {/* Search and Filters */}
      <Card className="glassmorphism-card border border-white/10">
        <CardContent className="p-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <Input
              placeholder="Search recipes or ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Select
              value={filters.category}
              onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.maxCalories.toString()}
              onValueChange={(value) => setFilters(prev => ({ ...prev, maxCalories: parseInt(value) }))}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Max Calories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="300">Under 300 cal</SelectItem>
                <SelectItem value="500">Under 500 cal</SelectItem>
                <SelectItem value="700">Under 700 cal</SelectItem>
                <SelectItem value="2000">Any calories</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.minProtein.toString()}
              onValueChange={(value) => setFilters(prev => ({ ...prev, minProtein: parseInt(value) }))}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Min Protein" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any protein</SelectItem>
                <SelectItem value="15">15g+ protein</SelectItem>
                <SelectItem value="25">25g+ protein</SelectItem>
                <SelectItem value="35">35g+ protein</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.cookingTime}
              onValueChange={(value) => setFilters(prev => ({ ...prev, cookingTime: value }))}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Cooking Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any time</SelectItem>
                <SelectItem value="15">Under 15 min</SelectItem>
                <SelectItem value="30">Under 30 min</SelectItem>
                <SelectItem value="60">Under 1 hour</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center justify-center">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                {filteredRecipes.length} recipes found
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glassmorphism-card border border-white/10 group hover-scale overflow-hidden">
                <div className="relative">
                  <img 
                    src={generateMealImage(recipe)}
                    alt={recipe.title}
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = getFallbackImage(recipe.type || 'lunch');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Favorite Button */}
                  <AnimatedButton
                    size="sm"
                    variant="outline"
                    onClick={() => toggleFavorite(recipe.id)}
                    className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 border-white/30"
                  >
                    <Heart 
                      className={`w-4 h-4 ${favorites.has(recipe.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                    />
                  </AnimatedButton>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 space-y-1">
                    <Badge className="bg-emerald-500/90 text-white text-xs">
                      {recipe.calories} cal
                    </Badge>
                    <Badge className="bg-blue-500/90 text-white text-xs">
                      {recipe.protein}g protein
                    </Badge>
                  </div>

                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                      {recipe.title}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  {/* Recipe Stats */}
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{getCookingTime(recipe)} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{getServings(recipe)} servings</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ChefHat className="w-3 h-3" />
                      <span>{getDifficulty(recipe)}</span>
                    </div>
                  </div>

                  {/* Macros */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <p className="font-semibold text-red-400">{recipe.protein}g</p>
                      <p className="text-white/60">Protein</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-400">{recipe.carbs}g</p>
                      <p className="text-white/60">Carbs</p>
                    </div>
                    <div>
                      <p className="font-semibold text-yellow-400">{recipe.fat}g</p>
                      <p className="text-white/60">Fat</p>
                    </div>
                  </div>

                  {/* View Recipe Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <AnimatedButton
                        size="sm"
                        className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
                        onClick={() => setSelectedRecipe(recipe)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View Recipe
                      </AnimatedButton>
                    </DialogTrigger>
                    <DialogContent className="glassmorphism-card max-w-2xl max-h-[80vh] overflow-y-auto border border-white/10">
                      {selectedRecipe && (
                        <>
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-white mb-4">
                              {selectedRecipe.title}
                            </DialogTitle>
                          </DialogHeader>
                          
                          <div className="space-y-6">
                            {/* Recipe Image */}
                            <img 
                              src={generateMealImage(selectedRecipe)}
                              alt={selectedRecipe.title}
                              className="w-full h-64 object-cover rounded-lg"
                              onError={(e) => {
                                e.currentTarget.src = getFallbackImage(selectedRecipe.type || 'lunch');
                              }}
                            />

                            {/* Recipe Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="text-center p-3 rounded-lg bg-white/10">
                                <p className="text-2xl font-bold text-emerald-400">{selectedRecipe.calories}</p>
                                <p className="text-sm text-white/70">Calories</p>
                              </div>
                              <div className="text-center p-3 rounded-lg bg-white/10">
                                <p className="text-2xl font-bold text-red-400">{selectedRecipe.protein}g</p>
                                <p className="text-sm text-white/70">Protein</p>
                              </div>
                              <div className="text-center p-3 rounded-lg bg-white/10">
                                <p className="text-2xl font-bold text-blue-400">{getCookingTime(selectedRecipe)}</p>
                                <p className="text-sm text-white/70">Minutes</p>
                              </div>
                              <div className="text-center p-3 rounded-lg bg-white/10">
                                <p className="text-2xl font-bold text-yellow-400">{getServings(selectedRecipe)}</p>
                                <p className="text-sm text-white/70">Servings</p>
                              </div>
                            </div>

                            {/* Ingredients */}
                            <div>
                              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                <ChefHat className="w-5 h-5 mr-2 text-emerald-400" />
                                Ingredients
                              </h3>
                              <div className="space-y-2">
                                {selectedRecipe.ingredients.map((ingredient, idx) => (
                                  <div key={idx} className="flex items-center space-x-2 p-2 rounded-lg bg-white/5">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                                    <span className="text-white/90">{ingredient}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Instructions */}
                            <div>
                              <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                                Instructions
                              </h3>
                              <div className="space-y-3">
                                {selectedRecipe.instructions.map((instruction, idx) => (
                                  <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                      {idx + 1}
                                    </div>
                                    <p className="text-white/90 leading-relaxed">{instruction}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Full Macros */}
                            <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-gradient-to-r from-white/10 to-white/5">
                              <div className="text-center">
                                <p className="text-xl font-bold text-red-400">{selectedRecipe.protein}g</p>
                                <p className="text-sm text-white/70">Protein</p>
                                <p className="text-xs text-white/50">{Math.round((selectedRecipe.protein * 4 / selectedRecipe.calories) * 100)}%</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xl font-bold text-blue-400">{selectedRecipe.carbs}g</p>
                                <p className="text-sm text-white/70">Carbohydrates</p>
                                <p className="text-xs text-white/50">{Math.round((selectedRecipe.carbs * 4 / selectedRecipe.calories) * 100)}%</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xl font-bold text-yellow-400">{selectedRecipe.fat}g</p>
                                <p className="text-sm text-white/70">Fat</p>
                                <p className="text-xs text-white/50">{Math.round((selectedRecipe.fat * 9 / selectedRecipe.calories) * 100)}%</p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredRecipes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <ChefHat className="w-16 h-16 mx-auto mb-4 text-white/50" />
          <h3 className="text-xl font-semibold text-white mb-2">No recipes found</h3>
          <p className="text-white/70">Try adjusting your search terms or filters</p>
        </motion.div>
      )}
    </div>
  );
};