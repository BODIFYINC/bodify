
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import Dashboard from './Dashboard';
import Recipes from './Recipes';
import Workouts from './Workouts';
import AICoaching from './AICoaching';
import Wellness from './Wellness';
import Progress from './Progress';
import Settings from './Settings';

const MainDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ai-coaching');

  const renderContent = () => {
    const contentVariants = {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 }
    };

    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div
            key="dashboard"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker"
          >
            <Dashboard />
          </motion.div>
        );
      case 'ai-coaching':
        return (
          <motion.div
            key="ai-coaching"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker"
          >
            <AICoaching />
          </motion.div>
        );
      case 'recipes':
        return (
          <motion.div
            key="recipes"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker"
          >
            <Recipes />
          </motion.div>
        );
      case 'workouts':
        return (
          <motion.div
            key="workouts"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker"
          >
            <Workouts />
          </motion.div>
        );
      case 'wellness':
        return (
          <motion.div
            key="wellness"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker"
          >
            <Wellness />
          </motion.div>
        );
      case 'progress':
        return (
          <motion.div
            key="progress"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker"
          >
            <Progress />
          </motion.div>
        );
      case 'settings':
        return (
          <motion.div
            key="settings"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker"
          >
            <Settings />
          </motion.div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-bodify-dark to-bodify-darker">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 overflow-hidden">
            <div className="md:hidden p-4">
              <SidebarTrigger className="text-white" />
            </div>
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default MainDashboard;
