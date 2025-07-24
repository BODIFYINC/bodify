export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export interface Meal {
  id: string;
  name: string;
  title: string;
  image: string;
  type: MealType;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string[];
  completed?: boolean;
}

export interface MealPlan {
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
  snacks: Meal[];
} 