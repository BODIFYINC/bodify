export interface UserPreferences {
  dislikedFoods?: string;
  allergies?: string;
  dietaryRestrictions?: string;
  goal?: 'muscle_gain' | 'weight_loss' | 'maintenance';
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  gender?: 'male' | 'female';
}

export interface UserSettings extends UserPreferences {
  name: string;
  email: string;
  age: number;
  height: number;
  weight: number;
  daysPerWeek: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  bodyFat?: number;
  targetCalories?: number;
  targetProtein?: number;
  targetCarbs?: number;
  targetFat?: number;
} 