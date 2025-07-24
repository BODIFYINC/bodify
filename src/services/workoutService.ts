
export interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: string;
  muscle: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  alternatives: string[];
}

export interface WorkoutPlan {
  title: string;
  day: number;
  totalDays: number;
  exercises: Exercise[];
  focus: string;
}

const exerciseDatabase = {
  weight_loss: {
    beginner: [
      { id: 1, name: "Push-ups", sets: 3, reps: "8-12", muscle: "chest", difficulty: "beginner" as const, alternatives: ["Knee Push-ups", "Wall Push-ups", "Incline Push-ups"] },
      { id: 2, name: "Bodyweight Squats", sets: 3, reps: "12-15", muscle: "legs", difficulty: "beginner" as const, alternatives: ["Chair Squats", "Assisted Squats", "Box Squats"] },
      { id: 3, name: "Plank", sets: 3, reps: "30-60 sec", muscle: "core", difficulty: "beginner" as const, alternatives: ["Knee Plank", "Wall Plank", "Modified Plank"] },
      { id: 4, name: "Mountain Climbers", sets: 3, reps: "20", muscle: "cardio", difficulty: "beginner" as const, alternatives: ["Marching in Place", "Step-ups", "Modified Mountain Climbers"] },
      { id: 5, name: "Jumping Jacks", sets: 3, reps: "30", muscle: "cardio", difficulty: "beginner" as const, alternatives: ["Step Touch", "Arm Circles", "Low Impact Jacks"] },
      { id: 6, name: "Lunges", sets: 3, reps: "10 each leg", muscle: "legs", difficulty: "beginner" as const, alternatives: ["Reverse Lunges", "Static Lunges", "Assisted Lunges"] },
      { id: 35, name: "Wall Sit", sets: 3, reps: "30-45 sec", muscle: "legs", difficulty: "beginner" as const, alternatives: ["Chair Sits", "Shallow Squats", "Standing Hold"] },
      { id: 36, name: "Arm Circles", sets: 3, reps: "15 each direction", muscle: "shoulders", difficulty: "beginner" as const, alternatives: ["Shoulder Rolls", "Arm Swings", "Light Weights"] }
    ],
    intermediate: [
      { id: 7, name: "Burpees", sets: 3, reps: "8-10", muscle: "full body", difficulty: "intermediate" as const, alternatives: ["Modified Burpees", "Squat Thrusts", "Step-back Burpees"] },
      { id: 8, name: "Jump Squats", sets: 3, reps: "12-15", muscle: "legs", difficulty: "intermediate" as const, alternatives: ["Regular Squats", "Split Squats", "Pulse Squats"] },
      { id: 9, name: "Pike Push-ups", sets: 3, reps: "8-12", muscle: "shoulders", difficulty: "intermediate" as const, alternatives: ["Wall Handstand Push-ups", "Incline Pike Push-ups", "Shoulder Press"] },
      { id: 10, name: "Russian Twists", sets: 3, reps: "20", muscle: "core", difficulty: "intermediate" as const, alternatives: ["Bicycle Crunches", "Dead Bug", "Bird Dog"] },
      { id: 11, name: "High Knees", sets: 3, reps: "30 sec", muscle: "cardio", difficulty: "intermediate" as const, alternatives: ["Butt Kickers", "Quick Steps", "Knee Lifts"] },
      { id: 37, name: "Diamond Push-ups", sets: 3, reps: "8-12", muscle: "triceps", difficulty: "intermediate" as const, alternatives: ["Close-grip Push-ups", "Tricep Dips", "Modified Diamond"] },
      { id: 38, name: "Single-leg Glute Bridge", sets: 3, reps: "10 each leg", muscle: "glutes", difficulty: "intermediate" as const, alternatives: ["Regular Glute Bridge", "Hip Thrusts", "Clamshells"] }
    ],
    advanced: [
      { id: 12, name: "Single-Arm Push-ups", sets: 3, reps: "5-8 each", muscle: "chest", difficulty: "advanced" as const, alternatives: ["Archer Push-ups", "Diamond Push-ups", "Decline Push-ups"] },
      { id: 13, name: "Pistol Squats", sets: 3, reps: "5-8 each", muscle: "legs", difficulty: "advanced" as const, alternatives: ["Assisted Pistol Squats", "Bulgarian Split Squats", "Shrimp Squats"] },
      { id: 14, name: "Handstand Push-ups", sets: 3, reps: "5-10", muscle: "shoulders", difficulty: "advanced" as const, alternatives: ["Wall Handstand Push-ups", "Pike Push-ups", "Handstand Hold"] },
      { id: 39, name: "Muscle-ups", sets: 3, reps: "3-5", muscle: "full body", difficulty: "advanced" as const, alternatives: ["Pull-ups", "Assisted Muscle-ups", "Chest-to-bar Pull-ups"] },
      { id: 40, name: "Human Flag Hold", sets: 3, reps: "10-20 sec", muscle: "core", difficulty: "advanced" as const, alternatives: ["Side Plank", "Flag Progression", "L-sit Hold"] }
    ]
  },
  muscle_gain: {
    beginner: [
      { id: 15, name: "Bench Press", sets: 4, reps: "8-10", muscle: "chest", difficulty: "beginner" as const, alternatives: ["Dumbbell Press", "Push-ups", "Incline Press"] },
      { id: 16, name: "Squats", sets: 4, reps: "8-12", muscle: "legs", difficulty: "beginner" as const, alternatives: ["Goblet Squats", "Leg Press", "Front Squats"] },
      { id: 17, name: "Deadlifts", sets: 4, reps: "6-8", muscle: "back", difficulty: "beginner" as const, alternatives: ["Romanian Deadlifts", "Sumo Deadlifts", "Trap Bar Deadlifts"] },
      { id: 18, name: "Overhead Press", sets: 4, reps: "8-10", muscle: "shoulders", difficulty: "beginner" as const, alternatives: ["Dumbbell Press", "Arnold Press", "Pike Push-ups"] },
      { id: 19, name: "Bent-over Rows", sets: 4, reps: "8-12", muscle: "back", difficulty: "beginner" as const, alternatives: ["Dumbbell Rows", "Cable Rows", "T-Bar Rows"] },
      { id: 20, name: "Dips", sets: 3, reps: "8-12", muscle: "triceps", difficulty: "beginner" as const, alternatives: ["Assisted Dips", "Bench Dips", "Diamond Push-ups"] },
      { id: 41, name: "Leg Curls", sets: 3, reps: "10-12", muscle: "hamstrings", difficulty: "beginner" as const, alternatives: ["Nordic Curls", "Romanian Deadlifts", "Glute Ham Raises"] },
      { id: 42, name: "Calf Raises", sets: 3, reps: "15-20", muscle: "calves", difficulty: "beginner" as const, alternatives: ["Single-leg Calf Raises", "Seated Calf Raises", "Jump Rope"] }
    ],
    intermediate: [
      { id: 21, name: "Pull-ups", sets: 4, reps: "6-10", muscle: "back", difficulty: "intermediate" as const, alternatives: ["Lat Pulldowns", "Assisted Pull-ups", "Chin-ups"] },
      { id: 22, name: "Incline Bench Press", sets: 4, reps: "8-10", muscle: "chest", difficulty: "intermediate" as const, alternatives: ["Incline Dumbbell Press", "Incline Flyes", "Push-ups"] },
      { id: 23, name: "Bulgarian Split Squats", sets: 3, reps: "10-12 each", muscle: "legs", difficulty: "intermediate" as const, alternatives: ["Lunges", "Step-ups", "Single-leg Squats"] },
      { id: 24, name: "Barbell Curls", sets: 3, reps: "10-12", muscle: "biceps", difficulty: "intermediate" as const, alternatives: ["Dumbbell Curls", "Hammer Curls", "Cable Curls"] },
      { id: 25, name: "Close-grip Bench Press", sets: 3, reps: "8-10", muscle: "triceps", difficulty: "intermediate" as const, alternatives: ["Tricep Dips", "Overhead Extension", "Diamond Push-ups"] },
      { id: 43, name: "Face Pulls", sets: 3, reps: "12-15", muscle: "rear delts", difficulty: "intermediate" as const, alternatives: ["Reverse Flyes", "Band Pull-aparts", "Bent-over Lateral Raises"] },
      { id: 44, name: "Hip Thrusts", sets: 3, reps: "12-15", muscle: "glutes", difficulty: "intermediate" as const, alternatives: ["Glute Bridges", "Romanian Deadlifts", "Good Mornings"] }
    ],
    advanced: [
      { id: 26, name: "Weighted Pull-ups", sets: 4, reps: "5-8", muscle: "back", difficulty: "advanced" as const, alternatives: ["Muscle-ups", "Wide-grip Pull-ups", "Archer Pull-ups"] },
      { id: 27, name: "Front Squats", sets: 4, reps: "6-8", muscle: "legs", difficulty: "advanced" as const, alternatives: ["Overhead Squats", "Pause Squats", "Jump Squats"] },
      { id: 28, name: "Deficit Deadlifts", sets: 4, reps: "5-6", muscle: "back", difficulty: "advanced" as const, alternatives: ["Romanian Deadlifts", "Stiff-leg Deadlifts", "Single-leg Deadlifts"] },
      { id: 45, name: "Weighted Dips", sets: 4, reps: "6-8", muscle: "triceps", difficulty: "advanced" as const, alternatives: ["Ring Dips", "Archer Dips", "Regular Dips"] },
      { id: 46, name: "Barbell Hip Thrusts", sets: 4, reps: "8-10", muscle: "glutes", difficulty: "advanced" as const, alternatives: ["Single-leg Hip Thrusts", "Pause Hip Thrusts", "Banded Hip Thrusts"] }
    ]
  }
};

