
// Medical-grade nutrition analysis and recommendations
export interface NutritionProfile {
  bmr: number;
  tdee: number;
  targetCalories: number;
  macroTargets: {
    protein: number;
    carbs: number;
    fat: number;
  };
  micronutrientNeeds: {
    vitamin_c: number;
    iron: number;
    calcium: number;
    fiber: number;
  };
}

export interface MealNutritionAnalysis {
  calorieBalance: number;
  proteinAdequacy: number;
  macroBalance: {
    protein: number;
    carbs: number;
    fat: number;
  };
  nutritionScore: number;
  recommendations: string[];
}

export class NutritionAnalyzer {
  static analyzeUserProfile(userSettings: any): NutritionProfile {
    const weight = userSettings.weight || 70;
    const height = userSettings.height || 170;
    const age = userSettings.age || 30;
    const gender = userSettings.gender || 'male';
    const activityLevel = userSettings.activityLevel || 'moderate';
    const goal = userSettings.goal || 'maintenance';
    
    // Medical-grade BMR calculation using Mifflin-St Jeor equation
    const bmr = this.calculateMedicalBMR(weight, height, age, gender);
    
    // TDEE with medically accurate activity multipliers
    const tdee = this.calculateMedicalTDEE(bmr, activityLevel);
    
    // Medically sound calorie targets
    let targetCalories;
    switch (goal) {
      case 'weight_loss':
        targetCalories = Math.round(tdee - Math.min(500, tdee * 0.2)); // Max 20% deficit
        break;
      case 'muscle_gain':
        targetCalories = Math.round(tdee + Math.min(300, tdee * 0.1)); // Max 10% surplus
        break;
      default:
        targetCalories = Math.round(tdee);
    }
    
    // Medical protein requirements (not excessive)
    const macroTargets = this.calculateMedicalMacros(targetCalories, goal, weight);
    
    // Evidence-based micronutrient needs
    const micronutrientNeeds = this.calculateMicronutrientNeeds(weight, age, gender);
    
    return {
      bmr,
      tdee,
      targetCalories,
      macroTargets,
      micronutrientNeeds
    };
  }
  
  private static calculateMedicalBMR(weight: number, height: number, age: number, gender: string): number {
    // Mifflin-St Jeor equation - most accurate for general population
    if (gender.toLowerCase() === 'female') {
      return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    } else {
      return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    }
  }
  
  private static calculateMedicalTDEE(bmr: number, activityLevel: string): number {
    const medicalMultipliers = {
      sedentary: 1.2,     // Desk job, no exercise
      light: 1.375,       // Light exercise 1-3 days/week
      moderate: 1.55,     // Moderate exercise 3-5 days/week
      active: 1.725,      // Heavy exercise 6-7 days/week
      very_active: 1.9    // Physical job + exercise
    };
    
    return bmr * (medicalMultipliers[activityLevel as keyof typeof medicalMultipliers] || 1.55);
  }
  
  private static calculateMedicalMacros(calories: number, goal: string, weight: number) {
    let proteinGrams;
    
    // Medical protein recommendations (not excessive bodybuilder amounts)
    switch (goal) {
      case 'weight_loss':
        proteinGrams = Math.min(weight * 1.6, 150); // 1.6g/kg max 150g
        break;
      case 'muscle_gain':
        proteinGrams = Math.min(weight * 2.0, 180); // 2.0g/kg max 180g
        break;
      default:
        proteinGrams = Math.min(weight * 1.2, 120); // 1.2g/kg max 120g
    }
    
    const proteinCalories = proteinGrams * 4;
    const fatCalories = calories * 0.25; // 25% from healthy fats
    const carbCalories = calories - proteinCalories - fatCalories;
    
    return {
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbCalories / 4),
      fat: Math.round(fatCalories / 9)
    };
  }
  
  private static calculateMicronutrientNeeds(weight: number, age: number, gender: string) {
    // RDA-based recommendations
    return {
      vitamin_c: gender === 'female' ? 75 : 90, // mg
      iron: gender === 'female' && age < 51 ? 18 : 8, // mg
      calcium: age > 50 ? 1200 : 1000, // mg
      fiber: Math.round(weight * 0.35) // grams - reasonable amount
    };
  }
  
  static analyzeMealPlan(mealPlan: any, profile: NutritionProfile): MealNutritionAnalysis {
    const totalNutrition = this.calculateTotalNutrition(mealPlan);
    
    const calorieBalance = (totalNutrition.calories / profile.targetCalories) * 100;
    const proteinAdequacy = (totalNutrition.protein / profile.macroTargets.protein) * 100;
    
    const macroBalance = {
      protein: (totalNutrition.protein * 4 / totalNutrition.calories) * 100,
      carbs: (totalNutrition.carbs * 4 / totalNutrition.calories) * 100,
      fat: (totalNutrition.fat * 9 / totalNutrition.calories) * 100
    };
    
    const nutritionScore = this.calculateNutritionScore(totalNutrition, profile);
    const recommendations = this.generateMedicalRecommendations(totalNutrition, profile, calorieBalance, proteinAdequacy);
    
    return {
      calorieBalance,
      proteinAdequacy,
      macroBalance,
      nutritionScore,
      recommendations
    };
  }
  
  static calculateTotalNutrition(mealPlan: any) {
    const meals = [mealPlan.breakfast, mealPlan.lunch, mealPlan.dinner, ...mealPlan.snacks];
    
    return meals.reduce((total, meal) => ({
      calories: total.calories + (meal?.calories || 0),
      protein: total.protein + (meal?.protein || 0),
      carbs: total.carbs + (meal?.carbs || 0),
      fat: total.fat + (meal?.fat || 0)
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  }
  
  private static calculateNutritionScore(nutrition: any, profile: NutritionProfile): number {
    let score = 100;
    
    // Reasonable scoring system
    const calorieDeviation = Math.abs(nutrition.calories - profile.targetCalories) / profile.targetCalories;
    score -= Math.min(calorieDeviation * 40, 40);
    
    const proteinDeviation = Math.abs(nutrition.protein - profile.macroTargets.protein) / profile.macroTargets.protein;
    score -= Math.min(proteinDeviation * 30, 30);
    
    return Math.max(0, Math.round(score));
  }
  
  private static generateMedicalRecommendations(nutrition: any, profile: NutritionProfile, calorieBalance: number, proteinAdequacy: number): string[] {
    const recommendations = [];
    
    if (calorieBalance < 85) {
      recommendations.push("Consider adding a healthy snack to meet your energy needs");
    } else if (calorieBalance > 115) {
      recommendations.push("Reduce portion sizes slightly to stay within calorie goals");
    }
    
    if (proteinAdequacy < 80) {
      recommendations.push("Add lean protein sources like chicken, fish, or legumes");
    } else if (proteinAdequacy > 120) {
      recommendations.push("Your protein intake is adequate - focus on variety");
    }
    
    if (recommendations.length === 0) {
      recommendations.push("Your nutrition is well-balanced for your goals");
    }
    
    return recommendations;
  }
}
