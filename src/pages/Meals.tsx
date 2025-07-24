import React, { useState, useEffect } from 'react';
import { Meal, MealPlan } from '../types/meal';
import { generateMealPlan, saveMealProgress, getMealProgress, getProgressHistory, clearOldProgress, clearCurrentDayProgress } from '../services/mealService';

const Meals: React.FC = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({
    calories: { current: 0, target: 0 },
    protein: { current: 0, target: 0 },
    overall: 0
  });

  useEffect(() => {
    // Clear old progress data when component mounts (handles new day reset)
    clearOldProgress();
    loadMealPlan();

    // Listen for custom event when settings are updated
    const handleSettingsUpdate = () => {
      console.log('Settings updated, resetting progress and reloading meal plan...');
      // Explicitly clear current day's progress from local storage
      clearCurrentDayProgress();
      // Explicitly reset local *current* progress state to 0 (this provides immediate visual feedback)
       setProgress({
        calories: { current: 0, target: progress.calories.target },
        protein: { current: 0, target: progress.protein.target },
        overall: 0
      });
      loadMealPlan(); // load the new meal plan with potentially updated targets
    };

    window.addEventListener('userPreferencesUpdated', handleSettingsUpdate as EventListener);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('userPreferencesUpdated', handleSettingsUpdate as EventListener);
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  const loadMealPlan = async () => {
    try {
      setLoading(true);
      const plan = await generateMealPlan();
      setMealPlan(plan);

      // Fetch the latest progress after generating the plan
      const currentProgress = getMealProgress();

      // Update progress based on the newly generated plan and the fetched current day's progress
      updateProgress(plan, currentProgress);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load meal plan');
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = (plan: MealPlan, currentDayProgress: Record<string, boolean>) => {
    // This function calculates progress based on the 'completed' status within the passed plan object
    // and the provided current day's progress.
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    const { targetCalories, targetProtein } = settings;
    
    let currentCalories = 0;
    let currentProtein = 0;
    let completedMeals = 0;
    let totalMeals = 0;

    const allMeals = [
      ...plan.breakfast,
      ...plan.lunch,
      ...plan.dinner,
      ...plan.snacks
    ];

    allMeals.forEach(meal => {
      // Use the completed status from the provided currentDayProgress
      if (currentDayProgress[meal.id]) {
        currentCalories += meal.calories;
        currentProtein += meal.protein;
        completedMeals++;
      }
      totalMeals++;
    });

    setProgress({
      calories: {
        current: currentCalories,
        target: targetCalories
      },
      protein: {
        current: currentProtein,
        target: targetProtein
      },
      overall: totalMeals > 0 ? (completedMeals / totalMeals) * 100 : 0
    });
  };

  const handleMealComplete = (mealId: string, completed: boolean) => {
    if (!mealPlan) return;

    // Update local state
    setMealPlan(prev => {
      if (!prev) return null;
      const updateMeal = (meals: Meal[]) =>
        meals.map(meal => (meal.id === mealId ? { ...meal, completed } : meal));
      
      const updated = {
        breakfast: updateMeal(prev.breakfast),
        lunch: updateMeal(prev.lunch),
        dinner: updateMeal(prev.dinner),
        snacks: updateMeal(prev.snacks)
      };

      // After updating the local state, calculate and update the progress
       // We need to get the *actual* current completion status from the updated plan state
       let currentCalories = 0;
       let currentProtein = 0;
       let completedMeals = 0;
       let totalMeals = 0;

       const allMeals = [
        ...updated.breakfast,
        ...updated.lunch,
        ...updated.dinner,
        ...updated.snacks
       ];

        allMeals.forEach(meal => {
            if(meal.completed) {
                currentCalories += meal.calories;
                currentProtein += meal.protein;
                completedMeals++;
            }
            totalMeals++;
        });

        setProgress(prevProgress => ({
            calories: { ...prevProgress.calories, current: currentCalories },
            protein: { ...prevProgress.protein, current: currentProtein },
            overall: totalMeals > 0 ? (completedMeals / totalMeals) * 100 : 0
        }));

      return updated;
    });

    // Save to localStorage
    saveMealProgress(mealId, completed);
  };

  const renderProgressBar = (current: number, target: number, label: string) => {
    const percentage = target > 0 ? Math.min((current / target) * 100, 150) : 0; // Cap percentage display at 150%
    const isOverTarget = current > target;
    
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm font-medium">
            {label.includes('Calories') ? current : `${current}g`}/{label.includes('Calories') ? target : `${target}g`} ({Math.round(percentage)}% achieved)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              isOverTarget ? 'bg-red-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }} // Progress bar fills at 100%
          ></div>
        </div>
        {isOverTarget && label.includes('Calories') && (
          <p className="text-sm text-red-500 mt-1">
            Over target by {current - target} cal
          </p>
        )}
         {isOverTarget && label.includes('Protein') && (
          <p className="text-sm text-green-500 mt-1">
            Over target by {current - target}g
          </p>
        )}
      </div>
    );
  };

   const renderMealSection = (title: string, meals: Meal[]) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid gap-4">
        {meals.map(meal => (
          <div
            key={meal.id}
            className="bg-white/10 p-4 rounded-lg flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold">{meal.name}</h3>
              <p className="text-sm text-gray-300">
                {meal.calories} cal | {meal.protein}g protein | {meal.carbs}g carbs | {meal.fat}g fat
              </p>
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={meal.completed}
                onChange={(e) => handleMealComplete(meal.id, e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span className="text-sm">Completed</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <div className="text-center py-8">Loading meal plan...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
        <button
          onClick={loadMealPlan}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!mealPlan) {
    return <div className="text-center py-8">No meal plan available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Today's Meal Plan</h1>
      
      {/* Progress Section */}
      <div className="bg-white/10 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Today's Progress</h2>
        {renderProgressBar(progress.calories.current, progress.calories.target, 'Daily Calories')}
        {renderProgressBar(progress.protein.current, progress.protein.target, 'Protein Intake')}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Overall Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${progress.overall}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1">Based on completed meals</p>
        </div>
      </div>

      {/* Meal Sections */}
      {renderMealSection('Breakfast', mealPlan.breakfast)}
      {renderMealSection('Lunch', mealPlan.lunch)}
      {renderMealSection('Dinner', mealPlan.dinner)}
      {renderMealSection('Snacks', mealPlan.snacks)}
    </div>
  );
};

export default Meals; 