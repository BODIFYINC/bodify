// AI-powered meal recommendation engine with strict filtering
import { Meal } from './enhancedMealService';
import { getAllRealisticMeals, getMealsByGoal } from './realMealDatabase';

export interface UserPreferences {
  cuisineTypes: string[];
  allergens: string[];
  dislikes: string[];
  favorites: string[];
  dietaryRestrictions: string[];
  cookingTime: 'quick' | 'moderate' | 'long';
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface RecommendationContext {
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  remainingCalories: number;
  remainingProtein: number;
  lastMeals: Meal[];
  weatherCondition?: 'hot' | 'cold' | 'mild';
  mood?: 'energetic' | 'tired' | 'stressed';
}

export class MealRecommendationEngine {
  // Comprehensive ingredient synonyms for better filtering
  private static ingredientSynonyms: { [key: string]: string[] } = {
    'rice': ['rice', 'brown rice', 'white rice', 'jasmine rice', 'basmati rice', 'wild rice'],
    'chicken': ['chicken', 'chicken breast', 'chicken thigh', 'chicken leg', 'poultry'],
    'beef': ['beef', 'steak', 'ground beef', 'beef roast', 'cattle', 'cow'],
    'pork': ['pork', 'bacon', 'ham', 'pork chop', 'pork tenderloin', 'pig'],
    'fish': ['fish', 'salmon', 'tuna', 'cod', 'tilapia', 'halibut', 'mackerel', 'sardines'],
    'dairy': ['milk', 'cheese', 'yogurt', 'butter', 'cream', 'dairy'],
    'nuts': ['nuts', 'almonds', 'walnuts', 'cashews', 'peanuts', 'pecans', 'pistachios'],
    'eggs': ['egg', 'eggs', 'egg white', 'egg yolk'],
    'gluten': ['wheat', 'bread', 'pasta', 'flour', 'gluten', 'barley', 'rye'],
    'shellfish': ['shrimp', 'crab', 'lobster', 'shellfish', 'prawns', 'scallops']
  };

  static getPersonalizedRecommendations(
    preferences: UserPreferences,
    context: RecommendationContext,
    goal: 'weight_loss' | 'muscle_gain'
  ): Meal[] {
    const allMeals = getAllRealisticMeals();
    
    console.log('Starting meal recommendation with preferences:', preferences);
    
    // Step 1: Strict filtering by dislikes and allergens
    let filteredMeals = this.strictFilterByDislikes(allMeals, preferences.dislikes || []);
    console.log(`After dislike filtering: ${filteredMeals.length} meals`);
    
    filteredMeals = this.filterByAllergens(filteredMeals, preferences.allergens || []);
    console.log(`After allergen filtering: ${filteredMeals.length} meals`);
    
    // Step 2: Filter by dietary restrictions
    filteredMeals = this.filterByDietaryRestrictions(filteredMeals, preferences.dietaryRestrictions || []);
    console.log(`After dietary restriction filtering: ${filteredMeals.length} meals`);
    
    // Step 3: Score meals based on context and goals
    const scoredMeals = filteredMeals.map(meal => ({
      meal,
      score: this.scoreMealForContext(meal, context, preferences, goal)
    }));
    
    // Step 4: Sort by score and return top recommendations
    const recommendations = scoredMeals
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map(item => item.meal);
    
    console.log('Final recommendations:', recommendations.length);
    return recommendations;
  }
  
  static generateNewMealForType(
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks',
    goal: 'weight_loss' | 'muscle_gain',
    preferences: UserPreferences = {} as UserPreferences,
    excludeIds: string[] = [] // Changed parameter type to string[]
  ): Meal | null {
    const goalMeals = getMealsByGoal(goal);
    const mealsForType = goalMeals[mealType] || [];
    
    console.log(`Generating new ${mealType} for ${goal}, excluding:`, excludeIds);
    
    // Filter out excluded meals
    let availableMeals = mealsForType.filter((meal: Meal) => !excludeIds.includes(meal.id)); // Fixed type issue
    
    // Apply strict filtering
    availableMeals = this.strictFilterByDislikes(availableMeals, preferences.dislikes || []);
    availableMeals = this.filterByAllergens(availableMeals, preferences.allergens || []);
    availableMeals = this.filterByDietaryRestrictions(availableMeals, preferences.dietaryRestrictions || []);
    
    console.log(`Available meals after filtering: ${availableMeals.length}`);
    
    if (availableMeals.length === 0) {
      console.log('No suitable meals found, returning fallback');
      // Return a fallback meal that doesn't contain disliked ingredients
      const fallbackMeals = mealsForType.filter((meal: Meal) => 
        !excludeIds.includes(meal.id) && 
        !this.containsDislikedIngredients(meal, preferences.dislikes || [])
      );
      return fallbackMeals[Math.floor(Math.random() * fallbackMeals.length)] || null;
    }
    
    // Return random meal from filtered options
    const selectedMeal = availableMeals[Math.floor(Math.random() * availableMeals.length)];
    console.log('Selected meal:', selectedMeal.title);
    return selectedMeal;
  }
  
  private static strictFilterByDislikes(meals: Meal[], dislikes: string[]): Meal[] {
    if (!dislikes || dislikes.length === 0) return meals;
    
    return meals.filter(meal => !this.containsDislikedIngredients(meal, dislikes));
  }
  
