
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Moon, Droplets, Activity, Brain, Smile } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

interface WellnessData {
  sleep: number;
  water: number;
  mood: number;
  stress: number;
  energy: number;
  date: string;
}

const Wellness: React.FC = () => {
  const [todayData, setTodayData] = useState<WellnessData>({
    sleep: 8,
    water: 8,
    mood: 7,
    stress: 5,
    energy: 7,
    date: new Date().toDateString()
  });

  const [weeklyData, setWeeklyData] = useState<WellnessData[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('wellnessData');
    if (savedData) {
      const data = JSON.parse(savedData);
      const today = new Date().toDateString();
      const todayEntry = data.find((entry: WellnessData) => entry.date === today);
      
      if (todayEntry) {
        setTodayData(todayEntry);
      }
      
      setWeeklyData(data.slice(-7));
    }
  }, []);

  const saveData = (newData: WellnessData) => {
    const savedData = JSON.parse(localStorage.getItem('wellnessData') || '[]');
    const today = new Date().toDateString();
    const existingIndex = savedData.findIndex((entry: WellnessData) => entry.date === today);
    
    if (existingIndex >= 0) {
      savedData[existingIndex] = newData;
    } else {
      savedData.push(newData);
    }
    
    localStorage.setItem('wellnessData', JSON.stringify(savedData));
    setTodayData(newData);
    setWeeklyData(savedData.slice(-7));
  };

  const updateValue = (key: keyof WellnessData, value: number) => {
    const newData = { ...todayData, [key]: value };
    saveData(newData);
  };

  const getMoodEmoji = (mood: number) => {
    if (mood <= 3) return '😢';
    if (mood <= 5) return '😐';
    if (mood <= 7) return '🙂';
    if (mood <= 9) return '😊';
    return '😄';
  };

  const getStressColor = (stress: number) => {
    if (stress <= 3) return 'text-green-400';
    if (stress <= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getEnergyColor = (energy: number) => {
    if (energy <= 4) return 'text-red-400';
    if (energy <= 7) return 'text-yellow-400';
    return 'text-green-400';
  };

  const wellnessMetrics = [
    {
      key: 'sleep' as keyof WellnessData,
      title: 'Sleep Hours',
      icon: Moon,
      value: todayData.sleep,
      unit: 'hours',
      min: 4,
      max: 12,
      color: 'text-purple-400',
      description: 'Quality sleep is crucial for recovery and performance'
    },
    {
      key: 'water' as keyof WellnessData,
      title: 'Water Intake',
      icon: Droplets,
      value: todayData.water,
      unit: 'glasses',
      min: 0,
      max: 15,
      color: 'text-blue-400',
      description: 'Stay hydrated for optimal health and performance'
    },
    {
      key: 'mood' as keyof WellnessData,
      title: 'Mood',
      icon: Smile,
      value: todayData.mood,
      unit: '/10',
      min: 1,
      max: 10,
      color: 'text-yellow-400',
      description: 'Track your emotional well-being'
    },
    {
      key: 'stress' as keyof WellnessData,
      title: 'Stress Level',
      icon: Brain,
      value: todayData.stress,
      unit: '/10',
      min: 1,
      max: 10,
      color: getStressColor(todayData.stress),
      description: 'Monitor and manage your stress levels'
    },
    {
      key: 'energy' as keyof WellnessData,
      title: 'Energy Level',
      icon: Activity,
      value: todayData.energy,
      unit: '/10',
      min: 1,
      max: 10,
      color: getEnergyColor(todayData.energy),
      description: 'Track your daily energy and vitality'
    }
  ];

  const getWeeklyAverage = (key: keyof WellnessData) => {
    if (weeklyData.length === 0) return 0;
    const sum = weeklyData.reduce((acc, data) => acc + (data[key] as number), 0);
    return (sum / weeklyData.length).toFixed(1);
  };

  const wellnessTips = [
    "Aim for 7-9 hours of quality sleep each night",
    "Drink at least 8 glasses of water daily",
    "Practice deep breathing to reduce stress",
    "Take short breaks throughout the day",
    "Spend time in nature for mental wellness",
    "Practice gratitude to improve mood"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker text-white">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-bodify-orange to-bodify-purple bg-clip-text text-transparent mb-4">
            Wellness Tracker
          </h1>
          <p className="text-white/70 text-lg">
            Monitor your overall well-being beyond just fitness
          </p>
        </motion.div>

        {/* Today's Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {wellnessMetrics.map((metric, index) => (
            <motion.div
              key={metric.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <metric.icon className={`mr-2 ${metric.color}`} size={20} />
                    {metric.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-white">
                        {metric.value}{metric.unit}
                      </span>
                      {metric.key === 'mood' && (
                        <span className="text-2xl">{getMoodEmoji(metric.value)}</span>
                      )}
                    </div>
                    
                    <Slider
                      value={[metric.value]}
                      onValueChange={(value) => updateValue(metric.key, value[0])}
                      min={metric.min}
                      max={metric.max}
                      step={metric.key === 'sleep' ? 0.5 : 1}
                      className="w-full"
                    />
                    
                    <p className="text-xs text-white/60">{metric.description}</p>
                    
                    <div className="text-sm text-white/70">
                      Weekly avg: {getWeeklyAverage(metric.key)}{metric.unit}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Wellness Tips */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Heart className="mr-2 text-red-400" size={20} />
              Daily Wellness Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wellnessTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center p-3 bg-white/5 rounded-lg"
                >
                  <span className="text-green-400 mr-3">✓</span>
                  <span className="text-white/80">{tip}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Wellness;
