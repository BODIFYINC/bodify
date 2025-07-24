import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, Users, ChefHat } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAllRealisticMeals } from '@/services/realMealDatabase';
import { Meal } from '@/services/enhancedMealService';
import { useNavigate } from 'react-router-dom';
import { generateMealImage, getFallbackImage } from '../services/imageService';

const Recipes: React.FC = () => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    const allMeals = getAllRealisticMeals();
    setMeals(allMeals);
  }, []);

  const filteredMeals = meals.filter(meal => {
    const matchesSearch = meal.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || meal.type === selectedType;
    return matchesSearch && matchesType;
  });

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snacks'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker text-white">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">Recipe Library</h1>

          {/* Search and Filter Section */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
              <Input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
              />
            </div>
            <div className="flex gap-2">
              {mealTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                  className={selectedType === type ? "bg-bodify-gradient" : "border-white/20 hover:bg-white/10"}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeals.map((meal, index) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => navigate(`/meal/${meal.id}`)}
                >
                  <div className="relative">
                    <img
                      src={generateMealImage(meal)}
                      alt={meal.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                      onError={(e) => {
                        e.currentTarget.src = getFallbackImage(meal.type || 'lunch');
                      }}
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge className="bg-bodify-orange/90 text-white">
                        {meal.calories} cal
                      </Badge>
                      <Badge className="bg-bodify-purple/90 text-white">
                        {meal.protein}g protein
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{meal.title}</h3>
                    <div className="flex gap-2 text-sm text-white/70">
                      <span>{meal.type}</span>
                      <span>•</span>
                      <span>{meal.carbs}g carbs</span>
                      <span>•</span>
                      <span>{meal.fat}g fat</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Recipes;