export function generateWorkoutPlan(
  goal: 'weight_loss' | 'muscle_gain', 
  daysPerWeek: number = 3, 
  currentDay: number = 1,
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner'
): WorkoutPlan {
  console.log('Generating workout plan:', { goal, daysPerWeek, currentDay, fitnessLevel });
  
  // Get exercises based on goal and fitness level
  const exercises = exerciseDatabase[goal][fitnessLevel] || exerciseDatabase[goal].beginner;
  
  // Get actual current day from localStorage or use provided
  const workoutProgress = JSON.parse(localStorage.getItem('workoutProgress') || '{}');
  const actualCurrentDay = workoutProgress.currentDay || currentDay;
  
  // Calculate total days for a 4-week program
  const totalDays = daysPerWeek * 4;
  
  console.log('Workout progress:', { actualCurrentDay, totalDays });
  
  // Select exercises based on the day and goal
  const exercisesPerWorkout = goal === 'weight_loss' ? 6 : 8; // More exercises for comprehensive workouts
  const startIndex = ((actualCurrentDay - 1) % exercises.length);
  let selectedExercises = [];
  
  for (let i = 0; i < exercisesPerWorkout && i < exercises.length; i++) {
    const index = (startIndex + i) % exercises.length;
    selectedExercises.push(exercises[index]);
  }
  
  // If we need more exercises, add some from the beginning
  if (selectedExercises.length < exercisesPerWorkout) {
    const remaining = exercisesPerWorkout - selectedExercises.length;
    for (let i = 0; i < remaining && i < exercises.length; i++) {
      if (!selectedExercises.find(ex => ex.id === exercises[i].id)) {
        selectedExercises.push(exercises[i]);
      }
    }
  }
  
  const workoutTypes = {
    1: "Full Body Foundation",
    2: "Upper Body Focus", 
    3: "Lower Body & Core",
    4: "Strength & Power",
    5: "Endurance & Conditioning",
    6: "High Intensity Training"
  };
  
  const dayIndex = ((actualCurrentDay - 1) % Object.keys(workoutTypes).length) + 1;
  
  const workout = {
    title: workoutTypes[dayIndex as keyof typeof workoutTypes] || "Full Body Workout",
    day: actualCurrentDay,
    totalDays: totalDays,
    exercises: selectedExercises,
    focus: goal === 'weight_loss' ? 'Fat Loss & Conditioning' : 'Strength & Muscle Building'
  };
  
  console.log('Generated workout:', workout);
  
  return workout;
}