  private static containsDislikedIngredients(meal: Meal, dislikes: string[]): boolean {
    const mealText = (meal.title + ' ' + meal.ingredients.join(' ')).toLowerCase();
    
    for (const dislike of dislikes) {
      const dislikeLower = dislike.toLowerCase().trim();
      
      // Direct match
      if (mealText.includes(dislikeLower)) {
        console.log(`Meal "${meal.title}" excluded due to direct match: ${dislike}`);
        return true;
      }
      
      // Synonym match
      const synonyms = this.ingredientSynonyms[dislikeLower] || [];
      for (const synonym of synonyms) {
        if (mealText.includes(synonym.toLowerCase())) {
          console.log(`Meal "${meal.title}" excluded due to synonym match: ${synonym} (dislike: ${dislike})`);
          return true;
        }
      }
      
      // Partial matches for common ingredients
      if (dislikeLower.length > 3) {
        const words = mealText.split(/\s+/);
        for (const word of words) {
          if (word.includes(dislikeLower) || dislikeLower.includes(word)) {
            console.log(`Meal "${meal.title}" excluded due to partial match: ${word} contains ${dislike}`);
            return true;
          }
        }
      }
    }
    
    return false;
  }
  
  private static filterByAllergens(meals: Meal[], allergens: string[]): Meal[] {
    if (!allergens || allergens.length === 0) return meals;
    
    return meals.filter(meal => {
      const mealText = (meal.title + ' ' + meal.ingredients.join(' ')).toLowerCase();
      
      for (const allergen of allergens) {
        const allergenLower = allergen.toLowerCase().trim();
        const synonyms = this.ingredientSynonyms[allergenLower] || [allergenLower];
        
        for (const synonym of synonyms) {
          if (mealText.includes(synonym.toLowerCase())) {
            return false;
          }
        }
      }
      
      return true;
    });
  }
  
  private static filterByDietaryRestrictions(meals: Meal[], restrictions: string[]): Meal[] {
    if (restrictions.length === 0) return meals;
    
    return meals.filter(meal => {
      const mealText = (meal.title + ' ' + meal.ingredients.join(' ')).toLowerCase();
      
      for (const restriction of restrictions) {
        switch (restriction.toLowerCase()) {
          case 'vegetarian':
            const meatItems = ['chicken', 'beef', 'fish', 'turkey', 'pork', 'salmon', 'cod', 'tuna', 'shrimp'];
            if (meatItems.some(meat => mealText.includes(meat))) {
              return false;
            }
            break;
          case 'vegan':
            const animalProducts = ['chicken', 'beef', 'fish', 'egg', 'cheese', 'milk', 'yogurt', 'butter', 'honey'];
            if (animalProducts.some(product => mealText.includes(product))) {
              return false;
            }
            break;
          case 'gluten-free':
            const glutenItems = ['bread', 'oats', 'wheat', 'pasta', 'flour'];
            if (glutenItems.some(gluten => mealText.includes(gluten))) {
              return false;
            }
            break;
          case 'dairy-free':
            const dairyItems = ['milk', 'cheese', 'yogurt', 'butter', 'cream'];
            if (dairyItems.some(dairy => mealText.includes(dairy))) {
              return false;
            }
            break;
        }
      }
      
      return true;
    });
  }
  
  private static scoreMealForContext(
    meal: Meal,
    context: RecommendationContext,
    preferences: UserPreferences,
    goal: string
  ): number {
    let score = 50; // Base score
    
    // Calorie targeting based on goals
    const targetCalories = context.remainingCalories;
    if (targetCalories > 0) {
      const calorieRatio = meal.calories / targetCalories;
      if (calorieRatio >= 0.8 && calorieRatio <= 1.2) {
        score += 30; // Excellent match
      } else if (calorieRatio >= 0.6 && calorieRatio <= 1.4) {
        score += 15; // Good match
      }
    }
    
    // Protein targeting
    const proteinRatio = meal.protein / (context.remainingProtein || 20);
    if (proteinRatio >= 0.8 && proteinRatio <= 1.2) {
      score += 25; // High protein priority
    }
    
    // Goal-specific scoring
    if (goal === 'muscle_gain' && meal.protein >= 25) {
      score += 15; // Bonus for high protein
    }
    if (goal === 'weight_loss' && meal.calories <= 300) {
      score += 10; // Bonus for lower calories
    }
    
    // Favorites bonus
    if (preferences.favorites && preferences.favorites.length > 0) {
      const hasFavorite = preferences.favorites.some(fav =>
        meal.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(fav.toLowerCase())
        ) || meal.title.toLowerCase().includes(fav.toLowerCase())
      );
      if (hasFavorite) score += 20;
    }
    
    // Time appropriateness
    score += this.getTimeOfDayScore(meal, context.timeOfDay) * 10;
    
    // Variety bonus (avoid recent meals)
    if (context.lastMeals.length > 0) {
      const isRecent = context.lastMeals.some(lastMeal => lastMeal.id === meal.id);
      if (!isRecent) score += 5;
    }
    
    return Math.max(0, score);
  }
  
  private static getTimeOfDayScore(meal: Meal, timeOfDay: string): number {
    const mealText = meal.title.toLowerCase();
    
    switch (timeOfDay) {
      case 'morning':
        if (mealText.includes('yogurt') || mealText.includes('oats') || 
            mealText.includes('egg') || mealText.includes('smoothie') ||
            mealText.includes('pancake') || mealText.includes('breakfast')) {
          return 1;
        }
        return 0.3;
      case 'afternoon':
        if (mealText.includes('salad') || mealText.includes('wrap') || 
            mealText.includes('bowl') || mealText.includes('soup') ||
            mealText.includes('sandwich')) {
          return 1;
        }
        return 0.7;
      case 'evening':
        if (mealText.includes('salmon') || mealText.includes('chicken') ||
            mealText.includes('beef') || mealText.includes('stir') ||
            mealText.includes('baked') || mealText.includes('grilled')) {
          return 1;
        }
        return 0.5;
      default:
        return 0.5;
    }
  }
}
