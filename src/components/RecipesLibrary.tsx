
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { AnimatedButton } from './ui/animated-button';
import { useNavigate } from 'react-router-dom';
import { getAllRealisticMeals } from '@/services/realMealDatabase';
import { Meal } from '@/services/enhancedMealService';

export const RecipesLibrary: React.FC = () => {
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'breakfast' | 'lunch' | 'dinner' | 'snacks'>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const meals = getAllRealisticMeals();
    setAllMeals(meals);
    setFilteredMeals(meals);
  }, []);

  useEffect(() => {
    let filtered = allMeals;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(meal =>
        meal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by meal type using string-based categorization
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(meal => {
        const mealId = meal.id;
        // Since IDs are now strings, we need to categorize by ID patterns or meal content
        if (selectedFilter === 'breakfast') {
          return mealId.includes('breakfast') || 
                 mealId.includes('greek-yogurt') || 
                 mealId.includes('overnight-oats') || 
                 mealId.includes('egg') ||
                 mealId.includes('protein-pancakes') ||
                 mealId.includes('muscle-omelette') ||
                 mealId.includes('power-smoothie');
        }
        if (selectedFilter === 'lunch') {
          return mealId.includes('lunch') ||
                 mealId.includes('quinoa-power-bowl') ||
                 mealId.includes('grilled-chicken-sweet-potato') ||
                 mealId.includes('lentil-soup') ||
                 mealId.includes('chicken-rice-bowl') ||
                 mealId.includes('salmon-quinoa') ||
                 mealId.includes('beef-stir-fry');
        }
        if (selectedFilter === 'dinner') {
          return mealId.includes('dinner') ||
                 mealId.includes('grilled-salmon') ||
                 mealId.includes('lean-turkey-meatballs') ||
                 mealId.includes('baked-cod') ||
                 mealId.includes('chicken-vegetable-stir-fry') ||
                 mealId.includes('turkey-meatballs') ||
                 mealId.includes('pork-tenderloin') ||
                 mealId.includes('fish-tacos');
        }
        if (selectedFilter === 'snacks') {
          return mealId.includes('snack') ||
                 mealId.includes('almond-protein-smoothie') ||
                 mealId.includes('cottage-cheese-berries') ||
                 mealId.includes('hard-boiled-eggs') ||
                 mealId.includes('protein-bars') ||
                 mealId.includes('greek-yogurt-parfait') ||
                 mealId.includes('protein-smoothie');
        }
        return true;
      });
    }

    setFilteredMeals(filtered);
  }, [searchTerm, selectedFilter, allMeals]);

  const handleMealClick = (meal: Meal) => {
    navigate(`/meal/${meal.id}`);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-bodify-orange to-bodify-purple bg-clip-text text-transparent">
          Recipe Library
        </h2>
        <p className="text-white/70">
          Discover over 400 healthy, delicious recipes with realistic nutrition
        </p>
      </motion.div>

      {/* Search and Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-4 items-center"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
          <Input
            placeholder="Search recipes or ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {(['all', 'breakfast', 'lunch', 'dinner', 'snacks'] as const).map((filter) => (
            <AnimatedButton
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
              className={selectedFilter === filter ? 
                "bg-bodify-gradient" : 
                "border-white/20 hover:bg-white/10"
              }
            >
              <Filter className="w-3 h-3 mr-1" />
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </AnimatedButton>
          ))}
        </div>
      </motion.div>

      {/* Results Count */}
      <div className="text-center text-white/70">
        Showing {filteredMeals.length} of {allMeals.length} recipes
      </div>

      {/* Recipe Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredMeals.map((meal, index) => (
          <motion.div
            key={meal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
          >
            <Card 
              className="glassmorphism border-0 cursor-pointer group overflow-hidden"
              onClick={() => handleMealClick(meal)}
            >
              <div className="relative">
                <img 
                  src={meal.image} 
                  alt={meal.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
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
                <h3 className="font-semibold text-white mb-2 line-clamp-2 min-h-[3rem]">
                  {meal.title}
                </h3>
                
                <div className="flex items-center justify-between text-sm text-white/70 mb-3">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{Math.round(meal.instructions.length * 3)} min</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    <span>1 serving</span>
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-white/60">
                  <span>Carbs: {meal.carbs}g</span>
                  <span>Fat: {meal.fat}g</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredMeals.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-white/70 text-lg">No recipes found matching your criteria.</p>
          <p className="text-white/50 text-sm mt-2">Try adjusting your search or filters.</p>
        </motion.div>
      )}
    </div>
  );
};