export function getAlternativeExercise(exerciseId: number, exercises: Exercise[]): Exercise | null {
  const currentExercise = exercises.find(ex => ex.id === exerciseId);
  if (!currentExercise || !currentExercise.alternatives.length) {
    console.log('No alternatives found for exercise:', exerciseId);
    return null;
  }
  
  // Get a random alternative
  const alternativeName = currentExercise.alternatives[Math.floor(Math.random() * currentExercise.alternatives.length)];
  
  console.log('Switching to alternative:', alternativeName);
  
  // Create new exercise with alternative name
  return {
    ...currentExercise,
    id: exerciseId + 1000, // Different ID for tracking
    name: alternativeName
  };
}

export function advanceWorkoutDay() {
  const workoutProgress = JSON.parse(localStorage.getItem('workoutProgress') || '{}');
  const userPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
  const totalDays = (userPrefs.daysPerWeek || 3) * 4;
  
  workoutProgress.currentDay = Math.min((workoutProgress.currentDay || 1) + 1, totalDays);
  localStorage.setItem('workoutProgress', JSON.stringify(workoutProgress));
  
  console.log('Advanced to workout day:', workoutProgress.currentDay);
  
  return workoutProgress.currentDay;
}

export function resetWorkoutProgress() {
  localStorage.setItem('workoutProgress', JSON.stringify({ currentDay: 1 }));
  console.log('Workout progress reset to day 1');
}
