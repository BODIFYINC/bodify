import { AccurateNutritionTracker, UserProfile, NutritionTargets } from './accurateNutritionTracker';
import { Meal, MealType, MealPlan } from '../types/meal';
import { UserPreferences } from '../types/user';
import { generateMealImage, preloadMealImages } from './imageService';

// Define the meal database type (using the imported Meal type)
interface MealDatabase {
  weight_loss: {
    breakfast: Meal[];
    lunch: Meal[];
    dinner: Meal[];
    snacks: Meal[];
  };
  muscle_gain: {
    breakfast: Meal[];
    lunch: Meal[];
    dinner: Meal[];
    snacks: Meal[];
  };
}

// Enhanced meal database with extensive food options and snacks
const mealDatabase: MealDatabase = {
  weight_loss: {
    breakfast: [
      { 
        id: '1', 
        title: 'Greek Yogurt Berry Bowl', 
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
        calories: 280,
        protein: 20,
        carbs: 35,
        fat: 8,
        ingredients: ['Greek yogurt', 'Mixed berries', 'Honey', 'Granola'],
        instructions: ['Mix Greek yogurt with a drizzle of honey', 'Top with fresh mixed berries', 'Sprinkle granola on top', 'Serve immediately'],
        name: 'Greek Yogurt Berry Bowl',
        type: 'breakfast'
      },
      { 
        id: '2', 
        title: 'Avocado Toast with Egg', 
        image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
        calories: 320,
        protein: 18,
        carbs: 25,
        fat: 18,
        ingredients: ['Avocado', 'Whole grain bread', 'Egg', 'Salt', 'Pepper', 'Lemon juice'],
        instructions: ['Toast whole grain bread until golden', 'Mash avocado with salt, pepper, and lemon juice', 'Cook egg to your liking', 'Spread avocado on toast and top with egg'],
        name: 'Avocado Toast with Egg',
        type: 'breakfast'
      },
      {
        id: '15',
        title: 'Protein Smoothie Bowl',
        image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop',
        calories: 250,
        protein: 25,
        carbs: 20,
        fat: 10,
        ingredients: ['Protein powder', 'Frozen berries', 'Spinach', 'Almond milk', 'Chia seeds'],
        instructions: ['Blend protein powder, frozen berries, spinach, and almond milk', 'Pour into bowl', 'Top with chia seeds and fresh berries', 'Enjoy immediately'],
        name: 'Protein Smoothie Bowl',
        type: 'breakfast'
      },
      {
        id: '25',
        title: 'Oatmeal with Berries',
        image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=400&h=300&fit=crop',
        calories: 220,
        protein: 8,
        carbs: 42,
        fat: 4,
        ingredients: ['Rolled oats', 'Blueberries', 'Strawberries', 'Cinnamon', 'Almond milk'],
        instructions: ['Cook oats with almond milk', 'Add cinnamon while cooking', 'Top with fresh berries', 'Serve warm'],
        name: 'Oatmeal with Berries',
        type: 'breakfast'
      },
      {
        id: '35',
        title: 'Veggie Omelet',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
        calories: 300,
        protein: 22,
        carbs: 8,
        fat: 20,
        ingredients: ['Eggs', 'Bell peppers', 'Spinach', 'Mushrooms', 'Cheese'],
        instructions: ['Beat eggs in a bowl', 'Sauté vegetables until tender', 'Pour eggs over vegetables', 'Add cheese and fold omelet'],
        name: 'Veggie Omelet',
        type: 'breakfast'
      },
      {
        id: '46',
        title: 'Protein-Packed Breakfast Burrito',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        calories: 380,
        protein: 28,
        carbs: 35,
        fat: 15,
        ingredients: ['Egg whites', 'Black beans', 'Whole wheat tortilla', 'Avocado', 'Salsa', 'Spinach'],
        instructions: ['Scramble egg whites with spinach', 'Warm black beans', 'Fill tortilla with eggs, beans, and avocado', 'Top with salsa'],
        name: 'Protein-Packed Breakfast Burrito',
        type: 'breakfast'
      },
      {
        id: '47',
        title: 'Chia Seed Pudding',
        image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
        calories: 250,
        protein: 12,
        carbs: 30,
        fat: 10,
        ingredients: ['Chia seeds', 'Almond milk', 'Vanilla extract', 'Berries', 'Honey'],
        instructions: ['Mix chia seeds with almond milk and vanilla', 'Refrigerate overnight', 'Top with berries and honey'],
        name: 'Chia Seed Pudding',
        type: 'breakfast'
      }
    ],
    lunch: [
      {
        id: '3', 
        title: 'Turkey and Quinoa Bowl', 
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
        calories: 420,
        protein: 30,
        carbs: 40,
        fat: 15,
        ingredients: ['Ground turkey', 'Quinoa', 'Black beans', 'Bell peppers', 'Salsa'],
        instructions: ['Cook quinoa according to package instructions', 'Brown ground turkey with seasonings', 'Sauté bell peppers', 'Combine all ingredients and top with salsa'],
        name: 'Turkey and Quinoa Bowl',
        type: 'lunch'
      },
      {
        id: '26',
        title: 'Tuna and White Bean Salad',
        image: 'https://images.unsplash.com/photo-1505253213348-cd4c88c9f27b?w=400&h=300&fit=crop',
        calories: 350,
        protein: 28,
        carbs: 30,
        fat: 12,
        ingredients: ['Tuna', 'White beans', 'Red onion', 'Parsley', 'Lemon', 'Olive oil'],
        instructions: ['Drain and rinse white beans', 'Mix tuna with beans and diced red onion', 'Add fresh parsley and lemon juice', 'Drizzle with olive oil'],
        name: 'Tuna and White Bean Salad',
        type: 'lunch'
      },
      {
        id: '36',
        title: 'Chicken Wrap',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        calories: 340,
        protein: 25,
        carbs: 35,
        fat: 12,
        ingredients: ['Whole wheat tortilla', 'Grilled chicken', 'Lettuce', 'Tomato', 'Hummus'],
        instructions: ['Warm tortilla slightly', 'Spread hummus on tortilla', 'Add chicken and vegetables', 'Roll tightly and slice in half'],
        name: 'Chicken Wrap',
        type: 'lunch'
      },
      {
        id: '45',
        title: 'Lentil Soup',
        image: 'https://images.unsplash.com/photo-1560039588-85d8d61a0e0b?w=400&h=300&fit=crop',
        calories: 300,
        protein: 18,
        carbs: 40,
        fat: 8,
        ingredients: ['Lentils', 'Carrots', 'Celery', 'Onion', 'Tomato paste', 'Vegetable broth', 'Herbs'],
        instructions: ['Sauté vegetables', 'Add lentils, tomato paste, and broth', 'Bring to a boil, then simmer until lentils are tender', 'Season with herbs'],
        name: 'Lentil Soup',
        type: 'lunch'
      },
      {
        id: '48',
        title: 'Mediterranean Quinoa Bowl',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
        calories: 420,
        protein: 22,
        carbs: 45,
        fat: 18,
        ingredients: ['Quinoa', 'Chickpeas', 'Cucumber', 'Tomatoes', 'Feta cheese', 'Olive oil', 'Lemon'],
        instructions: ['Cook quinoa', 'Combine with chickpeas and vegetables', 'Top with feta cheese', 'Drizzle with olive oil and lemon'],
        name: 'Mediterranean Quinoa Bowl',
        type: 'lunch'
      },
      {
        id: '52',
        title: 'Asian-Inspired Tofu Bowl',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        calories: 380,
        protein: 20,
        carbs: 40,
        fat: 15,
        ingredients: ['Tofu', 'Brown rice', 'Broccoli', 'Carrots', 'Soy sauce', 'Ginger', 'Sesame oil'],
        instructions: ['Press and cube tofu', 'Cook brown rice', 'Stir-fry vegetables with ginger', 'Combine and drizzle with soy sauce and sesame oil'],
        name: 'Asian-Inspired Tofu Bowl',
        type: 'lunch'
      }
    ],
    dinner: [
      { 
        id: '4', 
        title: 'Baked Salmon with Vegetables', 
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
        calories: 420,
        protein: 40,
        carbs: 20,
        fat: 22,
        ingredients: ['Salmon fillet', 'Broccoli', 'Bell peppers', 'Olive oil', 'Lemon', 'Herbs'],
        instructions: ['Preheat oven to 400°F (200°C)', 'Season salmon and vegetables with olive oil and herbs', 'Bake for 20 minutes', 'Serve with lemon wedges'],
        name: 'Baked Salmon with Vegetables',
        type: 'dinner'
      },
      {
        id: '17',
        title: 'Zucchini Noodles with Chicken',
        image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop',
        calories: 350,
        protein: 32,
        carbs: 12,
        fat: 18,
        ingredients: ['Zucchini', 'Chicken breast', 'Cherry tomatoes', 'Pesto', 'Parmesan cheese'],
        instructions: ['Spiralize zucchini into noodles', 'Cook chicken breast and slice', 'Sauté cherry tomatoes', 'Toss zucchini noodles with pesto, top with chicken and tomatoes'],
        name: 'Zucchini Noodles with Chicken',
        type: 'dinner'
      },
      {
        id: '27',
        title: 'Cauliflower Rice Bowl',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        calories: 320,
        protein: 25,
        carbs: 18,
        fat: 15,
        ingredients: ['Cauliflower rice', 'Lean beef', 'Mixed vegetables', 'Soy sauce', 'Ginger'],
        instructions: ['Pulse cauliflower in food processor to make rice', 'Stir-fry beef with ginger', 'Add mixed vegetables and cauliflower rice', 'Season with soy sauce'],
        name: 'Cauliflower Rice Bowl',
        type: 'dinner'
      },
      {
        id: '37',
        title: 'Grilled Fish with Asparagus',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
        calories: 380,
        protein: 35,
        carbs: 15,
        fat: 18,
        ingredients: ['White fish fillet', 'Asparagus', 'Lemon', 'Garlic', 'Olive oil'],
        instructions: ['Season fish with lemon and garlic', 'Grill fish until flaky', 'Steam asparagus until tender', 'Drizzle with olive oil before serving'],
        name: 'Grilled Fish with Asparagus',
        type: 'dinner'
      },
      {
        id: '53',
        title: 'Baked Chicken with Roasted Vegetables',
        image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba212?w=400&h=300&fit=crop',
        calories: 450,
        protein: 42,
        carbs: 25,
        fat: 20,
        ingredients: ['Chicken breast', 'Sweet potato', 'Brussels sprouts', 'Olive oil', 'Herbs'],
        instructions: ['Season chicken with herbs', 'Roast vegetables with olive oil', 'Bake chicken until cooked through', 'Serve together'],
        name: 'Baked Chicken with Roasted Vegetables',
        type: 'dinner'
      },
      {
        id: '54',
        title: 'Shrimp and Vegetable Stir-Fry',
        image: 'https://images.unsplash.com/photo-1619856641368-a417c3a54779?w=400&h=300&fit=crop',
        calories: 380,
        protein: 35,
        carbs: 30,
        fat: 12,
        ingredients: ['Shrimp', 'Broccoli', 'Bell peppers', 'Snap peas', 'Soy sauce', 'Ginger', 'Garlic'],
        instructions: ['Stir-fry shrimp until pink', 'Add vegetables and stir-fry until crisp-tender', 'Season with soy sauce, ginger, and garlic'],
        name: 'Shrimp and Vegetable Stir-Fry',
        type: 'dinner'
      }
    ],
    snacks: [
      {
        id: '18',
        title: 'Apple with Almond Butter',
        image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=300&fit=crop',
        calories: 190,
        protein: 6,
        carbs: 20,
        fat: 12,
        ingredients: ['Apple', 'Almond butter'],
        instructions: ['Slice apple', 'Serve with 2 tablespoons almond butter'],
        name: 'Apple with Almond Butter',
        type: 'snacks'
      },
      {
        id: '19',
        title: 'Cucumber Hummus Bites',
        image: 'https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?w=400&h=300&fit=crop',
        calories: 120,
        protein: 5,
        carbs: 12,
        fat: 6,
        ingredients: ['Cucumber', 'Hummus', 'Cherry tomatoes'],
        instructions: ['Slice cucumber into rounds', 'Top each slice with hummus', 'Garnish with cherry tomato'],
        name: 'Cucumber Hummus Bites',
        type: 'snacks'
      },
      {
        id: '28',
        title: 'Greek Yogurt with Berries',
        image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
        calories: 140,
        protein: 15,
        carbs: 18,
        fat: 2,
        ingredients: ['Greek yogurt', 'Mixed berries', 'Honey'],
        instructions: ['Add berries to Greek yogurt', 'Drizzle with honey', 'Mix and enjoy'],
        name: 'Greek Yogurt with Berries',
        type: 'snacks'
      },
      {
        id: '29',
        title: 'Celery with Peanut Butter',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&h=300&fit=crop',
        calories: 160,
        protein: 7,
        carbs: 8,
        fat: 14,
        ingredients: ['Celery sticks', 'Natural peanut butter'],
        instructions: ['Wash and cut celery into sticks', 'Spread peanut butter on celery', 'Enjoy immediately'],
        name: 'Celery with Peanut Butter',
        type: 'snacks'
      },
      {
        id: '38',
        title: 'Rice Cakes with Cottage Cheese',
        image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
        calories: 110,
        protein: 8,
        carbs: 15,
        fat: 2,
        ingredients: ['Rice cakes', 'Cottage cheese', 'Cucumber'],
        instructions: ['Top rice cakes with cottage cheese', 'Add cucumber slices', 'Season with salt and pepper'],
        name: 'Rice Cakes with Cottage Cheese',
        type: 'snacks'
      },
      {
        id: '39',
        title: 'Hard-Boiled Egg',
        image: 'https://images.unsplash.com/photo-1582169296170-65aaae93c2e6?w=400&h=300&fit=crop',
        calories: 70,
        protein: 6,
        carbs: 1,
        fat: 5,
        ingredients: ['Egg', 'Salt', 'Pepper'],
        instructions: ['Boil egg for 8-10 minutes', 'Cool in cold water', 'Peel and season with salt and pepper'],
        name: 'Hard-Boiled Egg',
        type: 'snacks'
      },
      {
        id: '55',
        title: 'Protein-Packed Energy Bites',
        image: 'https://images.unsplash.com/photo-1599909533730-ba0d99e51555?w=400&h=300&fit=crop',
        calories: 180,
        protein: 10,
        carbs: 15,
        fat: 8,
        ingredients: ['Oats', 'Protein powder', 'Almond butter', 'Honey', 'Dark chocolate chips'],
        instructions: ['Mix all ingredients', 'Form into balls', 'Refrigerate for 30 minutes'],
        name: 'Protein-Packed Energy Bites',
        type: 'snacks'
      },
      {
        id: '56',
        title: 'Cucumber and Hummus Roll-Ups',
        image: 'https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?w=400&h=300&fit=crop',
        calories: 120,
        protein: 6,
        carbs: 12,
        fat: 5,
        ingredients: ['Cucumber', 'Hummus', 'Carrots', 'Whole wheat tortilla'],
        instructions: ['Spread hummus on tortilla', 'Add cucumber and carrot slices', 'Roll up and slice'],
        name: 'Cucumber and Hummus Roll-Ups',
        type: 'snacks'
      }
    ]
  },
  muscle_gain: {
    breakfast: [
      { 
        id: '5', 
        title: 'Protein Pancakes', 
        image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop',
        calories: 450,
        protein: 35,
        carbs: 40,
        fat: 15,
        ingredients: ['Protein powder', 'Oats', 'Banana', 'Eggs', 'Milk', 'Maple syrup'],
        instructions: ['Blend all ingredients until smooth', 'Cook pancakes on medium heat', 'Stack and serve with maple syrup', 'Top with sliced banana'],
        name: 'Protein Pancakes',
        type: 'breakfast'
      },
      {
        id: '20',
        title: 'Overnight Oats with Peanut Butter',
        image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
        calories: 520,
        protein: 25,
        carbs: 55,
        fat: 22,
        ingredients: ['Rolled oats', 'Peanut butter', 'Banana', 'Milk', 'Honey', 'Chia seeds'],
        instructions: ['Mix oats, milk, peanut butter, and honey', 'Add chia seeds and stir', 'Refrigerate overnight', 'Top with sliced banana before serving'],
        name: 'Overnight Oats with Peanut Butter',
        type: 'breakfast'
      },
      {
        id: '30',
        title: 'Scrambled Eggs with Toast',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
        calories: 480,
        protein: 28,
        carbs: 35,
        fat: 24,
        ingredients: ['Eggs', 'Whole grain bread', 'Butter', 'Cheese', 'Spinach'],
        instructions: ['Scramble eggs with butter', 'Add spinach and cheese', 'Toast bread until golden', 'Serve eggs with toast'],
        name: 'Scrambled Eggs with Toast',
        type: 'breakfast'
      },
      {
        id: '40',
        title: 'Breakfast Burrito',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        calories: 550,
        protein: 30,
        carbs: 45,
        fat: 28,
        ingredients: ['Large tortilla', 'Scrambled eggs', 'Black beans', 'Cheese', 'Avocado', 'Salsa'],
        instructions: ['Scramble eggs with cheese', 'Warm black beans', 'Fill tortilla with ingredients', 'Roll tightly and serve'],
        name: 'Breakfast Burrito',
        type: 'breakfast'
      },
      {
        id: '57',
        title: 'Power Protein Breakfast Bowl',
        image: 'https://images.unsplash.com/photo-1547496502-affa22d38ae5?w=400&h=300&fit=crop',
        calories: 650,
        protein: 45,
        carbs: 60,
        fat: 25,
        ingredients: ['Eggs', 'Sweet potato', 'Avocado', 'Black beans', 'Salsa', 'Cheese'],
        instructions: ['Cook eggs to preference', 'Roast sweet potato', 'Combine all ingredients in bowl', 'Top with salsa and cheese'],
        name: 'Power Protein Breakfast Bowl',
        type: 'breakfast'
      },
      {
        id: '58',
        title: 'Protein-Packed French Toast',
        image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
        calories: 580,
        protein: 35,
        carbs: 55,
        fat: 28,
        ingredients: ['Whole grain bread', 'Eggs', 'Protein powder', 'Cinnamon', 'Maple syrup', 'Berries'],
        instructions: ['Mix eggs with protein powder and cinnamon', 'Dip bread in mixture', 'Cook until golden', 'Top with berries and syrup'],
        name: 'Protein-Packed French Toast',
        type: 'breakfast'
      }
    ],
    lunch: [
      { 
        id: '6', 
        title: 'Turkey and Rice Bowl', 
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
        calories: 580,
        protein: 45,
        carbs: 60,
        fat: 18,
        ingredients: ['Ground turkey', 'Brown rice', 'Black beans', 'Avocado', 'Salsa', 'Cheese'],
        instructions: ['Cook brown rice', 'Brown ground turkey with spices', 'Warm black beans', 'Assemble bowl with all ingredients'],
        name: 'Turkey and Rice Bowl',
        type: 'lunch'
      },
      {
        id: '21',
        title: 'Chicken and Sweet Potato',
        image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop',
        calories: 650,
        protein: 50,
        carbs: 65,
        fat: 20,
        ingredients: ['Chicken breast', 'Sweet potato', 'Broccoli', 'Olive oil', 'Herbs'],
        instructions: ['Bake sweet potato until tender', 'Grill seasoned chicken breast', 'Steam broccoli', 'Serve together with olive oil drizzle'],
        name: 'Chicken and Sweet Potato',
        type: 'lunch'
      },
      {
        id: '31',
        title: 'Beef and Pasta Bowl',
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
        calories: 720,
        protein: 48,
        carbs: 70,
        fat: 25,
        ingredients: ['Lean ground beef', 'Whole wheat pasta', 'Marinara sauce', 'Parmesan', 'Basil'],
        instructions: ['Cook pasta according to package directions', 'Brown ground beef', 'Mix with marinara sauce', 'Serve over pasta with Parmesan'],
        name: 'Beef and Pasta Bowl',
        type: 'lunch'
      },
      {
        id: '41',
        title: 'Chicken Caesar Wrap',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        calories: 620,
        protein: 42,
        carbs: 38,
        fat: 32,
        ingredients: ['Large tortilla', 'Grilled chicken', 'Romaine lettuce', 'Caesar dressing', 'Parmesan', 'Croutons'],
        instructions: ['Grill chicken and slice', 'Toss lettuce with dressing', 'Add chicken and croutons to tortilla', 'Roll and slice in half'],
        name: 'Chicken Caesar Wrap',
        type: 'lunch'
      },
      {
        id: '49',
        title: 'Salmon with Brown Rice and Asparagus',
        image: 'https://images.unsplash.com/photo-1532509283613-d3d204f5d6f?w=400&h=300&fit=crop',
        calories: 600,
        protein: 45,
        carbs: 50,
        fat: 25,
        ingredients: ['Salmon fillet', 'Brown rice', 'Asparagus', 'Olive oil', 'Lemon'],
        instructions: ['Cook brown rice', 'Season and bake salmon', 'Roast asparagus with olive oil and lemon', 'Serve together'],
        name: 'Salmon with Brown Rice and Asparagus',
        type: 'lunch'
      },
      {
        id: '59',
        title: 'Beef and Rice Power Bowl',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
        calories: 720,
        protein: 55,
        carbs: 65,
        fat: 28,
        ingredients: ['Lean ground beef', 'Brown rice', 'Broccoli', 'Carrots', 'Soy sauce', 'Sesame oil'],
        instructions: ['Cook brown rice', 'Brown ground beef with seasonings', 'Steam vegetables', 'Combine and drizzle with sauce'],
        name: 'Beef and Rice Power Bowl',
        type: 'lunch'
      },
      {
        id: '60',
        title: 'Chicken and Sweet Potato Hash',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        calories: 680,
        protein: 48,
        carbs: 58,
        fat: 30,
        ingredients: ['Chicken breast', 'Sweet potato', 'Bell peppers', 'Onion', 'Eggs', 'Avocado'],
        instructions: ['Dice and cook sweet potato', 'Add chicken and vegetables', 'Top with fried eggs and avocado'],
        name: 'Chicken and Sweet Potato Hash',
        type: 'lunch'
      }
    ],
    dinner: [
      { 
        id: '7', 
        title: 'Steak with Sweet Potato', 
        image: 'https://images.unsplash.com/photo-1448043552756-e747b7a2b2b8?w=400&h=300&fit=crop',
        calories: 650,
        protein: 50,
        carbs: 45,
        fat: 25,
        ingredients: ['Lean steak', 'Sweet potato', 'Asparagus', 'Garlic', 'Herbs', 'Butter'],
        instructions: ['Season and grill steak to desired doneness', 'Roast sweet potato with herbs', 'Sauté asparagus with garlic', 'Plate and serve with herb butter'],
        name: 'Steak with Sweet Potato',
        type: 'dinner'
      },
      {
        id: '22',
        title: 'Salmon with Pasta',
        image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop',
        calories: 720,
        protein: 45,
        carbs: 60,
        fat: 28,
        ingredients: ['Salmon fillet', 'Whole wheat pasta', 'Spinach', 'Cream sauce', 'Parmesan'],
        instructions: ['Cook pasta according to package directions', 'Pan-sear salmon until flaky', 'Prepare cream sauce with spinach', 'Combine and top with Parmesan'],
        name: 'Salmon with Pasta',
        type: 'dinner'
      },
      {
        id: '32',
        title: 'Chicken Burrito Bowl',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        calories: 680,
        protein: 52,
        carbs: 55,
        fat: 24,
        ingredients: ['Chicken thighs', 'Brown rice', 'Black beans', 'Corn', 'Avocado', 'Salsa'],
        instructions: ['Grill seasoned chicken thighs', 'Cook brown rice with spices', 'Warm black beans with corn', 'Assemble bowl with toppings'],
        name: 'Chicken Burrito Bowl',
        type: 'dinner'
      },
      {
        id: '50',
        title: 'Beef Stir-fry with Quinoa',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
        calories: 680,
        protein: 50,
        carbs: 60,
        fat: 20,
        ingredients: ['Beef strips', 'Quinoa', 'Broccoli', 'Carrots', 'Soy sauce', 'Ginger', 'Garlic'],
        instructions: ['Cook quinoa', 'Stir-fry beef with ginger and garlic', 'Add vegetables and stir-fry until tender-crisp', 'Add soy sauce and serve over quinoa'],
        name: 'Beef Stir-fry with Quinoa',
        type: 'dinner'
      },
      {
        id: '61',
        title: 'Protein-Packed Pasta Bowl',
        image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&h=300&fit=crop',
        calories: 780,
        protein: 52,
        carbs: 75,
        fat: 32,
        ingredients: ['Whole wheat pasta', 'Ground turkey', 'Marinara sauce', 'Mozzarella', 'Parmesan', 'Basil'],
        instructions: ['Cook pasta', 'Brown turkey with seasonings', 'Combine with sauce', 'Top with cheeses and basil'],
        name: 'Protein-Packed Pasta Bowl',
        type: 'dinner'
      },
      {
        id: '62',
        title: 'Steak and Potato Power Plate',
        image: 'https://images.unsplash.com/photo-1448043552756-e747b7a2b2b8?w=400&h=300&fit=crop',
        calories: 850,
        protein: 65,
        carbs: 60,
        fat: 40,
        ingredients: ['Ribeye steak', 'Russet potatoes', 'Asparagus', 'Garlic butter', 'Herbs'],
        instructions: ['Grill steak to preference', 'Roast potatoes with herbs', 'Sauté asparagus', 'Serve with garlic butter'],
        name: 'Steak and Potato Power Plate',
        type: 'dinner'
      }
    ],
    snacks: [
      {
        id: '23',
        title: 'Protein Smoothie',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&h=300&fit=crop',
        calories: 350,
        protein: 30,
        carbs: 35,
        fat: 12,
        ingredients: ['Protein powder', 'Banana', 'Peanut butter', 'Milk', 'Oats'],
        instructions: ['Blend all ingredients until smooth', 'Add ice if desired', 'Serve immediately'],
        name: 'Protein Smoothie',
        type: 'snacks'
      },
      {
        id: '24',
        title: 'Trail Mix',
        image: 'https://images.unsplash.com/photo-1599909533730-ba0d99e51555?w=400&h=300&fit=crop',
        calories: 280,
        protein: 12,
        carbs: 25,
        fat: 18,
        ingredients: ['Mixed nuts', 'Dried fruits', 'Dark chocolate chips'],
        instructions: ['Mix equal parts nuts, dried fruit, and chocolate chips', 'Store in airtight container', 'Enjoy 1/4 cup serving'],
        name: 'Trail Mix',
        type: 'snacks'
      },
      {
        id: '33',
        title: 'Cottage Cheese with Fruit',
        image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
        calories: 220,
        protein: 20,
        carbs: 18,
        fat: 8,
        ingredients: ['Cottage cheese', 'Pineapple', 'Almonds', 'Honey'],
        instructions: ['Add pineapple chunks to cottage cheese', 'Top with chopped almonds', 'Drizzle with honey'],
        name: 'Cottage Cheese with Fruit',
        type: 'snacks'
      },
      {
        id: '34',
        title: 'Protein Energy Balls',
        image: 'https://images.unsplash.com/photo-1599909533730-ba0d99e51555?w=400&h=300&fit=crop',
        calories: 180,
        protein: 8,
        carbs: 20,
        fat: 8,
        ingredients: ['Protein powder', 'Oats', 'Peanut butter', 'Honey', 'Chia seeds'],
        instructions: ['Mix all ingredients in a bowl', 'Roll into small balls', 'Refrigerate for 30 minutes', 'Store in fridge'],
        name: 'Protein Energy Balls',
        type: 'snacks'
      },
      {
        id: '43',
        title: 'Tuna and Crackers',
        image: 'https://images.unsplash.com/photo-1505253213348-cd4c88c9f27b?w=400&h=300&fit=crop',
        calories: 240,
        protein: 22,
        carbs: 18,
        fat: 10,
        ingredients: ['Tuna', 'Whole grain crackers', 'Avocado', 'Lemon'],
        instructions: ['Mix tuna with mashed avocado', 'Add lemon juice', 'Serve on crackers'],
        name: 'Tuna and Crackers',
        type: 'snacks'
      },
      {
        id: '44',
        title: 'Chocolate Protein Shake',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&h=300&fit=crop',
        calories: 320,
        protein: 28,
        carbs: 30,
        fat: 10,
        ingredients: ['Chocolate protein powder', 'Banana', 'Milk', 'Cocoa powder'],
        instructions: ['Blend all ingredients until smooth', 'Add ice for thickness', 'Enjoy immediately'],
        name: 'Chocolate Protein Shake',
        type: 'snacks'
      },
      {
        id: '63',
        title: 'Protein-Packed Trail Mix',
        image: 'https://images.unsplash.com/photo-1599909533730-ba0d99e51555?w=400&h=300&fit=crop',
        calories: 320,
        protein: 15,
        carbs: 25,
        fat: 20,
        ingredients: ['Mixed nuts', 'Protein granola', 'Dark chocolate', 'Dried fruit', 'Pumpkin seeds'],
        instructions: ['Combine all ingredients', 'Store in airtight container'],
        name: 'Protein-Packed Trail Mix',
        type: 'snacks'
      },
      {
        id: '64',
        title: 'Greek Yogurt Parfait',
        image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
        calories: 380,
        protein: 28,
        carbs: 35,
        fat: 15,
        ingredients: ['Greek yogurt', 'Protein granola', 'Mixed berries', 'Honey', 'Almonds'],
        instructions: ['Layer yogurt, granola, and berries', 'Top with honey and almonds'],
        name: 'Greek Yogurt Parfait',
        type: 'snacks'
      }
    ]
  }
};

