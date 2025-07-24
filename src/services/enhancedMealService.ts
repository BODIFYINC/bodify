// Enhanced meal service with realistic nutrition values
import { getMealsByGoal, getAllRealisticMeals } from './realMealDatabase';
import { MealRecommendationEngine } from './mealRecommendationEngine';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export interface Meal {
  id: string;
  title: string;
  type: MealType;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string[];
  image?: string;
  tags?: string[];
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  cuisine?: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isDairyFree?: boolean;
  nutritionNotes?: string;
  healthScore?: number;
  allergens?: string[];
  macros?: {
    protein: number;
    carbs: number;
    fat: number;
  };
  micros?: {
    fiber?: number;
    sugar?: number;
    sodium?: number;
    potassium?: number;
    calcium?: number;
    iron?: number;
    vitaminA?: number;
    vitaminC?: number;
  };
}

export interface EnhancedMealPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
  nutrition: {
    totalCalories: number;
    totalProtein: number;
    calorieTarget: number;
    proteinTarget: number;
  };
}

// Medically accurate BMR calculation
function calculateMedicalBMR(weight: number, height: number, age: number, gender: string = 'male'): number {
  if (gender.toLowerCase() === 'female') {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161;
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5;
  }
}

// Realistic TDEE calculation
function calculateRealisticTDEE(bmr: number, activityLevel: string = 'moderate'): number {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  return bmr * (multipliers[activityLevel as keyof typeof multipliers] || 1.55);
}

// Medically sound calorie targets
function calculateRealisticCalories(tdee: number, goal: string): number {
  switch (goal) {
    case 'weight_loss': 
      return Math.max(1200, Math.round(tdee - Math.min(500, tdee * 0.2))); // Safe deficit
    case 'muscle_gain': 
      return Math.round(tdee + Math.min(300, tdee * 0.1)); // Conservative surplus
    default: 
      return Math.round(tdee);
  }
}

// Realistic protein needs (not excessive)
function calculateRealisticProtein(weight: number, goal: string): number {
  const proteinPerKg = {
    weight_loss: 1.6,    // 1.6g/kg for muscle preservation
    muscle_gain: 2.0,    // 2.0g/kg for muscle building
    maintenance: 1.2     // 1.2g/kg for general health
  };
  
  const multiplier = proteinPerKg[goal as keyof typeof proteinPerKg] || 1.2;
  return Math.min(weight * multiplier, goal === 'muscle_gain' ? 150 : 120); // Cap at reasonable amounts
}

// Smart meal filtering based on preferences
function intelligentMealFilter(meals: Meal[], userPrefs: any): Meal[] {
  if (!userPrefs || (!userPrefs.dislikedFoods?.length && !userPrefs.allergies?.length)) {
    return meals;
  }
  
  const dislikedFoods = (userPrefs.dislikedFoods || []).map((item: string) => item.toLowerCase().trim());
  const allergies = (userPrefs.allergies || []).map((item: string) => item.toLowerCase().trim());
  const avoidItems = [...dislikedFoods, ...allergies];
  
  return meals.filter(meal => {
    const allText = [
      meal.title,
      ...meal.ingredients,
      ...meal.instructions
    ].join(' ').toLowerCase();
    
    return !avoidItems.some(avoid => {
      if (!avoid) return false;
      
      // Smart matching for common food items
      const foodVariations = {
        'egg': ['egg', 'eggs', 'scrambled', 'omelet'],
        'milk': ['milk', 'dairy', 'cream', 'cheese', 'yogurt'],
        'nut': ['nut', 'nuts', 'almond', 'peanut', 'walnut'],
        'fish': ['fish', 'salmon', 'tuna', 'cod'],
        'chicken': ['chicken', 'poultry'],
        'beef': ['beef', 'steak'],
        'mushroom': ['mushroom', 'mushrooms'],
        'tomato': ['tomato', 'tomatoes']
      };
      
      const checkVariations = foodVariations[avoid] || [avoid];
      return checkVariations.some(variation => allText.includes(variation));
    });
  });
}

// Realistic meal selection with proper nutrition matching
function selectRealisticMeal(
  filteredMeals: Meal[], 
  targetCalories: number, 
  targetProtein: number, 
  mealType: string,
  goal: string
): Meal {
  if (filteredMeals.length === 0) {
    const goalMeals = getMealsByGoal(goal as 'weight_loss' | 'muscle_gain');
    const fallbackMeals = goalMeals[mealType as keyof typeof goalMeals] as Meal[];
    return fallbackMeals[Math.floor(Math.random() * fallbackMeals.length)];
  }

  // Realistic meal distribution
  const mealCalorieTargets = {
    breakfast: targetCalories * 0.25,  // 25%
    lunch: targetCalories * 0.35,      // 35%
    dinner: targetCalories * 0.35,     // 35%
    snacks: targetCalories * 0.05      // 5% per snack
  };

  const mealTarget = mealCalorieTargets[mealType as keyof typeof mealCalorieTargets] || targetCalories * 0.25;
  const proteinTarget = targetProtein * 0.25; // Distribute protein evenly

  let bestMeal = filteredMeals[0];
  let bestScore = Infinity;

  filteredMeals.forEach(meal => {
    // Score based on how close the meal is to targets
    const calorieScore = Math.abs(meal.calories - mealTarget) / mealTarget;
    const proteinScore = Math.abs(meal.protein - proteinTarget) / Math.max(proteinTarget, 10);
    
    // Weighted scoring
    const score = calorieScore * 0.7 + proteinScore * 0.3;
    
    if (score < bestScore) {
      bestScore = score;
      bestMeal = meal;
    }
  });

  return bestMeal;
}

