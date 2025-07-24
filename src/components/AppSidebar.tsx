import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Brain, 
  ChefHat, 
  Dumbbell, 
  Heart, 
  BarChart3, 
  Settings,
  User
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: Home,
    description: 'Your fitness overview'
  },
  {
    id: 'ai-coaching',
    title: 'AI Coach',
    icon: Brain,
    description: 'Get personalized guidance'
  },
  {
    id: 'recipes',
    title: 'Recipes',
    icon: ChefHat,
    description: 'Discover healthy meals'
  },
  {
    id: 'workouts',
    title: 'Workouts',
    icon: Dumbbell,
    description: 'Train effectively'
  },
  {
    id: 'wellness',
    title: 'Wellness',
    icon: Heart,
    description: 'Track your wellbeing'
  },
  {
    id: 'progress',
    title: 'Analytics',
    icon: BarChart3,
    description: 'View your progress'
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    description: 'Customize your experience'
  }
];

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-white/10 bg-gradient-to-b from-bodify-dark to-bodify-darker">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-bodify-gradient rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-bodify-orange to-bodify-purple bg-clip-text text-transparent">
              Bodify
            </h2>
            <p className="text-xs text-white/60">Fitness Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70 font-medium mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4 px-2 py-1">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onTabChange(item.id)}
                      className={`
                        relative w-full p-3 rounded-lg transition-all duration-200 group text-left
                        ${isActive 
                          ? 'bg-bodify-gradient text-white shadow-lg' 
                          : 'text-white hover:text-white hover:bg-white/10'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white'}`} />
                        <div className="flex-1 text-left overflow-hidden">
                          <div className="font-medium text-base tracking-wide truncate">{item.title}</div>
                          <div className={`text-xs ${isActive ? 'text-white/90' : 'text-white/85'} truncate`}>
                            {item.description}
                          </div>
                        </div>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-bodify-gradient rounded-lg -z-10"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-center text-xs text-white/50">
          <p>© 2024 Bodify</p>
          <p>Your AI Fitness Companion</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