// Helper function to get today's date string
const getTodayString = () => new Date().toISOString().split('T')[0];

// Helper function to get the storage key for daily meal progress
const getDailyProgressKey = () => `mealProgress_${getTodayString()}`;

// Save meal progress to localStorage
export const saveMealProgress = (mealId: string, completed: boolean) => {
  const key = getDailyProgressKey();
  const progress = JSON.parse(localStorage.getItem(key) || '{}');
  progress[mealId] = completed;
  localStorage.setItem(key, JSON.stringify(progress));
  
  // Save to persistent history
  const historyKey = 'mealProgressHistory';
  const history = JSON.parse(localStorage.getItem(historyKey) || '{}');
  const today = getTodayString();
  history[today] = progress;
  localStorage.setItem(historyKey, JSON.stringify(history));
};

// Get today's meal progress
export const getMealProgress = () => {
  const key = getDailyProgressKey();
  return JSON.parse(localStorage.getItem(key) || '{}');
};

export const getProgressHistory = () => {
  const historyKey = 'mealProgressHistory';
  return JSON.parse(localStorage.getItem(historyKey) || '{}');
};

// Function to clear only the current day's progress
export const clearCurrentDayProgress = () => {
  const key = getDailyProgressKey();
  localStorage.removeItem(key);
};

