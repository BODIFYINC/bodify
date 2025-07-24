import { getMealsByGoal, getAllRealisticMeals } from './realMealDatabase';
import { Meal, MealType } from './enhancedMealService';
import { AccurateNutritionTracker } from './accurateNutritionTracker';
import { getFitnessResponse } from './aiService';

export interface EnhancedMealPlan {
  // Meal properties
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
  // Nutrition properties
  nutrition: {
    totalCalories: number;
    totalProtein: number;
    calorieTarget: number;
    proteinTarget: number;
  };
}

export function generateAdvancedMealPlan(): EnhancedMealPlan {
  const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
  const userPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
  
  // Calculate accurate targets using medical formulas
  const profile = {
    weight: userSettings.weight || 70,
    height: userSettings.height || 175,
    age: userSettings.age || 25,
    gender: userSettings.gender || 'male',
    activityLevel: userSettings.activityLevel || 'moderate',
    goal: userSettings.goal || 'muscle_gain',
    bodyFat: userSettings.bodyFat
  };

  const targets = AccurateNutritionTracker.calculateNutritionTargets(profile);
  console.log('Meal generation targets:', targets);
  
  // Get goal-specific meals
  const goalMeals = getMealsByGoal(profile.goal as 'weight_loss' | 'muscle_gain');
  
  // Filter out disliked foods
  const filteredMeals = {
    breakfast: filterDislikedFoods(goalMeals.breakfast, userPrefs.dislikedFoods || []),
    lunch: filterDislikedFoods(goalMeals.lunch, userPrefs.dislikedFoods || []),
    dinner: filterDislikedFoods(goalMeals.dinner, userPrefs.dislikedFoods || []),
    snacks: filterDislikedFoods(goalMeals.snacks, userPrefs.dislikedFoods || [])
  };

  // For muscle gain (3148 calories), aim for:
  // Breakfast: 25% (787 cal)
  // Lunch: 30% (944 cal) 
  // Dinner: 35% (1102 cal)
  // Snacks: 10% (315 cal)
  
  const calorieDistribution = {
    breakfast: Math.round(targets.calories * 0.25),
    lunch: Math.round(targets.calories * 0.30),
    dinner: Math.round(targets.calories * 0.35),
    snacks: Math.round(targets.calories * 0.10)
  };

  console.log('Calorie distribution:', calorieDistribution);

  // Select meals closest to targets
  const selectedBreakfast = selectBestMeal(filteredMeals.breakfast, calorieDistribution.breakfast, targets.protein * 0.25);
  const selectedLunch = selectBestMeal(filteredMeals.lunch, calorieDistribution.lunch, targets.protein * 0.30);
  const selectedDinner = selectBestMeal(filteredMeals.dinner, calorieDistribution.dinner, targets.protein * 0.35);
  
  // Calculate remaining needs
  const currentTotal = selectedBreakfast.calories + selectedLunch.calories + selectedDinner.calories;
  const remainingCalories = targets.calories - currentTotal;
  const remainingProtein = targets.protein - (selectedBreakfast.protein + selectedLunch.protein + selectedDinner.protein);

  console.log('Remaining needs:', { calories: remainingCalories, protein: remainingProtein });

  // Add snacks to reach targets
  const selectedSnacks = selectSnacksToReachTarget(filteredMeals.snacks, remainingCalories, remainingProtein);

  const finalTotal = currentTotal + selectedSnacks.reduce((sum, snack) => sum + snack.calories, 0);
  const finalProtein = selectedBreakfast.protein + selectedLunch.protein + selectedDinner.protein + selectedSnacks.reduce((sum, snack) => sum + snack.protein, 0);

  console.log('Final totals:', { calories: finalTotal, protein: finalProtein, target: targets.calories });

  return {
    breakfast: selectedBreakfast,
    lunch: selectedLunch,
    dinner: selectedDinner,
    snacks: selectedSnacks,
    nutrition: {
      totalCalories: finalTotal,
      totalProtein: finalProtein,
      calorieTarget: targets.calories,
      proteinTarget: targets.protein
    }
  };
}

function filterDislikedFoods(meals: Meal[], dislikedFoods: string[]): Meal[] {
  if (!dislikedFoods || dislikedFoods.length === 0) return meals;
  
  return meals.filter(meal => {
    const mealText = (meal.title + ' ' + meal.ingredients.join(' ')).toLowerCase();
    
    for (const disliked of dislikedFoods) {
      const dislikedLower = disliked.toLowerCase().trim();
      
      // Strict matching - if any disliked food is found, exclude the meal
      if (mealText.includes(dislikedLower)) {
        console.log(`Excluding meal "${meal.title}" due to disliked food: ${disliked}`);
        return false;
      }
      
      // Check for common variations
      const variations: { [key: string]: string[] } = {
        'rice': ['rice', 'brown rice', 'white rice', 'wild rice'],
        'chicken': ['chicken', 'poultry'],
        'fish': ['fish', 'salmon', 'tuna', 'cod'],
        'beef': ['beef', 'steak'],
        'eggs': ['egg', 'eggs'],
        'dairy': ['milk', 'cheese', 'yogurt']
      };
      
      const checkVariations = variations[dislikedLower] || [dislikedLower];
      if (checkVariations.some(variation => mealText.includes(variation))) {
        console.log(`Excluding meal "${meal.title}" due to variation of disliked food: ${disliked}`);
        return false;
      }
    }
    
    return true;
  });
}

