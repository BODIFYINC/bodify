import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Calendar, Award, Flame, Droplets, Moon, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AccurateNutritionTracker } from '@/services/accurateNutritionTracker';

interface DayProgress {
  date: string;
  calories: number;
  protein: number;
  weight?: number;
  workouts: number;
  water: number;
  sleep: number;
}

export const ProgressTab: React.FC = () => {
  const [dailyProgress, setDailyProgress] = useState<DayProgress[]>([]);
  const [currentNutrition, setCurrentNutrition] = useState<any>(null);
  const [targets, setTargets] = useState<any>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadProgressData();
    loadCurrentNutrition();
  }, []);

  const loadProgressData = () => {
    // Generate mock data for the last 7 days
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      days.push({
        date: date.toLocaleDateString('en', { month: 'short', day: 'numeric' }),
        calories: Math.floor(Math.random() * 600) + 1400,
        protein: Math.floor(Math.random() * 60) + 70,
        weight: 70 + Math.random() * 2 - 1, // Small fluctuations
        workouts: Math.random() > 0.3 ? 1 : 0,
        water: Math.floor(Math.random() * 4) + 6, // 6-10 glasses
        sleep: Math.floor(Math.random() * 3) + 6 // 6-9 hours
      });
    }
    
    setDailyProgress(days);
    
    // Calculate streak
    let currentStreak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].calories > 1200 && days[i].protein > 50) {
        currentStreak++;
      } else {
        break;
      }
    }
    setStreak(currentStreak);
  };

  const loadCurrentNutrition = () => {
    try {
      const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
      const nutritionTargets = AccurateNutritionTracker.calculateNutritionTargets({
        weight: userSettings.weight || 70,
        height: userSettings.height || 175,
        age: userSettings.age || 25,
        gender: userSettings.gender || 'male',
        activityLevel: userSettings.activityLevel || 'moderate',
        goal: userSettings.goal || 'weight_loss'
      });
      
      const actualNutrition = AccurateNutritionTracker.calculateActualNutrition();
      
      setTargets(nutritionTargets);
      setCurrentNutrition(actualNutrition);
    } catch (error) {
      console.error('Error loading nutrition data:', error);
    }
  };

  const getCaloriesLeft = () => {
    if (!targets || !currentNutrition) return 0;
    return Math.max(0, targets.calories - currentNutrition.calories);
  };

  const getProteinLeft = () => {
    if (!targets || !currentNutrition) return 0;
    return Math.max(0, targets.protein - currentNutrition.protein);
  };

  const getCarbsLeft = () => {
    if (!targets || !currentNutrition) return 0;
    return Math.max(0, targets.carbs - currentNutrition.carbs);
  };

  const getFatLeft = () => {
    if (!targets || !currentNutrition) return 0;
    return Math.max(0, targets.fat - currentNutrition.fat);
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const achievements = [
    {
      title: 'Consistency King',
      description: `${streak} day streak`,
      icon: <Flame className="w-6 h-6" />,
      progress: streak,
      target: 7,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Protein Power',
      description: 'Hit protein goals',
      icon: <Target className="w-6 h-6" />,
      progress: dailyProgress.filter(d => d.protein > 100).length,
      target: 5,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Hydration Hero',
      description: 'Stay hydrated',
      icon: <Droplets className="w-6 h-6" />,
      progress: dailyProgress.filter(d => d.water >= 8).length,
      target: 7,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Sleep Champion',
      description: 'Quality sleep',
      icon: <Moon className="w-6 h-6" />,
      progress: dailyProgress.filter(d => d.sleep >= 7).length,
      target: 7,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
          Progress Tracker
        </h2>
        <p className="text-white/70">Track your daily nutrition and fitness goals</p>
      </motion.div>

      {/* Today's Remaining Macros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glassmorphism-card border border-white/10">
            <CardContent className="p-6 text-center">
              <Flame className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
              <p className="text-2xl font-bold text-white">{getCaloriesLeft()}</p>
              <p className="text-sm text-white/70">Calories Left</p>
              {targets && currentNutrition && (
                <Progress 
                  value={getProgressPercentage(currentNutrition.calories, targets.calories)} 
                  className="mt-2 h-2"
                />
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glassmorphism-card border border-white/10">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-red-400" />
              <p className="text-2xl font-bold text-white">{getProteinLeft()}g</p>
              <p className="text-sm text-white/70">Protein Left</p>
              {targets && currentNutrition && (
                <Progress 
                  value={getProgressPercentage(currentNutrition.protein, targets.protein)} 
                  className="mt-2 h-2"
                />
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glassmorphism-card border border-white/10">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <p className="text-2xl font-bold text-white">{getCarbsLeft()}g</p>
              <p className="text-sm text-white/70">Carbs Left</p>
              {targets && currentNutrition && (
                <Progress 
                  value={getProgressPercentage(currentNutrition.carbs, targets.carbs)} 
                  className="mt-2 h-2"
                />
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glassmorphism-card border border-white/10">
            <CardContent className="p-6 text-center">
              <Scale className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <p className="text-2xl font-bold text-white">{getFatLeft()}g</p>
              <p className="text-sm text-white/70">Fat Left</p>
              {targets && currentNutrition && (
                <Progress 
                  value={getProgressPercentage(currentNutrition.fat, targets.fat)} 
                  className="mt-2 h-2"
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Calorie Compliance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glassmorphism-card border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
                Weekly Calorie Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="calories" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  Average: {Math.round(dailyProgress.reduce((sum, day) => sum + day.calories, 0) / dailyProgress.length)} cal/day
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weight Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glassmorphism-card border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Scale className="w-5 h-5 mr-2 text-blue-400" />
                Weight Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  Current: {dailyProgress[dailyProgress.length - 1]?.weight?.toFixed(1)} kg
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="glassmorphism-card border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-400" />
              Achievements & Streaks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className={`p-4 rounded-xl bg-gradient-to-br ${achievement.color} bg-opacity-20 border border-white/10`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${achievement.color} bg-opacity-20`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{achievement.title}</h4>
                      <p className="text-xs text-white/70">{achievement.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Progress</span>
                      <span className="text-white/60">{achievement.progress}/{achievement.target}</span>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.target) * 100} 
                      className="h-2"
                    />
                    {achievement.progress >= achievement.target && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                        🏆 Unlocked!
                      </Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};