// Function to clear all meal progress history
export const clearAllProgress = () => {
    localStorage.removeItem('mealProgressHistory');
    // Also clear the current day's progress key, just in case
    clearCurrentDayProgress();
};

// Helper function to normalize text for matching
const normalizeText = (text: string): string => {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ')        // Normalize spaces
    .trim();
};

// Helper function to check if text contains any variations of a term
const hasVariation = (text: string, term: string): boolean => {
  const normalizedText = normalizeText(text);
  const normalizedTerm = normalizeText(term);

  // Common variations and related terms
  const variations: { [key: string]: string[] } = {
    // Dairy variations
    'milk': ['dairy', 'cream', 'butter', 'cheese', 'yogurt', 'whey', 'lactose', 'milk powder', 'condensed milk', 'evaporated milk', 'buttermilk', 'skim milk', 'whole milk', '2% milk', '1% milk'],
    'cheese': ['dairy', 'cheddar', 'mozzarella', 'parmesan', 'gouda', 'brie', 'feta', 'ricotta', 'cottage cheese', 'cream cheese', 'swiss', 'provolone', 'blue cheese', 'goat cheese', 'string cheese', 'queso'],
    'yogurt': ['dairy', 'greek yogurt', 'yoghurt', 'curd', 'kefir', 'sour cream', 'creme fraiche', 'strained yogurt', 'plain yogurt', 'flavored yogurt'],
    
    // Meat variations
    'beef': ['cow', 'steak', 'burger', 'ground beef', 'minced beef', 'roast beef', 'beef patty', 'beef mince', 'beef tenderloin', 'beef sirloin', 'beef ribeye', 'beef chuck', 'beef brisket', 'beef shank', 'beef short ribs'],
    'pork': ['pig', 'bacon', 'ham', 'sausage', 'pork chop', 'pork loin', 'pork belly', 'pork shoulder', 'pork tenderloin', 'pork ribs', 'pork mince', 'ground pork', 'pork sausage', 'pork roast'],
    'chicken': ['poultry', 'hen', 'breast', 'thigh', 'wing', 'drumstick', 'chicken meat', 'chicken breast', 'chicken thigh', 'chicken wing', 'chicken leg', 'chicken tender', 'chicken strip', 'chicken nugget', 'chicken patty'],
    'fish': ['seafood', 'salmon', 'tuna', 'cod', 'tilapia', 'trout', 'bass', 'halibut', 'mackerel', 'sardine', 'anchovy', 'swordfish', 'mahi mahi', 'sea bass', 'flounder', 'sole', 'catfish', 'snapper'],
    'turkey': ['turkey breast', 'turkey thigh', 'ground turkey', 'turkey mince', 'turkey patty', 'turkey sausage', 'turkey bacon', 'turkey ham'],
    
    // Nut variations
    'peanut': ['peanuts', 'peanut butter', 'groundnut', 'peanut oil', 'peanut flour', 'peanut protein', 'peanut pieces', 'peanut chunks', 'peanut bits'],
    'almond': ['almonds', 'almond milk', 'almond butter', 'almond flour', 'almond oil', 'almond extract', 'almond pieces', 'almond slivers', 'almond chunks'],
    'walnut': ['walnuts', 'walnut oil', 'walnut pieces', 'walnut halves', 'walnut chunks', 'walnut bits'],
    'cashew': ['cashews', 'cashew butter', 'cashew milk', 'cashew pieces', 'cashew chunks', 'cashew bits'],
    'pistachio': ['pistachios', 'pistachio butter', 'pistachio milk', 'pistachio pieces', 'pistachio chunks'],
    
    // Grain variations
    'wheat': ['flour', 'bread', 'pasta', 'cereal', 'wheat flour', 'whole wheat', 'wheat germ', 'wheat bran', 'wheat berries', 'wheat pasta', 'wheat bread'],
    'rice': ['white rice', 'brown rice', 'basmati', 'jasmine rice', 'wild rice', 'rice flour', 'rice noodles', 'rice paper', 'rice vinegar', 'rice wine', 'rice milk', 'rice cereal'],
    'oats': ['oatmeal', 'rolled oats', 'steel cut oats', 'quick oats', 'instant oats', 'oat flour', 'oat milk', 'oat bran', 'oat groats'],
    'quinoa': ['quinoa flakes', 'quinoa flour', 'quinoa pasta', 'quinoa cereal', 'quinoa puffs'],
    
    // Common allergens
    'egg': ['eggs', 'egg white', 'egg yolk', 'egg powder', 'egg substitute', 'egg replacer', 'egg protein', 'egg noodles', 'egg pasta'],
    'soy': ['soya', 'soybean', 'tofu', 'edamame', 'soy milk', 'soy sauce', 'soy protein', 'soy flour', 'soy oil', 'soy lecithin', 'soy isolate'],
    'shellfish': ['shrimp', 'crab', 'lobster', 'prawn', 'crayfish', 'crawfish', 'langoustine', 'scallop', 'mussel', 'clam', 'oyster', 'squid', 'octopus'],
    'tree nuts': ['almond', 'walnut', 'cashew', 'pistachio', 'pecan', 'macadamia', 'brazil nut', 'hazelnut', 'pine nut', 'chestnut'],
    
    // Common dislikes
    'spicy': ['hot', 'chili', 'pepper', 'spice', 'jalapeno', 'habanero', 'cayenne', 'red pepper', 'black pepper', 'white pepper', 'chili powder', 'hot sauce', 'sriracha', 'tabasco'],
    'sweet': ['sugar', 'honey', 'syrup', 'sweetener', 'maple syrup', 'agave', 'stevia', 'sucralose', 'aspartame', 'saccharin', 'monk fruit', 'erythritol', 'xylitol'],
    'sour': ['vinegar', 'citrus', 'lemon', 'lime', 'orange', 'grapefruit', 'tangerine', 'clementine', 'mandarin', 'citric acid', 'tart', 'tangy'],
    'bitter': ['coffee', 'dark chocolate', 'grapefruit', 'endive', 'radicchio', 'brussels sprouts', 'kale', 'arugula', 'dandelion greens', 'bitter melon'],
    
    // Common vegetables
    'broccoli': ['broccoli florets', 'broccoli stems', 'broccoli rabe', 'broccolini', 'broccoli sprouts'],
    'spinach': ['baby spinach', 'spinach leaves', 'spinach powder', 'spinach extract', 'spinach puree'],
    'carrot': ['carrots', 'baby carrots', 'carrot sticks', 'carrot juice', 'carrot puree', 'carrot powder'],
    'tomato': ['tomatoes', 'cherry tomatoes', 'grape tomatoes', 'roma tomatoes', 'beefsteak tomatoes', 'tomato sauce', 'tomato paste', 'tomato puree'],
    
    // Common fruits
    'apple': ['apples', 'apple juice', 'apple sauce', 'apple puree', 'apple cider', 'apple butter', 'dried apple'],
    'banana': ['bananas', 'banana chips', 'banana powder', 'banana puree', 'dried banana'],
    'berry': ['berries', 'strawberry', 'blueberry', 'raspberry', 'blackberry', 'cranberry', 'goji berry', 'acai berry'],
    
    // Common cooking methods
    'grilled': ['grill', 'barbecue', 'bbq', 'char-grilled', 'pan-grilled', 'griddle'],
    'baked': ['bake', 'roasted', 'roast', 'oven-baked', 'oven-roasted'],
    'fried': ['fry', 'deep-fried', 'pan-fried', 'stir-fried', 'sauteed', 'saute'],
    'steamed': ['steam', 'steamer', 'steaming'],
    
    // Common seasonings
    'salt': ['sea salt', 'kosher salt', 'table salt', 'iodized salt', 'rock salt', 'salt substitute'],
    'pepper': ['black pepper', 'white pepper', 'red pepper', 'cayenne pepper', 'bell pepper', 'chili pepper'],
    'garlic': ['garlic powder', 'garlic salt', 'garlic extract', 'garlic puree', 'garlic paste', 'minced garlic'],
    'onion': ['onions', 'onion powder', 'onion salt', 'onion extract', 'onion puree', 'onion paste', 'minced onion']
  };

  // Check for exact match
  if (normalizedText.includes(normalizedTerm)) {
    return true;
  }

  // Check for variations
  const termVariations = variations[normalizedTerm] || [];
  return termVariations.some(variation => normalizedText.includes(normalizeText(variation)));
};

