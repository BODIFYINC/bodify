import { Meal, MealType } from './enhancedMealService';

// Cache for generated images to avoid regenerating the same image multiple times
const imageCache: { [key: string]: string } = {};

// Loading state cache
const loadingStateCache: { [key: string]: boolean } = {};

// Curated list of high-quality food images with keywords (using local images)
const curatedImagesWithKeywords: Record<MealType, Array<{ url: string; keywords: string[] }>> = {
  breakfast: [
    { url: '/images/meals/breakfast-oatmeal.jpg', keywords: ['breakfast', 'morning', 'oatmeal', 'healthy'] },
    { url: '/images/meals/breakfast-eggs.jpg', keywords: ['breakfast', 'eggs', 'protein'] },
    { url: '/images/meals/breakfast-smoothie.jpg', keywords: ['breakfast', 'smoothie', 'fruit'] },
    { url: '/images/meals/breakfast-pancakes.jpg', keywords: ['breakfast', 'pancakes', 'sweet'] },
    { url: '/images/meals/breakfast-yogurt.jpg', keywords: ['breakfast', 'yogurt', 'granola'] }
  ],
  lunch: [
    { url: '/images/meals/lunch-salad.jpg', keywords: ['lunch', 'salad', 'healthy'] },
    { url: '/images/meals/lunch-bowl.jpg', keywords: ['lunch', 'bowl', 'protein'] },
    { url: '/images/meals/lunch-sandwich.jpg', keywords: ['lunch', 'sandwich', 'quick'] },
    { url: '/images/meals/lunch-wrap.jpg', keywords: ['lunch', 'wrap', 'healthy'] },
    { url: '/images/meals/lunch-pasta.jpg', keywords: ['lunch', 'pasta', 'carbs'] }
  ],
  dinner: [
    { url: '/images/meals/dinner-steak.jpg', keywords: ['dinner', 'steak', 'protein'] },
    { url: '/images/meals/dinner-chicken.jpg', keywords: ['dinner', 'chicken', 'protein'] },
    { url: '/images/meals/dinner-fish.jpg', keywords: ['dinner', 'fish', 'healthy'] },
    { url: '/images/meals/dinner-pasta.jpg', keywords: ['dinner', 'pasta', 'carbs'] },
    { url: '/images/meals/dinner-rice.jpg', keywords: ['dinner', 'rice', 'carbs'] }
  ],
  snacks: [
    { url: '/images/meals/snack-protein-bar.jpg', keywords: ['snacks', 'protein', 'bar'] },
    { url: '/images/meals/snack-nuts.jpg', keywords: ['snacks', 'nuts', 'protein'] },
    { url: '/images/meals/snack-fruit.jpg', keywords: ['snacks', 'fruit', 'healthy'] },
    { url: '/images/meals/snack-smoothie.jpg', keywords: ['snacks', 'smoothie', 'protein'] },
    { url: '/images/meals/snack-yogurt.jpg', keywords: ['snacks', 'yogurt', 'protein'] }
  ]
};

