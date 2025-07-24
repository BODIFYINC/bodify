import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Scale, UtensilsCrossed, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { AccurateNutritionTracker, UserProfile } from '@/services/accurateNutritionTracker';

const Settings = () => {
  const [userSettings, setUserSettings] = useState({
    name: 'John Doe',
    email: 'bodify.inc@gmail.com',
    age: 28,
    height: 175, // cm
    weight: 75, // kg
    gender: 'male',
    goal: 'muscle_gain',
    activityLevel: 'moderate',
    daysPerWeek: 3,
    fitnessLevel: 'beginner',
    dietaryRestrictions: '',
    dislikedFoods: '',
    allergies: '',
    bodyFat: 15 // percentage
  });

  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalSettings, setOriginalSettings] = useState(userSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    const savedPreferences = localStorage.getItem('userPreferences');
    const currentUser = localStorage.getItem('currentUser');
    
    console.log('Loading settings on mount...');
    
    let loadedSettings = { ...userSettings };
    
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        console.log('Loaded saved settings:', parsed);
        loadedSettings = { ...loadedSettings, ...parsed };
      } catch (error) {
        console.error('Error loading user settings:', error);
      }
    }
    
    if (savedPreferences) {
      try {
        const prefs = JSON.parse(savedPreferences);
        console.log('Loaded saved preferences:', prefs);
        loadedSettings = { 
          ...loadedSettings, 
          goal: prefs.goal || loadedSettings.goal,
          daysPerWeek: prefs.daysPerWeek || loadedSettings.daysPerWeek,
          fitnessLevel: prefs.fitnessLevel || loadedSettings.fitnessLevel,
          dislikedFoods: Array.isArray(prefs.dislikedFoods) 
            ? prefs.dislikedFoods.join(', ') 
            : prefs.dislikedFoods || loadedSettings.dislikedFoods,
          allergies: Array.isArray(prefs.allergies) 
            ? prefs.allergies.join(', ') 
            : prefs.allergies || loadedSettings.allergies
        };
      } catch (error) {
        console.error('Error loading user preferences:', error);
      }
    }
    
    if (currentUser) {
      try {
        const user = JSON.parse(currentUser);
        console.log('Loaded current user:', user);
        loadedSettings = { ...loadedSettings, email: user.email };
      } catch (error) {
        console.error('Error loading current user:', error);
      }
    }
    
    setUserSettings(loadedSettings);
    setOriginalSettings(loadedSettings);
  }, []);

  // Detect changes
  useEffect(() => {
    const hasChanged = JSON.stringify(userSettings) !== JSON.stringify(originalSettings);
    setHasChanges(hasChanged);
  }, [userSettings, originalSettings]);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      console.log('Saving enhanced settings:', userSettings);
      
      // Validate required fields
      if (!userSettings.name.trim()) {
        throw new Error('Name is required');
      }
      if (userSettings.age < 13 || userSettings.age > 100) {
        throw new Error('Age must be between 13 and 100');
      }
      if (userSettings.height < 100 || userSettings.height > 250) {
        throw new Error('Height must be between 100 and 250 cm');
      }
      if (userSettings.weight < 30 || userSettings.weight > 300) {
        throw new Error('Weight must be between 30 and 300 kg');
      }

      // Calculate nutrition targets using AccurateNutritionTracker
      const profile: UserProfile = {
        weight: userSettings.weight,
        height: userSettings.height,
        age: userSettings.age,
        gender: (userSettings.gender || 'male') as 'male' | 'female',
        activityLevel: (userSettings.activityLevel || 'moderate') as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active',
        goal: (userSettings.goal || 'weight_loss') as 'muscle_gain' | 'weight_loss' | 'maintenance',
        bodyFat: userSettings.bodyFat
      };

      const targets = AccurateNutritionTracker.calculateNutritionTargets(profile);
      const bmr = AccurateNutritionTracker.calculateBMR(profile);
      const tdee = AccurateNutritionTracker.calculateTDEE(profile);
      
      // Save to localStorage with better structure including nutrition targets
      const settingsWithNutrition = {
        ...userSettings,
        targetCalories: targets.calories,
        targetProtein: targets.protein,
        targetCarbs: targets.carbs,
        targetFat: targets.fat,
        bmr: Math.round(bmr),
        tdee: Math.round(tdee)
      };
      
      localStorage.setItem('userSettings', JSON.stringify(settingsWithNutrition));
      
      // Save enhanced user preferences
      const userPrefs = {
        goal: userSettings.goal,
        daysPerWeek: userSettings.daysPerWeek,
        fitnessLevel: userSettings.fitnessLevel,
        dislikedFoods: userSettings.dislikedFoods
          .split(',')
          .map(food => food.trim())
          .filter(Boolean)
          .map(food => food.toLowerCase()),
        allergies: userSettings.allergies
          .split(',')
          .map(allergy => allergy.trim())
          .filter(Boolean)
          .map(allergy => allergy.toLowerCase()),
        dietaryRestrictions: userSettings.dietaryRestrictions.trim(),
        weight: userSettings.weight,
        height: userSettings.height,
        age: userSettings.age,
        name: userSettings.name.trim(),
        activityLevel: userSettings.activityLevel,
        // Include nutrition targets in preferences as well
        targetCalories: targets.calories,
        targetProtein: targets.protein,
        targetCarbs: targets.carbs,
        targetFat: targets.fat
      };
      
      console.log('Saving enhanced user preferences:', userPrefs);
      localStorage.setItem('userPreferences', JSON.stringify(userPrefs));

      // Update current user if email changed
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        user.name = userSettings.name;
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      // Track settings update
      const today = new Date().toISOString().split('T')[0];
      const activityData = JSON.parse(localStorage.getItem('userActivity') || '{}');
      activityData[today] = { 
        ...activityData[today], 
        settingsUpdate: true,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('userActivity', JSON.stringify(activityData));

      // Trigger enhanced storage event
      window.dispatchEvent(new CustomEvent('userPreferencesUpdated', {
        detail: { settings: settingsWithNutrition, preferences: userPrefs }
      }));

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update original settings to reset change tracking
      setOriginalSettings(settingsWithNutrition);
      setHasChanges(false);
      
      toast({
        title: "Settings Saved Successfully! ✨",
        description: "Your preferences have been updated. Your meal plans and workouts will reflect these changes immediately."
      });
      
      console.log('Enhanced settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Save Failed",
        description: error instanceof Error ? error.message : "There was an error saving your settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    console.log('Changing field:', field, 'to:', value);
    setUserSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Calculate estimated nutrition targets for preview
  const previewNutrition = () => {
    const profile: UserProfile = {
      weight: userSettings.weight,
      height: userSettings.height,
      age: userSettings.age,
      gender: (userSettings.gender || 'male') as 'male' | 'female',
      activityLevel: (userSettings.activityLevel || 'moderate') as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active',
      goal: (userSettings.goal || 'weight_loss') as 'muscle_gain' | 'weight_loss' | 'maintenance',
      bodyFat: userSettings.bodyFat
    };

    const targets = AccurateNutritionTracker.calculateNutritionTargets(profile);
    const bmr = AccurateNutritionTracker.calculateBMR(profile);
    const tdee = AccurateNutritionTracker.calculateTDEE(profile);
    
    return { 
      calories: targets.calories, 
      protein: targets.protein,
      carbs: targets.carbs,
      fat: targets.fat,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee)
    };
  };

  const nutrition = previewNutrition();

  return (
    <div className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker text-white">
      <div className="container mx-auto px-6 max-w-4xl py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <motion.h1 
                className="text-5xl font-bold mb-2 bg-gradient-to-r from-bodify-orange to-bodify-purple bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Settings
              </motion.h1>
              <motion.p 
                className="text-white/70 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Customize your Bodify experience for optimal results
              </motion.p>
            </div>
            <div className="flex space-x-3">
              <Link to="/dashboard">
                <Button variant="outline" className="border-white/20 hover:bg-white/10">
                  <ArrowLeft size={20} className="mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              {hasChanges && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-bodify-gradient hover:opacity-90 transition-all"
                  >
                    <Save className="mr-2" size={20} />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Nutrition Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Card className="glassmorphism border-0 bg-gradient-to-r from-bodify-purple/20 to-bodify-orange/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Your Nutrition Targets Preview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-bodify-orange">{nutrition.calories}</p>
                    <p className="text-sm text-white/70">Daily Calories</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-bodify-purple">{nutrition.protein}g</p>
                    <p className="text-sm text-white/70">Daily Protein</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-400">{nutrition.bmr}</p>
                    <p className="text-sm text-white/70">BMR</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-400">{nutrition.tdee}</p>
                    <p className="text-sm text-white/70">TDEE</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="space-y-8">
            {/* Enhanced Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glassmorphism border-0">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <User className="mr-3 text-bodify-orange" size={24} />
                    <h2 className="text-2xl font-bold">Personal Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-white mb-2 block">Full Name *</Label>
                      <Input
                        id="name"
                        value={userSettings.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="bg-white/10 border-white/30 text-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white mb-2 block">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userSettings.email}
                        readOnly
                        className="bg-white/5 border-white/20 text-white/70 cursor-not-allowed"
                        title="Email cannot be changed for security reasons"
                      />
                      <p className="text-xs text-white/50 mt-1">Email cannot be changed for security reasons</p>
                    </div>
                    <div>
                      <Label htmlFor="age" className="text-white mb-2 block">Age * (13-100)</Label>
                      <Input
                        id="age"
                        type="number"
                        min="13"
                        max="100"
                        value={userSettings.age}
                        onChange={(e) => handleChange('age', Number(e.target.value))}
                        className="bg-white/10 border-white/30 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height" className="text-white mb-2 block">Height * (100-250 cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        min="100"
                        max="250"
                        value={userSettings.height}
                        onChange={(e) => handleChange('height', Number(e.target.value))}
                        className="bg-white/10 border-white/30 text-white"
                        placeholder="e.g., 175"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender" className="text-white mb-2 block">Gender</Label>
                      <select
                        id="gender"
                        value={userSettings.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        className="w-full p-3 bg-white/10 border border-white/30 rounded-md text-white"
                      >
                        <option value="male" className="bg-gray-800">Male</option>
                        <option value="female" className="bg-gray-800">Female</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Fitness Goals */}
            <Card className="glassmorphism border-0">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Scale className="mr-3 text-bodify-orange" size={24} />
                  <h2 className="text-2xl font-bold">Fitness Goals & Activity</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="weight" className="text-white mb-2 block">Current Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={userSettings.weight}
                      onChange={(e) => handleChange('weight', Number(e.target.value))}
                      className="bg-white/10 border-white/30 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="goal" className="text-white mb-2 block">Primary Goal</Label>
                    <select
                      id="goal"
                      value={userSettings.goal}
                      onChange={(e) => handleChange('goal', e.target.value)}
                      className="w-full p-3 bg-white/10 border border-white/30 rounded-md text-white"
                    >
                      <option value="weight_loss" className="bg-gray-800">Weight Loss</option>
                      <option value="muscle_gain" className="bg-gray-800">Muscle Gain</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="daysPerWeek" className="text-white mb-2 block">Workout Days Per Week</Label>
                    <select
                      id="daysPerWeek"
                      value={userSettings.daysPerWeek}
                      onChange={(e) => handleChange('daysPerWeek', Number(e.target.value))}
                      className="w-full p-3 bg-white/10 border border-white/30 rounded-md text-white"
                    >
                      <option value={2} className="bg-gray-800">2 Days</option>
                      <option value={3} className="bg-gray-800">3 Days</option>
                      <option value={4} className="bg-gray-800">4 Days</option>
                      <option value={5} className="bg-gray-800">5 Days</option>
                      <option value={6} className="bg-gray-800">6 Days</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="fitnessLevel" className="text-white mb-2 block">Fitness Level</Label>
                    <select
                      id="fitnessLevel"
                      value={userSettings.fitnessLevel}
                      onChange={(e) => handleChange('fitnessLevel', e.target.value)}
                      className="w-full p-3 bg-white/10 border border-white/30 rounded-md text-white"
                    >
                      <option value="beginner" className="bg-gray-800">Beginner</option>
                      <option value="intermediate" className="bg-gray-800">Intermediate</option>
                      <option value="advanced" className="bg-gray-800">Advanced</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dietary Preferences */}
            <Card className="glassmorphism border-0">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <UtensilsCrossed className="mr-3 text-bodify-orange" size={24} />
                  <h2 className="text-2xl font-bold">Dietary Preferences</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="restrictions" className="text-white mb-2 block">Dietary Restrictions</Label>
                    <Textarea
                      id="restrictions"
                      value={userSettings.dietaryRestrictions}
                      onChange={(e) => handleChange('dietaryRestrictions', e.target.value)}
                      placeholder="e.g., vegetarian, vegan, keto, etc."
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="disliked" className="text-white mb-2 block">Foods You Don't Like</Label>
                    <Textarea
                      id="disliked"
                      value={userSettings.dislikedFoods}
                      onChange={(e) => handleChange('dislikedFoods', e.target.value)}
                      placeholder="List foods you want to avoid (separate with commas). e.g., eggs, mushrooms, spinach"
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    />
                    <p className="text-xs text-white/50 mt-1">These foods will be excluded from your meal plans</p>
                  </div>
                  <div>
                    <Label htmlFor="allergies" className="text-white mb-2 block">Allergies</Label>
                    <Textarea
                      id="allergies"
                      value={userSettings.allergies}
                      onChange={(e) => handleChange('allergies', e.target.value)}
                      placeholder="List any food allergies (separate with commas). e.g., nuts, dairy, shellfish"
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    />
                    <p className="text-xs text-white/50 mt-1">These allergens will be completely avoided in your meal plans</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              {hasChanges && (
                <Button 
                  variant="outline"
                  onClick={() => {
                    setUserSettings(originalSettings);
                    setHasChanges(false);
                  }}
                  className="border-white/20 hover:bg-white/10"
                >
                  Reset Changes
                </Button>
              )}
              <Button 
                onClick={handleSave}
                disabled={isSaving || !hasChanges}
                className={`transition-all px-8 py-3 ${
                  hasChanges 
                    ? 'bg-bodify-gradient hover:opacity-90 shadow-lg' 
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                <Save className="mr-2" size={20} />
                {isSaving ? "Saving..." : hasChanges ? "Save Settings" : "No Changes"}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
