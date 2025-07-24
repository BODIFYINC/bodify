import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedButton } from './ui/animated-button';
import { getMealById } from '../services/realMealDatabase';

export const MealDetails: React.FC = () => {
  const { mealId } = useParams();
  const navigate = useNavigate();
  const meal = getMealById(mealId || '');

  if (!meal) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-bodify-dark border-bodify-purple">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Meal Not Found</h2>
          <AnimatedButton
            onClick={() => navigate('/recipes')}
            className="bg-bodify-gradient hover:opacity-90 px-8 py-3"
          >
            Back to Recipes
          </AnimatedButton>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-bodify-dark border-bodify-purple">
      <CardHeader className="border-b border-bodify-purple/20">
        <div className="flex items-center justify-between">
          <AnimatedButton
            onClick={() => navigate('/recipes')}
            variant="ghost"
            className="text-white hover:text-bodify-orange"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Recipes
          </AnimatedButton>
          <CardTitle className="text-2xl font-bold text-white">{meal.title}</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Recipe Image */}
        <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden bg-bodify-dark/50">
          <img
            src={meal.image}
            alt={meal.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Macros and Nutrition */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-bodify-dark/50 p-4 rounded-lg">
            <h3 className="text-bodify-orange font-semibold mb-2">Calories</h3>
            <p className="text-2xl font-bold text-white">{meal.calories}</p>
          </div>
          <div className="bg-bodify-dark/50 p-4 rounded-lg">
            <h3 className="text-bodify-purple font-semibold mb-2">Protein</h3>
            <p className="text-2xl font-bold text-white">{meal.protein}g</p>
          </div>
          <div className="bg-bodify-dark/50 p-4 rounded-lg">
            <h3 className="text-green-400 font-semibold mb-2">Carbs</h3>
            <p className="text-2xl font-bold text-white">{meal.carbs}g</p>
          </div>
          <div className="bg-bodify-dark/50 p-4 rounded-lg">
            <h3 className="text-red-400 font-semibold mb-2">Fat</h3>
            <p className="text-2xl font-bold text-white">{meal.fat}g</p>
          </div>
        </div>

        {/* Recipe Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-3 text-bodify-orange">Ingredients</h4>
            <ul className="space-y-2">
              {meal.ingredients.map((ingredient, index) => (
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
              {meal.instructions.map((instruction, index) => (
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
        {meal.micros && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-3 text-bodify-orange">Additional Nutrition</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(meal.micros).map(([key, value]) => (
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
}; 