
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, Target, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  duration?: string;
  calories: number;
  muscle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface Workout {
  id: string;
  name: string;
  type: string;
  duration: number;
  calories: number;
  exercises: Exercise[];
}

const Workouts: React.FC = () => {
  const [workouts] = useState<Workout[]>([
    {
      id: '1',
      name: 'Upper Body Strength',
      type: 'Strength',
      duration: 45,
      calories: 350,
      exercises: [
        { id: 'e1', name: 'Push-ups', sets: 3, reps: '10-15', calories: 50, muscle: 'Chest', difficulty: 'Beginner' },
        { id: 'e2', name: 'Pull-ups', sets: 3, reps: '5-10', calories: 60, muscle: 'Back', difficulty: 'Intermediate' },
        { id: 'e3', name: 'Shoulder Press', sets: 3, reps: '8-12', calories: 45, muscle: 'Shoulders', difficulty: 'Intermediate' },
        { id: 'e4', name: 'Bicep Curls', sets: 3, reps: '10-15', calories: 40, muscle: 'Arms', difficulty: 'Beginner' },
        { id: 'e5', name: 'Tricep Dips', sets: 3, reps: '8-12', calories: 45, muscle: 'Arms', difficulty: 'Intermediate' }
      ]
    },
    {
      id: '2',
      name: 'Lower Body Power',
      type: 'Strength',
      duration: 40,
      calories: 400,
      exercises: [
        { id: 'e6', name: 'Squats', sets: 4, reps: '12-15', calories: 80, muscle: 'Legs', difficulty: 'Beginner' },
        { id: 'e7', name: 'Deadlifts', sets: 3, reps: '8-10', calories: 90, muscle: 'Legs', difficulty: 'Advanced' },
        { id: 'e8', name: 'Lunges', sets: 3, reps: '10 each leg', calories: 70, muscle: 'Legs', difficulty: 'Intermediate' },
        { id: 'e9', name: 'Calf Raises', sets: 3, reps: '15-20', calories: 30, muscle: 'Calves', difficulty: 'Beginner' }
      ]
    },
    {
      id: '3',
      name: 'HIIT Cardio',
      type: 'Cardio',
      duration: 30,
      calories: 450,
      exercises: [
        { id: 'e10', name: 'Jumping Jacks', sets: 4, reps: '', duration: '30 sec', calories: 60, muscle: 'Full Body', difficulty: 'Beginner' },
        { id: 'e11', name: 'Burpees', sets: 4, reps: '', duration: '20 sec', calories: 80, muscle: 'Full Body', difficulty: 'Advanced' },
        { id: 'e12', name: 'Mountain Climbers', sets: 4, reps: '', duration: '30 sec', calories: 70, muscle: 'Core', difficulty: 'Intermediate' },
        { id: 'e13', name: 'High Knees', sets: 4, reps: '', duration: '30 sec', calories: 50, muscle: 'Legs', difficulty: 'Beginner' }
      ]
    }
  ]);

  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedExercises') || '[]');
    const today = new Date().toDateString();
    const todayCompleted = completed.filter((item: any) => 
      new Date(item.completedAt).toDateString() === today
    ).map((item: any) => item.exerciseId);
    setCompletedExercises(new Set(todayCompleted));
  }, []);

  const toggleExerciseComplete = (exerciseId: string, calories: number) => {
    const newCompleted = new Set(completedExercises);
    const completed = JSON.parse(localStorage.getItem('completedExercises') || '[]');
    
    if (completedExercises.has(exerciseId)) {
      newCompleted.delete(exerciseId);
      const filteredCompleted = completed.filter((item: any) => item.exerciseId !== exerciseId);
      localStorage.setItem('completedExercises', JSON.stringify(filteredCompleted));
    } else {
      newCompleted.add(exerciseId);
      completed.push({
        exerciseId,
        calories,
        completedAt: new Date().toISOString()
      });
      localStorage.setItem('completedExercises', JSON.stringify(completed));
    }
    
    setCompletedExercises(newCompleted);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker text-white">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-bodify-orange to-bodify-purple bg-clip-text text-transparent mb-4">
            Workout Library
          </h1>
          <p className="text-white/70 text-lg">
            Structured workouts to help you reach your fitness goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {workouts.map((workout, index) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-xl">{workout.name}</CardTitle>
                      <p className="text-white/70">{workout.type}</p>
                    </div>
                    <Badge className="bg-bodify-orange/90">
                      {workout.calories} cal
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/70">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {workout.duration} min
                    </div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {workout.exercises.length} exercises
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {workout.exercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className={`p-3 rounded-lg border transition-all ${
                        completedExercises.has(exercise.id)
                          ? 'bg-green-500/20 border-green-500/50'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-white">{exercise.name}</h4>
                        <Button
                          size="sm"
                          variant={completedExercises.has(exercise.id) ? "default" : "outline"}
                          onClick={() => toggleExerciseComplete(exercise.id, exercise.calories)}
                          className={completedExercises.has(exercise.id) 
                            ? "bg-green-500 hover:bg-green-600" 
                            : "border-white/20 hover:bg-white/10"
                          }
                        >
                          <CheckCircle2 size={16} className="mr-1" />
                          {completedExercises.has(exercise.id) ? 'Done' : 'Mark Done'}
                        </Button>
                      </div>
                      <div className="flex justify-between items-center text-sm text-white/70">
                        <span>
                          {exercise.sets} sets × {exercise.reps || exercise.duration}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge className={getDifficultyColor(exercise.difficulty)}>
                            {exercise.difficulty}
                          </Badge>
                          <span>{exercise.calories} cal</span>
                        </div>
                      </div>
                      <p className="text-xs text-white/60 mt-1">Target: {exercise.muscle}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