function selectBestMeal(meals: Meal[], targetCalories: number, targetProtein: number): Meal {
  if (meals.length === 0) {
    // Fallback to any available meal
    const allMeals = getAllRealisticMeals();
    // Select a meal that has some protein
    const proteinRichFallback = allMeals.find(meal => meal.protein > 10);
    return proteinRichFallback || allMeals[Math.floor(Math.random() * allMeals.length)];
  }

  let bestMeal = meals[0];
  let bestScore = Infinity;

  for (const meal of meals) {
    // Score based on how close to targets, prioritizing protein
    const calorieDeviation = Math.abs(meal.calories - targetCalories) / Math.max(targetCalories, 1);
    const proteinDeviation = Math.abs(meal.protein - targetProtein) / Math.max(targetProtein, 1);
    
    // Weight protein more heavily, especially if below target
    const proteinWeight = meal.protein < targetProtein * 0.8 ? 0.8 : 0.5; // Higher weight if significantly below protein target
    const calorieWeight = 1 - proteinWeight;
    
    const totalScore = (calorieDeviation * calorieWeight) + (proteinDeviation * proteinWeight);
    
    if (totalScore < bestScore) {
      bestScore = totalScore;
      bestMeal = meal;
    }
  }

  console.log(`Selected ${bestMeal.title}: ${bestMeal.calories} cal, ${bestMeal.protein}g protein (target: ${targetCalories} cal, ${targetProtein}g protein)`);
  return bestMeal;
}

function selectSnacksToReachTarget(snacks: Meal[], targetCalories: number, targetProtein: number): Meal[] {
  if (snacks.length === 0) return [];
  
  const selectedSnacks: Meal[] = [];
  let currentCalories = 0;
  let currentProtein = 0;
  
  // Sort snacks by protein content (descending) for hitting protein target
  const sortedSnacks = [...snacks].sort((a, b) => b.protein - a.protein);
  
  // Add snacks to primarily meet protein target
  for (const snack of sortedSnacks) {
    // Stop if adding this snack would significantly overshoot calories
    if (currentCalories + snack.calories > targetCalories * 1.15 && selectedSnacks.length > 0) { // Allow 15% overshoot if needed to hit protein
      continue;
    }

    // Stop if we have enough protein and adding this snack adds too many calories
    if (currentProtein >= targetProtein && currentCalories + snack.calories > targetCalories * 1.05 && selectedSnacks.length > 0) {
      continue;
    }
    
    // Add the snack
    selectedSnacks.push(snack);
    currentCalories += snack.calories;
    currentProtein += snack.protein;
    console.log(`Added snack: ${snack.title} (${snack.calories} cal, ${snack.protein}g protein). Current total: ${currentCalories} cal, ${currentProtein}g protein`);
    
    // Stop if we are close to both targets or added too many snacks
    if (currentProtein >= targetProtein * 0.9 && currentCalories >= targetCalories * 0.9 && selectedSnacks.length >= 1) break;
    if (selectedSnacks.length >= 3) break; // Limit number of snacks
  }

  // If protein target is still not met, try adding more protein-focused snacks regardless of calorie overshoot (within reason)
  if (currentProtein < targetProtein * 0.9 && selectedSnacks.length < 4) { // Allow up to 4 snacks if protein is low
    for (const snack of sortedSnacks) {
      if (selectedSnacks.find(s => s.id === snack.id)) continue;
      if (currentCalories + snack.calories > targetCalories * 1.25 && selectedSnacks.length > 0) { // Allow up to 25% overshoot if desperate for protein
        continue;
      }
      selectedSnacks.push(snack);
      currentCalories += snack.calories;
      currentProtein += snack.protein;
      console.log(`Added extra protein snack: ${snack.title} (${snack.calories} cal, ${snack.protein}g protein). Current total: ${currentCalories} cal, ${currentProtein}g protein`);
      if (currentProtein >= targetProtein * 0.95 || selectedSnacks.length >= 4) break; // Stop if protein target is almost met or hit max snacks
    }
  }

  return selectedSnacks;
}

function calculateTotalNutrition(meals: EnhancedMealPlan): { calories: number; protein: number } {
    // Calculate totals from individual meals
    const mealCalories = meals.breakfast.calories +
                        meals.lunch.calories +
                        meals.dinner.calories +
                        meals.snacks.reduce((sum, snack) => sum + snack.calories, 0);
                            
    const mealProtein = meals.breakfast.protein +
                       meals.lunch.protein +
                       meals.dinner.protein +
                       meals.snacks.reduce((sum, snack) => sum + snack.protein, 0);
                         
    // Return the calculated totals
    return { 
        calories: mealCalories,
        protein: mealProtein
    };
}
