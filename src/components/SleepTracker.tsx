
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Clock, TrendingUp, Zap } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { AnimatedButton } from './ui/animated-button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { toast } from './ui/use-toast';

interface SleepData {
  date: string;
  bedtime: string;
  wakeTime: string;
  hours: number;
  quality: 'poor' | 'fair' | 'good' | 'excellent';
}

export const SleepTracker: React.FC = () => {
  const [sleepData, setSleepData] = useState<SleepData[]>([]);
  const [bedtime, setBedtime] = useState('22:00');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [quality, setQuality] = useState<'poor' | 'fair' | 'good' | 'excellent'>('good');
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sleepData');
    if (saved) {
      setSleepData(JSON.parse(saved));
    }
  }, []);

  const calculateSleepHours = (bedtime: string, wakeTime: string): number => {
    const bed = new Date(`2000-01-01 ${bedtime}`);
    let wake = new Date(`2000-01-01 ${wakeTime}`);
    
    // If wake time is earlier than bedtime, assume it's the next day
    if (wake <= bed) {
      wake = new Date(`2000-01-02 ${wakeTime}`);
    }
    
    const diff = wake.getTime() - bed.getTime();
    return diff / (1000 * 60 * 60); // Convert to hours
  };

  const logSleep = () => {
    setIsLogging(true);
    
    setTimeout(() => {
      const today = new Date().toISOString().split('T')[0];
      const hours = calculateSleepHours(bedtime, wakeTime);
      
      const newSleepEntry: SleepData = {
        date: today,
        bedtime,
        wakeTime,
        hours,
        quality
      };
      
      const updatedData = [...sleepData.filter(entry => entry.date !== today), newSleepEntry];
      setSleepData(updatedData);
      localStorage.setItem('sleepData', JSON.stringify(updatedData));
      
      setIsLogging(false);
      
      toast({
        title: "Sleep logged! 😴",
        description: `${hours.toFixed(1)} hours of ${quality} sleep recorded.`
      });
    }, 1000);
  };

  const getWeeklySleepAverage = (): number => {
    if (sleepData.length === 0) return 0;
    const total = sleepData.slice(-7).reduce((sum, entry) => sum + entry.hours, 0);
    return total / Math.min(sleepData.length, 7);
  };

  const getSleepQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'fair': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSleepScore = (): number => {
    const hours = calculateSleepHours(bedtime, wakeTime);
    const optimalHours = 8;
    const hoursScore = Math.max(0, 100 - Math.abs(hours - optimalHours) * 10);
    
    const qualityScore = {
      poor: 25,
      fair: 50,
      good: 75,
      excellent: 100
    }[quality];
    
    return Math.round((hoursScore + qualityScore) / 2);
  };

  const weeklyAverage = getWeeklySleepAverage();
  const sleepScore = getSleepScore();
  const recentSleep = sleepData.slice(-7);

  return (
    <div className="space-y-6">
      {/* Sleep Input */}
      <Card className="glassmorphism border-0">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center"
            >
              <Moon className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">Sleep Tracker</h3>
            <p className="text-white/70">Track your sleep for better recovery</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Moon className="w-4 h-4 mr-2 text-purple-400" />
                  Bedtime
                </label>
                <input
                  type="time"
                  value={bedtime}
                  onChange={(e) => setBedtime(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center">
                  <Sun className="w-4 h-4 mr-2 text-yellow-400" />
                  Wake Time
                </label>
                <input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sleep Quality</label>
              <div className="grid grid-cols-4 gap-2">
                {(['poor', 'fair', 'good', 'excellent'] as const).map((q) => (
                  <motion.button
                    key={q}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuality(q)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      quality === q 
                        ? 'bg-bodify-gradient text-white' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {q.charAt(0).toUpperCase() + q.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="text-center p-4 rounded-lg bg-white/5">
              <Clock className="w-6 h-6 mx-auto mb-2 text-bodify-orange" />
              <p className="text-lg font-bold">
                {calculateSleepHours(bedtime, wakeTime).toFixed(1)} hours
              </p>
              <p className="text-sm text-white/70">Planned sleep duration</p>
            </div>

            <AnimatedButton
              onClick={logSleep}
              loading={isLogging}
              className="w-full bg-bodify-gradient hover:opacity-90 py-3"
              glowEffect={true}
            >
              Log Sleep
            </AnimatedButton>
          </div>
        </CardContent>
      </Card>

      {/* Sleep Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glassmorphism border-0">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <h3 className="text-2xl font-bold">{weeklyAverage.toFixed(1)}h</h3>
            <p className="text-white/70">Weekly Average</p>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-0">
          <CardContent className="p-6 text-center">
            <Zap className="w-8 h-8 mx-auto mb-2 text-bodify-orange" />
            <h3 className="text-2xl font-bold">{sleepScore}</h3>
            <p className="text-white/70">Sleep Score</p>
          </CardContent>
        </Card>
        
        <Card className="glassmorphism border-0">
          <CardContent className="p-6 text-center">
            <Moon className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <h3 className="text-2xl font-bold">{sleepData.length}</h3>
            <p className="text-white/70">Nights Tracked</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Sleep History */}
      {recentSleep.length > 0 && (
        <Card className="glassmorphism border-0">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Sleep</h3>
            <div className="space-y-3">
              {recentSleep.reverse().map((entry, index) => (
                <motion.div
                  key={entry.date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-sm">
                      {new Date(entry.date).toLocaleDateString('en', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="text-sm text-white/70">
                      {entry.bedtime} - {entry.wakeTime}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge className={getSleepQualityColor(entry.quality)}>
                      {entry.quality}
                    </Badge>
                    <div className="text-sm font-medium">
                      {entry.hours.toFixed(1)}h
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