// Specific meal image mappings for common meals (using local images)
const specificMealImages = {
  // Breakfast Recipes
  'Veggie Egg White Scramble': '/images/meals/veggie-egg-scramble.jpg',
  'Protein Oatmeal': '/images/meals/protein-oatmeal.jpg',
  'Protein Toast': '/images/meals/protein-toast.jpg',
  'Protein Muffins': '/images/meals/protein-muffins.jpg',
  'Greek Yogurt with Mixed Berries': '/images/meals/greek-yogurt-berries.jpg',
  'Power Smoothie Bowl': '/images/meals/power-smoothie-bowl.jpg',
  'Greek Yogurt Parfait': '/images/meals/greek-yogurt-parfait.jpg',
  'Overnight Oats': '/images/meals/overnight-oats.jpg',
  'Avocado Toast': '/images/meals/avocado-toast.jpg',
  'Egg and Avocado Toast': '/images/meals/egg-avocado-toast.jpg',
  'Protein-Packed Breakfast Burrito': '/images/meals/breakfast-burrito.jpg',
  'Chia Seed Pudding': '/images/meals/chia-seed-pudding.jpg',
  'Protein Pancakes': '/images/meals/protein-pancakes.jpg',
  'Overnight Oats with Peanut Butter': '/images/meals/overnight-oats-peanut-butter.jpg',
  'Scrambled Eggs with Toast': '/images/meals/scrambled-eggs-toast.jpg',
  'Power Protein Breakfast Bowl': '/images/meals/power-protein-breakfast-bowl.jpg',
  'Protein-Packed French Toast': '/images/meals/protein-french-toast.jpg',
  'Triple Protein Pancakes': '/images/meals/triple-protein-pancakes.jpg',
  'Muscle Building Omelette': '/images/meals/muscle-building-omelette.jpg',
  'Protein Waffles': '/images/meals/protein-waffles.jpg',
  'Breakfast Quinoa Bowl': '/images/meals/breakfast-quinoa-bowl.jpg',
  'Egg White Frittata': '/images/meals/egg-white-frittata.jpg',
  'Breakfast Tacos': '/images/meals/breakfast-tacos.jpg',

  // Lunch Recipes
  'Tuna Salad Wrap': '/images/meals/tuna-salad-wrap.jpg',
  'Lentil Soup': '/images/meals/lentil-soup.jpg',
  'Tuna and White Bean Salad': '/images/meals/tuna-white-bean-salad.jpg',
  'Chicken Wrap': '/images/meals/chicken-wrap.jpg',
  'Mediterranean Quinoa Bowl': '/images/meals/mediterranean-quinoa-bowl.jpg',
  'Asian-Inspired Tofu Bowl': '/images/meals/asian-tofu-bowl.jpg',
  'Turkey and Rice Bowl': '/images/meals/turkey-rice-bowl.jpg',
  'Beef and Pasta Bowl': '/images/meals/beef-pasta-bowl.jpg',
  'Chicken Caesar Wrap': '/images/meals/chicken-caesar-wrap.jpg',
  'Salmon with Brown Rice and Asparagus': '/images/meals/salmon-brown-rice-asparagus.jpg',
  'Beef and Rice Power Bowl': '/images/meals/beef-rice-power-bowl.jpg',
  'Chicken Burrito Bowl': '/images/meals/chicken-burrito-bowl.jpg',
  'Beef Stir-fry with Quinoa': '/images/meals/beef-stirfry-quinoa.jpg',
  'Protein-Packed Pasta Bowl': '/images/meals/protein-pasta-bowl.jpg',
  'Protein Soup': '/images/meals/protein-soup.jpg',
  'Protein Bowl': '/images/meals/protein-bowl.jpg',

  // Dinner Recipes
  'Lean Turkey Meatballs with Zucchini Noodles': '/images/meals/turkey-meatballs-zucchini-noodles.jpg',
  'Baked Salmon with Vegetables': '/images/meals/baked-salmon-vegetables.jpg',
  'Zucchini Noodles with Chicken': '/images/meals/zucchini-noodles-chicken.jpg',
  'Cauliflower Rice Bowl': '/images/meals/cauliflower-rice-bowl.jpg',
  'Grilled Fish with Asparagus': '/images/meals/grilled-fish-asparagus.jpg',
  'Baked Chicken with Roasted Vegetables': '/images/meals/baked-chicken-vegetables.jpg',
  'Shrimp and Vegetable Stir-Fry': '/images/meals/shrimp-vegetable-stirfry.jpg',
  'Steak with Sweet Potato': '/images/meals/steak-sweet-potato.jpg',
  'Salmon with Pasta': '/images/meals/salmon-pasta.jpg',
  'Steak and Potato Power Plate': '/images/meals/steak-potato-power-plate.jpg',
  'Muscle Gain Chicken Bowl': '/images/meals/muscle-gain-chicken-bowl.jpg',
  'Salmon Power Bowl': '/images/meals/salmon-power-bowl.jpg',
  'Lean Beef Stir Fry': '/images/meals/lean-beef-stirfry.jpg',
  'Turkey Meatballs & Pasta': '/images/meals/turkey-meatballs-pasta.jpg',
  'Protein-Packed Fish Tacos': '/images/meals/protein-fish-tacos.jpg',
  'High-Protein Tuna Wrap': '/images/meals/high-protein-tuna-wrap.jpg',
  'Dinner Plate': '/images/meals/dinner-plate.jpg',
  'Protein Dinner': '/images/meals/protein-dinner.jpg',
  'Dinner Bowl': '/images/meals/dinner-bowl.jpg',
  'Protein Plate': '/images/meals/protein-plate.jpg',
  'Dinner Box': '/images/meals/dinner-box.jpg',
  'Protein Meal': '/images/meals/protein-meal.jpg',

  // Snack Recipes
  'Post-Workout Protein Smoothie': '/images/meals/protein-smoothie.jpg',
  'Homemade Protein Bars': '/images/meals/homemade-protein-bars.jpg',
  'Trail Mix': '/images/meals/trail-mix.jpg',
  'Vegetable Platter with Hummus': '/images/meals/vegetable-platter-hummus.jpg',
  'Apple with Nut Butter': '/images/meals/apple-nut-butter.jpg',
  'Greek Yogurt Berry Bowl': '/images/meals/greek-yogurt-berry-bowl.jpg',
  'Protein Smoothie Bowl': '/images/meals/protein-smoothie-bowl.jpg',
  'Oatmeal with Berries': '/images/meals/oatmeal-berries.jpg',
  'Veggie Omelet': '/images/meals/veggie-omelet.jpg',
  'Cucumber Hummus Bites': '/images/meals/cucumber-hummus-bites.jpg',
  'Celery with Peanut Butter': '/images/meals/celery-peanut-butter.jpg',
  'Rice Cakes with Cottage Cheese': '/images/meals/rice-cakes-cottage-cheese.jpg',
  'Protein-Packed Energy Bites': '/images/meals/protein-energy-bites.jpg',
  'Cucumber and Hummus Roll-Ups': '/images/meals/cucumber-hummus-rollups.jpg',
  'Protein Smoothie': '/images/meals/protein-smoothie.jpg',
  'Chocolate Protein Shake': '/images/meals/chocolate-protein-shake.jpg',
  'Protein-Packed Trail Mix': '/images/meals/protein-trail-mix.jpg',
  'Almond Protein Smoothie': '/images/meals/almond-protein-smoothie.jpg',
  'Snack Box': '/images/meals/snack-box.jpg',
  'Protein Snack': '/images/meals/protein-snack.jpg',
  'Snack Plate': '/images/meals/snack-plate.jpg',
  'Protein Bites': '/images/meals/protein-bites.jpg',
  'Snack Bowl': '/images/meals/snack-bowl.jpg',
  'Protein Treat': '/images/meals/protein-treat.jpg'
};