// Filter meals based on user preferences
const filterMealsByPreferences = (meals: Meal[], preferences: UserPreferences): Meal[] => {
  // Convert preferences to lowercase arrays for case-insensitive matching
  const dislikedFoods = preferences.dislikedFoods?.toLowerCase().split(',').map(f => f.trim()).filter(Boolean) || [];
  const allergies = preferences.allergies?.toLowerCase().split(',').map(a => a.trim()).filter(Boolean) || [];
  const dietaryRestrictions = preferences.dietaryRestrictions?.toLowerCase().split(',').map(r => r.trim()).filter(Boolean) || [];
  
  // Filter out meals that contain any disliked foods, allergies, or dietary restrictions
  const filteredMeals = meals.filter(meal => {
    // Check each ingredient against preferences
    const hasDislikedIngredient = meal.ingredients.some(ingredient => 
      dislikedFoods.some(food => hasVariation(ingredient, food))
    );

    const hasAllergen = meal.ingredients.some(ingredient => 
      allergies.some(allergy => hasVariation(ingredient, allergy))
    );

    const hasRestrictedIngredient = meal.ingredients.some(ingredient => 
      dietaryRestrictions.some(restriction => hasVariation(ingredient, restriction))
    );

    // Also check the meal title for any matches
    const titleHasDisliked = dislikedFoods.some(food => hasVariation(meal.title, food));
    const titleHasAllergen = allergies.some(allergy => hasVariation(meal.title, allergy));
    const titleHasRestriction = dietaryRestrictions.some(restriction => hasVariation(meal.title, restriction));

    // Return true only if the meal has none of the excluded items
    return !hasDislikedIngredient && !hasAllergen && !hasRestrictedIngredient && 
           !titleHasDisliked && !titleHasAllergen && !titleHasRestriction;
  });

  // If no meals remain after filtering, log a warning with suggestions
  if (filteredMeals.length === 0) {
    console.warn('No meals available after filtering preferences. Consider:');
    if (dislikedFoods.length > 0) {
      console.warn('- Adjusting disliked foods to be more specific');
    }
    if (allergies.length > 0) {
      console.warn('- Double-checking allergy terms for accuracy');
    }
    if (dietaryRestrictions.length > 0) {
      console.warn('- Reviewing dietary restrictions for clarity');
    }
  }

  return filteredMeals;
};

