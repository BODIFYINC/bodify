import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Award, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { AccurateNutritionTracker, UserProfile } from '@/services/accurateNutritionTracker';
import { NutritionAnalyzer, NutritionProfile } from '@/services/nutritionAnalyzer';

interface NutritionDashboardProps {
  currentMealPlan?: any;
}

export const NutritionDashboard: React.FC<NutritionDashboardProps> = ({ currentMealPlan }) => {
  const [nutritionProfile, setNutritionProfile] = useState<NutritionProfile | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNutritionData = () => {
      try {
        const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
        
        const profile: UserProfile = {
          weight: userSettings.weight,
          height: userSettings.height,
          age: userSettings.age,
          gender: userSettings.gender || 'male',
          activityLevel: userSettings.activityLevel || 'moderate',
          goal: userSettings.goal,
          bodyFat: userSettings.bodyFat
        };

        const fullProfile = NutritionAnalyzer.analyzeUserProfile(profile);
        setNutritionProfile(fullProfile);

        if (
          currentMealPlan &&
          fullProfile &&
          typeof fullProfile.targetCalories === 'number' &&
          fullProfile.macroTargets &&
          typeof fullProfile.macroTargets.protein === 'number'
        ) {
          const totalNutrition = NutritionAnalyzer.calculateTotalNutrition(currentMealPlan);
          const calorieBalance = (totalNutrition.calories / fullProfile.targetCalories) * 100;
          const proteinAdequacy = (totalNutrition.protein / fullProfile.macroTargets.protein) * 100;

          const mealPlanAnalysis = NutritionAnalyzer.analyzeMealPlan(currentMealPlan, fullProfile);
          setAnalysis({
            calorieBalance,
            proteinAdequacy,
            nutritionScore: Math.min((calorieBalance + proteinAdequacy) / 2, 100),
            macroBalance: mealPlanAnalysis.macroBalance,
            recommendations: mealPlanAnalysis.recommendations
          });
        } else {
          setAnalysis(null);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error loading nutrition data:', error);
        setLoading(false);
      }
    };

    loadNutritionData();
  }, [currentMealPlan]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-lg bg-gradient-to-br from-[#18181c] via-[#23232a] to-[#2a2a38] border border-[#23232a]/60 shadow-lg"
          />
        ))}
      </div>
    );
  }

  if (!nutritionProfile) {
    return (
      <Card className="glassmorphism border-0">
        <CardContent className="p-6 text-center">
          <p className="text-white/70">Complete your profile to see personalized nutrition insights</p>
        </CardContent>
      </Card>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getProgressColor = (value: number) => {
    if (value >= 90 && value <= 110) return 'bg-green-500';
    if (value >= 80 && value <= 120) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Nutrition Profile Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="glassmorphism border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/70 flex items-center">
              <Target className="w-4 h-4 mr-2 text-bodify-orange" />
              Daily Targets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-white/70">Calories</span>
              <span className="font-semibold text-bodify-orange">
                {nutritionProfile.targetCalories}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/70">Protein</span>
              <span className="font-semibold text-bodify-purple">
                {nutritionProfile.macroTargets.protein}g
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/70">Carbs</span>
              <span className="font-semibold text-blue-400">
                {nutritionProfile.macroTargets.carbs}g
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/70">Fat</span>
              <span className="font-semibold text-green-400">
                {nutritionProfile.macroTargets.fat}g
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/70 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-bodify-purple" />
              Metabolic Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-white/70">BMR</span>
              <span className="font-semibold">
                {Math.round(nutritionProfile.bmr)} cal
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/70">TDEE</span>
              <span className="font-semibold">
                {Math.round(nutritionProfile.tdee)} cal
              </span>
            </div>
            <Badge variant="outline" className="w-full justify-center border-white/20">
              Metabolically Active
            </Badge>
          </CardContent>
        </Card>

        {analysis && (
          <Card className="glassmorphism border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-white/70 flex items-center">
                <Award className="w-4 h-4 mr-2 text-yellow-400" />
                Nutrition Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(analysis.nutritionScore)}`}>
                  {analysis.nutritionScore}
                </div>
                <div className="text-sm text-white/70">out of 100</div>
              </div>
              <Progress 
                value={analysis.nutritionScore} 
                className="h-2"
              />
              <Badge 
                variant={analysis.nutritionScore >= 85 ? "default" : "outline"}
                className="w-full justify-center"
              >
                {analysis.nutritionScore >= 85 ? 'Excellent' : 
                 analysis.nutritionScore >= 70 ? 'Good' : 'Needs Improvement'}
              </Badge>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Meal Plan Analysis */}
      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glassmorphism border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Brain className="w-5 h-5 mr-2 text-bodify-orange" />
                AI Nutrition Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Macro Balance */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">Calorie Balance</span>
                    <span className={`font-semibold ${getScoreColor(analysis.calorieBalance)}`}>
                      {Math.round(analysis.calorieBalance)}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(analysis.calorieBalance, 100)} 
                    className="h-2"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">Protein Adequacy</span>
                    <span className={`font-semibold ${getScoreColor(analysis.proteinAdequacy)}`}>
                      {Math.round(analysis.proteinAdequacy)}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(analysis.proteinAdequacy, 100)} 
                    className="h-2"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">Macro Balance</span>
                    <span className="font-semibold text-bodify-purple">Optimal</span>
                  </div>
                  <div className="flex space-x-1 h-2">
                    <div 
                      className="bg-bodify-orange rounded"
                      style={{ width: `${analysis.macroBalance.protein}%` }}
                    />
                    <div 
                      className="bg-blue-400 rounded"
                      style={{ width: `${analysis.macroBalance.carbs}%` }}
                    />
                    <div 
                      className="bg-green-400 rounded"
                      style={{ width: `${analysis.macroBalance.fat}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="space-y-3">
                <h4 className="font-semibold text-white">AI Recommendations</h4>
                <div className="space-y-2">
                  {analysis.recommendations.map((recommendation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-bodify-orange rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-white/80">{recommendation}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