// Function to get a consistent and relevant image for a meal
const getCuratedImage = (meal: Meal): string => {
  if (!meal || !meal.title) {
    console.warn('[getCuratedImage] Invalid meal object:', meal);
    return '/images/meals/fallback.jpg';
  }

  // First check if we have a specific image for this meal
  if (specificMealImages[meal.title]) {
    return specificMealImages[meal.title];
  }

  // Determine meal type from title if not provided
  let mealType: MealType = meal.type || 'dinner';
  if (!mealType) {
    const title = meal.title.toLowerCase();
    if (title.includes('breakfast') || title.includes('egg') || title.includes('oatmeal') || title.includes('pancake') || title.includes('toast')) {
      mealType = 'breakfast';
    } else if (title.includes('lunch') || title.includes('salad') || title.includes('sandwich') || title.includes('wrap')) {
      mealType = 'lunch';
    } else if (title.includes('dinner') || title.includes('pasta') || title.includes('steak') || 
               title.includes('chicken') || title.includes('turkey') || title.includes('meatball') || 
               title.includes('noodle') || title.includes('rice') || title.includes('fish') || 
               title.includes('beef') || title.includes('pork')) {
      mealType = 'dinner';
    } else if (title.includes('smoothie') || title.includes('snack') || title.includes('protein bar') || 
               title.includes('trail mix') || title.includes('nuts') || title.includes('fruit')) {
      mealType = 'snacks';
    } else {
      // Default to dinner for main meals, snack for smaller items
      mealType = title.includes('scramble') || title.includes('salad') || title.includes('meatball') ? 'dinner' : 'snacks';
    }
  }

  // Get type images with fallback
  const typeImages = curatedImagesWithKeywords[mealType] || [];
  if (!typeImages || typeImages.length === 0) {
    console.warn(`[getCuratedImage] No images found for meal type: ${mealType}, using fallback`);
    return '/images/meals/fallback.jpg';
  }
  
  // Combine meal title and ingredients for better keyword matching
  const mealKeywords = (meal.title.toLowerCase() + ' ' + (meal.ingredients || []).join(' ').toLowerCase()).replace(/protein bar/g, 'protein_bar');
  
  // Try to find an image with matching keywords
  const matchingImages = typeImages.filter(img => 
    img && img.keywords && img.keywords.some(keyword => mealKeywords.includes(keyword))
  );
  
  // If matches found, sort by relevance and pick the best one
  if (matchingImages.length > 0) {
    matchingImages.sort((a, b) => {
      const aMatches = a.keywords.filter(keyword => mealKeywords.includes(keyword)).length;
      const bMatches = b.keywords.filter(keyword => mealKeywords.includes(keyword)).length;
      return bMatches - aMatches;
    });
    return matchingImages[0].url;
  }

  // Fallback: Use a consistent image based on meal ID or index
  const fallbackIndex = meal.id ? parseInt(meal.id.replace(/\D/g, '')) % typeImages.length : 0;
  console.log(`[getCuratedImage] Using fallback - meal.id: ${meal.id}, mealType: ${mealType}, typeImages.length: ${typeImages.length}, fallbackIndex: ${fallbackIndex}`);
  
  // Make sure we have a valid index and typeImages array
  if (typeImages && typeImages.length > 0) {
    const index = Math.max(0, Math.min(fallbackIndex, typeImages.length - 1));
    const selectedImage = typeImages[index];
    if (selectedImage && selectedImage.url) {
      return selectedImage.url;
    }
  }
  
  // Ultimate fallback
  return '/images/meals/fallback.jpg';
};