export function generateEnhancedMealPlan(goal: 'weight_loss' | 'muscle_gain' = 'weight_loss'): EnhancedMealPlan {
  const userPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
  const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
  
  // Get user data with realistic defaults
  const weight = userSettings.weight || userPrefs.weight || 70;
  const height = userSettings.height || userPrefs.height || 170;
  const age = userSettings.age || userPrefs.age || 30;
  const gender = userSettings.gender || userPrefs.gender || 'male';
  const activityLevel = userSettings.activityLevel || userPrefs.activityLevel || 'moderate';
  
  // Calculate realistic nutrition targets
  const bmr = calculateMedicalBMR(weight, height, age, gender);
  const tdee = calculateRealisticTDEE(bmr, activityLevel);
  const targetCalories = calculateRealisticCalories(tdee, goal);
  const targetProtein = calculateRealisticProtein(weight, goal);
  
  console.log('Realistic nutrition targets:', {
    bmr: Math.round(bmr), 
    tdee: Math.round(tdee), 
    targetCalories, 
    targetProtein: Math.round(targetProtein),
    weight, height, age, goal
  });
  
  const goalMeals = getMealsByGoal(goal);
  
  // Apply intelligent filtering
  const filteredBreakfast = intelligentMealFilter(goalMeals.breakfast, userPrefs);
  const filteredLunch = intelligentMealFilter(goalMeals.lunch, userPrefs);
  const filteredDinner = intelligentMealFilter(goalMeals.dinner, userPrefs);
  const filteredSnacks = intelligentMealFilter(goalMeals.snacks, userPrefs);
  
  // Select realistic meals
  const selectedBreakfast = selectRealisticMeal(filteredBreakfast, targetCalories, targetProtein, 'breakfast', goal);
  const selectedLunch = selectRealisticMeal(filteredLunch, targetCalories, targetProtein, 'lunch', goal);
  const selectedDinner = selectRealisticMeal(filteredDinner, targetCalories, targetProtein, 'dinner', goal);
  
  // Realistic snack selection
  const snackCount = goal === 'muscle_gain' ? 2 : 1;
  const selectedSnacks: Meal[] = [];
  for (let i = 0; i < snackCount && filteredSnacks.length > 0; i++) {
    const availableSnacks = filteredSnacks.filter(snack => 
      !selectedSnacks.find(s => s.id === snack.id)
    );
    
    if (availableSnacks.length > 0) {
      const bestSnack = selectRealisticMeal(availableSnacks, targetCalories, targetProtein, 'snacks', goal);
      selectedSnacks.push(bestSnack);
    }
  }

  const mealPlan: EnhancedMealPlan = {
    breakfast: selectedBreakfast,
    lunch: selectedLunch,
    dinner: selectedDinner,
    snacks: selectedSnacks,
    nutrition: {
      totalCalories: selectedBreakfast.calories + selectedLunch.calories + selectedDinner.calories + selectedSnacks.reduce((sum, snack) => sum + snack.calories, 0),
      totalProtein: selectedBreakfast.protein + selectedLunch.protein + selectedDinner.protein + selectedSnacks.reduce((sum, snack) => sum + snack.protein, 0),
      calorieTarget: targetCalories,
      proteinTarget: targetProtein
    }
  };
  
  // Log realistic nutrition accuracy
  const totalCalories = mealPlan.breakfast.calories + mealPlan.lunch.calories + 
                       mealPlan.dinner.calories + mealPlan.snacks.reduce((sum, snack) => sum + snack.calories, 0);
  const totalProtein = mealPlan.breakfast.protein + mealPlan.lunch.protein + 
                      mealPlan.dinner.protein + mealPlan.snacks.reduce((sum, snack) => sum + snack.protein, 0);
  
  console.log('Realistic meal plan results:', {
    target: { calories: targetCalories, protein: Math.round(targetProtein) },
    actual: { calories: totalCalories, protein: Math.round(totalProtein) },
    accuracy: {
      calories: Math.round((totalCalories / targetCalories) * 100) + '%',
      protein: Math.round((totalProtein / targetProtein) * 100) + '%'
    }
  });
  
  return mealPlan;
}

export function getMealById(id: string): Meal | undefined { // Changed parameter type to string
  const allMeals = getAllRealisticMeals();
  return allMeals.find(meal => meal.id === id);
}

// Function to generate new meal for specific type (fixes the generate new functionality)
export function generateNewMealForType(
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks',
  goal: 'weight_loss' | 'muscle_gain' = 'weight_loss',
  excludeIds: string[] = [] // Changed parameter type to string[]
): Meal | null {
  const userPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
  
  return MealRecommendationEngine.generateNewMealForType(
    mealType,
    goal,
    {
      cuisineTypes: userPrefs.cuisineTypes || [],
      allergens: userPrefs.allergies || [],
      dislikes: userPrefs.dislikedFoods || [],
      favorites: userPrefs.favoriteIngredients || [],
      dietaryRestrictions: userPrefs.dietaryRestrictions || [],
      cookingTime: userPrefs.cookingTime || 'moderate',
      skillLevel: userPrefs.skillLevel || 'intermediate'
    },
    excludeIds
  );
}
