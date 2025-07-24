
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Calendar, Award, Flame, Zap } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface ProgressData {
  date: string;
  weight?: number;
  calories: number;
  protein: number;
  workouts: number;
  waterIntake: number;
  sleepHours: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress: number;
  target: number;
}

export const ProgressTracker: React.FC = () => {
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-week',
      title: 'First Week Warrior',
      description: 'Complete 7 days of meal tracking',
      icon: <Calendar className="w-6 h-6" />,
      unlocked: false,
      progress: 0,
      target: 7
    },
    {
      id: 'protein-master',
      title: 'Protein Master',
      description: 'Hit protein goals 10 times',
      icon: <Target className="w-6 h-6" />,
      unlocked: false,
      progress: 0,
      target: 10
    },
    {
      id: 'workout-streak',
      title: 'Workout Streak',
      description: 'Complete 5 workouts in a row',
      icon: <Flame className="w-6 h-6" />,
      unlocked: false,
      progress: 0,
      target: 5
    },
    {
      id: 'early-bird',
      title: 'Early Bird',
      description: 'Log breakfast before 9 AM for 7 days',
      icon: <Zap className="w-6 h-6" />,
      unlocked: false,
      progress: 0,
      target: 7
    }
  ]);

  useEffect(() => {
    // Load progress data from localStorage
    const saved = localStorage.getItem('progressData');
    if (saved) {
      setProgressData(JSON.parse(saved));
    }
    
    // Calculate achievements
    updateAchievements();
  }, []);

  const updateAchievements = () => {
    const mealData = JSON.parse(localStorage.getItem('dailyMealStatus') || '{}');
    const workoutData = JSON.parse(localStorage.getItem('dailyExerciseStatus') || '{}');
    
    setAchievements(prev => prev.map(achievement => {
      let progress = 0;
      
      switch (achievement.id) {
        case 'first-week':
          progress = Object.keys(mealData).length;
          break;
        case 'protein-master':
          progress = Math.min(Object.keys(mealData).length * 0.8, achievement.target);
          break;
        case 'workout-streak':
          progress = Object.keys(workoutData).length;
          break;
        case 'early-bird':
          progress = Math.min(Object.keys(mealData).length * 0.6, achievement.target);
          break;
      }
      
      return {
        ...achievement,
        progress,
        unlocked: progress >= achievement.target
      };
    }));
  };

  const getWeeklyStats = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      days.push({
        day: date.toLocaleDateString('en', { weekday: 'short' }),
        date: dateStr,
        calories: Math.floor(Math.random() * 500) + 1500, // Mock data for demo
        protein: Math.floor(Math.random() * 50) + 80,
        workouts: Math.random() > 0.3 ? 1 : 0
      });
    }
    
    return days;
  };

  const weeklyStats = getWeeklyStats();
  const totalCalories = weeklyStats.reduce((sum, day) => sum + day.calories, 0);
  const avgProtein = Math.round(weeklyStats.reduce((sum, day) => sum + day.protein, 0) / 7);
  const workoutDays = weeklyStats.filter(day => day.workouts > 0).length;

  return (
    <div className="space-y-6">
      {/* Weekly Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="glassmorphism border-0">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-bodify-orange" />
            <h3 className="text-2xl font-bold">{totalCalories.toLocaleString()}</h3>
            <p className="text-white/70">Total Calories This Week</p>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-0">
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-bodify-purple" />
            <h3 className="text-2xl font-bold">{avgProtein}g</h3>
            <p className="text-white/70">Avg Daily Protein</p>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-0">
          <CardContent className="p-6 text-center">
            <Flame className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <h3 className="text-2xl font-bold">{workoutDays}/7</h3>
            <p className="text-white/70">Workout Days</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weekly Chart */}
      <Card className="glassmorphism border-0">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Weekly Activity</h3>
          <div className="space-y-4">
            {weeklyStats.map((day, index) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 text-center">
                    <p className="font-medium">{day.day}</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm">Calories:</span>
                      <Progress value={(day.calories / 2500) * 100} className="w-24 h-2" />
                      <span className="text-xs text-white/70">{day.calories}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Protein:</span>
                      <Progress value={(day.protein / 150) * 100} className="w-24 h-2" />
                      <span className="text-xs text-white/70">{day.protein}g</span>
                    </div>
                  </div>
                </div>
                {day.workouts > 0 && (
                  <Badge className="bg-green-500">
                    ✓ Workout
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="glassmorphism border-0">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Award className="w-6 h-6 mr-2 text-bodify-orange" />
            Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-r from-bodify-orange/20 to-bodify-purple/20 border-bodify-orange/50' 
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-full ${
                    achievement.unlocked ? 'bg-bodify-orange/20' : 'bg-white/10'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-white/70">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <Badge className="bg-bodify-orange ml-auto">
                      Unlocked!
                    </Badge>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.target}</span>
                  </div>
                  <Progress 
                    value={(achievement.progress / achievement.target) * 100} 
                    className="h-2"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
