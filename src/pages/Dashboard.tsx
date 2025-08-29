import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Settings, Utensils, TrendingUp, BookOpen, Dumbbell } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIChatTab } from '@/components/dashboard/AIChatTab';
import { SettingsTab } from '@/components/dashboard/SettingsTab';
import { MealsTab } from '@/components/dashboard/MealsTab';
import { ProgressTab } from '@/components/dashboard/ProgressTab';
import { RecipesTab } from '@/components/dashboard/RecipesTab';
import { CreativeTab } from '@/components/dashboard/CreativeTab';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');

  const tabs = [
    { id: 'chat', label: 'AI Coach', icon: MessageSquare, component: AIChatTab },
    { id: 'settings', label: 'Settings', icon: Settings, component: SettingsTab },
    { id: 'meals', label: 'Meals', icon: Utensils, component: MealsTab },
    { id: 'progress', label: 'Progress', icon: TrendingUp, component: ProgressTab },
    { id: 'recipes', label: 'Recipes', icon: BookOpen, component: RecipesTab },
    { id: 'creative', label: 'Workouts', icon: Dumbbell, component: CreativeTab },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Immersive Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 kinetic-typography">
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
              Bodify Dashboard
            </span>
          </h1>
          <p className="text-white/70 text-lg">Your AI-powered fitness companion</p>
        </motion.div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="glassmorphism-card w-full justify-start mb-8 p-2 rounded-2xl border border-white/10">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 hover-scale data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-500 data-[state=active]:text-white data-[state=active]:shadow-glow"
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Content */}
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <tab.component />
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;