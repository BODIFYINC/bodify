import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Flame, ListChecks, BarChart3, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { SmartMealSuggestions } from '@/components/SmartMealSuggestions';
import { NutritionStats } from '@/components/NutritionStats';
import { MealCard } from '@/components/MealCard';
import { NutritionDashboard } from '@/components/NutritionDashboard';
import { generateAdvancedMealPlan, type EnhancedMealPlan } from '@/services/advancedMealService';
import { getAllRealisticMeals } from '@/services/realMealDatabase';
import { Meal, MealType } from '@/services/enhancedMealService';
import { AnimatedButton } from '@/components/ui/animated-button';
import { toast } from '@/hooks/use-toast';
import { AccurateNutritionTracker } from '@/services/accurateNutritionTracker';

const mealCategories = [
  { type: 'breakfast' as MealType, icon: '🌅' },
  { type: 'lunch' as MealType, icon: '☀️' },
  { type: 'dinner' as MealType, icon: '🌙' },
  { type: 'snacks' as MealType, icon: '🍎' }
];

const pageVariants = {
  initial: { opacity: 0, x: -200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
};

const pageTransitions = {
  type: 'spring',
  stiffness: 80,
  damping: 20,
};

const Dashboard: React.FC = () => {
  const [mealPlan, setMealPlan] = useState<EnhancedMealPlan | null>(null);
  const [mealStatus, setMealStatus] = useState({
    breakfast: false,
    lunch: false,
    dinner: false
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset all nutrition tracking data
    AccurateNutritionTracker.resetAll();
    // Reset meal status
    setMealStatus({
      breakfast: false,
      lunch: false,
      dinner: false
    });
    // Load fresh meal plan
    loadMealPlan();
  }, []);

  const loadMealPlan = async () => {
    setLoading(true);
    try {
      const newMealPlan = generateAdvancedMealPlan();
      setMealPlan(newMealPlan);
      
      // Reset meal status to false
      setMealStatus({
        breakfast: false,
        lunch: false,
        dinner: false
      });
      
      toast({
        title: "Meal plan reset! 🚀",
        description: "All meals have been reset to uncompleted state."
      });
    } catch (error) {
      console.error('Error loading meal plan:', error);
      toast({
        title: "Error generating meal plan",
        description: "Please try again in a moment."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkMeal = (mealType: MealType, meal: Meal) => {
    if (!meal) return;
    
    // Get current completion status
    const completedMeals = JSON.parse(localStorage.getItem('completedMeals') || '[]');
    const isCompleted = completedMeals.some(
      (completedMeal: any) => completedMeal.id === meal.id && completedMeal.mealType === mealType
    );

    if (isCompleted) {
      // Remove meal from completed meals
      const filteredMeals = completedMeals.filter(
        (completedMeal: any) => !(completedMeal.id === meal.id && completedMeal.mealType === mealType)
      );
      localStorage.setItem('completedMeals', JSON.stringify(filteredMeals));
    } else {
      // Add meal to completed meals
      completedMeals.push({
        id: meal.id,
        title: meal.title,
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fat: meal.fat,
        mealType: mealType,
        completedAt: new Date().toISOString()
      });
      localStorage.setItem('completedMeals', JSON.stringify(completedMeals));
    }
    
    // Trigger nutrition recalculation
    window.dispatchEvent(new CustomEvent('mealCompleted'));
    
    // Force re-render
    setMealPlan(prevMealPlan => ({ ...prevMealPlan! }));
  };

  const isMealCompleted = (meal: Meal, mealType: MealType) => {
    const completedMeals = JSON.parse(localStorage.getItem('completedMeals') || '[]');
    return completedMeals.some(
      (completedMeal: any) => completedMeal.id === meal.id && completedMeal.mealType === mealType
    );
  };

  const handleRegenerateMealPlan = () => {
    loadMealPlan();
  };

  const handleMealUpdate = (mealType: MealType, newMeal: Meal) => {
    if (!mealPlan) return;
    
    setMealPlan(prevPlan => {
      if (!prevPlan) return prevPlan;
      
      const oldMeal = prevPlan[mealType] as Meal;
      const calorieDiff = newMeal.calories - oldMeal.calories;
      const proteinDiff = newMeal.protein - oldMeal.protein;
      
      return {
        ...prevPlan,
        [mealType]: newMeal,
        nutrition: {
          ...prevPlan.nutrition,
          totalCalories: prevPlan.nutrition.totalCalories + calorieDiff,
          totalProtein: prevPlan.nutrition.totalProtein + proteinDiff
        }
      };
    });
  };

  const handleAddMeal = (meal: Meal) => {
    if (!mealPlan) return;
    
    setMealPlan(prevPlan => {
      if (!prevPlan) return prevPlan;
      
      const newSnacks = [...prevPlan.snacks, meal];
      const newTotalCalories = prevPlan.nutrition.totalCalories + meal.calories;
      const newTotalProtein = prevPlan.nutrition.totalProtein + meal.protein;
      
      return {
        ...prevPlan,
        snacks: newSnacks,
        nutrition: {
          ...prevPlan.nutrition,
          totalCalories: newTotalCalories,
          totalProtein: newTotalProtein
        }
      };
    });
  };

  if (!mealPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bodify-orange mx-auto mb-4"></div>
          <p className="text-white text-lg">Generating your personalized meal plan...</p>
        </div>
      </div>
    );
  }

  const totalCalories = mealPlan.nutrition.totalCalories;
  const totalProtein = mealPlan.nutrition.totalProtein;
  const calorieTarget = mealPlan.nutrition.calorieTarget;
  const proteinTarget = mealPlan.nutrition.proteinTarget;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransitions}
      className="container mx-auto p-6 space-y-8"
    >
      {/* Dashboard Header */}
      {/* REMOVED TOP NAVIGATION AND HEADER AS REQUESTED */}

      {/* Nutrition Overview */}
      <NutritionStats />

      {/* Meal Plan Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Today's Meal Plan</h2>
          <AnimatedButton
            onClick={handleRegenerateMealPlan}
            loading={loading}
            className="bg-bodify-gradient hover:opacity-90"
            glowEffect={true}
          >
            <CalendarDays className="mr-2" size={20} />
            Regenerate Plan
          </AnimatedButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mealCategories.filter(cat => cat.type !== 'snacks').map(category => {
            const meal = mealPlan?.[category.type] as Meal;
            if (!meal) return null;
            
            return (
              <MealCard
                key={category.type}
                meal={meal}
                mealType={category.type}
                isCompleted={isMealCompleted(meal, category.type)}
                onMarkComplete={() => handleMarkMeal(category.type, meal)}
                onMealUpdate={(newMeal) => handleMealUpdate(category.type, newMeal)}
              />
            );
          })}
        </div>

        {/* Snacks Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Snacks</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(mealPlan?.snacks || []).map((snack: Meal, index: number) => (
              <MealCard
                key={snack.id}
                meal={snack}
                mealType="snacks"
                isCompleted={isMealCompleted(snack, 'snacks')}
                onMarkComplete={() => handleMarkMeal('snacks', snack)}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Smart Meal Suggestions */}
      <SmartMealSuggestions onMealSelected={handleAddMeal} currentMealPlan={mealPlan} />

      {/* Nutrition Analysis Dashboard */}
      <NutritionDashboard currentMealPlan={mealPlan} />
    </motion.div>
  );
};

export default Dashboard;
