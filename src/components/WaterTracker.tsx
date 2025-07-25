
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Plus, Minus, Target, Award } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { AnimatedButton } from './ui/animated-button';
import { Progress } from './ui/progress';
import { toast } from './ui/use-toast';

export const WaterTracker: React.FC = () => {
  const [waterIntake, setWaterIntake] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(8); // 8 glasses = 2L
  const [streak, setStreak] = useState(0);
  const [lastLogDate, setLastLogDate] = useState<string>('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const savedData = localStorage.getItem('waterTracking');
    
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data[today]) {
        setWaterIntake(data[today].glasses);
        setStreak(data.streak || 0);
      }
      setLastLogDate(data.lastLogDate || '');
    }
  }, []);

  const saveWaterData = (glasses: number) => {
    const today = new Date().toISOString().split('T')[0];
    const savedData = JSON.parse(localStorage.getItem('waterTracking') || '{}');
    
    // Calculate streak
    let newStreak = streak;
    if (lastLogDate) {
      const lastDate = new Date(lastLogDate);
      const todayDate = new Date(today);
      const daysDiff = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
      
      if (daysDiff === 1 && glasses >= dailyGoal) {
        newStreak += 1;
      } else if (daysDiff > 1) {
        newStreak = glasses >= dailyGoal ? 1 : 0;
      }
    } else if (glasses >= dailyGoal) {
      newStreak = 1;
    }
    
    const updatedData = {
      ...savedData,
      [today]: { glasses, timestamp: Date.now() },
      streak: newStreak,
      lastLogDate: glasses >= dailyGoal ? today : lastLogDate
    };
    
    localStorage.setItem('waterTracking', JSON.stringify(updatedData));
    setStreak(newStreak);
    
    if (glasses >= dailyGoal && waterIntake < dailyGoal) {
      toast({
        title: "Daily Goal Achieved! 🎉",
        description: `Great job staying hydrated! Streak: ${newStreak} days`
      });
    }
  };

  const addWater = (amount: number) => {
    const newAmount = Math.max(0, waterIntake + amount);
    setWaterIntake(newAmount);
    saveWaterData(newAmount);
    
    if (amount > 0) {
      toast({
        title: "Water logged! 💧",
        description: `${newAmount}/${dailyGoal} glasses today`
      });
    }
  };

  const getProgressColor = () => {
    const percentage = (waterIntake / dailyGoal) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getWaveHeight = () => {
    const percentage = Math.min((waterIntake / dailyGoal) * 100, 100);
    return `${percentage}%`;
  };

  return (
    <Card className="glassmorphism border-0">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-32 h-32 mx-auto mb-4 relative"
          >
            {/* Water Glass Animation */}
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-b-full border-4 border-blue-400 bg-transparent overflow-hidden">
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-300"
                  initial={{ height: 0 }}
                  animate={{ height: getWaveHeight() }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-2 bg-blue-400/30"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-2xl font-bold">{waterIntake}</p>
                <p className="text-xs text-white/70">glasses</p>
              </div>
            </div>
          </motion.div>
          
          <h3 className="text-xl font-bold mb-2 flex items-center justify-center">
            <Droplets className="w-6 h-6 mr-2 text-blue-400" />
            Water Intake
          </h3>
          
          <div className="space-y-2">
            <Progress 
              value={(waterIntake / dailyGoal) * 100} 
              className="h-3"
            />
            <p className="text-sm text-white/70">
              {waterIntake} of {dailyGoal} glasses ({Math.round((waterIntake / dailyGoal) * 100)}%)
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <AnimatedButton
            variant="outline"
            size="sm"
            onClick={() => addWater(-1)}
            disabled={waterIntake === 0}
            className="border-[#4f8cff] hover:bg-[#232946] text-white"
          >
            <Minus size={16} />
          </AnimatedButton>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatedButton
              onClick={() => addWater(1)}
              className="bg-blue-500 hover:bg-blue-600 px-8"
              glowEffect={true}
            >
              <Plus size={16} className="mr-2" />
              Add Glass
            </AnimatedButton>
          </motion.div>
          
          <AnimatedButton
            variant="outline"
            size="sm"
            onClick={() => addWater(1)}
            className="border-white/20 hover:bg-white/10"
          >
            <Plus size={16} />
          </AnimatedButton>
        </div>

        {/* Quick Add Buttons */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <AnimatedButton
            variant="outline"
            size="sm"
            onClick={() => addWater(1)}
            className="border-blue-400/30 hover:bg-blue-500/20"
          >
            +1 Glass
          </AnimatedButton>
          <AnimatedButton
            variant="outline"
            size="sm"
            onClick={() => addWater(2)}
            className="border-blue-400/30 hover:bg-blue-500/20"
          >
            +2 Glasses
          </AnimatedButton>
          <AnimatedButton
            variant="outline"
            size="sm"
            onClick={() => addWater(4)}
            className="border-blue-400/30 hover:bg-blue-500/20"
          >
            +1 Bottle
          </AnimatedButton>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#18181c] via-[#23232a] to-[#2a2a38] border border-[#23232a]/60 shadow-lg">
            <Target className="w-6 h-6 mx-auto mb-1 text-blue-400" />
            <p className="text-sm text-white/70">Daily Goal</p>
            <p className="font-bold">{dailyGoal} glasses</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#18181c] via-[#23232a] to-[#2a2a38] border border-[#23232a]/60 shadow-lg">
            <Award className="w-6 h-6 mx-auto mb-1 text-bodify-orange" />
            <p className="text-sm text-white/70">Streak</p>
            <p className="font-bold">{streak} days</p>
          </div>
        </div>

        {/* Hydration Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-400/20"
        >
          <h4 className="font-medium mb-2 text-blue-400">💡 Hydration Tip</h4>
          <p className="text-sm text-white/70">
            Start your day with a glass of water to kickstart your metabolism and help your body wake up naturally!
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};