// Function to generate a consistent image URL for a meal
export const generateMealImage = (meal: Meal): string => {
  if (!meal) {
    return '/images/meals/fallback.jpg';
  }

  if (imageCache[meal.id]) {
    return imageCache[meal.id];
  }

  try {
    const imageUrl = getCuratedImage(meal);
    if (imageUrl) {
      imageCache[meal.id] = imageUrl;
      // Start preloading this image
      preloadImage(imageUrl);
      return imageUrl;
    }
  } catch (error) {
    console.error('[generateMealImage] Error generating image URL:', error);
  }
  
  return '/images/meals/fallback.jpg';
};

// Function to preload a single image
const preloadImage = (url: string, retryCount = 0): Promise<void> => {
  if (loadingStateCache[url]) {
    return Promise.resolve();
  }

  loadingStateCache[url] = true;
  
  return new Promise((resolve) => {
    const img = new Image();
    const maxRetries = 3; // Increase retry attempts
    const baseDelay = 1500; // Increase base delay to 1.5 seconds
    
    const onErrorOrTimeout = () => {
      loadingStateCache[url] = false;
      
      if (retryCount < maxRetries) {
        // Add a small delay before retrying with exponential backoff
        const delay = baseDelay * Math.pow(2, retryCount);
        console.log(`Retrying image load (attempt ${retryCount + 1}/${maxRetries}) in ${delay}ms: ${url}`);
        setTimeout(() => {
          preloadImage(url, retryCount + 1).then(resolve).catch(resolve); // Continue chain, resolve on error
        }, delay);
      } else {
        console.warn(`Failed to load image after ${maxRetries} attempts: ${url}`);
        resolve(); // Resolve even on final error to prevent blocking
      }
    };

    const timeoutId = setTimeout(() => {
      console.warn(`Image load timeout after ${retryCount + 1} attempts: ${url}`);
      img.src = ''; // Cancel the current load
      onErrorOrTimeout(); // Trigger retry or final failure handling
    }, 7000); // Increase timeout to 7 seconds
    
    img.onload = () => {
      clearTimeout(timeoutId);
      loadingStateCache[url] = false;
      resolve();
    };
    
    img.onerror = () => {
      clearTimeout(timeoutId);
      console.warn(`Image load error on attempt ${retryCount + 1}: ${url}`);
      onErrorOrTimeout(); // Trigger retry or final failure handling
    };
    
    img.src = url;
  });
};

// Function to preload images for a list of meals
export const preloadMealImages = async (meals: Meal[]): Promise<void> => {
  const uniqueUrls = new Set(meals.map(meal => generateMealImage(meal)));
  const preloadPromises = Array.from(uniqueUrls).map(url => preloadImage(url));
  
  // Use Promise.allSettled to wait for all promises to settle, regardless of success or failure
  await Promise.allSettled(preloadPromises);
};

// Function to clear the image cache
export const clearImageCache = (): void => {
  Object.keys(imageCache).forEach(key => {
    delete imageCache[key];
  });
  Object.keys(loadingStateCache).forEach(key => {
    delete loadingStateCache[key];
  });
};

// Function to get a fallback image if the generated one fails
export const getFallbackImage = (mealType: MealType): string => {
  // First try to get a type-specific fallback
  const typeImages = curatedImagesWithKeywords[mealType];
  if (typeImages && typeImages.length > 0) {
    return typeImages[0].url;
  }
  
  // If no type-specific images, use a generic food image
  return '/images/meals/fallback.jpg';
};

// Function to check if an image is currently loading
export const isImageLoading = (url: string): boolean => {
  return loadingStateCache[url] || false;
};

// Initialize preloading of all curated images
const initializeImagePreloading = async () => {
  const allImagesInfo = Object.values(curatedImagesWithKeywords).flat();
  const allUrls = allImagesInfo.map(img => img.url);
  
  const preloadPromises = allUrls.map(url => preloadImage(url));
  await Promise.allSettled(preloadPromises);
};

// Start preloading all images
initializeImagePreloading().catch(console.error); 