// Select meals based on goals and targets
const selectMeals = (meals: Meal[], type: MealType, targetCalories: number, targetProtein: number, goal: string): Meal[] => {
  let typeMeals = meals.filter(meal => meal.type === type);
  const selectedMeals: Meal[] = [];
  let currentCalories = 0;
  let currentProtein = 0;

  // Sort meals by protein content descending, then calories descending
  typeMeals.sort((a, b) => {
    if (b.protein !== a.protein) return b.protein - a.protein;
    return b.calories - a.calories;
  });

  const addMeal = (meal: Meal) => {
    // Ensure meal has required properties
    const mealWithType: Meal = {
      ...meal,
      name: meal.title, // Use title as name if not provided
      type: meal.type || type // Use provided type or default to current type
    };
    selectedMeals.push(mealWithType);
    currentCalories += meal.calories;
    currentProtein += meal.protein;
  };

  // Safeguard against infinite loops
  const maxAttempts = typeMeals.length * 2;
  let attempts = 0;

  if (goal === 'weight_loss') {
    // For cutting: Never exceed calorie target, but always meet protein
    for (const meal of typeMeals) {
      if (attempts >= maxAttempts) break;
      attempts++;

      if (currentProtein < targetProtein) {
        // If protein target not met, add meal if it fits within calorie target
        if (currentCalories + meal.calories <= targetCalories) {
          addMeal(meal);
        }
      } else if (currentCalories + meal.calories <= targetCalories) {
        // If protein target met, add meal if it fits within calorie target
        addMeal(meal);
      }
    }

    // If protein target still not met, try to add high protein snacks
    if (currentProtein < targetProtein) {
      const availableProteinSnacks = meals
        .filter(meal => meal.type === 'snacks' && !selectedMeals.includes(meal))
        .sort((a, b) => b.protein - a.protein);

      for (const snack of availableProteinSnacks) {
        if (attempts >= maxAttempts) break;
        attempts++;
        
        if (currentProtein >= targetProtein) break;
        if (currentCalories + snack.calories <= targetCalories) {
          addMeal(snack);
        }
      }
    }
  } else {
    // For bulking: Never go below calorie target, always meet protein
    for (const meal of typeMeals) {
      if (attempts >= maxAttempts) break;
      attempts++;

      if (currentProtein < targetProtein || currentCalories < targetCalories) {
        addMeal(meal);
      }
    }

    // If either target is not met, add more meals/snacks
    if (currentProtein < targetProtein || currentCalories < targetCalories) {
      const availableMeals = meals
        .filter(meal => !selectedMeals.includes(meal))
        .sort((a, b) => {
          const aScore = (a.protein / targetProtein) + (a.calories / targetCalories);
          const bScore = (b.protein / targetProtein) + (b.calories / targetCalories);
          return bScore - aScore;
        });

      for (const meal of availableMeals) {
        if (attempts >= maxAttempts) break;
        attempts++;
        
        if (currentProtein >= targetProtein && currentCalories >= targetCalories) break;
        addMeal(meal);
      }
    }
  }

  // If we still haven't met protein target, add the highest protein meal available
  if (currentProtein < targetProtein && selectedMeals.length === 0) {
    const highestProteinMeal = typeMeals.reduce((highest, current) => 
      current.protein > highest.protein ? current : highest
    );
    if (highestProteinMeal) {
      addMeal(highestProteinMeal);
    }
  }

  return selectedMeals;
};

