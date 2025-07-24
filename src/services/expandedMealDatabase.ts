import { Meal } from './enhancedMealService';

export const expandedMealDatabase: Meal[] = [
  // High-Protein Breakfast Options
  {
    id: 'protein-pancakes-1',
    title: 'Triple Protein Pancakes',
    image: '/images/meals/triple-protein-pancakes.jpg',
    calories: 650,
    protein: 45,
    carbs: 65,
    fat: 22,
    ingredients: [
      '2 scoops protein powder (240 calories, 40g protein, 4g carbs, 2g fat)',
      '1 cup oats (300 calories, 10g protein, 54g carbs, 5g fat)',
      '3 whole eggs (210 calories, 18g protein, 0g carbs, 15g fat)',
      '1 banana (105 calories, 1g protein, 27g carbs, 0g fat)',
      '1 cup almond milk (30 calories, 1g protein, 1g carbs, 2.5g fat)',
      '1 tsp vanilla extract (12 calories, 0g protein, 0.5g carbs, 0g fat)',
      '2 tbsp maple syrup (104 calories, 0g protein, 26g carbs, 0g fat)'
    ],
    instructions: [
      'Blend all ingredients until smooth',
      'Heat a non-stick pan over medium heat',
      'Pour 1/4 cup batter for each pancake',
      'Cook until bubbles form on top',
      'Flip and cook for another 1-2 minutes',
      'Serve with sugar-free syrup and fresh berries'
    ],
    type: 'breakfast',
    macros: {
      protein: 45,
      carbs: 65,
      fat: 22
    },
    micros: {
      fiber: 8,
      sugar: 12,
      sodium: 420,
      potassium: 680,
      calcium: 280,
      iron: 4.2
    }
  },
  {
    id: 'muscle-omelette-1',
    title: 'Muscle Building Omelette',
    image: '/images/meals/muscle-building-omelette.jpg',
    calories: 580,
    protein: 42,
    carbs: 15,
    fat: 35,
    ingredients: [
      '4 whole eggs (280 calories, 24g protein, 0g carbs, 20g fat)',
      '4 egg whites (68 calories, 14g protein, 0g carbs, 0g fat)',
      '1/2 cup cheddar cheese (220 calories, 14g protein, 1g carbs, 18g fat)',
      '2 cups spinach (14 calories, 2g protein, 2g carbs, 0g fat)',
      '1 cup mushrooms (21 calories, 3g protein, 3g carbs, 0g fat)',
      '2 tbsp olive oil (240 calories, 0g protein, 0g carbs, 28g fat)',
      '1/2 avocado (120 calories, 1g protein, 6g carbs, 11g fat)'
    ],
    instructions: [
      'Whisk eggs and egg whites together with salt and pepper',
      'Heat 1 tbsp olive oil in a large non-stick pan over medium heat',
      'Sauté mushrooms and spinach until tender',
      'Add remaining olive oil and pour in egg mixture',
      'When eggs start to set, add cheese',
      'Fold omelette in half',
      'Top with sliced avocado'
    ],
    type: 'breakfast',
    macros: {
      protein: 42,
      carbs: 15,
      fat: 35
    },
    micros: {
      fiber: 6,
      sugar: 2,
      sodium: 720,
      potassium: 850,
      calcium: 420,
      iron: 3.8
    }
  },
  {
    id: 'power-smoothie-1',
    title: 'Power Smoothie Bowl',
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop',
    calories: 450,
    protein: 28,
    carbs: 52,
    fat: 15,
    ingredients: ['protein powder', 'frozen berries', 'banana', 'greek yogurt', 'granola', 'chia seeds'],
    instructions: [
      'Blend protein powder, berries, banana and yogurt',
      'Pour into bowl',
      'Top with granola and chia seeds'
    ],
    type: 'breakfast'
  },

  // High-Calorie Lunch Options
  {
    id: 'chicken-rice-bowl-1',
    title: 'Muscle Gain Chicken Bowl',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    calories: 720,
    protein: 45,
    carbs: 68,
    fat: 22,
    ingredients: ['chicken breast', 'brown rice', 'sweet potato', 'broccoli', 'avocado', 'olive oil'],
    instructions: [
      'Grill seasoned chicken breast',
      'Steam broccoli and roast sweet potato',
      'Serve over brown rice with sliced avocado'
    ],
    type: 'lunch'
  },
  {
    id: 'salmon-quinoa-1',
    title: 'Salmon Power Bowl',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    calories: 650,
    protein: 42,
    carbs: 55,
    fat: 28,
    ingredients: ['salmon fillet', 'quinoa', 'asparagus', 'bell peppers', 'tahini', 'lemon'],
    instructions: [
      'Bake salmon with lemon and herbs',
      'Cook quinoa according to package',
      'Roast vegetables and drizzle with tahini'
    ],
    type: 'lunch'
  },
  {
    id: 'beef-stir-fry-1',
    title: 'Lean Beef Stir Fry',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    calories: 580,
    protein: 40,
    carbs: 45,
    fat: 24,
    ingredients: ['lean beef strips', 'mixed vegetables', 'jasmine rice', 'soy sauce', 'ginger', 'garlic'],
    instructions: [
      'Stir-fry beef strips until browned',
      'Add vegetables and seasonings',
      'Serve over steamed jasmine rice'
    ],
    type: 'lunch'
  },

  // High-Calorie Dinner Options
  {
    id: 'turkey-meatballs-1',
    title: 'Turkey Meatballs & Pasta',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
    calories: 780,
    protein: 48,
    carbs: 72,
    fat: 28,
    ingredients: ['ground turkey', 'whole wheat pasta', 'marinara sauce', 'mozzarella', 'basil', 'parmesan'],
    instructions: [
      'Form turkey into meatballs and bake',
      'Cook pasta according to package',
      'Combine with sauce and top with cheese'
    ],
    type: 'dinner'
  },
  {
    id: 'fish-tacos-1',
    title: 'Protein-Packed Fish Tacos',
    image: 'https://images.unsplash.com/photo-1565299585323-38174c26a933?w=400&h=300&fit=crop',
    calories: 620,
    protein: 38,
    carbs: 55,
    fat: 24,
    ingredients: ['white fish', 'corn tortillas', 'black beans', 'avocado', 'cabbage', 'lime'],
    instructions: [
      'Season and grill fish until flaky',
      'Warm tortillas and heat black beans',
      'Assemble tacos with toppings'
    ],
    type: 'dinner'
  },

  // High-Protein Snacks
  {
    id: 'protein-bars-1',
    title: 'Homemade Protein Bars',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    calories: 280,
    protein: 20,
    carbs: 25,
    fat: 12,
    ingredients: ['protein powder', 'oats', 'peanut butter', 'honey', 'dark chocolate chips'],
    instructions: [
      'Mix all ingredients in bowl',
      'Press into pan and refrigerate',
      'Cut into bars when firm'
    ],
    type: 'snacks'
  },
  {
    id: 'greek-yogurt-parfait-1',
    title: 'Greek Yogurt Parfait',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
    calories: 320,
    protein: 25,
    carbs: 35,
    fat: 8,
    ingredients: ['greek yogurt', 'mixed berries', 'granola', 'honey', 'almonds'],
    instructions: [
      'Layer yogurt in glass',
      'Add berries and granola',
      'Drizzle with honey and top with almonds'
    ],
    type: 'snacks'
  },
  {
    id: 'protein-smoothie-1',
    title: 'Post-Workout Protein Smoothie',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop',
    calories: 380,
    protein: 30,
    carbs: 42,
    fat: 8,
    ingredients: ['whey protein', 'banana', 'peanut butter', 'almond milk', 'oats', 'cinnamon'],
    instructions: [
      'Add all ingredients to blender',
      'Blend until smooth and creamy',
      'Serve immediately after workout'
    ],
    type: 'snacks'
  },

  // Weight Loss Options (Lower Calorie, High Protein)
  {
    id: 'egg-white-scramble-1',
    title: 'Veggie Egg White Scramble',
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop',
    calories: 180,
    protein: 22,
    carbs: 8,
    fat: 6,
    ingredients: ['egg whites', 'spinach', 'bell peppers', 'onions', 'mushrooms', 'cooking spray'],
    instructions: [
      'Spray pan with cooking spray',
      'Sauté vegetables until tender',
      'Add egg whites and scramble'
    ],
    type: 'breakfast'
  },
  {
    id: 'tuna-wrap-1',
    title: 'High-Protein Tuna Wrap',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop',
    calories: 290,
    protein: 28,
    carbs: 25,
    fat: 8,
    ingredients: ['canned tuna', 'whole wheat tortilla', 'lettuce', 'tomato', 'cucumber', 'mustard'],
    instructions: [
      'Drain tuna and mix with mustard',
      'Layer vegetables on tortilla',
      'Add tuna mixture and wrap tightly'
    ],
    type: 'lunch'
  }
];

// Combine with existing meals
export function getAllExpandedMeals(): Meal[] {
  return [...expandedMealDatabase];
}

export function getMealsByType(type: 'breakfast' | 'lunch' | 'dinner' | 'snacks'): Meal[] {
  const breakfastIds = ['protein-pancakes-1', 'muscle-omelette-1', 'power-smoothie-1', 'egg-white-scramble-1'];
  const lunchIds = ['chicken-rice-bowl-1', 'salmon-quinoa-1', 'beef-stir-fry-1', 'tuna-wrap-1'];
  const dinnerIds = ['turkey-meatballs-1', 'fish-tacos-1'];
  const snackIds = ['protein-bars-1', 'greek-yogurt-parfait-1', 'protein-smoothie-1'];

  let targetIds: string[] = [];
  switch (type) {
    case 'breakfast':
      targetIds = breakfastIds;
      break;
    case 'lunch':
      targetIds = lunchIds;
      break;
    case 'dinner':
      targetIds = dinnerIds;
      break;
    case 'snacks':
      targetIds = snackIds;
      break;
  }

  return expandedMealDatabase.filter(meal => targetIds.includes(meal.id));
}