// Get meal by ID (using the database defined above)
export function getMealById(id: string): Meal | undefined {
  const allMeals = [
    ...mealDatabase.weight_loss.breakfast,
    ...mealDatabase.weight_loss.lunch,
    ...mealDatabase.weight_loss.dinner,
    ...mealDatabase.weight_loss.snacks,
    ...mealDatabase.muscle_gain.breakfast,
    ...mealDatabase.muscle_gain.lunch,
    ...mealDatabase.muscle_gain.dinner,
    ...mealDatabase.muscle_gain.snacks
  ];
  
  return allMeals.find(meal => meal.id === id);
}

export const generateMealPlan = async (): Promise<MealPlan> => {
  try {
    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    const { targetCalories, targetProtein, goal } = settings;

    if (!targetCalories || !targetProtein || !goal) {
      throw new Error('Please save your settings first to generate a meal plan');
    }

    // Adjust meal distribution based on goal
    const mealDistribution = goal === 'weight_loss' 
      ? { breakfast: 0.25, lunch: 0.35, dinner: 0.30, snacks: 0.10 }
      : { breakfast: 0.20, lunch: 0.30, dinner: 0.35, snacks: 0.15 };

    // Use the local mealDatabase instead of fetching from /api/meals
    const allMealsForGoal = mealDatabase[goal as 'weight_loss' | 'muscle_gain'];
    const flatAllMeals = [
      ...allMealsForGoal.breakfast,
      ...allMealsForGoal.lunch,
      ...allMealsForGoal.dinner,
      ...allMealsForGoal.snacks,
    ];

    // Filter meals based on preferences
    const filteredMeals = filterMealsByPreferences(flatAllMeals, preferences);

    // Get today's progress
    const progress = getMealProgress();

    // Generate meal plan with goal-specific requirements
    const mealPlan: MealPlan = {
      breakfast: selectMeals(filteredMeals, 'breakfast', targetCalories * mealDistribution.breakfast, targetProtein * mealDistribution.breakfast, goal),
      lunch: selectMeals(filteredMeals, 'lunch', targetCalories * mealDistribution.lunch, targetProtein * mealDistribution.lunch, goal),
      dinner: selectMeals(filteredMeals, 'dinner', targetCalories * mealDistribution.dinner, targetProtein * mealDistribution.dinner, goal),
      snacks: selectMeals(filteredMeals, 'snacks', targetCalories * mealDistribution.snacks, targetProtein * mealDistribution.snacks, goal)
    };

    // Preload all meal images for better performance
    const allSelectedMeals = [
      ...mealPlan.breakfast,
      ...mealPlan.lunch,
      ...mealPlan.dinner,
      ...mealPlan.snacks
    ];
    preloadMealImages(allSelectedMeals);

    return mealPlan;
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw error;
  }
};
